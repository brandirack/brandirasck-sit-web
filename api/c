const EPOCH = Date.parse("2026-08-22T16:00:00Z");

// Master switch: true = Promo Codes system can work, false = all Promo Codes OFF.
const PROMO_MASTER_ENABLED = true;

// Base subscription discount for every new client. This is independent from Promo Codes.
// Set to 25 for the normal offer, or 0 to disable the subscription discount.
const SUBSCRIPTION_DISCOUNT = 25;

// The catalog prices stored below already contain the normal 25% subscription discount.
// Keep this internal baseline so SUBSCRIPTION_DISCOUNT can be changed safely.
const CATALOG_EMBEDDED_DISCOUNT = 25;

// Repeating 48-hour Promo window. The cycle restarts automatically forever.
const CYCLE = [
  { on: true,  h: 18 }, // 1
  { on: false, h: 2  }, // 2
  { on: true,  h: 3  }, // 3
  { on: false, h: 6  }, // 4
  { on: true,  h: 10 }, // 5
  { on: false, h: 4  }, // 6
  { on: true,  h: 2  }, // 7
  { on: false, h: 3  }  // 8
];

// Each Promo Code can be enabled/disabled independently.
// To add a code: add a new entry. To remove it: delete the entry.
const PROMO_CODES = {
  "brandi5":  { enabled: true, discount: 5  },
  "brandi10": { enabled: true, discount: 10 },
  "brandi25": { enabled: true, discount: 25 },
  "brandi50": { enabled: true, discount: 50 },
  "brandi75": { enabled: true, discount: 75 }
};

const PRICING = {
  social: { b1: 800, b2: 1400, b3: 2100, b4: 3600 },
  montage: { photo: 320, video: 450, both: 590 },
  admin: 300,
  ads: 550,
  shooting: { "1": 1300, "2": 2700, "3": 3200, "4": 3400 },
  followers: { stable: 260, refill: 150, drop: 60 },
  collab: {
    p1: [400, 500, 600, 700, 800],
    p2: [600, 800, 1000, 1100, 1200],
    p3: [1500, 1900, 2300, 3000, 3400]
  },
  v15Plans: [
    { id: "b1", price: 800 }, { id: "b2", price: 1400 },
    { id: "b3", price: 2100 }, { id: "b4", price: 3600 }
  ]
};

const SERVICE_CATALOG = {
  social: [
    { id: "b1", name: "خطة الحضور الرقمي الأساسي", price: 800 },
    { id: "b2", name: "خطة النمو والترويج", price: 1400 },
    { id: "b3", name: "خطة الانتشار", price: 2100 },
    { id: "b4", name: "خطة الإشهار المتكامل", price: 3600 }
  ],
  montage: [
    { id: "photo", name: "Montage Photo — شهر كامل", price: 320 },
    { id: "video", name: "Montage Video / Reel — شهر كامل", price: 450 },
    { id: "both", name: "Montage Photo + Video — شهر كامل", price: 590 }
  ],
  admin: { id: "admin", name: "تفعيل Admin", price: 300 },
  ads: { id: "ads", name: "إدارة الحملات الإعلانية — شهر كامل", price: 550 },
  shooting: [
    { id: 1, price: 1300 }, { id: 2, price: 2700 },
    { id: 3, price: 3200 }, { id: 4, price: 3400 }
  ],
  followers: {
    stable: { pricePer10k: 260 },
    refill: { pricePer10k: 150 },
    drop: { pricePer10k: 60 }
  },
  collab: {
    p1: [400, 500, 600, 700, 800],
    p2: [600, 800, 1000, 1100, 1200],
    p3: [1500, 1900, 2300, 3000, 3400]
  },
  digital: { id: "digital", name: "الحضور الرقمي — مجاناً للزبناء الجدد", price: 0 }
};

function moroccoDate() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Casablanca",
    year: "numeric", month: "2-digit", day: "2-digit"
  }).formatToParts(new Date());
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
  return `${p.year}-${p.month}-${p.day}`;
}

function discountPrice(storedPrice) {
  const p = Number(storedPrice) || 0;
  const embeddedFactor = 1 - CATALOG_EMBEDDED_DISCOUNT / 100;
  const original = embeddedFactor > 0 ? p / embeddedFactor : p;
  return original * (1 - SUBSCRIPTION_DISCOUNT / 100);
}

function adjustedPricing() {
  const c = JSON.parse(JSON.stringify(PRICING));
  const social = {};
  for (const [k,v] of Object.entries(c.social)) social[k] = discountPrice(v);
  c.social = social;
  for (const k of Object.keys(c.montage)) c.montage[k] = discountPrice(c.montage[k]);
  c.admin = discountPrice(c.admin);
  c.ads = discountPrice(c.ads);
  for (const k of Object.keys(c.shooting)) c.shooting[k] = discountPrice(c.shooting[k]);
  for (const k of Object.keys(c.followers)) c.followers[k] = { pricePer10k: discountPrice(c.followers[k]) };
  for (const k of Object.keys(c.collab)) c.collab[k] = c.collab[k].map(discountPrice);
  c.v15Plans = c.v15Plans.map(x => ({...x, price: discountPrice(x.price)}));
  return c;
}

