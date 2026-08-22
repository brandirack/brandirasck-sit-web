const CYCLE = [
  { on: true, h: 18 },
  { on: true, h: 3 },
  { on: false, h: 6 },
  { on: true, h: 10 },
  { on: false, h: 4 },
  { on: true, h: 2 },
  { on: false, h: 3 }
];
const CYCLE_MS = CYCLE.reduce((a, x) => a + x.h, 0) * 3600000;
const EPOCH = Date.parse('2026-08-21T22:50:00Z');

const INDUSTRIES = [
  'مطاعم ومقاهي','فنادق','مأكولات ومنتجات راقية','أزياء وملابس','إكسسوارات وبيع بالتقسيط','تجارة وبيع بالجملة','تجارة إلكترونية','متاجر ومحلات','أسواق ومراكز تجارية','عقار','سيارات','دراجات','قطع غيار السيارات','نقل ولوجستيك','سياحة وأسفار','وكالات أسفار','صحة وجمال','أطباء','عيادات ومصحات','صيدليات','أطباء الأسنان','أطباء بيطريون','ممرضون','مختبرات وتحاليل','مراكز التجميل','مراكز العناية','نوادٍ رياضية','رياضيون','مدربون شخصيون','يوغا ورياضات','فنانين','مغنيين','موسيقيين','مصورون','صناع محتوى','مؤثرون','إنتاج فني','سينما وإنتاج سمعي بصري','كتب ونشر','مدارس وتكوين','جامعات وتعليم','دروس خصوصية','تكنولوجيا وبرمجيات','تطبيقات ومنصات رقمية','وكالات رقمية','شركات وخدمات','استشارات وأعمال','محاسبة ومالية','بنوك وخدمات مالية','تأمين','محامون','موثقون','مهندسون','هندسة معمارية','بناء وأشغال','صناعة','فلاحة','منتجات فلاحية','حرفيون وصناع تقليديون','أثاث وديكور','تصميم داخلي','زهور وهدايا','أعراس ومناسبات','تصوير مناسبات','ألعاب وترفيه','أطفال وألعاب','حيوانات أليفة','منظمات وجمعيات','علامات تجارية','خدمات منزلية','تنظيف وصيانة','كهرباء وسباكة','Other'
];

