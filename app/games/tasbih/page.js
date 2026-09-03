"use client";
import { useState } from "react";
import Link from "next/link";
import QuizMascot from "../../../components/QuizMascot";

// نمط تسبيح دبر الصلاة الكلاسيكي: 33 + 33 + 33 + 1 = 100
const STAGES = [
  { phrase: "سبحان الله", target: 33 },
  { phrase: "الحمد لله", target: 33 },
  { phrase: "الله أكبر", target: 34 },
  { phrase: "اللهم أعني على ذكرك وشكرك وحسن عبادتك", target: 1 },
];

export default function TasbihGamePage() {
  const [stageIndex, setStageIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pop, setPop] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const stage = STAGES[stageIndex];
  const finished = stageIndex >= STAGES.length;

  const tap = () => {
    if (finished) return;
    setPop(true);
    setTimeout(() => setPop(false), 150);

    const next = count + 1;
    setTotalCount((t) => t + 1);

    if (next >= stage.target) {
      setCelebrate(true);
      setTimeout(() => {
        setCelebrate(false);
        setCount(0);
        setStageIndex((i) => i + 1);
      }, 700);
    } else {
      setCount(next);
    }
  };

  const restart = () => {
    setStageIndex(0);
    setCount(0);
    setTotalCount(0);
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
      <h1 className="text-xl font-bold text-primary mb-1">سبحة رقمية</h1>
      <p className="text-sm text-gray-500 mb-6">ما علّمه النبي صلى الله عليه وسلم لابنته فاطمة رضي الله عنها وزوجها علي بن أبي طالب رضي الله عنهما عندما اشتكيا من تعب العمل وخدمة البيت:</p>
<p>
عَنْ عَلِيٍّ رضي الله عنه؛ «أَنَّ فَاطِمَةَ رضي الله عنها شَكَتْ مَا تَلْقَى فِي يَدِهَا مِنَ الرَّحَى (أثر الطحين والعمل)، وأتَى النَّبِيَّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ سَبْيٌ، فَانْطَلَقَتْ فَلَمْ تَجِدْهُ، فَوَجَدَتْ عَائِشَةَ فَأَخْبَرَتْهَا، فَلَمَّا جَاءَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ أَخْبَرَتْهُ عَائِشَةُ، فَجَاءَنَا وَقَدْ أَخَذْنَا مَضَاجِعَنَا، فَذَهَبْتُ أَقُومُ، فَقَالَ: عَلَى مَكَانِكُمَا، فَقَعَدَ بَيْنَنَا حَتَّى وَجَدْتُ بَرْدَ قَدَمَيْهِ عَلَى صَدْرِي، وَقَالَ: أَلاَ أُعَلِّمُكُمَا خَيراً مِمَّا سَأَلْتُمَاهُ؟ إِذَا أَخَذْتُمَا مَضَاجِعَكُمَا، أَوْ أَخَذْتُمَا مَطَاجِعَكُمَا، فَسَبِّحَا ثَلاَثاً وَثَلاَثِينَ، وَاحْمَدَا ثَلاَثاً وَثَلاَثِينَ، وَكَبِّرَا أَرْبَعاً وَثَلاَثِينَ، فَهُوَ خَيْرٌ لَكُمَا مِنْ خَادِمٍ» (وفي رواية أخرى: وتكبرا أربعاً وثلاثين إذا أويتما إلى فراشكما).
تخريج الحديث (المصدر):
 * رواه الإمام البخاري في صحيحه (برقم 3113، 5362)، والإمام مسلم في صحيحه (برقم 2727)، وغيرهما من أصحاب السنن.</p>

      {!finished ? (
        <>
          <QuizMascot mood={celebrate ? "happy" : "idle"} size={80} />

          <p className="text-2xl font-bold text-primary my-4">{stage.phrase}</p>

          <button
            onClick={tap}
            className={`w-40 h-40 rounded-full text-white text-4xl font-bold shadow-lg mx-auto flex items-center justify-center transition-transform ${
              pop ? "scale-90" : "scale-100"
            }`}
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {count} / {stage.target}
          </button>

          <p className="text-sm text-gray-400 mt-4">دوس على الحبة لعدّ التسبيح</p>
          <p className="text-xs text-gray-400 mt-1">الإجمالي: {totalCount} / 100</p>
        </>
      ) : (
        <div className="card">
          <QuizMascot mood="happy" size={90} />
          <p className="font-bold text-lg mt-2"> تقبّل الله منك</p>
          <p className="text-gray-500 text-sm mt-1">   بارك الله فيك ! نسأل الله أن يثبتك على ذكره وشكره وحسن عبادته،ويعينك بكل أمور حياتك (100)</p>
          <button onClick={restart} className="btn-primary mt-4">🔁 ابدئي من جديد</button>
        </div>
      )}
    </div>
  );
}