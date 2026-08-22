/* BRANDIRASCK Catalog backend
   Keep this file on a PRIVATE GitHub repository. Secrets belong in Vercel Environment Variables. */
const SERVICES = {
  "Social Media": [
    {
      "id": "ig",
      "title": "Social Media — اختر المنصة والباقـة",
      "desc": "اختار المنصة، اكتب Username الحساب، وبعد ذلك اختر الخطة المناسبة.",
      "type": "options",
      "opts": [
        [
          "b1",
          "خطة الحضور الرقمي الأساسي",
          800,
          "+10K Views · +600 Likes · +30 Comments · +100 Saves · +50 Reposts · 2 Story Shares · 200 Message Shares"
        ],
        [
          "b2",
          "خطة النمو والترويج",
          1400,
          "+35K Views · +1K Likes · +50 Comments · +400 Saves · +310 Reposts · 4 Story Shares · 200 Message Shares"
        ],
        [
          "b3",
          "خطة الانتشار",
          2100,
          "+90K Views · +12K Likes · +250 Comments · +1,400 Saves · +910 Reposts · 12 Story Shares · 2,200 Message Shares"
        ],
        [
          "b4",
          "خطة الإشهار المتكامل",
          3600,
          "+210K Views · +23K Likes · +850 Comments · +4,400 Saves · +2,010 Reposts · 30 Story Shares · 10K Message Shares"
        ]
      ]
    }
  ],
  "هدف الاشتراك": [
    {
      "id": "goals",
      "title": "هدف الاشتراك",
      "desc": "اختر الهدف الرئيسي التي باغي تحققو خلال مدة الاشتراك.",
      "type": "goals"
    }
  ],
  "تصوير Photo / Video": [
    {
      "id": "shoot",
      "title": "حصص التصوير",
      "desc": "اختر عدد حصص التصوير المناسبة لك خلال مدة الاشتراك.",
      "type": "shoot"
    }
  ],
  "المونتاج": [
    {
      "id": "montage",
      "title": "المونتاج",
      "desc": "نعمل معك Montage الصور والفيديوهات التي ترسل لينا أو التي تلتقط فحصص التصوير، ونجهزها للنشر بطريقة احترافية.",
      "type": "options",
      "opts": [
        [
          "photo",
          "Montage Photo — شهر كامل",
          320,
          "خلال مدة الاشتراك الخاص بك، نجهز لك الصور بطريقة احترافية ومناسبة للنشر، سواء صورتي فحصة التصوير أو صورتي راسك وصيفطتي لينا الصور."
        ],
        [
          "video",
          "Montage Video / Reel — شهر كامل",
          450,
          "خلال مدة الاشتراك الخاص بك، نجهز لك الفيديوهات والـReels بطريقة احترافية ومناسبة للنشر، سواء تصورت فحصة التصوير أو صورتي راسك وصيفطتي لينا الفيديوهات."
        ],
        [
          "both",
          "Montage Photo + Video — شهر كامل",
          590,
          "خلال مدة الاشتراك الخاص بك، نجهز لك الصور والفيديوهات / Reels باحترافية، سواء خديتي حصة تصوير أو صورتي راسك وصيفطتي لينا المحتوى."
        ]
      ]
    }
  ],
  "Followers": [
    {
      "id": "followers",
      "title": "متابعين عالميين",
      "desc": "اختار النوع والكمية من 10K حتى 10M.",
      "type": "followers"
    }
  ],
  "Admin": [
    {
      "id": "admin",
      "title": "Admin للحساب",
      "desc": "إدارة وتنظيم الحساب والسهر على جمالية وترتيب الواجهة أمام الزوار.",
      "type": "options",
      "opts": [
        [
          "admin",
          "تفعيل Admin",
          300,
          "إدارة وتنظيم الحساب + السهر على جمالية وترتيب الواجهة أمام الزوار"
        ]
      ]
    }
  ],
  "Collab مع مشاهير Social Media": [
    {
      "id": "p1",
      "title": "Pack 1 — 2 Stories",
      "desc": "2 Stories يتكلم فيها المشهور على المنتج أو الخدمة.",
      "type": "stars",
      "prices": [
        400,
        500,
        600,
        700,
        800
      ]
    },
    {
      "id": "p2",
      "title": "Pack 2 — Reel + 4 Stories",
      "desc": "4 Stories + Reel يبقى في حساب المشهور لمدة شهر. ما كاينش Collaboration، وما لديكش الحق تستعمل الـReel فالإعلانات.",
      "type": "stars",
      "prices": [
        600,
        800,
        1000,
        1100,
        1200
      ]
    },
    {
      "id": "p3",
      "title": "Pack 3 — Reel + Collaboration + 4 Stories",
      "desc": "4 Stories + Reel كيبقى في حساب المشهور وحسابك لمدة شهرين. فيه Collaboration، وتقدر تستعمل الـReel فالإعلانات لمدة شهرين.",
      "type": "stars",
      "prices": [
        1500,
        1900,
        2300,
        3000,
        3400
      ]
    }
  ],
  "الإعلانات الممولة": [
    {
      "id": "ads",
      "title": "إدارة الحملات الإعلانية — شهر كامل",
      "desc": "نتكفل بالحملات الإعلانية الخاص بك كاملة: إعداد الحملة، الاستهداف، التسيير والمتابعة والتحسين. تقوم فقط بتأكيد الطلبات الخاصة بك.",
      "type": "options",
      "opts": [
        [
          "ads",
          "إدارة الحملات الإعلانية — شهر كامل",
          550,
          "550 DH مصاريف الخدمة. ميزانية الإعلانات نفسها كتكون علك، وكتحددها حسب الـbudget والنتائج التي باغي توصل ليها."
        ]
      ]
    }
  ],
  "الحضور الرقمي": [
    {
      "id": "digital",
      "title": "الحضور الرقمي — مجاناً للزبناء الجدد",
      "desc": "صفحة ويب مصغرة + Google Maps + الأساسيات لكي يلقاوك الناس بسهولة. العرض مجاني للزبناء الجدد.",
      "type": "digitalfree"
    }
  ]
}
;