const SERVICES = {
  social: {
    id:'ig', key:'Social Media', title:'Social Media', desc:'اختار المنصة، اكتب Username الحساب، وبعد ذلك اختار خطة النمو والترويج.',
    type:'options', options:[
      ['b1','خطة الحضور الرقمي الأساسي',800,'+10K Views · +600 Likes · +30 Comments · +100 Saves · +50 Reposts · 2 Story Shares · 200 Message Shares'],
      ['b2','خطة النمو والترويج',1400,'+35K Views · +1K Likes · +50 Comments · +400 Saves · +310 Reposts · 4 Story Shares · 200 Message Shares'],
      ['b3','خطة الانتشار',2100,'+90K Views · +12K Likes · +250 Comments · +1,400 Saves · +910 Reposts · 12 Story Shares · 2,200 Message Shares'],
      ['b4','خطة الإشهار المتكامل',3600,'+210K Views · +23K Likes · +850 Comments · +4,400 Saves · 30 Story Shares · 10K Message Shares']
    ]
  },
  goals:{id:'goals',key:'هدف الاشتراك',title:'هدف الاشتراك',desc:'اختر الهدف الرئيسي الذي باغي تحققو خلال مدة الاشتراك.',type:'goals'},
  shoot:{id:'shoot',key:'تصوير Photo / Video',title:'حصص التصوير',desc:'اختر عدد حصص التصوير المناسبة لك خلال مدة الاشتراك.',type:'shoot',prices:{1:1300,2:2700,3:3200,4:3400}},
  montage:{id:'montage',key:'المونتاج',title:'المونتاج',desc:'نوفر لك Montage للصور والفيديوهات طوال مدة الاشتراك.',type:'options',options:[
    ['photo','Montage Photo — شهر كامل',320,'نجهز لك الصور بطريقة احترافية ومناسبة للنشر.'],
    ['video','Montage Video / Reel — شهر كامل',450,'نجهز لك الفيديوهات والـReels بطريقة احترافية ومناسبة للنشر.'],
    ['both','Montage Photo + Video — شهر كامل',590,'نجهز لك الصور والفيديوهات / Reels باحترافية.']
  ]},
  followers:{id:'followers',key:'Followers',title:'متابعين عالميين',desc:'اختار النوع والكمية من 10K حتى 10M.',type:'followers',types:[
    ['stable','متابعين عالميين مستقرين','90% استقرار + ضمان 365 يوم',260],
    ['refill','متابعين عالميين مع إعادة الشحن','إعادة الشحن عند الحاجة وفق الشروط',150],
    ['drop','متابعين عالميين مع سقوط متكرر بدون ضمان','بدون ضمان',60]
  ]},
  admin:{id:'admin',key:'Admin',title:'Admin للحساب',desc:'إدارة وتنظيم الحساب والسهر على جمالية وترتيب الواجهة أمام الزوار.',type:'options',options:[['admin','تفعيل Admin',300,'إدارة وتنظيم الحساب + السهر على جمالية وترتيب الواجهة أمام الزوار']]},
  collab:{id:'collab',key:'Collab مع مشاهير Social Media',title:'Collab مع مشاهير Social Media',desc:'اختار Pack المناسب حسب حجم حساب المشهور.',type:'stars',packs:[
    {id:'p1',name:'Pack 1 — 2 Stories',desc:'2 Stories يتكلم فيها المشهور على المنتج أو الخدمة.',prices:[400,500,600,700,800]},
    {id:'p2',name:'Pack 2 — Reel + 4 Stories',desc:'4 Stories + Reel يبقى في حساب المشهور لمدة شهر.',prices:[600,800,1000,1100,1200]},
    {id:'p3',name:'Pack 3 — Reel + Collaboration + 4 Stories',desc:'4 Stories + Reel لمدة شهرين، مع Collaboration وإمكانية استعمال الـReel في الإعلانات لمدة شهرين.',prices:[1500,1900,2300,3000,3400]}
  ]},
  ads:{id:'ads',key:'الإعلانات الممولة',title:'إدارة الحملات الإعلانية — شهر كامل',desc:'نتكفل بالحملات الإعلانية كاملة: إعداد الحملة، الاستهداف، التسيير والمتابعة والتحسين.',type:'options',options:[['ads','إدارة الحملات الإعلانية — شهر كامل',550,'ميزانية الإعلانات نفسها كتكون على حساب العميل.']]},
  digital:{id:'digital',key:'الحضور الرقمي',title:'الحضور الرقمي — مجاناً للزبناء الجدد',desc:'صفحة ويب مصغرة + Google Maps + الأساسيات لكي يلقاوك الناس بسهولة.',type:'digitalfree'}
};

const TAB_ORDER = ['social','followers','goals','shoot','montage','admin','collab','ads','digital'];
const PROMOS = {
  BRANDI11RASK:{discount:5,start:'2026-08-01',end:'2026-12-31'},
  BRANDI10PRO:{discount:10,start:'2026-08-01',end:'2026-12-31'},
  BRANDI15PRO:{discount:15,start:'2026-08-01',end:'2026-12-31'},
  BRANDI20PRO:{discount:20,start:'2026-08-01',end:'2026-12-31'},
  BRANDI25PRO:{discount:25,start:'2026-08-01',end:'2026-12-31'},
  BRANDI30PRO:{discount:30,start:'2026-08-01',end:'2026-12-31'},
  BRANDI35PRO:{discount:35,start:'2026-08-01',end:'2026-12-31'},
  BRANDI40PRO:{discount:40,start:'2026-08-01',end:'2026-12-31'},
  BRANDI45PRO:{discount:45,start:'2026-08-01',end:'2026-12-31'},
  BRANDI50PRO:{discount:50,start:'2026-08-01',end:'2026-12-31'},
  BRANDI55PRO:{discount:55,start:'2026-08-01',end:'2026-12-31'},
  BRANDI60PRO:{discount:60,start:'2026-08-01',end:'2026-12-31'},
  BRANDI65PRO:{discount:65,start:'2026-08-01',end:'2026-12-31'},
  BRANDI70PRO:{discount:70,start:'2026-08-01',end:'2026-12-31'}
};

