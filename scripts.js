// scripts.js — النسخة النهائية المحسّنة
// البيانات تُحمَّل من data.js فورياً — API للإرسال فقط

var APP = {
  step:1, nationalId:'', name:'', phone:'',
  category:'', providerCode:'', providerName:'',
  surveyAnswers:{}, audioBase64:null, imageFiles:[],
  mediaRecorder:null, recInterval:null, recSeconds:0, MAX_REC:90
};

var CAT_META = {
  'وحدة صحية':     {icon:'🏥'},
  'مستشفى رعاية':  {icon:'🏨'},
  'مستشفى متعاقد': {icon:'🤝'},
  'معمل متعاقد':   {icon:'🔬'}
};

var STEP_PCT   = {1:25, 2:50, 3:75, '4s':92, '4c':92, 'ok':100};
var STEP_LABEL = {
  1:'الخطوة 1 من 4', 2:'الخطوة 2 من 4',
  3:'الخطوة 3 من 4', '4s':'الخطوة 4 من 4',
  '4c':'الخطوة 4 من 4', 'ok':'✅ اكتمل'
};

// ══════════════════════════════════════════════════════════════
// تهيئة — فوري من data.js
// ══════════════════════════════════════════════════════════════
window.addEventListener('load', function() {
  document.getElementById('branchName').textContent = BRANCH_NAME;
  renderCategories(STATIC_DATA.categories);
});

// ══════════════════════════════════════════════════════════════
// التنقل بين الخطوات
// ══════════════════════════════════════════════════════════════
function goStep(n) {
  document.querySelectorAll('.step').forEach(function(s){
    s.classList.remove('active');
  });
  var idMap = {
    1:'step1', 2:'step2', 3:'step3',
    '4s':'step4survey', '4c':'step4complaint', 'ok':'stepSuccess'
  };
  var el = document.getElementById(idMap[String(n)]);
  if(el) el.classList.add('active');
  APP.step = n;
  document.getElementById('progressBar').style.width =
    (STEP_PCT[String(n)] || 25) + '%';
  document.getElementById('stepLabel').textContent =
    STEP_LABEL[String(n)] || '';
  window.scrollTo({top:0, behavior:'smooth'});
}

// ══════════════════════════════════════════════════════════════
// الخطوة 1 — التحقق من البيانات
// ══════════════════════════════════════════════════════════════
function goStep2() {
  var ni = document.getElementById('nationalId').value.trim();
  var nm = document.getElementById('name').value.trim();
  var ph = document.getElementById('phone').value.trim();
  var ok = true;
  ok = _v('nationalId', /^\d{14}$/.test(ni), 'رقم قومي غير صحيح (14 رقم)') && ok;
  ok = _v('name',       nm.length >= 4,       'الاسم قصير — 4 أحرف على الأقل') && ok;
  ok = _v('phone',      /^01[0-9]{9}$/.test(ph), 'رقم الهاتف غير صحيح') && ok;
  if(!ok) return;
  APP.nationalId = ni;
  APP.name       = nm;
  APP.phone      = ph;
  goStep(2);
}

function _v(id, ok, msg) {
  var el    = document.getElementById(id);
  var errEl = document.getElementById('err-' + id);
  if(el)    el.classList.toggle('error', !ok);
  if(errEl) errEl.textContent = ok ? '' : msg;
  return ok;
}

// ══════════════════════════════════════════════════════════════
// الخطوة 2 — الفئات (من data.js فوراً)
// ══════════════════════════════════════════════════════════════
function renderCategories(cats) {
  var grid = document.getElementById('categoryGrid');
  if(!grid) return;
  grid.innerHTML = '';
  cats.forEach(function(cat) {
    var meta = CAT_META[cat] || {icon:'🏥'};
    var d    = document.createElement('div');
    d.className = 'cat-card';
    d.innerHTML = '<div class="cat-icon">' + meta.icon + '</div>'
                + '<div class="cat-name">' + cat + '</div>';
    d.onclick = function(){ selectCat(cat, d); };
    grid.appendChild(d);
  });
}

function selectCat(cat, el) {
  document.querySelectorAll('.cat-card').forEach(function(c){
    c.classList.remove('selected');
  });
  el.classList.add('selected');
  APP.category = cat;
  document.getElementById('actionBtns').style.display = 'none';

  // من data.js فوراً — بدون API
  renderProviders(STATIC_DATA.providers[cat] || []);
  goStep(3);
}