function cycleState() {
  const now = Date.now();
  const cycleMs = CYCLE.reduce((a, x) => a + x.h, 0) * 3600000;
  if (now < EPOCH) return { on: false, leftMs: EPOCH - now };
  const elapsed = (now - EPOCH) % cycleMs;
  let acc = 0;
  for (const item of CYCLE) {
    const ms = item.h * 3600000;
    if (elapsed < acc + ms) {
      return { on: !!item.on, leftMs: acc + ms - elapsed };
    }
    acc += ms;
  }
  return { on: false, leftMs: 0 };
}

function promoState() {
  const cycle = cycleState();
  const on = PROMO_MASTER_ENABLED && cycle.on;
  return {
    on,
    leftMs: cycle.leftMs,
    discount: SUBSCRIPTION_DISCOUNT,
    masterEnabled: PROMO_MASTER_ENABLED
  };
}

function validatePromo(code) {
  const normalized = String(code || "").trim().toLowerCase();
  const entry = PROMO_CODES[normalized];
  const state = promoState();
  if (!state.on || !entry || !entry.enabled) return { valid: false };
  return { valid: true, code: normalized, discount: Number(entry.discount) || 0 };
}

function parseDateOnly(value) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(value || ""));
  if (!m) return null;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (d.getUTCFullYear() !== +m[1] || d.getUTCMonth() !== +m[2] - 1 || d.getUTCDate() !== +m[3]) return null;
  return d;
}

function isoDate(d) {
  return d.toISOString().slice(0, 10);
}

function weekdayLabel(d) {
  return ["ح", "ن", "ث", "ر", "خ", "ج", "س"][d.getUTCDay()];
}

function calendarDates(startDate) {
  const start = parseDateOnly(startDate) || parseDateOnly(moroccoDate());
  const end = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, start.getUTCDate()));
  const out = [];
  for (let d = new Date(start); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    out.push({ key: isoDate(d), day: d.getUTCDate(), weekdayLabel: weekdayLabel(d) });
  }
  return out;
}

function addLine(lines, name, price) {
  const amount = Number(price) || 0;
  lines.push({ name, price: amount });
  return amount;
}

function calculate(selection, promoCode) {
  const s = selection || {};
  const lines = [];
  let catalogTotal = 0;
  const prices = adjustedPricing();

  const add = (name, price) => {
    const amount = Number(price) || 0;
    lines.push({ name, price: amount });
    catalogTotal += amount;
  };

  const social = prices.social[s.ig];
  if (social) add("Social Media", social);
  if (s.montage && prices.montage[s.montage]) add("Montage", prices.montage[s.montage]);
  if (s.admin) add("Admin", prices.admin);
  if (s.ads) add("الإعلانات الممولة", prices.ads);
  const shoot = prices.shooting[String(Number(s.shoot || 0))];
  if (shoot) add(`التصوير — ${Number(s.shoot)} حصص`, shoot);

  const f = s.followers;
  if (f && ["stable", "refill", "drop"].includes(f.type)) {
    const qty = Math.min(10000000, Math.max(0, Number(f.qty) || 0));
    const amount = qty / 10000 * prices.followers[f.type].pricePer10k;
    if (amount > 0) add(`متابعون عالميون — ${qty.toLocaleString()}`, amount);
  }

  for (const id of ["p1", "p2", "p3"]) {
    if (s[id] && Number(s[id].stars) >= 1) {
      const amount = prices.collab[id]?.[Number(s[id].stars) - 1];
      if (amount != null) add(`${id.toUpperCase()} — ${s[id].stars} نجوم`, amount);
    }
  }
  if (s.digital) lines.push({ name: "الحضور الرقمي", price: 0 });

  const embeddedFactor = 1 - CATALOG_EMBEDDED_DISCOUNT / 100;
  const original = embeddedFactor > 0 ? catalogTotal / embeddedFactor : catalogTotal;
  const state = promoState();
  const promo = validatePromo(promoCode);
  const promoDiscount = promo.valid ? Number(promo.discount) || 0 : 0;
  const totalDiscount = Math.min(95, SUBSCRIPTION_DISCOUNT + (state.on ? promoDiscount : 0));
  const final = original * (1 - totalDiscount / 100);
  const afterSubscription = original * (1 - SUBSCRIPTION_DISCOUNT / 100);
  const saved = original - final;

  return {
    totals: {
      base25: afterSubscription,
      original,
      after25: afterSubscription,
      extra: Math.max(0, afterSubscription - final),
      final,
      saved,
      totalDiscount,
      subscriptionDiscount: SUBSCRIPTION_DISCOUNT
    },
    breakdown: lines,
    promo: promo.valid ? { code: promo.code, discount: promo.discount } : null,
    promoState: state
  };
}

function publicConfig(startDate) {
  const serverDate = moroccoDate();
  return {
    serverDate,
    promoState: promoState(),
    calendarDates: calendarDates(startDate || serverDate),
    pricing: adjustedPricing(),
    subscriptionDiscount: SUBSCRIPTION_DISCOUNT,
    services: SERVICE_CATALOG
  };
}

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  if (req.method === "GET") {
    const startDate = req.query?.startDate;
    return res.status(200).json(publicConfig(startDate));
  }

  if (req.method === "POST") {
    let body = req.body || {};
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch (_) { body = {}; }
    }

    if (body.action === "validatePromo") {
      return res.status(200).json(validatePromo(body.code));
    }

    if (body.action === "calculate") {
      const result = calculate(body.selection, body.promoCode);
      return res.status(200).json(result);
    }

    return res.status(400).json({ error: "unknown_action" });
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "method_not_allowed" });
};
