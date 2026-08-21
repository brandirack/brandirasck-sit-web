const mongoose = require('mongoose');

// ⚠️ تحذير أمني: استبدل الرابط المباشر بمتغيرات البيئة للإنتاج (Environment Variables)
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://faycallitaliano_db_user:ciX6IFvqgzjqB5N8@cluster0.twkggl.mongodb.net/brandirasck?retryWrites=true&w=majority';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    
    // إعدادات تحسين الاتصال لدوال Serverless
    const db = await mongoose.connect(dbURI, {
        bufferCommands: false,
    });
    
    cachedDb = db;
    return db;
}

// تعريف مخطط المستخدم
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    // إعدادات CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // إذا كنت تستخدم Credentials اجعلها تترأس نطاقك المحدد
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // التعامل مع طلبات Preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // قبول طلبات POST فقط
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        await connectToDatabase();

        // معالجة البيانات المرسلة
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email } = body || {};

        // التحقق من وجود البيانات
        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                error: 'المرجو إدخال الاسم والبريد الإلكتروني بشكل صحيح.' 
            });
        }

        // إنشاء وحفظ المستخدم
        const newUser = new User({ name, email });
        await newUser.save();

        return res.status(201).json({ 
            success: true, 
            message: 'تم التسجيل بنجاح!' 
        });

    } catch (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ 
            success: false, 
            error: 'حدث خطأ في السيرفر، المرجو إعادة المحاولة.' 
        });
    }
};
