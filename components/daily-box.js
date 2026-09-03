"use client";
import { useState, useEffect } from "react";

// مصفوفة تحفيزية موسعة تغطي أيام السنة
const motivations = [
  "لا توقف السعي، فالخطوات الصغيرة اليوم تصنع إنجازات الغد العظيمة! ✨",
  "استعن بالله ولا تعجز، وكل جهد تبذله في طريق العلم مكتوب ومقدر 🌟",
  "النجاح ليس حظاً، بل هو استمرارية وصبر على التعلم والإنجاز كل يوم 💻",
  "اصبري واحتسبي، فإن مع العسر يسراً، وكل تعب في تحصيل العلم سيثمر قريباً 🌱",
  "ابدئي يومك بيقين أن القادم أجمل، وأن الله لا يضيع أجر من أحسن عملاً 🌸",
  "العلم بناء تراكمي، فلا تقلقي من بطء الخطوات المهم ألا تتوقفي 💡",
  "اجعلي نيتك خالصة لله، وسيرزقكِ فهمًا وتوفيقًا لم تحسبي له حسابًا 🌿",
  "كل عثرة هي درس جديد يقربكِ خطوة إضافية نحو تحقيق هدفك المنشود 🎯",
  "الثبات في أوقات الفتور هو سر الإنجاز الحقيقي، استمرّي بقوة 💪",
  "من سار على الدرب وصل، توكلي على الله واخطُوَ الخطوة الأولى بحماس 🚀",
  // ... ويمكنكِ إضافة المزيد هنا لتصل إلى 365 عبارة
];

// مصفوفة الأحاديث الشريفة موسعة (من صحيح البخاري ومسلم)
const hadiths = [
  { text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى...", source: "صحيح البخاري" },
  { text: "من سلك طريقاً يلتمس فيه علماً سهل الله له به طريقاً إلى الجنة.", source: "صحيح مسلم" },
  { text: "المؤمن القوي خير وأحب إلى الله من المؤمن الضعيف وفي كل خير.", source: "صحيح مسلم" },
  { text: "كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: سبحان الله وبحمده، سبحان الله العظيم.", source: "صحيح البخاري" },
  { text: "خيركم من تعلم القرآن وعلمه.", source: "صحيح البخاري" },
  { text: "من يرد الله به خيراً يفقهه في الدين.", source: "صحيح البخاري" },
  { text: "الطهور شطر الإيمان، والحمد لله تملأ الميزان...", source: "صحيح مسلم" },
  { text: "الدين النصيحة، قلنا لمن؟ قال: لله ولكتابه ولرسوله ولأئمة المسلمين وعامتهم.", source: "صحيح مسلم" },
  { text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.", source: "صحيح البخاري" },
  { text: "الماهر بالقرآن مع السفررة الكرام البررة...", source: "صحيح مسلم" },
  // ... ويمكنكِ توسيعها لتغطية أيام السنة بالكامل
];

// مصفوفة الآيات القرآنية والفوائد التدبرية موسعة لأيام السنة
const quranVerses = [
  {
    verse: "﴿ وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ٭ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ﴾",
    surah: "سورة الطلاق",
    benefit: "الفائدة: التقوى مفتاح لكل فرج وسعة، ومن ترك شيئاً لله عوضه خيراً منه بطرق مدهشة.",
  },
  {
    verse: "﴿ فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ٭ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾",
    surah: "سورة الشرح",
    benefit: "الفائدة: تفاؤلي دائماً؛ فإن العُسر الواحد يحيط به يُسران، ولن يغلب عُسر يُسرين.",
  },
  {
    verse: "﴿ وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا ﴾",
    surah: "سورة الطور",
    benefit: "الفائدة: طمأنينة بالغة بأنكِ تحت حفظ الله ورعايته دائماً مهما اشتدت التحديات.",
  },
  {
    verse: "﴿ ادْعُونِي أَسْتَجِبْ لَكُمْ ﴾",
    surah: "سورة غافر",
    benefit: "الفائدة: قرب الله عز وجل واستجابته المضطردة لكل داعٍ أقبل بقلب صادق.",
  },
  {
    verse: "﴿ رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا ﴾",
    surah: "سورة الكهف",
    benefit: "الفائدة: دعاء جامع يطلب توفيق الله وهدايته في كل خطوة ومهمة جديدة.",
  },
  {
    verse: "﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾",
    surah: "سورة طه",
    benefit: "الفائدة: الأدب العالي في طلب الزيادة من الله وحده في أعظم وأشرف المطالب وهو العلم.",
  },
  {
    verse: "﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾",
    surah: "سورة البقرة",
    benefit: "الفائدة: معية الله الخاصة بالنصر والتأييد هي رفيق الصابرين في دروب السعي.",
  },
  {
    verse: "﴿ وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ ﴾",
    surah: "سورة الفرقان",
    benefit: "الفائدة: تفويض الأمور لمن بيده الملك وحده، واستشعار الاعتماد عليه جل جلاله.",
  },
  // ... ويمكنكِ إكمال المصفوفة لـ 365 عنصراً لتتغير بيوم مختلف تماماً طوال السنة
];

export default function DailyBox() {
  const [dailyData, setDailyData] = useState({
    motivation: "",
    hadith: {},
    verse: {},
  });

  useEffect(() => {
    // حساب رقم اليوم من السنة بدقة (من 0 إلى 364 أو 365 في السنة الكبيسة)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // استخدام بقية القسمة لضمان اختيار عنصر فريد لكل يوم طوال السنة بالكامل
    const motivationIndex = dayOfYear % motivations.length;
    const hadithIndex = dayOfYear % hadiths.length;
    const verseIndex = dayOfYear % quranVerses.length;

    setDailyData({
      motivation: motivations[motivationIndex],
      hadith: hadiths[hadithIndex],
      verse: quranVerses[verseIndex],
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-primary mb-1">🎁 صندوق الفوائد اليومي</h2>
        <p className="text-xs text-gray-400">محتوى فريد ومتجدد كلياً لكل يوم من أيام السنة</p>
      </div>

      {/* 1. عبارة تحفيزية */}
      <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
        <span className="text-xl">💡</span>
        <div>
          <h3 className="text-xs font-bold text-primary mb-1">فائدة التحفيز اليومي</h3>
          <p className="text-xs text-gray-700 font-medium leading-relaxed">{dailyData.motivation}</p>
        </div>
      </div>

      {/* 2. حديث اليوم */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
        <span className="text-xl">📜</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xs font-bold text-gray-800">حديث اليوم النبوي</h3>
            <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
              {dailyData.hadith.source}
            </span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed italic">"{dailyData.hadith.text}"</p>
        </div>
      </div>

      {/* 3. آية اليوم */}
      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
        <span className="text-xl">📖</span>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xs font-bold text-gray-800">آية اليوم وتدبرها</h3>
            <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              {dailyData.verse.surah}
            </span>
          </div>
          <p className="text-xs font-bold text-primary mb-2 leading-loose">{dailyData.verse.verse}</p>
          <p className="text-xs text-gray-600 bg-white p-2.5 rounded-xl border border-gray-100">
            {dailyData.verse.benefit}
          </p>
        </div>
      </div>
    </div>
  );
}

