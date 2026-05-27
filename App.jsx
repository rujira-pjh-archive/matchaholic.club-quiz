import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = {
  name: "Matchaholic",
  tagline: "Soft Luxury Matcha Cafe",
  orderUrl: "https://www.instagram.com/",
  instagramUrl: "https://www.instagram.com/",
  lineUrl: "https://line.me/",
};

const TYPE_ORDER = ["A", "B", "C", "D", "E"];

const menuHighlights = [
  "Classic Latte",
  "Cloud Einspanner",
  "Yuzu Refresh",
  "Strawberry Rush",
];

const QUESTIONS = [
  {
    question: "เวลาดื่มมัทฉะ คุณชอบฟีลแบบไหน?",
    answers: [
      { type: "A", text: "เข้ม ลึก รสชาเด่น" },
      { type: "B", text: "นมละมุน ดื่มง่าย" },
      { type: "C", text: "สดชื่น เปรี้ยวหวาน" },
      { type: "D", text: "สวย ถ่ายรูปขึ้น" },
      { type: "E", text: "แปลกใหม่ มี twist" },
    ],
  },
  {
    question: "ระดับความหวานที่ใช่สำหรับคุณคือ?",
    answers: [
      { type: "A", text: "0–10% สายชาแท้" },
      { type: "B", text: "30–50% นุ่มละมุน" },
      { type: "C", text: "10–30% เฟรชกำลังดี" },
      { type: "D", text: "50% บาลานซ์และ mood ดี" },
      { type: "E", text: "แล้วแต่อารมณ์วันนี้" },
    ],
  },
  {
    question: "คุณเลือกเมนูจากอะไรเป็นอันดับแรก?",
    answers: [
      { type: "A", text: "คุณภาพชาและรสมัทฉะ" },
      { type: "B", text: "ความกลมกล่อม ดื่มง่าย" },
      { type: "C", text: "ความสดชื่นหลังดื่ม" },
      { type: "D", text: "สี แก้ว และความ aesthetic" },
      { type: "E", text: "ชื่อเมนูและไอเดียใหม่ๆ" },
    ],
  },
  {
    question: "ถ้าเพื่อนชวนลองเมนูใหม่ คุณจะ…",
    answers: [
      { type: "A", text: "ขอชิมก่อน ถ้าชาดีค่อยสั่ง" },
      { type: "B", text: "ได้ ขอแบบนัวๆ ละมุนๆ" },
      { type: "C", text: "เอาแบบสดชื่น ไม่หนัก" },
      { type: "D", text: "ขอแก้วที่สวยที่สุด" },
      { type: "E", text: "จัดมา อยากลองอยู่แล้ว" },
    ],
  },
  {
    question: "คาแรกเตอร์ของคุณใกล้กับข้อไหนที่สุด?",
    answers: [
      { type: "A", text: "ลึก เท่ มีมาตรฐาน" },
      { type: "B", text: "อบอุ่น สบายใจ" },
      { type: "C", text: "สดใส มีพลัง" },
      { type: "D", text: "มีสไตล์ รักความสวยงาม" },
      { type: "E", text: "ครีเอทีฟ ไม่จำเจ" },
    ],
  },
];