// ══════════════════════════════════════════════════════════════
// الخطوة 3 — المنافذ (من data.js فوراً)
// ══════════════════════════════════════════════════════════════
function renderProviders(list) {
  var sel = document.getElementById('providerSelect');
  sel.innerHTML = '<option value="">-- اختر المنفذ --</option>';
  list.forEach(function(p) {
    var o          = document.createElement('option');
    o.value        = p.code;
    o.dataset.name = p.name;
    o.textContent  = p.name + (p.location ? ' — ' + p.location : '');
    sel.appendChild(o);
  });
}

function providerChanged() {
  var sel = document.getElementById('providerSelect');
  if(!sel.value) {
    document.getElementById('actionBtns').style.display = 'none';
    return;
  }
  APP.providerCode = sel.value;
  APP.providerName = sel.options[sel.selectedIndex].dataset.name
                  || sel.options[sel.selectedIndex].textContent;
  document.getElementById('actionBtns').style.display = 'grid';
}

// ══════════════════════════════════════════════════════════════
// الخطوة 4A — الاستبيان (أسئلة من data.js فوراً)
// ══════════════════════════════════════════════════════════════
function goSurvey() {
  goStep('4s');

  // دمج الأسئلة المشتركة + أسئلة الفئة المختارة
  var questions = (STATIC_DATA.questions['shared'] || [])
    .concat(STATIC_DATA.questions[APP.category]   || []);

  renderSurvey(questions);
}

function renderSurvey(questions) {
  var c = document.getElementById('surveyQuestions');
  APP.surveyAnswers = {};
  c.innerHTML = '';

  questions.forEach(function(q, i) {
    var b = document.createElement('div');
    b.className = 'q-block';
    b.id = 'qb_' + q.code;
    var inp = '';

    if(q.type === 'rating') {
      inp = '<div class="rating-wrap">' +
        q.options.map(function(op) {
          return '<button class="rating-btn" data-code="' + q.code + '"'
               + ' data-val="' + op + '"'
               + ' onclick="selR(this,\'' + q.code + '\')">' + op + '</button>';
        }).join('') + '</div>';

    } else if(q.type === 'yesno') {
      inp = '<div class="yesno-wrap">'
          + '<button class="yesno-btn yes" data-code="' + q.code + '"'
          + ' onclick="selY(this,\'' + q.code + '\',\'نعم\')">✅ نعم</button>'
          + '<button class="yesno-btn no" data-code="' + q.code + '"'
          + ' onclick="selY(this,\'' + q.code + '\',\'لا\')">❌ لا</button>'
          + '</div>';

    } else if(q.type === 'multiple') {
      inp = '<select onchange="APP.surveyAnswers[\'' + q.code + '\']=this.value">'
          + '<option value="">-- اختر --</option>'
          + q.options.map(function(op){
              return '<option>' + op + '</option>';
            }).join('')
          + '</select>';

    } else {
      inp = '<textarea rows="3" placeholder="اكتب هنا..."'
          + ' onchange="APP.surveyAnswers[\'' + q.code + '\']=this.value"></textarea>';
    }

    var rl = q.required ? '<span class="q-req"> *</span>' : '';
    b.innerHTML = '<div class="q-text">' + (i+1) + '. ' + q.text + rl + '</div>' + inp;
    if(q.dependOn) b.style.display = 'none';
    c.appendChild(b);
  });

  // منطق الأسئلة المشروطة
  document.querySelectorAll('[data-code]').forEach(function(el) {
    el.addEventListener('click', function() {
      questions.filter(function(q){ return q.dependOn; }).forEach(function(q) {
        var blk = document.getElementById('qb_' + q.code);
        if(blk) blk.style.display =
          APP.surveyAnswers[q.dependOn] === q.dependVal ? 'block' : 'none';
      });
    });
  });
}

function selR(btn, code) {
  document.querySelectorAll('.rating-btn[data-code="' + code + '"]')
    .forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
  APP.surveyAnswers[code] = btn.dataset.val;
}

function selY(btn, code, val) {
  document.querySelectorAll('.yesno-btn[data-code="' + code + '"]')
    .forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
  APP.surveyAnswers[code] = val;
}

// ══════════════════════════════════════════════════════════════
// إرسال الاستبيان — API فقط عند الإرسال
// ══════════════════════════════════════════════════════════════
function submitSurvey() {
  var btn = document.getElementById('surveyBtn');
  btn.disabled = true;
  showLoading(true);
  callAPI('saveSurvey', {
    payload: {
      nationalId:   APP.nationalId,
      name:         APP.name,
      phone:        APP.phone,
      category:     APP.category,
      providerCode: APP.providerCode,
      providerName: APP.providerName,
      answers:      APP.surveyAnswers
    }
  }, function(err, res) {
    showLoading(false);
    if(err || !res || !res.success) {
      alert('خطأ في الإرسال — حاول مرة أخرى');
      btn.disabled = false;
      return;
    }
    showSuccess(res.id, 'survey');
  });
}

