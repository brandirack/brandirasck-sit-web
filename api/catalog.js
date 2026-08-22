const CYCLE = [
  { on: true, h: 18 }, { on: true, h: 3 }, { on: false, h: 6 },
  { on: true, h: 10 }, { on: false, h: 4 }, { on: true, h: 2 }, { on: false, h: 3 }
];
const EPOCH = Date.parse("2026-08-21T22:50:00Z");

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

// Sensitive promo definitions intentionally live only on the server.
const PROMOS = {
  BRANDI5PRO: 5, BRANDI10PRO: 10, BRANDI15PRO: 15, BRANDI20PRO: 20,
  BRANDI25PRO: 25, BRANDI30PRO: 30, BRANDI35PRO: 35, BRANDI40PRO: 40,
  BRANDI45PRO: 45, BRANDI50PRO: 50, BRANDI55PRO: 55, BRANDI60PRO: 60,
  BRANDI65PRO: 65, BRANDI70PRO: 70, BRANDI11RASK: 5
};

const PROMO_DATES = {
  start: "2026-08-01",
  end: "2026-08-31"
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

function promoState() {
  const now = Date.now();
  const cycleMs = CYCLE.reduce((a, x) => a + x.h, 0) * 3600000;
  let elapsed = ((now - EPOCH) % cycleMs + cycleMs) % cycleMs;
  let acc = 0;
  for (const item of CYCLE) {
    const ms = item.h * 3600000;
    if (elapsed < acc + ms) {
      return { on: item.on, leftMs: acc + ms - elapsed, discount: 25 };
    }
    acc += ms;
  }
  return { on: false, leftMs: 0, discount: 25 };
}

function validDateRange(date) {
  return date >= PROMO_DATES.start && date <= PROMO_DATES.end;
}

function validatePromo(code) {
  const normalized = String(code || "").trim().toUpperCase();
  const discount = PROMOS[normalized];
  const today = moroccoDate();
  if (!discount || !validDateRange(today)) {
    return { valid: false };
  }
  return { valid: true, code: normalized, discount, start: PROMO_DATES.start, end: PROMO_DATES.end };
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
  let base25 = 0;

  const social = PRICING.social[s.ig];
  if (social) base25 += addLine(lines, "Social Media", social);

  if (s.montage && PRICING.montage[s.montage]) {
    base25 += addLine(lines, "Montage", PRICING.montage[s.montage]);
  }

  if (s.admin) base25 += addLine(lines, "Admin", PRICING.admin);
  if (s.ads) base25 += addLine(lines, "الإعلانات الممولة", PRICING.ads);

  const shoot = PRICING.shooting[String(Number(s.shoot || 0))];
  if (shoot) base25 += addLine(lines, `التصوير — ${Number(s.shoot)} حصص`, shoot);

  const f = s.followers;
  if (f && ["stable", "refill", "drop"].includes(f.type)) {
    const qty = Math.min(10000000, Math.max(0, Number(f.qty) || 0));
    const amount = qty / 10000 * PRICING.followers[f.type];
    if (amount > 0) base25 += addLine(lines, `متابعون عالميون — ${qty.toLocaleString()}`, amount);
  }

  for (const id of ["p1", "p2", "p3"]) {
    if (s[id] && Number(s[id].stars) >= 1) {
      const amount = PRICING.collab[id]?.[Number(s[id].stars) - 1];
      if (amount != null) base25 += addLine(lines, `${id.toUpperCase()} — ${s[id].stars} نجوم`, amount);
    }
  }

  if (s.digital) addLine(lines, "الحضور الرقمي", 0);

  const original = base25 / 0.75;
  const promo = validatePromo(promoCode);
  const state = promoState();
  const promoDiscount = promo.valid ? promo.discount : 0;
  const totalDiscount = state.on ? Math.min(95, 25 + promoDiscount) : 0;
  const final = state.on ? original * (1 - totalDiscount / 100) : original;
  const saved = original - final;

  return {
    totals: {
      base25, original, after25: state.on ? base25 : original,
      extra: state.on ? ((state.on ? base25 : original) - final) : 0,
      final, saved, totalDiscount
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
    pricing: PRICING,
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
