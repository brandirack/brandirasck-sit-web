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
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "دخل Gmail وكلمة السر" });
    }

    const db = await getDb();
    const users = db.collection("users");
    const user = await users.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ success: false, message: "المعلومات غير صحيحة" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "المعلومات غير صحيحة" });
    }

    const { password: _pw, ...safeAccount } = user;
    return res.status(200).json({ success: true, account: safeAccount });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ success: false, message: "خطأ فالسيرفر، حاول مرة أخرى" });
  }
};
