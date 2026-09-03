"use client";
import { useState } from "react";
import Link from "next/link";
// الكلمات المطلوب إيجادها في شبكة الحروف
const targetWords = [
  "اصبر",
  "توكل",
  "احتسب",
  "استغفر",
  "اذكر",
  "ادع",
  "صل",
  "اقرأ",
  "أحسن",
  "ارحم",
  "اشكر",
  "اثبت",
  "استعن",
  "تب",
  "سامح"
];

// شبكة الحروف
const gridMatrix = [
  ["ا", "ص", "ب", "ر", "ت", "و", "ك", "ل"],
  ["ا", "ح", "ت", "س", "ب", "م", "ن", "ي"],
  ["ا", "س", "ت", "غ", "ف", "ر", "د", "ع"],
  ["ا", "ذ", "ك", "ر", "ق", "ل", "م", "ة"],
  ["ا", "د", "ع", "ا", "ق", "ر", "أ", "ء"],
  ["أ", "ح", "س", "ن", "ا", "ر", "ح", "م"],
  ["ا", "ش", "ك", "ر", "ا", "ث", "ب", "ت"],
  ["ا", "س", "ت", "ع", "ن", "ت", "ب", "س"],
  ["ا", "م", "ح", "ب", "ة", "س", "ا", "م"],
];


export default function WordSearchGame() {
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [currentSelectionText, setCurrentSelectionText] = useState("");
  const [score, setScore] = useState(0);

  const handleCellClick = (rowIdx, colIdx, letter) => {
    const cellKey = `${rowIdx}-${colIdx}`;
    
    // إذا كانت الخلية مختارة مسبقاً، نتجاهل أو نعيد الضبط
    if (selectedCells.includes(cellKey)) return;

    const newSelectedCells = [...selectedCells, cellKey];
    const newText = currentSelectionText + letter;

    setSelectedCells(newSelectedCells);
    setCurrentSelectionText(newText);

    // التحقق إذا كانت الكلمة مطابقة لإحدى الكلمات المستهدفة
    if (targetWords.includes(newText) && !foundWords.includes(newText)) {
      setFoundWords((prev) => [...prev, newText]);
      setScore((prev) => prev + 15);
      setSelectedCells([]);
      setCurrentSelectionText("");
    }
  };

  const resetSelection = () => {
    setSelectedCells([]);
    setCurrentSelectionText("");
  };

  const restartGame = () => {
    setFoundWords([]);
    setSelectedCells([]);
    setCurrentSelectionText("");
    setScore(0);
  };

  const isCompleted = foundWords.length === targetWords.length;

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
           <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className="text-2xl font-bold mb-2 text-primary">البحث عن الكلمات الدينية 🔍</h1>

      {!isCompleted ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          {/* لوحة الكلمات المطلوب إيجادها */}
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {targetWords.map((word, index) => {
              const found = foundWords.includes(word);
              return (
                <span
                  key={index}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    found
                      ? "bg-green-50 text-green-600 border-green-200 line-through"
                      : "bg-gray-50 text-gray-400 border-gray-100"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>

          {/* عرض الحرف المختار حالياً */}
          <div className="h-10 mb-4 flex items-center justify-center bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-sm font-bold text-primary">
              {currentSelectionText ? `الكلمة قيد التشكيل: ${currentSelectionText}` : "اختر الحروف بالتسلسل..."}
            </span>
          </div>

          {/* شبكة الحروف التفاعلية */}
          <div className="grid grid-cols-5 gap-2 mb-6 max-w-[280px] mx-auto">
            {gridMatrix.map((row, rowIdx) =>
              row.map((letter, colIdx) => {
                const cellKey = `${rowIdx}-${colIdx}`;
                const isSelected = selectedCells.includes(cellKey);

                return (
                  <button
                    key={cellKey}
                    onClick={() => handleCellClick(rowIdx, colIdx, letter)}
                    className={`h-12 rounded-xl font-bold text-base transition-all shadow-sm flex items-center justify-center border ${
                      isSelected
                        ? "bg-primary text-white border-primary scale-105"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-100"
                    }`}
                  >
                    {letter}
                  </button>
                );
              })
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={resetSelection}
              className="w-1/2 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-xs hover:bg-gray-200 transition-all"
            >
              إلغاء التحديد 🔄
            </button>
            <div className="w-1/2 py-2.5 bg-primary/10 text-primary rounded-xl font-bold text-xs flex items-center justify-center">
              النقاط: {score}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">أبدعتِ! اكتشفتِ كل الكلمات </h2>
          <p className="text-gray-500 mb-6">مجموع النقاط: <span className="font-bold text-primary text-xl">{score}</span></p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            لعب مجدداً
          </button>
        </div>
      )}
    </div>
  );
}