"use client";
import { useState } from "react";
import Link from "next/link";
const questionsList = [
  {
    id: 1,
    statement: "عدد الصلوات المفروضة في اليوم والليلة هو خمس صلوات.",
    isCorrect: true,
    explanation: "صحيح، الصلوات المفروضة هي: الفجر، الظهر، العصر، المغرب، والعشاء.",
  },
  {
    id: 2,
    statement: "صيام شهر رمضان يعد الركن الثالث من أركان الإسلام.",
    isCorrect: false,
    explanation: "خطأ، صيام رمضان هو الركن الرابع من أركان الإسلام (بينما الزكاة هي الثالث).",
  },
  {
    id: 3,
    statement: "أول ركن من أركان الإسلام هو الشهادتان (شهادة أن لا إله إلا الله وأن محمداً رسول الله).",
    isCorrect: true,
    explanation: "صحيح، الشهادتان هي الركن الأول وأساس بناء الإسلام.",
  },
  {
    id: 4,
    statement: "سورة الإخلاص تسمى بثلث القرآن.",
    isCorrect: true,
    explanation: "صحيح، ورد في الحديث الصحيح أن قراءتها تعادل ثلث القرآن.",
  },
  {
    id: 5,
    statement: "عدد أركان الإيمان المذكورة في حديث جبريل عليه السلام هو ستة أركان.",
    isCorrect: true,
    explanation: "صحيح، وهي الإيمان بالله، وملائكته، وكتبه، ورسله، واليوم الآخر، والإيمان بالقدر خيره وشره.",
  },
  {
    id: 6,
    statement: "الحج مفرض على كل مسلم قادر في العمر مرة واحدة.",
    isCorrect: true,
    explanation: "صحيح، الحج ركن من أركان الإسلام وهو فرض على الاستطاعة مرة في العمر.",
  },
  {
    id: 7,
    statement: "القبلة التي يتوجه إليها المسلمون في صلاتهم هي المسجد الأقصى.",
    isCorrect: false,
    explanation: "خطأ، القبلة الحالية والثابتة للمسلمين هي الكعبة المشرفة في المسجد الحرام بمكة المكرمة.",
  },
  {
    id: 8,
    statement: "سورة الفاتحة تسمى بـ 'سبع المثاني'.",
    isCorrect: true,
    explanation: "صحيح، ثبت في صحيح البخاري أن سورة الفاتحة هي السبع المثاني والقرآن العظيم.",
  },
  {
    id: 9,
    statement: "صلاة الوتر صلاة مفروضة تؤدى بعد صلاة العشاء.",
    isCorrect: false,
    explanation: "خطأ، صلاة الوتر هي سنة مؤكدة وليست فرضاً وليست من الصلوات الخمس المفروضة.",
  },
  {
    id: 10,
    statement: "شهر رمضان هو الشهر التاسع في التقويم الهجري.",
    isCorrect: true,
    explanation: "صحيح، رمضان هو الشهر التاسع بين شهور السنة الهجرية ويأتي بعد شعبان.",
  },
];

export default function TrueFalseGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = questionsList[currentIndex];

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    if (answer === currentItem.isCorrect) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setUserAnswer(null);
      if (currentIndex + 1 < questionsList.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 5500);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setUserAnswer(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
            <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className="text-2xl font-bold mb-2 text-primary">صواب أم خطأ؟ </h1>
    

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400">السؤال {currentIndex + 1} من {questionsList.length}</span>
            <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
              النقاط: {score}
            </span>
          </div>

          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
            <h2 className="text-base font-bold text-gray-800 leading-relaxed">
              "{currentItem.statement}"
            </h2>
            {userAnswer !== null && (
              <p className={`mt-4 text-xs font-bold p-3 rounded-xl ${
                userAnswer === currentItem.isCorrect ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}>
                {currentItem.explanation}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer(true)}
              disabled={userAnswer !== null}
              className="py-3.5 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-xl font-bold text-sm transition-all shadow-sm disabled:opacity-50"
            >
              ✓ صواب
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={userAnswer !== null}
              className="py-3.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl font-bold text-sm transition-all shadow-sm disabled:opacity-50"
            >
              ✗ خطأ
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">أنهيت التحدي بنجاح! </h2>
          <p className="text-gray-500 mb-6">
            مجموع نقاطك النهائية: <span className="font-bold text-primary text-xl">{score}</span>
          </p>
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