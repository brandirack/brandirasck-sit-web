const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const dbURI = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb && mongoose.connection.readyState === 1) {
        return cachedDb;
    }
    const db = await mongoose.connect(dbURI, {
        bufferCommands: false,
    });
    cachedDb = db;
    return db;
}

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        await connectToDatabase();

        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
        const { name, email, password } = body || {};

        if (!name || !email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: 'المرجو إدخال الاسم، البريد الإلكتروني، وكلمة السر.' 
            });
        }

        const cleanEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'هذا الـ Gmail مسجل من قبل' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            name, 
            email: cleanEmail, 
            password: hashedPassword 
        });
        
        await newUser.save();

        const { password: _, ...safeAccount } = newUser.toObject();
        return res.status(201).json({ 
            success: true, 
            message: 'تم التسجيل بنجاح!',
            account: safeAccount
        });

    } catch (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ في السيرفر، المرجو إعادة المحاولة.' 
        });
    }
};
