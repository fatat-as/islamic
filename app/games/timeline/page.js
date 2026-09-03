"use client";
import { useState } from "react";
import Link from "next/link";
const challenges = [
  {
    id: 1,
    title: "رَتبي الخلفاء الراشدين بحسب تولي الخلافة (من الأقدم للأحدث):",
    correctOrder: [
      "أبو بكر الصديق",
      "عمر بن الخطاب",
      "عثمان بن عفان",
      "علي بن أبي طالب",
    ],
    options: [
      "عمر بن الخطاب",
      "أبو بكر الصديق",
      "علي بن أبي طالب",
      "عثمان بن عفان",
    ],
  },
  {
    id: 2,
    title: "رَتبي أول أربع غزوات كبرى في الإسلام تاريخياً:",
    correctOrder: [
      "غزوة بدر",
      "غزوة أحد",
      "غزوة الخندق (الأحزاب)",
      "غزوة بني قريظة",
    ],
    options: [
      "غزوة أحد",
      "غزوة بدر",
      "غزوة بني قريظة",
      "غزوة الخندق (الأحزاب)",
    ],
  },
  {
    id: 3,
    title: "رَتبي الغزوات النبوية الكبرى اللاحقة تاريخياً:",
    correctOrder: [
      "غزوة بني المصطلق",
      "غزوة خيبر",
      "غزوة مؤتة",
      "غزوة تبوك",
    ],
    options: [
      "غزوة مؤتة",
      "غزوة خيبر",
      "غزوة تبوك",
      "غزوة بني المصطلق",
    ],
  },
  {
    id: 4,
    title: "رَتبي المراحل الكبرى للدعوة الإسلامية زمنياً:",
    correctOrder: [
      "الدعوة السرية",
      "الدعوة الجهرية في مكة",
      "الهجرة النبوية إلى المدينة",
      "فتح مكة",
    ],
    options: [
      "الهجرة النبوية إلى المدينة",
      "الدعوة السرية",
      "فتح مكة",
      "الدعوة الجهرية في مكة",
    ],
  },
  {
    id: 5,
    title: "رَتبي زوجات النبي محمد صلى الله عليه وسلم بحسب أسبقية الزواج:",
    correctOrder: [
      "خديجة بنت خويلد",
      "سودة بنت زمعة",
      "عائشة بنت أبي بكر",
      "حَفْصَة بنت عمر بن الخطاب",
    ],
    options: [
      "عائشة بنت أبي بكر",
      "خديجة بنت خويلد",
      "حَفْصَة بنت عمر بن الخطاب",
      "سودة بنت زمعة",
    ],
  },
  {
    id: 6,
    title: "رَتبي الأحداث الكبرى في السنة الأولى للهجرة:",
    correctOrder: [
      "الوصول إلى قباء وبناء المسجد",
      "دخول المدينة المنورة",
      "المؤاخاة بين المهاجرين والأنصار",
      "كتابة وثيقة المدينة (صحيفة المدينة)",
    ],
    options: [
      "المؤاخاة بين المهاجرين والأنصار",
      "دخول المدينة المنورة",
      "كتابة وثيقة المدينة (صحيفة المدينة)",
      "الوصول إلى قباء وبناء المسجد",
    ],
  },
  {
    id: 7,
    title: "رَتبي الصلح والمعاهدات الكبرى في السيرة النبوية:",
    correctOrder: [
      "وثيقة المدينة",
      "صلح الحديبية",
      "فتح مكة",
      "حجة الوداع",
    ],
    options: [
      "فتح مكة",
      "صلح الحديبية",
      "وثيقة المدينة",
      "حجة الوداع",
    ],
  },
  {
    id: 8,
    title: "رَتبي شهداء الصحابة الأوائل أو الخلفاء بحسب استشهادهم:",
    correctOrder: [
      "عمر بن الخطاب",
      "عثمان بن عفان",
      "علي بن أبي طالب",
      "الحسين بن علي",
    ],
    options: [
      "علي بن أبي طالب",
      "عمر بن الخطاب",
      "الحسين بن علي",
      "عثمان بن عفان",
    ],
  },
  {
    id: 9,
    title: "رَتبي أعمام النبي محمد صلى الله عليه وسلم الذين أدركوا الإسلام (إسلاماً أو وفاة):",
    correctOrder: [
      "الحارث بن عبد المطلب",
      "حمزة بن عبد المطلب",
      "أبو طالب بن عبد المطلب",
      "العباس بن عبد المطلب",
    ],
    options: [
      "أبو طالب بن عبد المطلب",
      "العباس بن عبد المطلب",
      "الحارث بن عبد المطلب",
      "حمزة بن عبد المطلب",
    ],
  },
  {
    id: 10,
    title: "رَتبي مراحل جمع وتدوين القرآن الكريم تاريخياً:",
    correctOrder: [
      "الجمع في الصدور على عهد النبي صلى الله عليه وسلم",
      "الجمع في الصحف في عهد أبي بكر الصديق",
      "النسخ في المصاحف الموحدة في عهد عثمان بن عفان",
      "التنقيط والتشكيل في عهد بني أمية",
    ],
    options: [
      "النسخ في المصاحف الموحدة في عهد عثمان بن عفان",
      "الجمع في الصدور على عهد النبي صلى الله عليه وسلم",
      "التنقيط والتشكيل في عهد بني أمية",
      "الجمع في الصحف في عهد أبي بكر الصديق",
    ],
  },
];
export default function TimelineGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [userList, setUserList] = useState(challenges[0].options);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const levelData = challenges[currentLevel];

  const moveItem = (index, direction) => {
    const newList = [...userList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newList.length) return;

    // تبديل الأماكن
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;

    setUserList(newList);
  };

  const checkAnswer = () => {
    const isCorrect = userList.every(
      (item, idx) => item === levelData.correctOrder[idx]
    );

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setMessage("إجابة صحيحة وترتيب رائع! 🎉");
      setTimeout(() => {
        setMessage("");
        if (currentLevel + 1 < challenges.length) {
          setCurrentLevel((prev) => prev + 1);
          setUserList(challenges[currentLevel + 1].options);
        } else {
          setIsGameOver(true);
        }
      }, 1000);
    } else {
      setMessage("الترتيب غير صحيح بعد، حاولي مجدداً 💡");
    }
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setUserList(challenges[0].options);
    setScore(0);
    setMessage("");
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
     <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className="text-2xl font-bold mb-2 text-primary">لعبة الترتيب التاريخي</h1>
      <p className="text-sm text-gray-500 mb-6">رتبي العناصر بالأسهم لتصل للترتيب الصحيح</p>

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-4">
            المرحلة {currentLevel + 1} من {challenges.length}
          </p>

          <h2 className="text-sm font-bold text-gray-800 mb-6 leading-relaxed">
            {levelData.title}
          </h2>

          <div className="space-y-3 mb-6">
            {userList.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 border border-gray-100 py-3 px-4 rounded-xl shadow-sm"
              >
                <span className="text-sm font-bold text-gray-700">{item}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-100 disabled:opacity-30"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveItem(index, "down")}
                    disabled={index === userList.length - 1}
                    className="p-1 bg-white border border-gray-200 rounded-lg text-xs font-bold hover:bg-gray-100 disabled:opacity-30"
                  >
                    ▼
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={checkAnswer}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            تحقق من الترتيب
          </button>

          {message && (
            <p className="mt-4 font-bold text-sm text-primary">{message}</p>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">أهلاً بك! أنهيت التحدي بنجاح </h2>
          <p className="text-gray-500 mb-6">
            مجموع النقاط: <span className="font-bold text-primary text-xl">{score}</span>
          </p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            إعادة اللعبة
          </button>
        </div>
      )}
    </div>
  );
}