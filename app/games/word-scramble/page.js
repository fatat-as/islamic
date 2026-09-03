"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import QuizMascot from "../../../components/QuizMascot";

const WORDS = [
  { word: "صلاة", hint: "الركن الثاني من أركان الإسلام" },
  { word: "زكاة", hint: "حق للفقراء في مال الغني" },
  { word: "صيام", hint: "الإمساك عن المفطرات من الفجر للمغرب" },
  { word: "قرآن", hint: "كلام الله المنزّل على النبي ﷺ" },
  { word: "توحيد", hint: "إفراد الله بالعبادة" },
  { word: "إيمان", hint: "تصديق القلب وقول اللسان وعمل الجوارح" },
  { word: "تقوى", hint: "خشية الله في السر والعلن" },
  { word: "صدقة", hint: "عطاء تطوعي يُرجى به الأجر" },
  { word: "دعاء", hint: "سؤال الله ومناجاته" },
  { word: "توبة", hint: "الرجوع إلى الله بعد الذنب" },
];

function shuffleChars(word) {
  const chars = Array.from(word);
  let shuffled;
  do {
    shuffled = [...chars].sort(() => Math.random() - 0.5);
  } while (shuffled.join("") === word && chars.length > 1);
  return shuffled.map((char, i) => ({ char, id: `${char}-${i}-${Math.random()}`, used: false }));
}

function shuffledWords() {
  return [...WORDS].sort(() => Math.random() - 0.5);
}

export default function WordScrambleGame() {
  const [words] = useState(shuffledWords);
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState([]);
  const [answer, setAnswer] = useState([]); // مصفوفة tiles المختارة بالترتيب
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  const current = words[index];
  const finished = index >= words.length;

  useEffect(() => {
    if (current) {
      setTiles(shuffleChars(current.word));
      setAnswer([]);
      setFeedback(null);
    }
  }, [index]);

  const pickTile = (tile) => {
    if (feedback) return;
    setTiles((prev) => prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t)));
    setAnswer((prev) => [...prev, tile]);
  };

  const undoTile = (tile) => {
    if (feedback) return;
    setTiles((prev) => prev.map((t) => (t.id === tile.id ? { ...t, used: false } : t)));
    setAnswer((prev) => prev.filter((t) => t.id !== tile.id));
  };

  const clearAnswer = () => {
    setTiles((prev) => prev.map((t) => ({ ...t, used: false })));
    setAnswer([]);
  };

  useEffect(() => {
    if (!current) return;
    if (answer.length === Array.from(current.word).length && answer.length > 0) {
      const built = answer.map((t) => t.char).join("");
      const isCorrect = built === current.word;
      setFeedback(isCorrect ? "correct" : "wrong");

      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        if (isCorrect) {
          setIndex((i) => i + 1);
        } else {
          clearAnswer();
          setFeedback(null);
        }
      }, 1100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  const restart = () => window.location.reload();

  return (
    <div className="max-w-md mx-auto">
      <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      <h1 className="text-xl font-bold text-primary text-center mb-1"> رتّب الحروف</h1>

      {!finished ? (
        <>
          <p className="text-center text-sm text-gray-500 mb-3">
            كلمة {index + 1} / {words.length} — النقاط: {score}
          </p>

          <QuizMascot mood={feedback === "correct" ? "happy" : feedback === "wrong" ? "sad" : "idle"} size={80} />

          <p className="text-center text-sm text-gray-500 my-3">💡 {current.hint}</p>

          {/* خانات الإجابة */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {Array.from(current.word).map((_, i) => {
              const tile = answer[i];
              return (
                <button
                  key={i}
                  onClick={() => tile && undoTile(tile)}
                  className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center text-xl font-bold ${
                    feedback === "correct"
                      ? "border-green-400 bg-green-50 text-green-700"
                      : feedback === "wrong"
                      ? "border-red-400 bg-red-50 text-red-600"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {tile?.char || ""}
                </button>
              );
            })}
          </div>

          {/* حروف مبعثرة */}
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {tiles.map((t) => (
              <button
                key={t.id}
                onClick={() => pickTile(t)}
                disabled={t.used || !!feedback}
                className={`w-11 h-11 rounded-xl text-white text-xl font-bold transition-opacity ${
                  t.used ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                {t.char}
              </button>
            ))}
          </div>

          <div className="text-center">
            <button onClick={clearAnswer} className="text-sm text-gray-400 hover:text-gray-600">مسح المحاولة</button>
          </div>
        </>
      ) : (
        <div className="card text-center">
          <QuizMascot mood={score >= words.length * 0.6 ? "happy" : "sad"} size={90} />
          <p className="font-bold text-lg mt-2">النتيجة النهائية</p>
          <p className="text-3xl font-bold text-primary my-2">{score} / {words.length}</p>
          <button onClick={restart} className="btn-primary mt-2">🔁 العب من جديد</button>
        </div>
      )}
    </div>
  );
}