function serverNow(){ return new Date(); }
function isoDate(d){ return d.toISOString().slice(0,10); }
function cycleState(now){
  const elapsed=((now.getTime()-EPOCH)%CYCLE_MS+CYCLE_MS)%CYCLE_MS;
  let acc=0;
  for(const part of CYCLE){
    const ms=part.h*3600000;
    if(elapsed<acc+ms) return {on:part.on,leftMs:acc+ms-elapsed};
    acc+=ms;
  }
  return {on:false,leftMs:0};
}
function validPromo(code, now){
  const p=PROMOS[String(code||'').trim().toUpperCase()];
  if(!p) return null;
  const day=isoDate(now);
  if(day<p.start || day>p.end) return null;
  return {code:String(code).trim().toUpperCase(),discount:p.discount};
}
function findOption(group,id){ return (group.options||[]).find(x=>x[0]===id); }
function rawTotal(sel){
  sel=sel||{}; let total=0;
  if(sel.ig){ const o=findOption(SERVICES.social,sel.ig); if(o) total+=o[2]; }
  if(sel.montage){ const o=findOption(SERVICES.montage,sel.montage); if(o) total+=o[2]; }
  if(sel.admin){ const o=findOption(SERVICES.admin,sel.admin); if(o) total+=o[2]; }
  if(sel.ads){ const o=findOption(SERVICES.ads,sel.ads); if(o) total+=o[2]; }
  if(sel.shoot){ total+=SERVICES.shoot.prices[Number(sel.shoot)]||0; }
  if(sel.followers && sel.followers.type){
    const t=SERVICES.followers.types.find(x=>x[0]===sel.followers.type);
    const qty=Math.min(10000000,Math.max(10000,Number(sel.followers.qty)||10000));
    if(t) total+=(qty/10000)*t[3];
  }
  for(const k of ['p1','p2','p3']){
    if(sel[k] && Number.isInteger(Number(sel[k].stars))){
      const pack=SERVICES.collab.packs.find(x=>x.id===k);
      if(pack) total+=pack.prices[Number(sel[k].stars)-1]||0;
    }
  }
  return total;
}
function calculate(sel, promoCode, now){
  const base25=rawTotal(sel);
  const original=base25/0.75;
  const campaign=cycleState(now);
  const promo=validPromo(promoCode,now);
  const totalDiscount=campaign.on ? Math.min(95,25+(promo?promo.discount:0)) : 0;
  const final=original*(1-totalDiscount/100);
  return {
    base25, original, final, saved:original-final,
    campaignOn:campaign.on, totalDiscount,
    promo:promo?{code:promo.code,discount:promo.discount}:null,
    serverDate:isoDate(now), serverNow:now.toISOString(),
    countdownMs:campaign.leftMs
  };
}
function publicCatalog(now){
  return {
    serverDate:isoDate(now), serverNow:now.toISOString(),
    countdownMs:cycleState(now).leftMs,
    promo25Active:cycleState(now).on,
    industries:INDUSTRIES,
    tabs:TAB_ORDER,
    services:SERVICES
  };
}

module.exports=(req,res)=>{
  res.setHeader('Cache-Control','no-store, max-age=0');
  const now=serverNow();
  if(req.method==='GET') return res.status(200).json(publicCatalog(now));
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  let body=req.body||{};
  if(typeof body==='string'){ try{body=JSON.parse(body)}catch{body={}} }
  const action=body.action;
  if(action==='promo'){
    const p=validPromo(body.code,now);
    return res.status(200).json(p?{valid:true,discount:p.discount,code:p.code,serverDate:isoDate(now)}:{valid:false,serverDate:isoDate(now)});
  }
  if(action==='calculate') return res.status(200).json(calculate(body.selection||{},body.promoCode,now));
  if(action==='finalize'){
    const result=calculate(body.selection||{},body.promoCode,now);
    return res.status(200).json({ok:rawTotal(body.selection||{})>0,result});
  }
  return res.status(400).json({error:'Unknown action'});
};
