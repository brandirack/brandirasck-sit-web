const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

let cachedClient = null;
async function getDb() {
  if (cachedClient) return cachedClient.db("brandirasck");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client.db("brandirasck");
}

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  try {
    const { name, nickname, whatsapp, email, city, instagram, password, industry, sel } = req.body || {};

    if (!name || !whatsapp || !email || !city || !instagram || !password) {
      return res.status(400).json({ success: false, message: "معلومات ناقصة" });
    }

    const db = await getDb();
    const users = db.collection("users");

    const existing = await users.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "الـ Gmail هذا مسجل من قبل" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doc = {
      name, nickname: nickname || "", whatsapp, email: email.toLowerCase().trim(),
      city, instagram, password: hashedPassword,
      industry: industry || "", sel: sel || {},
      paid: false, registeredAt: Date.now()
    };

    const result = await users.insertOne(doc);

    const { password: _pw, ...safeAccount } = doc;
    return res.status(200).json({ success: true, account: { ...safeAccount, _id: result.insertedId } });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ success: false, message: "خطأ فالسيرفر، حاول مرة أخرى" });
  }
};
