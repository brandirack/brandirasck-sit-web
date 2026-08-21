# تعليمات الإصلاح — BRANDIRASCK

هاد الملفات كايزيدو الاتصال ب MongoDB بلا ما تبدل والو من الديزاين ديال الموقع.

## 1) زيد ملفين API فمشروعك على GitHub

من فولدر `api/` اللي كاين ف repo ديالك، زيد الملفين هاذو (نفس الأسماء):
- `api/register.js`
- `api/login.js`

(راهم فهاد الطية اللي صيفطت ليك)

## 2) بدل `package.json` ديالك — زيد هاد الأسطر ف dependencies

```json
"dependencies": {
  "mongodb": "^6.5.0",
  "bcryptjs": "^2.4.3"
}
```

## 3) دير Environment Variable ف Vercel

1. دخل لـ Vercel > brandirasck-sit-web > Settings > Environment Variables
2. زيد variable جديد:
   - Name: `MONGODB_URI`
   - Value: connection string ديال Atlas (من MongoDB Atlas > Connect > Drivers، بحال:
     `mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/`)
3. Save، وبعد Redeploy المشروع

## 4) بدل غير هادشي ف index.html (الباقي كلو ميبقاش يتبدل)

### أ) دالة BRsend — بدلها بهاذي:

بحيث كل شي آخر يبقى نفسو، غير هاد الدالة `function BRsend(){...}` بدلها بـ:

```javascript
async function BRsend(){
  const btn=document.getElementById("configNext");
  if(btn){btn.disabled=true;btn.textContent=(BRgetPrefs().lang==='ar'?"كنسجلو...":"Saving...")}
  try{
    const s=BRstate.sel;
    const payload={
      name:BRstate.lead.name, nickname:BRstate.lead.nickname,
      whatsapp:BRstate.lead.whatsapp, email:BRstate.lead.email,
      city:BRstate.lead.city, instagram:BRstate.lead.instagram,
      password:BRstate.lead.password, industry:BRstate.industry, sel:s
    };
    const res=await fetch('/api/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const data=await res.json();
    if(!data.success){
      if(btn){btn.disabled=false;btn.textContent=(BRgetPrefs().lang==='ar'?"تأكيد الاشتراك":"Confirm")}
      alert(data.message||"وقع خطأ، حاول مرة أخرى");
      return;
    }
    localStorage.setItem('brandirasck_account',JSON.stringify({...data.account,paid:false}));
    BRincrementClientCount();
    const msg=BRmessageText();
    window.BRFINALMSG=msg;
    BRshowSendFallback(msg);
    setTimeout(()=>{try{BRopenWhatsApp()}catch(e){console.warn('WhatsApp could not be opened automatically',e)}},180);
  }catch(err){
    console.error('BRsend error:',err);
    if(btn){btn.disabled=false;btn.textContent=(BRgetPrefs().lang==='ar'?"تأكيد الاشتراك":"Confirm")}
    alert("ماقدرناش نتصلو بالسيرفر، تأكد من الإنترنت وحاول مرة أخرى");
  }
}
```

### ب) دالة loginAccount — بدلها بهاذي:

```javascript
async function loginAccount(){
  const e=document.getElementById("loginEmail")?.value.trim();
  const p=document.getElementById("loginPass")?.value;
  if(!e||!p){alert("دخل Gmail وكلمة السر");return}
  try{
    const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:e,password:p})});
    const data=await res.json();
    if(!data.success){alert(data.message||"المعلومات غير صحيحة");return}
    localStorage.setItem('brandirasck_account',JSON.stringify(data.account));
    renderDashboard(data.account);
  }catch(err){
    console.error('login error:',err);
    alert("ماقدرناش نتصلو بالسيرفر، تأكد من الإنترنت");
  }
}
```

## 5) push و redeploy

بعد ما تزيد الملفات وتبدل هاد الدوال جوج، دير commit و push لـ GitHub،
Vercel غادي يدير redeploy وحدو. تأكد بلي MONGODB_URI مزيدة قبل.

## ملاحظة أمنية مهمة
- الـ password دابا كيتشفر بـ bcrypt قبل ما يتسجل فقاعدة البيانات (ماشي بالنص الصريح).
- تأكد ف MongoDB Atlas > Network Access إلى "Allow access from anywhere" (0.0.0.0/0)
  مفعّل، حيت Vercel كيستعمل IP ديناميكية.
