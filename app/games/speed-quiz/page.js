"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
const questions = [
  {
    question: "ما هي السورة التي تُسمى بـ 'سنام القرآن'؟",
    options: ["سورة البقرة", "سورة الكهف", "سورة يس", "سورة الملك"],
    answer: "سورة البقرة",
  },
  {
    question: "كم عدد السجدات في القرآن الكريم؟",
    options: ["10 سجدات", "15 سجدة", "12 سجدة", "7 سجدات"],
    answer: "15 سجدة",
  },
  {
    question: "من هو الصحابي الجليل الذي لُقب بـ 'أسد الله الغالب'؟",
    options: ["عمر بن الخطاب", "حمزة بن عبد المطلب", "علي بن أبي طالب", "خالد بن الوليد"],
    answer: "علي بن أبي طالب",
  },
  {
    question: "ما هي السورة التي قيل إنها نزلت كاملة؟",
    options: ["سورة المدثر", "سورة الفاتحة", "سورة الإخلاص", "سورة النصر"],
    answer: "سورة المدثر",
  },
  {
    question: "في أي غزوة استُشهد الصحابي حمزة بن عبد المطلب رضي الله عنه؟",
    options: ["غزوة بدر", "غزوة أحد", "غزوة الخندق", "فتح مكة"],
    answer: "غزوة أحد",
  },
  {
    question: "ما هي أعظم آية في القرآن الكريم وردت في سورة البقرة؟",
    options: ["آية الكرسي", "خواتيم سورة البقرة", "آية الدين", "آية النور"],
    answer: "آية الكرسي",
  },
  {
    question: "من هو النبي الذي لُقب بـ 'كليم الله'؟",
    options: ["إبراهيم عليه السلام", "عيسى عليه السلام", "موسى عليه السلام", "نوح عليه السلام"],
    answer: "موسى عليه السلام",
  },
  {
    question: "ما هو أقل عدد ركعات صلاة الوتر؟",
    options: ["ركعة واحدة", "ركعتان", "ثلاث ركعات", "أربع ركعات"],
    answer: "ركعة واحدة",
  },
  {
    question: "ما هي السورة التي تُعادل قراءتها ثلث القرآن الكريم؟",
    options: ["سورة الملك", "سورة الإخلاص", "سورة الكافرون", "سورة الواقعة"],
    answer: "سورة الإخلاص",
  },
  {
    question: "من هو أول مؤذن في الإسلام؟",
    options: ["عمار بن ياسر", "بلال بن رباح", "أبو بكر الصديق", "عبد الله بن مسعود"],
    answer: "بلال بن رباح",
  },
];

export default function SpeedQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isGameOver]);

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    if (option === questions[currentIndex].answer) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 800);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(10);
    } else {
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(10);
    setIsGameOver(false);
    setSelectedOption(null);
  };

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
      <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      
      <h1 className="text-2xl font-bold mb-4 text-primary">تحدي السرعة</h1>

      {!isGameOver ? (
        <div>
          <div className="flex justify-between items-center mb-6 text-sm text-gray-500 font-semibold">
            <span>السؤال: {currentIndex + 1} / {questions.length}</span>
            <span className={`px-3 py-1 rounded-full ${timeLeft <= 3 ? "bg-red-100 text-red-500" : "bg-gray-100"}`}>
              ⏱️ {timeLeft} ثوانٍ
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-800">
              {questions[currentIndex].question}
            </h2>

            <div className="space-y-3">
              {questions[currentIndex].options.map((option, index) => {
                let btnColor = "bg-gray-50 hover:bg-gray-100 text-gray-700";
                if (selectedOption) {
                  if (option === questions[currentIndex].answer) {
                    btnColor = "bg-green-500 text-white";
                  } else if (option === selectedOption) {
                    btnColor = "bg-red-500 text-white";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedOption !== null}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-all shadow-sm ${btnColor}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">انتهت اللعبة! </h2>
          <p className="text-gray-500 mb-6">مجموع النقاط: <span className="font-bold text-primary text-xl">{score}</span></p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            إعادة التحدي
          </button>
        </div>
      )}
    </div>
  );
}