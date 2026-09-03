"use client";
import { useState } from "react";
import Link from "next/link";

const questionsData = [
  {
    ayah: "مَالِكِ يَوْمِ الدِّينِ",
    options: ["سورة الفاتحة", "سورة البقرة", "سورة الناس", "سورة الإخلاص"],
    answer: "سورة الفاتحة",
  },
  {
    ayah: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ",
    options: ["سورة الكهف", "سورة البقرة", "سورة الملك", "سورة يس"],
    answer: "سورة البقرة",
  },
  {
    ayah: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    options: ["سورة الكافرون", "سورة الفلق", "سورة الإخلاص", "سورة الناس"],
    answer: "سورة الإخلاص",
  },
  {
    ayah: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
    options: ["سورة النصر", "سورة العصر", "سورة قريش", "سورة الكوثر"],
    answer: "سورة النصر",
  },
  {
    ayah: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    options: ["سورة الماعون", "سورة الكوثر", "سورة الفلق", "سورة التكاثر"],
    answer: "سورة الكوثر",
  },
  {
    ayah: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
    options: ["سورة الناس", "سورة الإخلاص", "سورة الفلق", "سورة الكافرون"],
    answer: "سورة الفلق",
  },
  {
    ayah: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
    options: ["سورة الفلق", "سورة الناس", "سورة الكافرون", "سورة المسد"],
    answer: "سورة الناس",
  },
  {
    ayah: "تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    options: ["سورة الملك", "سورة الواقعة", "سورة الرحمن", "سورة يس"],
    answer: "سورة الملك",
  },
  {
    ayah: "يس وَالْقُرْآنِ الْحَكِيمِ",
    options: ["سورة طه", "سورة يس", "سورة مريم", "سورة الحجر"],
    answer: "سورة يس",
  },
  {
    ayah: "الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ",
    options: ["سورة الواقعة", "سورة الرحمن", "سورة الحاقة", "سورة القيامة"],
    answer: "سورة الرحمن",
  },
  {
    ayah: "إِذَا وَقَعَتِ الْوَاقِعَةُ",
    options: ["سورة القيامة", "سورة الحاقة", "سورة الواقعة", "سورة النبأ"],
    answer: "سورة الواقعة",
  },
  {
    ayah: "عَمَّ يَتَسَاءَلُونَ عَنِ النَّبَإِ الْعَظِيمِ",
    options: ["سورة النازعات", "سورة النبأ", "سورة عبس", "سورة التكوير"],
    answer: "سورة النبأ",
  },
  {
    ayah: "وَالْعَادِيَاتِ ضَبْحًا",
    options: ["سورة الزلزلة", "سورة العاديات", "سورة القارعة", "سورة العصر"],
    answer: "سورة العاديات",
  },
  {
    ayah: "إِذَا زُلْزِلَتِ الْأَرْضُ زِلْزَالَهَا",
    options: ["سورة العاديات", "سورة القارعة", "سورة الزلزلة", "سورة التكاثر"],
    answer: "سورة الزلزلة",
  },
  {
    ayah: "أَلْهَاكُمُ التَّكَاثُرُ حَتَّى زُرْتُمُ الْمَقَابِرَ",
    options: ["سورة العصر", "سورة التكاثر", "سورة الماعون", "سورة الهمزة"],
    answer: "سورة التكاثر",
  },
  {
    ayah: "وَالْعَصْرِ إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
    options: ["سورة الفلق", "سورة العصر", "سورة قريش", "سورة النصر"],
    answer: "سورة العصر",
  },
  {
    ayah: "لِإِيلَافِ قُرَيْشٍ إِيلَافِهِم رِحْلَةَ الشِّتَاءِ وَالصَّيْفِ",
    options: ["سورة الماعون", "سورة الفيل", "سورة قريش", "سورة الكوثر"],
    answer: "سورة قريش",
  },
  {
    ayah: "أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ",
    options: ["سورة قريش", "سورة الفيل", "سورة الماعون", "سورة المسد"],
    answer: "سورة الفيل",
  },
  {
    ayah: "أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ",
    options: ["سورة الماعون", "سورة الكوثر", "سورة القريش", "سورة العصر"],
    answer: "سورة الماعون",
  },
  {
    ayah: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
    options: ["سورة الكافرون", "سورة الإخلاص", "سورة المسد", "سورة الفلق"],
    answer: "سورة المسد",
  },
];
export default function GuessSurahGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = questionsData[currentIndex];

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (option === currentItem.answer) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < questionsData.length) {
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

      <h1 className="text-2xl font-bold mb-2 text-primary">احزر السورة</h1>
      <p className="text-sm text-gray-500 mb-6">اعرف السورة التي تنتمي إليها الآية الكريمة</p>

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-4">السؤال {currentIndex + 1} من {questionsData.length}</p>
          
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
            <h2 className="text-xl font-bold text-gray-800 leading-relaxed font-serif">
              "{currentItem.ayah}"
            </h2>
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
          <h2 className="text-xl font-bold mb-2 text-gray-800">ما شاء الله! أنهيت التحدي </h2>
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