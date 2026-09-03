'use client';
import { useState } from "react";
import Link from "next/link";

const categoriesData = {
  "📖 القرآن الكريم": [
    {
      question: "ما هي أطول سورة في القرآن الكريم؟",
      options: ["سورة البقرة", "سورة آل عمران", "سورة النساء", "سورة الأعراف"],
      answer: "سورة البقرة"
    },
    {
      question: "ما هي أقصر سورة في القرآن الكريم؟",
      options: ["سورة العصر", "سورة الكوثر", "سورة الإخلاص", "سورة النصر"],
      answer: "سورة الكوثر"
    },
    {
      question: "كم عدد سور القرآن الكريم؟",
      options: ["110 سورة", "112 سورة", "114 سورة", "116 سورة"],
      answer: "114 سورة"
    },
    {
      question: "ما هي السورة التي تبدأ بـ (الحمد لله رب العالمين)؟",
      options: ["سورة البقرة", "سورة الفاتحة", "سورة الأنعام", "سورة الكهف"],
      answer: "سورة الفاتحة"
    },
    {
      question: "ما هي السورة التي لا تبدأ بالبسملة؟",
      options: ["سورة الأنفال", "سورة التوبة", "سورة يونس", "سورة هود"],
      answer: "سورة التوبة"
    },
    {
      question: "ما هي السورة التي ذُكر فيها البسملة مرتين؟",
      options: ["سورة النمل", "سورة يوسف", "سورة مريم", "سورة الرحمن"],
      answer: "سورة النمل"
    },
    {
      question: "في أي سورة وردت آية الكرسي؟",
      options: ["سورة آل عمران", "سورة البقرة", "سورة النساء", "سورة المائدة"],
      answer: "سورة البقرة"
    },
    {
      question: "ما هي أول سورة في ترتيب المصحف؟",
      options: ["سورة البقرة", "سورة الفاتحة", "سورة الإخلاص", "سورة العلق"],
      answer: "سورة الفاتحة"
    },
    {
      question: "ما هي آخر سورة في ترتيب المصحف؟",
      options: ["سورة الفلق", "سورة الإخلاص", "سورة الناس", "سورة النصر"],
      answer: "سورة الناس"
    },
    {
      question: "ما هي السورة التي تبدأ بقوله تعالى: (اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ)؟",
      options: ["سورة القلم", "سورة العلق", "سورة المدثر", "سورة المزمل"],
      answer: "سورة العلق"
    }
  ],

  "⚔️ السيرة النبوية": [
    {
      question: "في أي عام هجري فتح المسلمون مكة المكرمة؟",
      options: ["السنة السادسة للهجرة", "السنة الثامنة للهجرة", "السنة العاشرة للهجرة", "السنة الرابعة للهجرة"],
      answer: "السنة الثامنة للهجرة"
    },
    {
      question: "إلى أي مدينة هاجر النبي صلى الله عليه وسلم؟",
      options: ["مكة المكرمة", "الطائف", "المدينة المنورة", "بيت المقدس"],
      answer: "المدينة المنورة"
    },
    {
      question: "من كان رفيق النبي صلى الله عليه وسلم في الهجرة؟",
      options: ["عمر بن الخطاب", "أبو بكر الصديق", "عثمان بن عفان", "علي بن أبي طالب"],
      answer: "أبو بكر الصديق"
    },
    {
      question: "ما اسم الغار الذي اختبأ فيه النبي صلى الله عليه وسلم وأبو بكر أثناء الهجرة؟",
      options: ["غار حراء", "غار ثور", "غار أحد", "غار النور"],
      answer: "غار ثور"
    },
    {
      question: "أين نزل الوحي لأول مرة على النبي صلى الله عليه وسلم؟",
      options: ["غار ثور", "غار حراء", "المسجد الحرام", "المسجد النبوي"],
      answer: "غار حراء"
    },
    {
      question: "ما اسم الغزوة التي وقعت في السنة الثانية للهجرة وانتصر فيها المسلمون؟",
      options: ["غزوة أحد", "غزوة بدر", "غزوة الخندق", "غزوة تبوك"],
      answer: "غزوة بدر"
    },
    {
      question: "ما اسم الغزوة التي حفر فيها المسلمون الخندق؟",
      options: ["غزوة بدر", "غزوة أحد", "غزوة الأحزاب", "غزوة حنين"],
      answer: "غزوة الأحزاب"
    },
    {
      question: "من هو عم النبي صلى الله عليه وسلم الذي استشهد في غزوة أحد؟",
      options: ["العباس بن عبد المطلب", "حمزة بن عبد المطلب", "أبو لهب", "أبو طالب"],
      answer: "حمزة بن عبد المطلب"
    },
    {
      question: "في أي شهر وُلد النبي محمد صلى الله عليه وسلم على المشهور؟",
      options: ["رمضان", "محرم", "ربيع الأول", "ذو الحجة"],
      answer: "ربيع الأول"
    },
    {
      question: "كم سنة تقريبًا مكث النبي صلى الله عليه وسلم في مكة بعد البعثة قبل الهجرة؟",
      options: ["10 سنوات", "13 سنة", "15 سنة", "20 سنة"],
      answer: "13 سنة"
    }
  ],

 "⭐️ الصحابة الكرام": [
    {
      question: "من هو الصحابي الملقب بـ (ذي النورين)؟",
      options: ["عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب", "طلحة بن عبيد الله"],
      answer: "عثمان بن عفان"
    },
    {
      question: "من هو الصحابي الملقب بـ (سيف الله المسلول)؟",
      options: ["خالد بن الوليد", "حمزة بن عبد المطلب", "سعد بن أبي وقاص", "الزبير بن العوام"],
      answer: "خالد بن الوليد"
    },
    {
      question: "من هو أول الخلفاء الراشدين؟",
      options: ["عمر بن الخطاب", "عثمان بن عفان", "أبو بكر الصديق", "علي بن أبي طالب"],
      answer: "أبو بكر الصديق"
    },
    {
      question: "من هو ثاني الخلفاء الراشدين؟",
      options: ["عمر بن الخطاب", "عثمان بن عفان", "أبو بكر الصديق", "علي بن أبي طالب"],
      answer: "عمر بن الخطاب"
    },
    {
      question: "من هو الصحابي الذي كان رفيق النبي صلى الله عليه وسلم في الهجرة؟",
      options: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "بلال بن رباح"],
      answer: "أبو بكر الصديق"
    },
    {
      question: "من هو مؤذن رسول الله صلى الله عليه وسلم المشهور؟",
      options: ["بلال بن رباح", "سلمان الفارسي", "أبو هريرة", "أبو ذر الغفاري"],
      answer: "بلال بن رباح"
    },
    {
      question: "من هو الصحابي المعروف بلقب (ترجمان القرآن)؟",
      options: ["عبد الله بن عمر", "عبد الله بن عباس", "عبد الله بن مسعود", "أبو هريرة"],
      answer: "عبد الله بن عباس"
    },
    {
      question: "من هو الصحابي الذي أشار بحفر الخندق في غزوة الأحزاب؟",
      options: ["أبو بكر الصديق", "سلمان الفارسي", "خالد بن الوليد", "معاذ بن جبل"],
      answer: "سلمان الفارسي"
    },
    {
      question: "من هو الصحابي الذي كان أول سفير في الإسلام إلى المدينة قبل الهجرة؟",
      options: ["مصعب بن عمير", "بلال بن رباح", "أبو عبيدة بن الجراح", "سعد بن أبي وقاص"],
      answer: "مصعب بن عمير"
    },
    {
      question: "من هو الصحابي الذي لُقب بأمين هذه الأمة؟",
      options: ["أبو عبيدة بن الجراح", "عثمان بن عفان", "عبد الرحمن بن عوف", "الزبير بن العوام"],
      answer: "أبو عبيدة بن الجراح"
    }
  ],

  "🕋 الفقه والعبادات": [
    {
      question: "كم عدد الصلوات المفروضة في اليوم والليلة؟",
      options: ["ثلاث صلوات", "أربع صلوات", "خمس صلوات", "ست صلوات"],
      answer: "خمس صلوات"
    },
    {
      question: "ما هو الركن الأعظم في الحج؟",
      options: ["الطواف", "الوقوف بعرفة", "السعي", "رمي الجمرات"],
      answer: "الوقوف بعرفة"
    },
    {
      question: "في أي شهر يصوم المسلمون فريضة رمضان؟",
      options: ["شعبان", "رمضان", "شوال", "ذو الحجة"],
      answer: "رمضان"
    },
    {
      question: "كم عدد أركان الإسلام؟",
      options: ["ثلاثة", "أربعة", "خمسة", "ستة"],
      answer: "خمسة"
    },
    {
      question: "ما هي القبلة التي يتجه إليها المسلمون في الصلاة؟",
      options: ["المسجد النبوي", "الكعبة المشرفة", "المسجد الأقصى", "جبل عرفات"],
      answer: "الكعبة المشرفة"
    },
    {
      question: "كم عدد ركعات صلاة الفجر المفروضة؟",
      options: ["ركعة واحدة", "ركعتان", "ثلاث ركعات", "أربع ركعات"],
      answer: "ركعتان"
    },
    {
      question: "كم عدد ركعات صلاة المغرب المفروضة؟",
      options: ["ركعتان", "ثلاث ركعات", "أربع ركعات", "خمس ركعات"],
      answer: "ثلاث ركعات"
    },
    {
      question: "ما هو الشهر الذي يؤدي فيه المسلمون فريضة الحج؟",
      options: ["رمضان", "محرم", "ذو الحجة", "رجب"],
      answer: "ذو الحجة"
    },
    {
      question: "ما هي الصلاة التي تكون في منتصف النهار؟",
      options: ["الفجر", "الظهر", "المغرب", "العشاء"],
      answer: "الظهر"
    },
    {
      question: "ما هي العبادة التي تجب على المسلم القادر مرة واحدة في العمر؟",
      options: ["الصيام", "الحج", "الصلاة", "الذكر"],
      answer: "الحج"
    }
  ]
};
const categoriesKeys = Object.keys(categoriesData);

