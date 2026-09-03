"use client";
import { useState } from "react";
import Link from "next/link";
import QuizMascot from "../../../components/QuizMascot";

const PUZZLES = {
  wudu: {
    title: "خطوات الوضوء",
    items: [
      "النية",
      "التسمية",
      "غسل الكفين ثلاث مرات",
      "المضمضة والاستنشاق",
      "غسل الوجه كاملاً",
      "غسل اليدين إلى المرفقين ثلاث مرات",
      "مسح الرأس والأذنين",
      "غسل الرجلين إلى الكعبين ثلاث مرات",
      "الدعاء بعد الوضوء: أشهد أن لا إله إلا الله وحده لا شريك له، وأشهد أن محمداً عبده ورسوله، اللهم اجعلني من التوابين واجعلني من المتطهرين",
    ],
  },
  pillars: {
    title: "أركان الإسلام",
    items: [
      "شهادة أن لا إله إلا الله وأن محمدًا رسول الله",
      "إقام الصلاة",
      "إيتاء الزكاة",
      "صوم رمضان",
      "حج البيت لمن استطاع إليه سبيلًا",
    ],
  },
  prayers: {
    title: "ترتيب الصلوات الخمس",
    items: ["الفجر", "الظهر", "العصر", "المغرب", "العشاء"],
  },
};

function shuffle(arr) {
  let shuffled;
  do {
    shuffled = [...arr].sort(() => Math.random() - 0.5);
  } while (shuffled.join("") === arr.join("") && arr.length > 1);
  return shuffled;
}

export default function OrderPuzzleGame() {
  const [puzzleKey, setPuzzleKey] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  const startPuzzle = (key) => {
    setPuzzleKey(key);
    setTiles(shuffle(PUZZLES[key].items));
    setSelected(null);
    setSolved(false);
    setMoves(0);
  };

  const tapTile = (index) => {
    if (solved) return;

    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }

    const newTiles = [...tiles];
    [newTiles[selected], newTiles[index]] = [newTiles[index], newTiles[selected]];
    setTiles(newTiles);
    setSelected(null);
    setMoves((m) => m + 1);

    const correct = newTiles.join("") === PUZZLES[puzzleKey].items.join("");
    if (correct) setSolved(true);
  };

  const restart = () => setPuzzleKey(null);

  if (!puzzleKey) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
        <h1 className="text-xl font-bold text-primary mb-2">🧩 بازل الترتيب الصحيح</h1>
        <p className="text-sm text-gray-500 mb-6">اختار بازل ورتّب القطع بترتيبها الصحيح</p>
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(PUZZLES).map(([key, p]) => (
            <button
              key={key}
              onClick={() => startPuzzle(key)}
              className="py-4 px-6 rounded-xl font-bold text-primary border-2 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={restart} className="text-sm text-primary hover:underline mb-3 inline-block">← اختيار بازل آخر</button>
      <h1 className="text-xl font-bold text-primary text-center mb-1">🧩 {PUZZLES[puzzleKey].title}</h1>
      <p className="text-center text-sm text-gray-500 mb-4">
        دوسي على قطعتين لتبديل مكانهن — التبديلات: {moves}
      </p>

      <QuizMascot mood={solved ? "happy" : "idle"} size={70} />

      <div className="flex flex-col gap-2 mt-4">
        {tiles.map((text, i) => (
          <button
            key={i}
            onClick={() => tapTile(i)}
            disabled={solved}
            className={`flex items-center gap-3 p-3 rounded-xl border-2 text-right transition-colors ${
              solved
                ? "border-green-400 bg-green-50"
                : selected === i
                ? "border-primary bg-primary/10"
                : "border-gray-200 bg-white hover:border-primary/40"
            }`}
          >
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              {i + 1}
            </span>
            <span className="font-semibold flex-1">{text}</span>
          </button>
        ))}
      </div>

      {solved && (
        <div className="text-center mt-5">
          <p className="font-bold text-green-600 mb-2"> أحسنت! الترتيب صحيح</p>
          <button onClick={restart} className="btn-primary">🔁 بازل آخر</button>
        </div>
      )}
    </div>
  );
}