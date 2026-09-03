"use client";
import { useState } from "react";
import Link from "next/link";
const pairsData = [
  { id: 1, question: "كليم الله", answer: "موسى عليه السلام" },
  { id: 2, question: "خليل الله", answer: "إبراهيم عليه السلام" },
  { id: 3, question: "سيف الله المسلول", answer: "خالد بن الوليد" },
  { id: 4, question: "أول مؤذن في الإسلام", answer: "بلال بن رباح" },
  { id: 5, question: "أسد الله الغالب", answer: "علي بن أبي طالب" },
  { id: 6, question: "ترجمان القرآن", answer: "عبد الله بن عباس" },
  { id: 7, question: "أمين هذه الأمة", answer: "أبو عبيدة بن الجراح" },
  { id: 8, question: "حبر الأمة", answer: "عبد الله بن عباس" },
  { id: 9, question: "ذو النورين", answer: "عثمان بن عفان" },
  { id: 10, question: "حواري النبي صلى الله عليه وسلم", answer: "الزبير بن العوام" },
];

export default function MatchingGame() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [wrongAnswerId, setWrongAnswerId] = useState(null); // لمعرفة أي زر ملون بالأحمر
  const [score, setScore] = useState(0);

  const [answers] = useState(() => 
    [...pairsData].sort(() => Math.random() - 0.5)
  );

  const handleQuestionClick = (item) => {
    if (matchedPairs.includes(item.id) || wrongAnswerId !== null) return;
    setSelectedQuestion(item);
  };

  const handleAnswerClick = (answerItem) => {
    if (!selectedQuestion || wrongAnswerId !== null) return;

    if (selectedQuestion.id === answerItem.id) {
      // إجابة صحيحة
      setMatchedPairs((prev) => [...prev, selectedQuestion.id]);
      setScore((prev) => prev + 10);
      setSelectedQuestion(null);
    } else {
      // إجابة خاطئة: تلوين بالأحمر ثم إرجاعه للحالة الطبيعية بعد ثانية
      setWrongAnswerId(answerItem.id);
      setTimeout(() => {
        setWrongAnswerId(null);
        setSelectedQuestion(null);
      }, 800);
    }
  };

  const restartGame = () => {
    setMatchedPairs([]);
    setScore(0);
    setSelectedQuestion(null);
    setWrongAnswerId(null);
  };

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
   <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className="text-2xl font-bold mb-2 text-primary"> التوصيل الدينية</h1>
   

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* عمود الأسئلة */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-sm mb-2">الألقاب</h3>
          {pairsData.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isSelected = selectedQuestion?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleQuestionClick(item)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  isMatched
                    ? "bg-green-100 text-green-600 cursor-not-allowed opacity-50"
                    : isSelected
                    ? "bg-primary text-white shadow-md scale-105"
                    : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                {item.question}
              </button>
            );
          })}
        </div>

        {/* عمود الأجوبة */}
        <div className="space-y-3">
          <h3 className="font-bold text-gray-700 text-sm mb-2">الشخصيات</h3>
          {answers.map((item) => {
            const isMatched = matchedPairs.includes(item.id);
            const isWrong = wrongAnswerId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleAnswerClick(item)}
                disabled={isMatched}
                className={`w-full py-3 px-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  isMatched
                    ? "bg-green-100 text-green-600 cursor-not-allowed opacity-50"
                    : isWrong
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-white text-gray-700 border border-gray-100 hover:bg-gray-50"
                }`}
              >
                {item.answer}
              </button>
            );
          })}
        </div>
      </div>

      {matchedPairs.length === pairsData.length && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800">أحسنت! أكملت التوصيل بنجاح </h2>
          <p className="text-gray-500 mb-4">مجموع النقاط: <span className="font-bold text-primary text-lg">{score}</span></p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            إعادة اللعب
          </button>
        </div>
      )}
    </div>
  );
}