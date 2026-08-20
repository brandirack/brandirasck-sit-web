const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// رابط MongoDB الخاص بك
const dbURI = 'mongodb+srv://faycallitaliano_db_user:ciX6IFvqgzjqB5N8@cluster0.twkggl.mongodb.net/?appName=Cluster0';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('MongoDB Connection Error:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// مسار استقبال التسجيل
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.status(200).json({ success: true, message: 'تم التسجيل بنجاح!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = app;
