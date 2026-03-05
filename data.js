// ── جلب البيانات محلياً بدون طلب API ─────────────────────

window.addEventListener('load', function() {
  document.getElementById('branchName').textContent = BRANCH_NAME;
  // فوري — بدون انتظار
  renderCategories(STATIC_DATA.categories);
});

function selectCat(cat, el) {
  document.querySelectorAll('.cat-card').forEach(function(c){
    c.classList.remove('selected');
  });
  el.classList.add('selected');
  APP.category = cat;
  document.getElementById('actionBtns').style.display = 'none';
  // فوري — بدون انتظار
  renderProviders(STATIC_DATA.providers[cat] || []);
  goStep(3);
}

function goSurvey() {
  goStep('4s');
  // فوري — بدون انتظار
  var questions = (STATIC_DATA.questions.shared || [])
    .concat(STATIC_DATA.questions[APP.category] || []);
  renderSurvey(questions);
}

// ── callAPI للإرسال فقط ───────────────────────────────────
function callAPI(action, params, cb) {
  var body = JSON.stringify(Object.assign({action: action}, params || {}));
  fetch(SCRIPT_URL, {
    method: 'POST',
    headers: {'Content-Type': 'text/plain'},
    body: body
  })
  .then(function(r){ return r.json(); })
  .then(function(data){ cb(null, data); })
  .catch(function(err){ cb(err, null); });
}