const RESULTS = {
  A: {
    title: "The Pure Matcha Soul",
    subtitle: "สายมัทฉะแท้ เข้ม ลึก จริงจัง",
    badge: "Serious Matcha Lover",
    description:
      "คุณดื่มมัทฉะเพราะรักรสชา ชอบความ umami, grassy, slightly bitter และความคลีนของชาแท้",
    note: "เหมาะกับวันที่อยากได้แก้วที่นิ่ง เท่ และรสชาเด่นแบบไม่ต้องหวานมาก",
    menu: "Classic Usucha / Classic Latte",
    sweetness: "0–10%",
    gradient: "linear-gradient(135deg, #4b5f35 0%, #7d8f51 52%, #d9c796 100%)",
    emoji: "🍵",
  },
  B: {
    title: "The Creamy Comfort",
    subtitle: "สายลาเต้ละมุน ดื่มง่ายทุกวัน",
    badge: "Daily Matcha Fix",
    description:
      "คุณชอบความนัว ครีมมี่ สมูท ดื่มแล้วรู้สึกเหมือนได้พักใจ ไม่ต้องเข้มมาก แต่ต้องกลมกล่อม",
    note: "เหมาะกับวันทำงาน วันที่อยากได้ comfort drink ที่ยังดูพรีเมียม",
    menu: "Classic Latte / Cloud Einspanner",
    sweetness: "30–50%",
    gradient: "linear-gradient(135deg, #748c56 0%, #c6b087 52%, #f0dfc7 100%)",
    emoji: "🥛",
  },
  C: {
    title: "The Fresh Energy",
    subtitle: "สายสดชื่น เปรี้ยวหวาน มีชีวิตชีวา",
    badge: "Refresh Mode",
    description:
      "คุณชอบมัทฉะที่เบา สดชื่น ดื่มแล้วเฟรช เหมาะกับวันที่อากาศร้อนหรือต้องการเติมพลัง",
    note: "เหมาะกับสาย fresh dose ที่อยากได้มัทฉะผสมผลไม้แบบไม่หนักเกินไป",
    menu: "Yuzu Refresh / Strawberry Rush / Coconut Cloud Dose",
    sweetness: "10–30%",
    gradient: "linear-gradient(135deg, #8fa35f 0%, #e7c86f 52%, #efd1c2 100%)",
    emoji: "🍋",
  },
  D: {
    title: "The Aesthetic Sipper",
    subtitle: "สายสวย มีสไตล์ ถ่ายรูปก่อนดื่ม",
    badge: "Pretty Matcha Moment",
    description:
      "คุณไม่ได้เลือกแค่รสชาติ แต่เลือก mood, color, vibe และความสวยของแก้วด้วย เครื่องดื่มต้องอร่อยและดูดี",
    note: "เหมาะกับลูกค้าที่อยากได้แก้วสวยลง story แต่ยังคงรสชาติที่บาลานซ์",
    menu: "Blue Sky Cloud / Cloud Einspanner / Strawberry Rush",
    sweetness: "30–50%",
    gradient: "linear-gradient(135deg, #9aaa6d 0%, #e8d7bd 52%, #c9dbe2 100%)",
    emoji: "📸",
  },
  E: {
    title: "The Curious Matchaholic",
    subtitle: "สายลองของใหม่ สนุกกับรสชาติแปลกๆ",
    badge: "Experimental Dose",
    description:
      "คุณชอบเมนูที่มี twist ไม่จำเจ สนุกกับ combination ใหม่ๆ และมักเป็นคนแรกในกลุ่มที่สั่งเมนูใหม่",
    note: "เหมาะกับเมนู signature หรือ seasonal ที่ทำให้การดื่มมัทฉะไม่น่าเบื่อ",
    menu: "Nutella Matcha Crush / Brain Power / Coconut Cloud Dose",
    sweetness: "ตาม mood วันนี้",
    gradient: "linear-gradient(135deg, #5d6841 0%, #b89b65 52%, #ead2c5 100%)",
    emoji: "✨",
  },
};