// ══════════════════════════════════════════════════════════════
// الخطوة 4B — الشكوى
// ══════════════════════════════════════════════════════════════
function goComplaint() { goStep('4c'); }

function toggleRecord() {
  if(!APP.mediaRecorder || APP.mediaRecorder.state === 'inactive')
    startRecording();
  else
    stopRecording();
}

function startRecording() {
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
    APP.audioBase64 = null;
    APP.recSeconds  = 0;
    var chunks = [];
    APP.mediaRecorder = new MediaRecorder(stream);
    APP.mediaRecorder.ondataavailable = function(e) {
      if(e.data.size > 0) chunks.push(e.data);
    };
    APP.mediaRecorder.onstop = function() {
      var blob = new Blob(chunks, {type:'audio/webm'});
      document.getElementById('audioPlayer').src = URL.createObjectURL(blob);
      document.getElementById('audioPlayer').style.display = 'block';
      var fr = new FileReader();
      fr.onloadend = function() { APP.audioBase64 = fr.result.split(',')[1]; };
      fr.readAsDataURL(blob);
      stream.getTracks().forEach(function(t){ t.stop(); });
    };
    APP.mediaRecorder.start();
    var btn = document.getElementById('micBtn');
    btn.textContent = '⏹ إيقاف التسجيل';
    btn.classList.add('recording');
    APP.recInterval = setInterval(function() {
      APP.recSeconds++;
      var m = String(Math.floor(APP.recSeconds / 60)).padStart(2, '0');
      var s = String(APP.recSeconds % 60).padStart(2, '0');
      document.getElementById('recTimer').textContent = m + ':' + s;
      if(APP.recSeconds >= APP.MAX_REC) stopRecording();
    }, 1000);
  }).catch(function() {
    alert('لم يُسمح بالميكروفون — استخدم رفع الملف الصوتي');
  });
}

function stopRecording() {
  if(APP.mediaRecorder && APP.mediaRecorder.state !== 'inactive') {
    APP.mediaRecorder.stop();
    clearInterval(APP.recInterval);
    var btn = document.getElementById('micBtn');
    btn.textContent = '✅ تم التسجيل';
    btn.classList.remove('recording');
    btn.style.background = '#28A745';
  }
}

function handleAudioFile(input) {
  if(!input.files || !input.files[0]) return;
  var file = input.files[0];
  if(file.size > 10 * 1024 * 1024) {
    alert('الملف أكبر من 10MB');
    return;
  }
  var fr = new FileReader();
  fr.onloadend = function() {
    APP.audioBase64 = fr.result.split(',')[1];
    document.getElementById('audioPlayer').src = fr.result;
    document.getElementById('audioPlayer').style.display = 'block';
    document.getElementById('audioFileLabel').textContent = '✅ ' + file.name;
  };
  fr.readAsDataURL(file);
}

function previewImages() {
  APP.imageFiles = Array.from(document.getElementById('imgInput').files);
  var c = document.getElementById('previewContainer');
  c.innerHTML = '';
  APP.imageFiles.forEach(function(f) {
    var img = document.createElement('img');
    img.src = URL.createObjectURL(f);
    c.appendChild(img);
  });
  document.getElementById('uploadLabel').textContent =
    APP.imageFiles.length + ' صورة مختارة';
}

