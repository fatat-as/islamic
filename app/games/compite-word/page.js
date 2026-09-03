"use client";
import { useState } from "react";
import Link from "next/link";

const levels = [
  {
    text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ .......",
    options: ["الْقُلُوبُ", "النُّفُوسُ", "الصُّدُورُ", "الْعُقُولُ"],
    answer: "الْقُلُوبُ",
  },
  {
    text: "إِنَّ مَعَ الْعُسْرِ .......",
    options: ["يُسْرًا", "فَرَجًا", "صَبْرًا", "رَحْمَةً"],
    answer: "يُسْرًا",
  },
  {
    text: "لَا تَحْزَنْ إِنَّ اللَّهَ .......",
    options: ["مَعَنَا", "يَرَانَا", "سَيَهْدِينَا", "يَسْمَعُنَا"],
    answer: "مَعَنَا",
  },
  {
    text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ .......",
    options: ["مَخْرَجًا", "سَهْلًا", "رِزْقًا", "نُورًا"],
    answer: "مَخْرَجًا",
  },
  {
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا، إِنَّ مَعَ الْعُسْرِ .......",
    options: ["يُسْرًا", "فَرَجًا", "خَيْرًا", "نَصْرًا"],
    answer: "يُسْرًا",
  },
  {
    text: "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ .......",
    options: ["فَتَرْضَىٰ", "فَتَسْعَدَ", "فَتَطْمَئِنَّ", "فَتَفْرَحَ"],
    answer: "فَتَرْضَىٰ",
  },
  {
    text: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ .......",
    options: ["أَقْدَامَنَا", "قُلُوبَنَا", "إِيمَانَنَا", "صُدُورَنَا"],
    answer: "أَقْدَامَنَا",
  },
  {
    text: "حَسْبُنَا اللَّهُ وَنِعْمَ .......",
    options: ["الْوَكِيلُ", "النَّصِيرُ", "الْمَوْلَىٰ", "الْحَفِيظُ"],
    answer: "الْوَكِيلُ",
  },
  {
    text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ .......",
    options: ["حَسْبُهُ", "وَلِيُّهُ", "نَاصِرُهُ", "هَادِيهِ"],
    answer: "حَسْبُهُ",
  },
  {
    text: "وَاذْكُر رَّبَّكَ إِذَا .......",
    options: ["نَسِيتَ", "خِفْتَ", "حَزِنْتَ", "دَعَوْتَ"],
    answer: "نَسِيتَ",
  },
];

export default function CompleteWordGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentLevel = levels[currentIndex];

  const handleAnswerClick = (option) => {
    setSelectedOption(option);
    if (option === currentLevel.answer) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < levels.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 800);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-12 px-4">
     <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className="text-2xl font-bold mb-4 text-primary">أكمل الفراغ</h1>

      {!isGameOver ? (
        <div>
          <p className="text-sm text-gray-500 mb-6">
            السؤال {currentIndex + 1} من {levels.length}
          </p>

          <div className="bg-white p-8 rounded-2xl shadow-sm mb-6 border border-gray-100">
            <h2 className="text-xl font-bold mb-8 text-gray-800 tracking-wide">
              {currentLevel.text}
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {currentLevel.options.map((option, index) => {
                let btnColor = "bg-gray-50 hover:bg-gray-100 text-gray-700";
                if (selectedOption) {
                  if (option === currentLevel.answer) {
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
                    className={`py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${btnColor}`}
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
          <h2 className="text-xl font-bold mb-2 text-gray-800"> أنهيت اللعبة </h2>
          <p className="text-gray-500 mb-6">
            مجموع النقاط: <span className="font-bold text-primary text-xl">{score}</span>
          </p>
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