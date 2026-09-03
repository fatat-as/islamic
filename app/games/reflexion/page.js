"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const reflectionsData = [
  { id: 1, name: "السَّمِيعُ", meaning: "الذي أحاط سمعه بكل الأصوات (سرّها وعلنها) في وقت واحد دون أن يشغله صوت عن صوت، ويستجيب لدعاء من دعاه." },
  { id: 2, name: "الْكَرِيمُ", meaning: "   هو كثير الخير، دائم العطاء، الذي يعطي بلا مقابل، ويجود بفضله على عباده سواء سألوه أم لا، ولا يخيب من رجاه." },
  { id: 3, name: "التَّوَّابُ", meaning: "    هو الذي يوفق عباده للتوبة ويرشدهم إليها، ويقبل توبتهم مراراً وتكراراً مهما عظمت ذنوبهم إذا صدقوا في رجوعهم إليه." },
  { id: 4, name: "الْوَهَّابُ", meaning: "  الذي يهب النعم والعطايا الكثيرة بلا عوض ولا غاية، ويجود بفضله وكرمه على عباده فيمنحهم الرزق، والذرية، وكل ما ينتفعون به تفضلاً منه ورحمة. " },
  { id: 5, name: "الْحَكِيمُ", meaning: "   الذي له الحكمة التامة في خلقه وأمره، فلا يخلق شيئاً عبثاً، ولا يشرع حكماً إلا لحكمة بالغة ومصلحة عظيمة، وهو الذي يضع الأمور في مواضعها الصحيحة بدقة وعدل " },
  { id: 6, name: "الرَّحْمَنُ", meaning: "  ذو الرحمة الواسعة العظيمة التي وسعت كل شيء، والذي عمّت رحمته جميع المخلوقات (المؤمن والكافر) في الدنيا، ويختص برحمته يوم القيامة عباده المؤمنين.  " },
  { id: 7, name: "الْغَفَّارُ", meaning: "  الكثير المغفرة، الذي يستر ذنوب عباده ويتجاوز عنها مرة بعد مرة كلما تابوا وأنابوا إليه.  " },
  { id: 8, name: "اللَّطِيفُ", meaning: "   العليم بدقائق الأمور وخفاياها، والذي يُوصل البر والإحسان إلى عباده بلطف ومن حيث لا يحتسبون " },
  { id: 9, name: "الْفَتَّاحُ", meaning: " الذي يفتح أبواب رحمته، ورزقه، ونصره على عباده  " },
  { id: 10, name: "الشَّكُورُ", meaning: "  الذي يثيب على العمل القليل بالجزاء الكثير، ويقبل اليسير من طاعة عباده ويضاعف أجرهم.  " },
  { id: 11, name: "السَّلَامُ", meaning: " السالم من كل عيب ونقص وفناء، ومصدر الأمن والسلامة لخلائقِه  " },
  { id: 12, name: "الْوَدُودُ", meaning: "  المحب لرسله وأوليائه، والمحبوب في قلوبهم، الذي يود عباده بالنعم والمحبة والرضا " },
  { id: 13, name: "الْمُهَيْمِنُ", meaning: " الرقيب المسيطر على خلقه، الحافظ لأعمالهم، الشاهد عليها، القائم عليها بالتدبير والحفظ  " },
  { id: 14, name: "الرَّؤوفُ", meaning: "  صاحب الرأفة الشديدة والرحمة البالغة بعباده، الذي يخفف عنهم ويرفق بهم ويدفع عنهم المشاق. " },
  { id: 15, name: "الْبَصِيرُ", meaning: " الذي يرى كل شيء مهما دق وصغر، فلا تخفى عليه خافية في الأرض ولا في السماء، مبصر بأحوال عباده وأعمالهم.  " }
];

export default function ReflectionGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMeaning, setSelectedMeaning] = useState(null);
  const [score, setScore] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentItem = reflectionsData[currentIndex];

  // توليد 4 خيارات عشوائية لكل سؤال تتضمن المعنى الصحيح
  useEffect(() => {
    if (!currentItem) return;
    const wrongOptions = reflectionsData
      .filter((item) => item.id !== currentItem.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.meaning);

    const options = [...wrongOptions, currentItem.meaning].sort(() => Math.random() - 0.5);
    setCurrentOptions(options);
  }, [currentIndex]);

  const handleSelect = (meaning) => {
    setSelectedMeaning(meaning);
    if (meaning === currentItem.meaning) {
      setScore((prev) => prev + 10);
    }

    setTimeout(() => {
      setSelectedMeaning(null);
      if (currentIndex + 1 < reflectionsData.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsGameOver(true);
      }
    }, 900);
  };

  const restartGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedMeaning(null);
    setIsGameOver(false);
  };

  return (
    <div className="max-w-md mx-auto text-center py-8 px-4">
     <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      
      <p className="text-sm text-gray-500 mb-6">اختار المعنى الصحيح لاسم الله الكريم</p>

      {!isGameOver ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-2">السؤال {currentIndex + 1} من {reflectionsData.length}</p>
          
          <div className="text-2xl font-bold text-primary my-4 bg-gray-50 py-4 rounded-2xl border border-gray-100">
            {currentItem.name}
          </div>

          <div className="space-y-3">
            {currentOptions.map((meaning, index) => {
              let btnColor = "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-100";
              if (selectedMeaning) {
                if (meaning === currentItem.meaning) {
                  btnColor = "bg-green-500 text-white";
                } else if (meaning === selectedMeaning) {
                  btnColor = "bg-red-500 text-white";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(meaning)}
                  disabled={selectedMeaning !== null}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-sm ${btnColor}`}
                >
                  {meaning}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2 text-gray-800">    اعلم أن أسماء الله وصفاته حق على ما يليق بجلاله، بلا تمثيل (تشبيه بصفات المخلوقين)، ولا تكييف (كيفية وصفه تعالى)، ولا تحريف ولا تعطيل.
ولتفصيل معاني أسماء الله الحسنى على منهج أهل السنة والجماعة، ننصحك بزيارة موسوعة الدرر السنية فهي مرجع موثوق وشامل. </h2>
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