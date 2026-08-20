const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://faycallitaliano_db_user:ciX6IFvqgzjqB5N8@cluster0.twkggl.mongodb.net/?appName=Cluster0';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;
    const db = await mongoose.connect(dbURI);
    cachedDb = db;
    return db;
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectToDatabase();
        const { name, email } = req.body;
        
        const newUser = new User({ name, email });
        await newUser.save();
        
        return res.status(200).json({ success: true, message: 'تم التسجيل بنجاح!' });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