// ══════════════════════════════════════════════════════════════
// إرسال الشكوى — API فقط عند الإرسال
// ══════════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════════
// إرسال الشكوى — مع ضغط الصور ✅
// ══════════════════════════════════════════════════════════════
async function submitComplaint() {
  var text = document.getElementById('complaintText').value.trim();
  if (!text && !APP.audioBase64) {
    alert('الرجاء كتابة الشكوى أو تسجيلها صوتياً');
    return;
  }

  var btn = document.getElementById('complaintBtn');
  btn.disabled = true;
  showLoading(true);

  // ضغط الصور قبل الإرسال
  var imgs = [];
  if (APP.imageFiles.length > 0) {
    document.querySelector('#loadingOverlay p').textContent = 'جارٍ ضغط الصور...';
    for (var f of APP.imageFiles) {
      var compressed = await compressImage(f);
      imgs.push(compressed.split(',')[1]);
    }
    document.querySelector('#loadingOverlay p').textContent = 'جارٍ الإرسال...';
  }

  callAPI('saveComplaint', {
    payload: {
      nationalId:   APP.nationalId,
      name:         APP.name,
      phone:        APP.phone,
      category:     APP.category,
      providerCode: APP.providerCode,
      providerName: APP.providerName,
      text:         text,
      audioBase64:  APP.audioBase64 || null,
      images:       imgs
    }
  }, function(err, res) {
    showLoading(false);
    if (err || !res || !res.success) {
      alert('خطأ في الإرسال — حاول مرة أخرى');
      btn.disabled = false;
      return;
    }
    showSuccess(res.id, 'complaint');
  });
}

  })).then(function(imgs) {
    callAPI('saveComplaint', {
      payload: {
        nationalId:   APP.nationalId,
        name:         APP.name,
        phone:        APP.phone,
        category:     APP.category,
        providerCode: APP.providerCode,
        providerName: APP.providerName,
        text:         text,
        audioBase64:  APP.audioBase64 || null,
        images:       imgs
      }
    }, function(err, res) {
      showLoading(false);
      if(err || !res || !res.success) {
        alert('خطأ في الإرسال — حاول مرة أخرى');
        btn.disabled = false;
        return;
      }
      showSuccess(res.id, 'complaint');
    });
  });
}

// ══════════════════════════════════════════════════════════════
// callAPI — للإرسال فقط
// ══════════════════════════════════════════════════════════════
function callAPI(action, params, cb) {
  var body = JSON.stringify(Object.assign({action: action}, params || {}));
  fetch(SCRIPT_URL, {
    method:  'POST',
    headers: {'Content-Type': 'text/plain'},
    body:    body
  })
  .then(function(r){ return r.json(); })
  .then(function(data){ cb(null, data); })
  .catch(function(err){ cb(err, null); });
}

// ══════════════════════════════════════════════════════════════
// شاشة النجاح
// ══════════════════════════════════════════════════════════════
function showSuccess(id, type) {
  document.getElementById('ticketId').textContent = id;
  if(type === 'complaint') {
    document.getElementById('successTitle').textContent = '✅ تم استقبال شكواك بنجاح!';
    document.getElementById('successMsg').innerHTML =
      'سنتواصل معك خلال <strong>48 ساعة</strong> على <strong>' + APP.phone + '</strong>';
  } else {
    document.getElementById('successTitle').textContent = '✅ شكراً على تقييمك!';
    document.getElementById('successMsg').textContent =
      'رأيك يساعدنا على تحسين الخدمة 🌟';
  }
  goStep('ok');
}

// ══════════════════════════════════════════════════════════════
// إعادة التشغيل
// ══════════════════════════════════════════════════════════════
function resetApp() {
  Object.assign(APP, {
    step:1, nationalId:'', name:'', phone:'',
    category:'', providerCode:'', providerName:'',
    surveyAnswers:{}, audioBase64:null, imageFiles:[]
  });
  ['nationalId','name','phone','complaintText'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.value = '';
  });
  document.getElementById('audioPlayer').style.display  = 'none';
  document.getElementById('previewContainer').innerHTML = '';
  document.getElementById('uploadLabel').textContent    = 'اضغط لاختيار صور';
  document.getElementById('audioFileLabel') &&
    (document.getElementById('audioFileLabel').textContent = 'اضغط لاختيار ملف صوتي');
  document.getElementById('recTimer').textContent = '00:00';
  var mic = document.getElementById('micBtn');
  mic.textContent      = '🎙️ ابدأ التسجيل';
  mic.style.background = '';
  mic.classList.remove('recording');
  goStep(1);
}

function showLoading(show) {
  document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none';
}
// ضغط الصور قبل الإرسال
async function compressImage(file) {
  return new Promise((resolve) => {
    // لو مش صورة، ارجعها كما هي
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const MAX_WIDTH = 900;
      const MAX_HEIGHT = 900;
      let w = img.width;
      let h = img.height;

      // تصغير الأبعاد لو كبيرة
      if (w > MAX_WIDTH || h > MAX_HEIGHT) {
        if (w > h) {
          h = Math.round(h * MAX_WIDTH / w);
          w = MAX_WIDTH;
        } else {
          w = Math.round(w * MAX_HEIGHT / h);
          h = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      URL.revokeObjectURL(url); // تحرير الذاكرة

      // جودة 70% — توازن بين الحجم والوضوح
      const compressed = canvas.toDataURL('image/jpeg', 0.7);
      resolve(compressed);
    };

    img.onerror = () => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.readAsDataURL(file);
    };

    img.src = url;
  });
}