export default function LuckyWheelGame() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  const spinWheel = () => {
    setIsSpinning(true);
    setSelectedOption(null);

    // تأثير حركة الدوران العشوائي للفئات
    let counter = 0;
    const interval = setInterval(() => {
      const randomCat = categoriesKeys[Math.floor(Math.random() * categoriesKeys.length)];
      setCurrentCategory(randomCat);
      counter++;

      if (counter > 10) {
        clearInterval(interval);
        setIsSpinning(false);

        // اختيار سؤال عشوائي من الفئة التي استقرت عليها العجلة
        const questionsList = categoriesData[randomCat];
        const randomQ = questionsList[Math.floor(Math.random() * questionsList.length)];
        setCurrentQuestion(randomQ);
      }
    }, 100);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.answer) {
      setScore((prev) => prev + 15);
    }

    setTimeout(() => {
      if (round < 5) {
        setRound((prev) => prev + 1);
        setCurrentQuestion(null);
        setCurrentCategory(null);
      } else {
        setIsGameOver(true);
      }
    }, 1000);
  };

  const restartGame = () => {
    setRound(1);
    setScore(0);
    setCurrentCategory(null);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
       <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      <h1 className="text-2xl font-bold mb-2 text-primary">عجلة التحدي </h1>
      <p className="text-sm text-gray-500 mb-6">اضغط لتدوير العجلة واكتشاف سؤالك!</p>

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"  >
          {!currentQuestion ? (
            <div className="py-8">
              {/* شكل العجلة البصري التفاعلي */}
              <div className={`w-36 h-36 mx-auto mb-6 rounded-full border-4 border-primary bg-primary/5 flex items-center justify-center transition-all shadow-inner ${isSpinning ? "animate-spin scale-105" : "scale-100"}`}>
                <span className="text-3xl">
              <svg width="230" height="250" viewBox="0 0 69 75" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M32 11V59M8 35H56M15 18L49 52M49 18L15 52" stroke="#F9A8D4" strokeWidth="2"/>
<circle cx="32" cy="35" r="6" fill="#EC4899"/>
<circle cx="32" cy="35" r="2.5" fill="white"/>

<circle cx="32" cy="18" r="2" fill="#F9A8D4"/>
<circle cx="49" cy="35" r="2" fill="#F9A8D4"/>
<circle cx="32" cy="52" r="2" fill="#F9A8D4"/>
<circle cx="15" cy="35" r="2" fill="#F9A8D4"/>

{/* <!-- ألوان خفيفة للأقسام --> */}
  <path d="M32 35L32 11A24 24 0 0 1 49 18Z"
        fill="#FCE7F3"/>
  <path d="M32 35L49 18A24 24 0 0 1 56 35Z"
        fill="#FBCFE8"/>
  <path d="M32 35L56 35A24 24 0 0 1 49 52Z"
        fill="#FCE7F3"/>
  <path d="M32 35L49 52A24 24 0 0 1 32 59Z"
        fill="#FBCFE8"/>
  <path d="M32 35L32 59A24 24 0 0 1 15 52Z"
        fill="#FCE7F3"/>
  <path d="M32 35L15 52A24 24 0 0 1 8 35Z"
        fill="#FBCFE8"/>
  <path d="M32 35L8 35A24 24 0 0 1 15 18Z"
        fill="#FCE7F3"/>
  <path d="M32 35L15 18A24 24 0 0 1 32 11Z"
        fill="#FBCFE8"/>



</svg>
                </span>
              </div>

              <div className="min-h-[40px] mb-6 flex items-center justify-center">
                <span className="text-base font-bold text-primary px-4 py-2 bg-primary/10 rounded-xl">
                  {currentCategory ? currentCategory : "اضغطي الدوران لاختيار الفئة..."}
                </span>
              </div>

              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSpinning ? "جاري تدوير العجلة... 🔄" : "دور العجلة الآن! "}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {currentCategory}
                </span>
                <span className="text-xs text-gray-400">السؤال {round} / 40</span>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                <h2 className="text-base font-bold text-gray-800 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  let btnColor = "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100";
                  if (selectedOption) {
                    if (option === currentQuestion.answer) {
                      btnColor = "bg-green-500 text-white shadow-md";
                    } else if (option === selectedOption) {
                      btnColor = "bg-red-500 text-white animate-pulse";
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(option)}
                      disabled={selectedOption !== null}
                      className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-sm ${btnColor}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">أنهيت المسابقة بامتياز! 🌟</h2>
          <p className="text-gray-500 mb-6">
            مجموع النقاط: <span className="font-bold text-primary text-xl">{score}</span> نقطة
          </p>
          <button
            onClick={restartGame}
            className="w-full py-3 bg-primary text-white rounded-xl shadow font-bold hover:opacity-90 transition-all"
          >
            إعادة اللعبة من جديد
          </button>
        </div>
      )}
    </div>
  );
}