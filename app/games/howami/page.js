"use client";
import { useState } from "react";
import Link from "next/link";
const riddlesData = [
  {
    id: 1,
    hints: [
      "أنا أول الخلفاء الراشدين.",
      "رافقت النبي صلى الله عليه وسلم في الهجرة.",
      "لُقِّبت بالصديق."
    ],
    options: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"],
    answer: "أبو بكر الصديق"
  },
  {
    id: 2,
    hints: [
      "أنا زوجة النبي صلى الله عليه وسلم الأولى.",
      "آمنت به قبل الجميع وسترتْه في بداية الدعوة.",
      "أمر النبي ببشرى بيتها في الجنة من قصب."
    ],
    options: ["عائشة بنت أبي بكر", "خديجة بنت خويلد", "فاطمة الزهراء", "حفصة بنت عمر"],
    answer: "خديجة بنت خويلد"
  },
  {
    id: 3,
    hints: [
      "أنا سيف الله المسلول.",
      "لم أُهزم في معركة قط قائداً في الإسلام.",
      "قُدتُ المسلمين في فتوحات عظيمة."
    ],
    options: ["خالد بن الوليد", "حمزة بن عبد المطلب", "عمر بن العاص", "سعد بن أبي وقاص"],
    answer: "خالد بن الوليد"
  },
  {
    id: 4,
    hints: [
      "أنا أول مؤذن في الإسلام.",
      "عُذّبتُ في مكة وكنت أقول: أحدٌ أحد.",
      "اختاره النبي صلى الله عليه وسلم ليرفع الأذان."
    ],
    options: ["عمار بن ياسر", "بلال بن رباح", "صهيب الرومي", "سلمان الفارسي"],
    answer: "بلال بن رباح"
  },
  {
    id: 5,
    hints: [
      "أنا الفاروق الذي فرق الله بي بين الحق والباطل.",
      "أنا ثاني الخلفاء الراشدين.",
      "فُتحت في عهدي القدس ومفتاحها."
    ],
    options: ["عمر بن الخطاب", "عثمان بن عفان", "أبو بكر الصديق", "علي بن أبي طالب"],
    answer: "عمر بن الخطاب"
  },
  {
    id: 6,
    hints: [
      "أنا ذو النورين لتزويجي ابنتي النبي صلى الله عليه وسلم.",
      "أنا ثالث الخلفاء الراشدين.",
      "في عهدي جُمع القرآن الكريم في مصحف واحد موحد."
    ],
    options: ["علي بن أبي طالب", "عثمان بن عفان", "معاوية بن أبي سفيان", "طلحة بن عبيد الله"],
    answer: "عثمان بن عفان"
  },
  {
    id: 7,
    hints: [
      "أنا ابن عم النبي صلى الله عليه وسلم وزوج ابنته فاطمة.",
      "أنا رابع الخلفاء الراشدين.",
      "كنت أول فتى أسلم في صباه."
    ],
    options: ["علي بن أبي طالب", "جعفر بن أبي طالب", "عباس بن عبد المطلب", "عقيل بن أبي طالب"],
    answer: "علي بن أبي طالب"
  },
  {
    id: 8,
    hints: [
      "أنا عم النبي صلى الله عليه وسلم ولُقّبت بأسد الله.",
      "استشهدتُ في غزوة أحد.",
      "كان النبي يحبني حباً عظيماً."
    ],
    options: ["العباس بن عبد المطلب", "حمزة بن عبد المطلب", "أبو طالب", "الحارث بن عبد المطلب"],
    answer: "حمزة بن عبد المطلب"
  },
  {
    id: 9,
    hints: [
      "أنا الصحابي الذي دلّ النبي صلى الله عليه وسلم وأبا بكر على طريق الهجرة غير المعتاد (دليل الهجرة).",
      "لم أكن مسلماً وقت الهجرة بل استأجراني كدليل أمين.",
      "أسلمت بعد ذلك وحسن إسلامي."
    ],
    options: ["عبد الله بن أريقط", "سراقة بن مالك", "زيد بن حارثة", "أبو بكر الصديق"],
    answer: "عبد الله بن أريقط"
  },
  {
    id: 10,
    hints: [
      "أنا ترجمان القرآن وابن عم النبي صلى الله عليه وسلم.",
      "دعا لي النبي صلى الله عليه وسلم بقوله: 'اللهم فقهه في الدين وعلمه التأويل'.",
      "كنت بحراً في علم التفسير والفقه."
    ],
    options: ["عبد الله بن عباس", "عبد الله بن مسعود", "أبو هريرة", "انس بن مالك"],
    answer: "عبد الله بن عباس"
  }
];
export default function WhoAmIGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = riddlesData[currentIndex];

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (option === currentItem.answer) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < riddlesData.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 900);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
    <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      
      <h1 className="text-2xl font-bold mb-2 text-primary">لعبة من أنا؟</h1>
      <p className="text-sm text-gray-500 mb-6">إقرء التلميحات واكتشفي الشخصية المقصودة</p>

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-4">السؤال {currentIndex + 1} من {riddlesData.length}</p>
          
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-6 space-y-2 text-right">
            {currentItem.hints.map((hint, idx) => (
              <p key={idx} className="text-sm font-semibold text-gray-700">
                ⭐ {hint}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            {currentItem.options.map((option, index) => {
              let btnColor = "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100";
              if (selectedOption) {
                if (option === currentItem.answer) {
                  btnColor = "bg-green-500 text-white";
                } else if (option === selectedOption) {
                  btnColor = "bg-red-500 text-white";
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