const PRICING = {
  shoot: {1:1300,2:2700,3:3200,4:3400},
  shootText: {
    1:'1,100 DH ثمن الحصة + 200 DH مصاريف يوم المصور = 1,300 DH',
    2:'1,300 DH للحصة الأولى + 500 DH للحصة الثانية + 200 DH مصاريف يوم المصور للحصة الثانية = 2,700 DH',
    3:'2,700 DH للحصتين + 300 DH للحصة الثالثة + 200 DH مصاريف يوم المصور = 3,200 DH',
    4:'3,200 DH لثلاث حصص + الحصة الرابعة مجاناً (0 DH) + 200 DH مصاريف يوم المصور = 3,400 DH'
  },
  followers: {stable:260,refill:150,global:60}
};

const DEFAULT_CAMPAIGN = {
  epochMs: Date.parse('2026-08-21T22:50:00Z'),
  cycle:[{on:true,h:18},{on:true,h:3},{on:false,h:6},{on:true,h:10},{on:false,h:4},{on:true,h:2},{on:false,h:3}]
};

function json(res,status,data){res.status(status).setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(JSON.stringify(data));}
function envJson(name,fallback){try{return process.env[name]?JSON.parse(process.env[name]):fallback}catch{return fallback}}
function campaign(){const c=envJson('BRANDIRASCK_CAMPAIGN_JSON',null);if(!c)throw new Error('BRANDIRASCK_CAMPAIGN_JSON is not configured');return {epochMs:Number(c.epochMs),cycle:Array.isArray(c.cycle)?c.cycle:[]}}
function promos(){const p=envJson('BRANDIRASCK_PROMO_CODES_JSON',null);if(!p)return {};return p}
function campaignState(now){const c=campaign(),cycle=c.cycle,total=cycle.reduce((a,x)=>a+Number(x.h||0),0)*3600000;if(!total)return {on:false,left:0};let elapsed=((now-c.epochMs)%total+total)%total,acc=0;for(const x of cycle){const ms=Number(x.h||0)*3600000;if(elapsed<acc+ms)return {on:!!x.on,left:acc+ms-elapsed};acc+=ms}return {on:false,left:0}}
function validPromo(code,now){const p=promos()[String(code||'').trim().toUpperCase()];if(!p)return null;const exp=Date.parse(p.expiresAt||'');if(!Number.isFinite(exp)||now>=exp)return null;const rate=Math.max(0,Math.min(70,Number(p.rate)||0));return {code:String(code).trim().toUpperCase(),rate,expiresAt:p.expiresAt}}
function baseTotal(s){let total=0;s=s||{};
  const ig=s.ig?SERVICES['Social Media']?.[0]?.opts?.find(x=>x[0]===s.ig):null;if(ig)total+=Number(ig[2])||0;
  const ad=s.admin?SERVICES.Admin?.[0]?.opts?.find(x=>x[0]===s.admin):null;if(ad)total+=Number(ad[2])||0;
  const ads=s.ads?SERVICES['الإعلانات الممولة']?.[0]?.opts?.find(x=>x[0]===s.ads):null;if(ads)total+=Number(ads[2])||0;
  if(s.shoot)total+=Number(PRICING.shoot[s.shoot])||0;
  const mo=s.montage?SERVICES['المونتاج']?.[0]?.opts?.find(x=>x[0]===s.montage):null;if(mo)total+=Number(mo[2])||0;
  if(s.followers?.type)total+=(Number(s.followers.qty)||0)/10000*(Number(PRICING.followers[s.followers.type])||0);
  for(const k of ['p1','p2','p3'])if(s[k]){const pack=SERVICES['Collab مع مشاهير Social Media']?.find(x=>x.id===k);const stars=Math.max(1,Math.min(5,Number(s[k].stars)||1));if(pack?.prices)total+=Number(pack.prices[stars-1])||0}
  return Math.round(total*100)/100;
}

module.exports = async function(req,res){
  const now=Date.now();
  if(req.method==='GET'){
    return json(res,200,{services:SERVICES,pricing:PRICING,campaign:campaign(),serverNow:now,business:{phone:process.env.BRANDIRASCK_PHONE||'',email:process.env.BRANDIRASCK_EMAIL||'brandirasck@gmail.com'}});
  }
  let body={};try{body=typeof req.body==='object'&&req.body?req.body:JSON.parse(req.body||'{}')}catch{return json(res,400,{error:'Invalid JSON'})}
  const action=new URL(req.url,'http://localhost').searchParams.get('action');
  if(action==='promo'){const p=validPromo(body.code,now);return json(res,200,p?{valid:true,...p}:{valid:false})}
  if(action==='quote'){
    const s=body.selection||{}, base=baseTotal(s), original=Math.round(base/0.75*100)/100, cs=campaignState(now), after25=cs.on?base:original;
    const p=validPromo(body.promoCode,now);const extra=p?Math.round(after25*p.rate/100*100)/100:0;const final=Math.max(0,Math.round((after25-extra)*100)/100);
    return json(res,200,{base,original,after25,extra,final,saved:Math.round((original-final)*100)/100,campaignOn:cs.on,promoCode:p?.code||'',promoRate:p?.rate||0,serverNow:now});
  }
  return json(res,404,{error:'Not found'});
};