function Icon({ label, children, className = "" }) {
  return (
    <span aria-label={label} role="img" className={`inline-flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
}

export function getResult(answers) {
  const scores = TYPE_ORDER.reduce((acc, type) => {
    acc[type] = 0;
    return acc;
  }, {});

  answers.forEach((type) => {
    if (Object.prototype.hasOwnProperty.call(scores, type)) {
      scores[type] += 1;
    }
  });

  return [...TYPE_ORDER].sort((a, b) => {
    if (scores[b] === scores[a]) {
      return TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b);
    }
    return scores[b] - scores[a];
  })[0];
}

export function getProgress(answerCount, questionCount) {
  if (!questionCount || questionCount < 1) return 0;
  return Math.min(Math.max(Math.round((answerCount / questionCount) * 100), 0), 100);
}

export const quizLogicTests = [
  { name: "all A answers returns A", actual: getResult(["A", "A", "A", "A", "A"]), expected: "A" },
  { name: "majority C answers returns C", actual: getResult(["C", "B", "C", "D", "C"]), expected: "C" },
  { name: "tie returns earliest type order", actual: getResult(["B", "A", "B", "A", "E"]), expected: "A" },
  { name: "invalid answer is ignored", actual: getResult(["Z", "D", "D", "C", "C"]), expected: "C" },
  { name: "progress clamps above 100", actual: getProgress(9, 5), expected: 100 },
  { name: "progress handles zero questions", actual: getProgress(2, 0), expected: 0 },
];

export const quizLogicTestsPassed = quizLogicTests.every((test) => Object.is(test.actual, test.expected));

export default function MatchaholicQuizWebsite() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [copied, setCopied] = useState(false);

  const safeCurrent = Math.min(current, QUESTIONS.length - 1);
  const activeQuestion = QUESTIONS[safeCurrent];
  const isFinished = answers.length >= QUESTIONS.length;
  const progress = getProgress(answers.length, QUESTIONS.length);
  const resultType = useMemo(() => (isFinished ? getResult(answers.slice(0, QUESTIONS.length)) : null), [answers, isFinished]);
  const result = resultType ? RESULTS[resultType] : null;

  const chooseAnswer = (type) => {
    if (isFinished || !TYPE_ORDER.includes(type)) return;

    setAnswers((previousAnswers) => {
      if (previousAnswers.length >= QUESTIONS.length) return previousAnswers;

      const nextAnswers = [...previousAnswers, type];
      setCurrent(Math.min(nextAnswers.length, QUESTIONS.length - 1));
      setCopied(false);
      return nextAnswers;
    });
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setCopied(false);
  };

  const shareText = result
    ? `I am ${result.title} ${result.emoji} — my Matcha Personality from ${BRAND.name}! Recommended dose: ${result.menu}`
    : "";

  const copyShare = async () => {
    if (!shareText) return;

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
      } else {
        throw new Error("Clipboard unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      if (typeof window !== "undefined") {
        window.prompt("Copy your result", shareText);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf6ec] text-[#34291f] overflow-hidden selection:bg-[#8fa35f] selection:text-white">
      <div className="fixed inset-0 pointer-events-none opacity-80">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#efe0c8] blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-[#dfe8c2] blur-3xl" />
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#ead2c5] blur-3xl" />
      </div>

      <header className="relative z-10 max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#f3e5cf] text-[#66783f] border border-[#ead8bd] flex items-center justify-center shadow-lg shadow-[#d8c4a3]/30">
            <Icon label="matcha leaf" className="text-xl">🍃</Icon>
          </div>
          <div>
            <p className="font-serif text-2xl font-semibold tracking-tight text-[#3d3024]">{BRAND.name}</p>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9a805f]">{BRAND.tagline}</p>
          </div>
        </div>
        <a
          href={BRAND.orderUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#7d8f51] text-white px-5 py-3 text-sm font-medium shadow-lg shadow-[#b9c68d]/30 hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Order Now <Icon label="shopping bag">🛍️</Icon>
        </a>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-10">
        <section className="grid lg:grid-cols-[0.92fr_1.08fr] gap-5 items-stretch">
          <aside className="rounded-[2.5rem] bg-gradient-to-br from-[#fff8ee] via-[#f0dfc7] to-[#dce7bd] text-[#3d3024] p-6 md:p-8 shadow-2xl shadow-[#d7c7ad]/40 border border-white/80 overflow-hidden relative min-h-[560px] flex flex-col justify-between">
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/45" />
            <div className="absolute right-8 bottom-28 text-[8rem] opacity-25 rotate-12" aria-hidden="true">
              🍵
            </div>
            <div className="absolute left-8 bottom-8 w-32 h-32 rounded-full border border-white/60" />

            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/55 border border-white/70 px-4 py-2 text-sm text-[#7b6549] mb-6 shadow-sm">
                <Icon label="sparkles">✨</Icon> Soft Luxury Cafe Experience
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-semibold mb-6">
                Find Your Matcha Personality
              </h1>
              <p className="text-[#715d47] leading-relaxed text-base md:text-lg max-w-md">
                เล่น quiz สั้นๆ เพื่อค้นหาว่าคุณเป็นสายมัทฉะแบบไหน แล้วรับเมนูแนะนำที่เข้ากับ craving ของคุณที่สุด
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <div className="rounded-3xl bg-white/60 border border-white/80 p-4 backdrop-blur shadow-sm">
                <p className="text-3xl font-serif font-semibold text-[#7d8f51]">5</p>
                <p className="text-sm text-[#80684d]">Questions</p>
              </div>
              <div className="rounded-3xl bg-white/60 border border-white/80 p-4 backdrop-blur shadow-sm">
                <p className="text-3xl font-serif font-semibold text-[#7d8f51]">5</p>
                <p className="text-sm text-[#80684d]">Personalities</p>
              </div>
            </div>
          </aside>

          <section className="rounded-[2.5rem] bg-white/78 backdrop-blur-xl shadow-2xl shadow-[#d7c7ad]/30 border border-white p-5 md:p-8 min-h-[560px]">
            {!started && !isFinished && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#f5eadb] px-4 py-2 text-sm text-[#8a6f4f] mb-6 border border-[#ecd9bf]">
                    <Icon label="drink">🥤</Icon> Cafe Quiz • Menu Match • Story Share
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl leading-tight font-semibold mb-5 text-[#3d3024]">
                    คุณเป็นคนดื่มมัทฉะแบบไหน?
                  </h2>
                  <p className="text-[#715d47] text-base md:text-lg leading-relaxed mb-7 max-w-2xl">
                    เหมาะสำหรับลูกค้าที่สแกน QR จาก Thank You Card หรือหน้า IG Bio ของร้าน แล้วเล่นเพื่อหาเมนูที่ใช่ก่อนสั่งแก้วต่อไป
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-7">
                    {menuHighlights.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl bg-[#fffaf2] border border-[#f0dfc7] px-4 py-3 flex items-center gap-2 shadow-sm"
                      >
                        <Icon label="star" className="text-[#b89b65]">★</Icon>
                        <span className="text-sm font-medium text-[#4b3b2c]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStarted(true)}
                  className="group rounded-full bg-[#7d8f51] text-white px-8 py-4 font-medium shadow-xl shadow-[#c4d09c]/40 hover:scale-[1.01] active:scale-[0.98] transition flex items-center justify-center gap-2"
                >
                  Start Quiz <span className="group-hover:translate-x-1 transition inline-block" aria-hidden="true">→</span>
                </button>
              </motion.div>
            )}

            {started && !isFinished && activeQuestion && (
              <div>
                <div className="mb-7">
                  <div className="flex items-center justify-between text-sm text-[#8a765b] mb-2">
                    <span>
                      Question {answers.length + 1} / {QUESTIONS.length}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-3 bg-[#f0dfc7] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#9aaa6d] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={safeCurrent}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h2 className="font-serif text-3xl md:text-5xl leading-tight font-semibold mb-7 text-[#3d3024]">
                      {activeQuestion.question}
                    </h2>
                    <div className="grid gap-3">
                      {activeQuestion.answers.map((answer, index) => (
                        <button
                          key={answer.type}
                          type="button"
                          onClick={() => chooseAnswer(answer.type)}
                          className="group text-left rounded-3xl border border-[#f0dfc7] bg-[#fffaf2] hover:bg-[#f5eadb] hover:border-[#d6bc91] p-4 md:p-5 transition shadow-sm hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full bg-white border border-[#ead8bd] flex items-center justify-center font-serif font-semibold text-[#9a805f] group-hover:bg-[#7d8f51] group-hover:text-white transition">
                              {index + 1}
                            </span>
                            <span className="text-base md:text-lg font-medium text-[#4b3b2c]">{answer.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {isFinished && result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div
                  className="rounded-[1.9rem] text-white p-6 md:p-8 shadow-xl mb-5 overflow-hidden relative"
                  style={{ background: result.gradient }}
                >
                  <div className="absolute -right-8 -top-10 text-[10rem] opacity-20" aria-hidden="true">
                    {result.emoji}
                  </div>
                  <p className="uppercase tracking-[0.35em] text-white/70 text-xs mb-3">Your Matcha Personality</p>
                  <h2 className="font-serif text-4xl md:text-6xl font-semibold leading-tight mb-3">{result.title}</h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-5">{result.subtitle}</p>
                  <span className="inline-flex rounded-full bg-white/20 backdrop-blur px-4 py-2 text-sm border border-white/20">
                    Craving Level: {result.badge}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-5">
                  <div className="md:col-span-2 rounded-3xl bg-[#fffaf2] border border-[#f0dfc7] p-5">
                    <h3 className="font-serif text-2xl font-semibold mb-2 text-[#3d3024]">ตัวตนของคุณ</h3>
                    <p className="text-[#715d47] leading-relaxed mb-3">{result.description}</p>
                    <p className="text-sm text-[#9a805f]">{result.note}</p>
                  </div>
                  <div className="rounded-3xl bg-[#f5eadb] border border-[#ecd9bf] p-5">
                    <h3 className="font-serif text-2xl font-semibold mb-2 text-[#3d3024]">Recommended Dose</h3>
                    <p className="font-medium mb-3 text-[#4b3b2c]">{result.menu}</p>
                    <p className="text-sm text-[#715d47]">Sweetness: {result.sweetness}</p>
                  </div>
                </div>

                {copied && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 rounded-2xl bg-[#eef3dc] text-[#66783f] px-4 py-3 text-sm"
                  >
                    คัดลอกผลลัพธ์แล้ว เอาไปแชร์ลง Story ได้เลย 🍵
                  </motion.div>
                )}

                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={copyShare}
                    className="rounded-full bg-[#7d8f51] text-white px-6 py-4 font-medium shadow-lg shadow-[#c4d09c]/30 hover:scale-[1.01] active:scale-[0.98] transition flex items-center justify-center gap-2"
                  >
                    <Icon label="share">↗</Icon> Copy Result
                  </button>
                  <a
                    href={BRAND.orderUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#b89b65] text-white px-6 py-4 font-medium shadow-lg shadow-[#d8c4a3]/30 hover:scale-[1.01] active:scale-[0.98] transition flex items-center justify-center gap-2"
                  >
                    <Icon label="shopping bag">🛍️</Icon> Order This Dose
                  </a>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white border border-[#ead8bd] text-[#3d3024] px-5 py-3 font-medium shadow-sm hover:bg-[#fffaf2] transition flex items-center justify-center gap-2"
                  >
                    <Icon label="Instagram">◎</Icon> IG
                  </a>
                  <a
                    href={BRAND.lineUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white border border-[#ead8bd] text-[#3d3024] px-5 py-3 font-medium shadow-sm hover:bg-[#fffaf2] transition flex items-center justify-center gap-2"
                  >
                    <Icon label="LINE">💬</Icon> LINE
                  </a>
                  <button
                    type="button"
                    onClick={restart}
                    className="rounded-full bg-white border border-[#ead8bd] text-[#3d3024] px-5 py-3 font-medium shadow-sm hover:bg-[#fffaf2] transition flex items-center justify-center gap-2"
                  >
                    <Icon label="restart">↻</Icon> Again
                  </button>
                </div>
              </motion.div>
            )}
          </section>
        </section>

        <footer className="relative z-10 mt-6 grid md:grid-cols-3 gap-3 text-sm text-[#80684d]">
          <div className="rounded-3xl bg-white/65 border border-white px-5 py-4 shadow-sm">
            <p className="font-semibold text-[#3d3024] mb-1">For Thank You Card</p>
            <p>ใส่ QR Code พร้อมข้อความ “Scan to find your Matcha Personality”.</p>
          </div>
          <div className="rounded-3xl bg-white/65 border border-white px-5 py-4 shadow-sm">
            <p className="font-semibold text-[#3d3024] mb-1">For IG Bio</p>
            <p>ใช้เป็น mini brand experience ก่อนพาลูกค้าไปสั่งเครื่องดื่ม.</p>
          </div>
          <div className="rounded-3xl bg-white/65 border border-white px-5 py-4 shadow-sm">
            <p className="font-semibold text-[#3d3024] mb-1">For Delivery</p>
            <p>ช่วยให้ลูกค้าจำแบรนด์และกลับมาลองเมนูใหม่ได้ง่ายขึ้น.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
