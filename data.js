var STATIC_DATA = {
  categories: [
    'وحدة صحية',
    'مستشفى رعاية',
    'مستشفى متعاقد',
    'معمل متعاقد'
  ],
  providers: {
    'وحدة صحية': [
      {name:'وحدة طب أسرة الشغب',code:'UNIT001',location:'إسنا'},
      {name:'وحدة طب أسرة الحليلة',code:'UNIT002',location:'إسنا'},
      {name:'وحدة طب أسرة الغريرة',code:'UNIT003',location:'إسنا'},
      {name:'وحدة طب أسرة الزنيقة',code:'UNIT004',location:'إسنا'},
      {name:'وحدة طب أسرة توماس 2',code:'UNIT005',location:'إسنا'},
      {name:'وحدة طب أسرة الحلة',code:'UNIT006',location:'إسنا'},
      {name:'وحدة طب أسرة أحمد سعيد',code:'UNIT007',location:'إسنا'},
      {name:'وحدة طب أسرة الدبابية',code:'UNIT008',location:'إسنا'},
      {name:'وحدة طب أسرة الهنادي',code:'UNIT009',location:'إسنا'},
      {name:'مركز طب أسرة إسنا',code:'UNIT010',location:'إسنا'},
      {name:'وحدة طب أسرة النمسا',code:'UNIT011',location:'إسنا'},
      {name:'وحدة طب أسرة القرايا',code:'UNIT012',location:'إسنا'},
      {name:'وحدة طب أسرة القرية',code:'UNIT013',location:'إسنا'},
      {name:'وحدة طب أسرة زرنيخ',code:'UNIT014',location:'إسنا'},
      {name:'مركز طب أسرة أصفون',code:'UNIT015',location:'إسنا'},
      {name:'وحدة طب أسرة الدقيرة',code:'UNIT016',location:'إسنا'},
      {name:'وحدة طب أسرة النجوع بحري',code:'UNIT017',location:'إسنا'},
      {name:'مركز طب أسرة الدير',code:'UNIT018',location:'إسنا'},
      {name:'وحدة طب أسرة العضايمة',code:'UNIT019',location:'إسنا'},
      {name:'إسنا الرئيسي',code:'UNIT020',location:'إسنا'},
      {name:'وحدة طب أسرة حاجر المحاميد قبلي',code:'UNIT021',location:'أرمنت'},
      {name:'وحدة طب أسرة الرزيقات بحري',code:'UNIT022',location:'أرمنت'},
      {name:'مركز طب أسرة أرمنت الحيط',code:'UNIT023',location:'أرمنت'},
      {name:'وحدة طب أسرة الرزيقات قبلي',code:'UNIT024',location:'أرمنت'},
      {name:'وحدة طب أسرة أبو دغار',code:'UNIT025',location:'أرمنت'},
      {name:'وحدة طب أسرة حاجر الرزيقات بحري',code:'UNIT026',location:'أرمنت'},
      {name:'وحدة طب أسرة جزيرة أرمنت الحيط',code:'UNIT027',location:'أرمنت'},
      {name:'وحدة طب أسرة أرمنت الوابورات',code:'UNIT028',location:'أرمنت'},
      {name:'وحدة طب أسرة الرياينة',code:'UNIT029',location:'أرمنت'},
      {name:'مركز طب أسرة الشهيد د. محمد بغدادي',code:'UNIT030',location:'أرمنت'},
      {name:'وحدة طب أسرة المريس',code:'UNIT031',location:'أرمنت'},
      {name:'أرمنت الرئيسي',code:'UNIT032',location:'أرمنت'},
      {name:'مركز طب أسرة الطود',code:'UNIT033',location:'أرمنت - شرق'},
      {name:'وحدة طب أسرة منشية النوبة',code:'UNIT034',location:'أرمنت - شرق'},
      {name:'وحدة طب أسرة الضمان',code:'UNIT035',location:'أرمنت - شرق'},
      {name:'وحدة طب أسرة العديسات قبلي',code:'UNIT036',location:'أرمنت - شرق'},
      {name:'وحدة طب أسرة البعيرات',code:'UNIT037',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة القبلي قمولا',code:'UNIT038',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة آل عثمان',code:'UNIT039',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة نجع البركة',code:'UNIT040',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة الزمامي',code:'UNIT041',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة الأقالتة',code:'UNIT042',location:'الأقصر - غرب'},
      {name:'مركز طب أسرة الشهيد محمود ناصر',code:'UNIT043',location:'الأقصر - غرب'},
      {name:'وحدة طب أسرة القباحي الغربي',code:'UNIT044',location:'الأقصر'},
      {name:'مركز طب أسرة الأقصر',code:'UNIT045',location:'الأقصر'},
      {name:'وحدة طب أسرة نجع الخطباء',code:'UNIT046',location:'الأقصر'},
      {name:'مركز طب منشأة العماري',code:'UNIT047',location:'الأقصر'},
      {name:'وحدة طب أسرة الشيخ موسى',code:'UNIT048',location:'الأقصر'},
      {name:'مركز طب أسرة الكرنك الجديد',code:'UNIT049',location:'الأقصر'},
      {name:'وحدة طب أسرة الدولي',code:'UNIT050',location:'الأقصر'},
      {name:'مركز طب أسرة الزناقطة',code:'UNIT051',location:'الأقصر'},
      {name:'مركز طب أسرة العوامية',code:'UNIT052',location:'الأقصر'},
      {name:'وحدة طب أسرة البغدادي',code:'UNIT053',location:'الأقصر'},
      {name:'وحدة طب أسرة الحبيل',code:'UNIT054',location:'الأقصر'},
      {name:'وحدة طب أسرة طيبة',code:'UNIT055',location:'الأقصر'},
      {name:'وحدة طب أسرة أبو طربوش',code:'UNIT056',location:'الأقصر'}
    ],
    'مستشفى رعاية': [
      {name:'مستشفى طيبة التخصصي',code:'CARE001',location:'إسنا'},
      {name:'مستشفى حورس التخصصي',code:'CARE002',location:'أرمنت'},
      {name:'مستشفى العديسات التخصصي',code:'CARE003',location:'أرمنت - شرق'},
      {name:'مستشفى الكرنك الدولي',code:'CARE004',location:'الأقصر'},
      {name:'مستشفى الأقصر الدولي',code:'CARE005',location:'الأقصر'},
      {name:'مستشفى إيزيس التخصصي',code:'CARE006',location:'الأقصر'},
      {name:'مستشفى شفاء الأورمان',code:'CARE007',location:'الأقصر'}
    ],
    'مستشفى متعاقد': [
      {name:'مستشفى كليوباترا - الأقصر',code:'CONT001',location:'الأقصر'},
      {name:'مستشفى الندى - الأقصر',code:'CONT002',location:'الأقصر'}
    ],
    'معمل متعاقد': [
      {name:'معمل البرج - فرع الأقصر',code:'LAB001',location:'الأقصر'},
      {name:'معمل المختبر - فرع الأقصر',code:'LAB002',location:'الأقصر'}
    ]
  },
  questions: {
    shared: [
      {code:'Q_COM_01',type:'rating',text:'ما مدى رضاك العام عن الخدمة المقدمة؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_COM_02',type:'yesno',text:'هل لديك معرفة بمبادرة من حقك أن تختار؟',required:true,options:['نعم','لا']},
      {code:'Q_COM_03',type:'yesno',text:'هل طلب منك دفع مبلغ مالي؟',required:true,options:['نعم','لا']},
      {code:'Q_COM_03B',type:'multiple',text:'إن كانت نعم - طبيعة المبلغ؟',required:false,options:['مساهمة مالية طبقاً للقانون','مقابل تقديم خدمة','بدون سبب واضح'],dependOn:'Q_COM_03',dependVal:'نعم'},
      {code:'Q_COM_04',type:'rating',text:'كيف تقيم معاملة الطاقم الطبي والإداري؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_COM_05',type:'rating',text:'كيف تقيم نظافة المكان؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_COM_99',type:'text',text:'ملاحظات أو اقتراحات إضافية',required:false,options:[]}
    ],
    'وحدة صحية': [
      {code:'Q_UNIT_01',type:'rating',text:'كيف تقيم سرعة الاستجابة وتقديم الخدمة؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_UNIT_02',type:'yesno',text:'هل تم توجيهك بشكل صحيح عند الوصول للوحدة؟',required:true,options:['نعم','لا']},
      {code:'Q_UNIT_03',type:'rating',text:'كيف تقيم توافر الأدوية والتجهيزات؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_UNIT_04',type:'yesno',text:'هل تم إعلامك بحقوقك كمنتفع من التأمين الصحي الشامل؟',required:true,options:['نعم','لا']}
    ],
    'مستشفى رعاية': [
      {code:'Q_CARE_01',type:'rating',text:'كيف تقيم وقت الانتظار قبل تلقي الخدمة؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_CARE_02',type:'rating',text:'كيف تقيم جودة الرعاية الطبية المقدمة؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_CARE_03',type:'yesno',text:'هل وجدت التخصص المطلوب متاحاً؟',required:true,options:['نعم','لا']},
      {code:'Q_CARE_04',type:'rating',text:'كيف تقيم توافر الأجهزة والتجهيزات الطبية؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_CARE_05',type:'yesno',text:'هل تم شرح خطة العلاج بوضوح؟',required:true,options:['نعم','لا']}
    ],
    'مستشفى متعاقد': [
      {code:'Q_CONT_01',type:'rating',text:'كيف تقيم سهولة الوصول والتسجيل في المستشفى؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_CONT_02',type:'rating',text:'كيف تقيم جودة الخدمة مقارنة بالمستشفيات الحكومية؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_CONT_03',type:'yesno',text:'هل تم قبولك بدون أي تعقيدات إضافية؟',required:true,options:['نعم','لا']},
      {code:'Q_CONT_04',type:'yesno',text:'هل أُعلمت بحقك في الاختيار بين المستشفيات؟',required:true,options:['نعم','لا']}
    ],
    'معمل متعاقد': [
      {code:'Q_LAB_01',type:'rating',text:'كيف تقيم سرعة إنجاز نتائج التحاليل؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_LAB_02',type:'rating',text:'كيف تقيم طريقة استلام النتائج؟',required:true,options:['ضعيف جداً','ضعيف','مقبول','جيد','جيد جداً']},
      {code:'Q_LAB_03',type:'yesno',text:'هل كانت النتائج واضحة ومشروحة؟',required:true,options:['نعم','لا']},
      {code:'Q_LAB_04',type:'yesno',text:'هل تم التعامل معك باحترافية أثناء أخذ العينة؟',required:true,options:['نعم','لا']}
    ]
  }
};