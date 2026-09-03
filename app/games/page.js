import Link from "next/link";

export default function GamesHubPage() {
  return (
    <div>
      {/* <h1 className="text-2xl font-bold text-primary mb-2">🎮 ألعاب دينية</h1> */}
      {/* <p className="text-gray-600 mb-6">تعلّمي وأنتِ تلعبي — ألعاب لطيفة لتثبيت الأذكار والمعلومات الشرعية</p> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href="/games/memory" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
         
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- البطاقة الخلفية --> */}
  <rect x="8" y="10" width="30" height="40" rx="7"
        fill="#FCE7F3" stroke="#EC4899" stroke-width="2"/>

  {/* <!-- البطاقة الأمامية --> */}
  <rect x="26" y="14" width="30" height="40" rx="7"
        fill="#FFF0F7" stroke="#EC4899" stroke-width="2"/>

  {/* <!-- نجمة إسلامية بسيطة --> */}
  <path d="M41 22L43.5 28L50 28.5L45 32.5L46.5 39L41 35.5L35.5 39L37 32.5L32 28.5L38.5 28L41 22Z"
        fill="#F9A8D4"/>
{/* 
  <!-- خطوط الذكر --> */}
  <path d="M33 43H49" stroke="#EC4899" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M36 48H46" stroke="#F472B6" stroke-width="2.5" stroke-linecap="round"/>
</svg>

          </div>
          <h2 className="font-bold text-lg mb-1">لعبة الأذكار</h2>
          <p className="text-sm text-gray-500">لاقي أزواج الأذكار المتطابقة</p>
        </Link>

        <Link href="/games/ai-quiz" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">

            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- الخلفية --> */}
  <rect x="6" y="6" width="52" height="52" rx="16" fill="#FFF0F7"/>

  {/* <!-- علامة الصح --> */}
  <circle cx="24" cy="32" r="13" fill="#DCFCE7"/>
  <path d="M17 32L22 37L31 27"
        stroke="#22C55E"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"/>
{/* 
  <!-- علامة الخطأ --> */}
  <circle cx="42" cy="32" r="13" fill="#FCE7F3"/>
  <path d="M37 27L47 37M47 27L37 37"
        stroke="#EC4899"
        stroke-width="3.5"
        stroke-linecap="round"/>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1">صح ولا خطأ؟</h2>
          <p className="text-sm text-gray-500">اختبر معلوماتك الدينية </p>
        </Link>

    <Link href="/games/lucky" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </div>
          <h2 className="font-bold text-lg mb-1">
عجلة التحدي 
          </h2>
          <p className="text-sm text-gray-500"> أدر العجلة  وخض تحديًا عشوائيًا في معلوماتك الإسلامية!  </p>
        </Link>

           <Link href="/games/wordser" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3"> 
          <svg width="50" height="50" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  {/* <!-- خلفية دائرية ناعمة --> */}
  <circle cx="60" cy="60" r="55" fill="#e0f2f1" stroke="#009688" stroke-width="3"/>
  
  {/* <!-- أيقونة العدسة المكبرة (مكبرة قليلاً ومتمركزة بعد إزالة الصح) --> */}
  <g transform="translate(20, 20) scale(0.8)">
    <circle cx="50" cy="50" r="35" fill="none" stroke="#00796b" stroke-width="8"/>
    <line x1="75" y1="75" x2="105" y2="105" stroke="#00796b" stroke-width="8" stroke-linecap="round"/>
  </g>
  
  {/* <!-- توهج خفيف --> */}
  <circle cx="45" cy="45" r="10" fill="white" opacity="0.5"/>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1">البحث عن الكلمات الدينية</h2>
          <p className="text-sm text-gray-500">  انقر على الحروف المتجاورة لاكتشاف الكلمات المخفية في الشبكة </p>
        </Link>

           <Link href="/games/try" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="proBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#EFF6FF" />
    </linearGradient>
    
    {/* <!-- تدرج لوني للأيقونة الرئيسية --> */}
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563EB" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية مع إطار رفيع وناعم --> */}
  <circle cx="60" cy="60" r="56" fill="url(#proBg)" stroke="#DBEAFE" stroke-width="2" />

  {/* <!-- عنصر خلفي هندسي يعطي عمقاً واحترافية --> */}
  <circle cx="60" cy="60" r="42" fill="#FFFFFF" shadow="0px 4px 12px rgba(37, 99, 235, 0.08)" />

  {/* <!-- كتاب مفتوح بتصميم هندسي ونظيف --> */}
  <g transform="translate(32, 38)">
    {/* <!-- صفحة اليسار --> */}
    <path d="M 0 6 C 8 2, 22 0, 28 2 L 28 34 C 22 32, 8 34, 0 38 Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>
    
    {/* <!-- صفحة اليمين --> */}
    <path d="M 28 2 C 34 0, 48 2, 56 6 L 56 38 C 48 34, 34 32, 28 34 Z" fill="#EFF6FF" stroke="#2563EB" stroke-width="2" stroke-linejoin="round"/>
    
    {/* <!-- فاصل منتصف الكتاب (الكبسولة) --> */}
    <line x1="28" y1="2" x2="28" y2="34" stroke="#1D4ED8" stroke-width="2.5" />
    
    {/* <!-- خطوط تفصيلية تعبر عن السطور بداخل الكتاب --> */}
    <line x1="6" y1="11" x2="20" y2="11" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="6" y1="17" x2="16" y2="17" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="11" x2="50" y2="11" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
    <line x1="36" y1="17" x2="46" y2="17" stroke="#93C5FD" stroke-width="2" stroke-linecap="round"/>
  </g>

  {/* <!-- شارة التحقق (Checkmark) الاحترافية في الزاوية العلوية --> */}
  <g transform="translate(74, 22)">
    <circle cx="14" cy="14" r="13" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
    <polyline points="8 14 12 18 20 10" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>





          </div>
          <h2 className="font-bold text-lg mb-1">صواب أم خطأ؟ </h2>
          <p className="text-sm text-gray-500"> اختبر صحة المعلومات الدينية  بدقة</p>

        </Link>


        <Link href="/games/guess" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني للخلفية - ألوان هادئة ومحايدة --> */}
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    
    {/* <!-- تدرج لوني للأيقونة الرئيسية - أزرق ملكي --> */}
    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#1E40AF" />
    </linearGradient>
    
    {/* <!-- نمط زخرفي هندسي إسلامي صغير (مخفي) --> */}
    <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="10" height="10">
      <circle cx="5" cy="5" r="1.5" fill="#60A5FA" opacity="0.2"/>
    </pattern>
  </defs>

  {/* <!-- خلفية دائرية رئيسية ناعمة --> */}
  <circle cx="60" cy="60" r="58" fill="url(#bgGrad)" />

  {/* <!-- حلقة خارجية زخرفية تعبر عن الإحاطة بالمعرفة --> */}
  <circle cx="60" cy="60" r="50" fill="none" stroke="#94A3B8" stroke-width="1" stroke-dasharray="4 4" opacity="0.6"/>

  {/* <!-- العنصر المركزي: نجمة ثمانية هندسية إسلامية (بديلة عن شكل الكتاب) --> */}
  <g transform="translate(40, 40)">
    {/* <!-- الجسم الأساسي للنجمة --> */}
    <path d="M20 0 L25 12 L38 15 L28 24 L30 38 L20 30 L10 38 L12 24 L2 15 L15 12 Z" fill="#EFF6FF" stroke="#1E40AF" stroke-width="1.5" stroke-linejoin="round"/>
    {/* <!-- مركز النجمة --> */}
    <circle cx="20" cy="19" r="6" fill="#BFDBFE"/>
  </g>

  {/* <!-- علامة الاستفهام (Guess/Quiz) دقيقة وهندسية فوق النجمة --> */}
  <g transform="translate(70, 22)">
    <circle cx="14" cy="14" r="14" fill="url(#iconGrad)"/>
    {/* <!-- رسمة هندسية لعلامة الاستفهام --> */}
    <path d="M10.5 10.5 C10.5 8.5, 12 7, 14 7 C16 7, 17.5 8.5, 17.5 10.5 C17.5 12.5, 14 13, 14 16" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    <circle cx="14" cy="20" r="1.5" fill="#FFFFFF"/>
  </g>

  {/* <!-- لمسات هندسية صغيرة حول الأيقونة --> */}
  <g fill="#93C5FD" opacity="0.5">
    <rect x="20" y="25" width="6" height="3" rx="1.5"/>
    <rect x="94" y="70" width="3" height="6" rx="1.5"/>
    <circle cx="25" cy="88" r="2"/>
    <circle cx="88" cy="30" r="2"/>
  </g>

</svg>
          </div>
          <h2 className="font-bold text-lg mb-1"> احزر السورة </h2>
          <p className="text-sm text-gray-500"> اعرف السورة التي تنتمي إليها الآية </p>
        </Link> 

        <Link href="/games/order-puzzle" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="puzzleBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لعنصر الترتيب الرئيسي (أزرق تقني) --> */}
    <linearGradient id="barGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#1D4ED8" />
    </linearGradient>

    <linearGradient id="barGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار خفيف --> */}
  <circle cx="60" cy="60" r="56" fill="url(#puzzleBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- سهم جانبي كبير يعبر عن التسلسل والترتيب التصاعدي --> */}
  <path d="M 30 90 L 30 35 L 22 43 M 30 35 L 38 43" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="3 3" opacity="0.6"/>

  {/* <!-- عناصر الترتيب (قطع البازل / الخطوات المرتبة عمودياً بتدرج صاعد) --> */}
  <g transform="translate(42, 28)">
    {/* <!-- الخطوة الأولى (الصغيرة / العلوية) --> */}
    <rect x="0" y="0" width="42" height="14" rx="4" fill="url(#barGrad2)" opacity="0.7"/>
    <circle cx="8" cy="7" r="2" fill="#FFFFFF"/>
    <line x1="14" y1="7" x2="32" y2="7" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>

    {/* <!-- الخطوة الثانية (الوسطى) --> */}
    <rect x="-6" y="20" width="54" height="14" rx="4" fill="url(#barGrad2)" opacity="0.85"/>
    <circle cx="2" cy="27" r="2" fill="#FFFFFF"/>
    <line x1="8" y1="27" x2="42" y2="27" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>

    {/* <!-- الخطوة الثالثة (الأكبر / السفلية - تكتمل الترتيب) --> */}
    <rect x="-12" y="40" width="66" height="14" rx="4" fill="url(#barGrad1)"/>
    <circle cx="-4" cy="47" r="2" fill="#FFFFFF"/>
    <line x1="2" y1="47" x2="48" y2="47" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
  </g>

  {/* <!-- علامة صح أو إنجاز صغيرة في الزاوية توحي بنجاح الترتيب --> */}
  <g transform="translate(82, 74)">
    <circle cx="12" cy="12" r="11" fill="#10B981" stroke="#FFFFFF" stroke-width="2"/>
    <polyline points="7 12 10.5 15.5 17 9" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>

          </div>
          <h2 className="font-bold text-lg mb-1"> بازل الترتيب الصحيح</h2>
          <p className="text-sm text-gray-500">اختاري بازل ورتّبي القطع بترتيبها الصحيح</p>
        </Link>


        <Link href="/games/timeline" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="historyBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#EFF6FF" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لعنصر الساعة / الزمن --> */}
    <linearGradient id="timeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#historyBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- خط الزمن الرأسي (Timeline Axis) --> */}
  <line x1="45" y1="25" x2="45" y2="95" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 4" />

  {/* <!-- نقاط أو محطات الزمن التاريخي المتسلسلة --> */}
  {/* <!-- المحطة الأولى --> */}
  <circle cx="45" cy="35" r="4" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1.5" />
  <rect x="57" y="29" width="34" height="12" rx="3" fill="#E2E8F0" />
  <line x1="63" y1="35" x2="85" y2="35" stroke="#64748B" stroke-width="2" stroke-linecap="round" />

  {/* <!-- المحطة الثانية (المنتصف - النشطة) --> */}
  <circle cx="45" cy="60" r="6" fill="#2563EB" stroke="#FFFFFF" stroke-width="2" />
  <rect x="57" y="52" width="42" height="16" rx="3" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1" />
  <line x1="63" y1="60" x2="93" y2="60" stroke="#1D4ED8" stroke-width="2.5" stroke-linecap="round" />

  {/* <!-- المحطة الثالثة --> */}
  <circle cx="45" cy="85" r="4" fill="#3B82F6" stroke="#FFFFFF" stroke-width="1.5" />
  <rect x="57" y="79" width="26" height="12" rx="3" fill="#E2E8F0" />
  <line x1="63" y1="85" x2="77" y2="85" stroke="#64748B" stroke-width="2" stroke-linecap="round" />

  {/* <!-- أيقونة ساعة صغيرة (رمز الزمن والتاريخ) في الزاوية العلوية --> */}
  <g transform="translate(18, 22)">
    <circle cx="12" cy="12" r="11" fill="url(#timeGrad)" stroke="#FFFFFF" stroke-width="2" />
    <polyline points="12 6 12 12 16 14" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>


          </div>

          <h2 className="font-bold text-lg mb-1"> الترتيب التاريخي</h2>
          <p className="text-sm text-gray-500"> رتب العناصر بالأسهم لتصل للترتيب الصحيح</p>
        </Link>


         <Link href="/games/word-scramble" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="lettersBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لمكعبات الحروف --> */}
    <linearGradient id="tileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4F46E5" />
      <stop offset="100%" stop-color="#3730A3" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#lettersBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- سهم انسيابي يعبر عن حركة وتوجيه وترتيب الحروف --> */}
  <path d="M 28 72 C 35 85, 85 85, 92 65" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3" />
  <path d="M 88 60 L 93 66 L 86 68" fill="none" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

  {/* <!-- مكعبات الحروف الثلاثة المرتبة أفقياً بتصميم نظيف --> */}
  <g transform="translate(18, 38)">
    {/* <!-- المكعب الأول --> */}
    <rect x="0" y="0" width="24" height="24" rx="6" fill="url(#tileGrad)" stroke="#6366F1" stroke-width="1" />
    <text x="12" y="17" font-family="'Tajawal', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">أ</text>

    {/* <!-- المكعب الثاني --> */}
    <rect x="28" y="0" width="24" height="24" rx="6" fill="url(#tileGrad)" stroke="#6366F1" stroke-width="1" />
    <text x="40" y="17" font-family="'Tajawal', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ب</text>

    {/* <!-- المكعب الثالث --> */}
    <rect x="56" y="0" width="24" height="24" rx="6" fill="url(#tileGrad)" stroke="#6366F1" stroke-width="1" />
    <text x="68" y="17" font-family="'Tajawal', sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ج</text>
  </g>

  {/* <!-- شارة صغيرة أو علامة إنجاز في الزاوية العلوية للدلالة على اكتمال الكلمة --> */}
  <g transform="translate(84, 20)">
    <circle cx="10" cy="10" r="9" fill="#10B981" stroke="#FFFFFF" stroke-width="1.5" />
    <polyline points="6 10 8.5 12.5 14 7" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>


          </div>
          <h2 className="font-bold text-lg mb-1">رتّب الحروف</h2>
          <p className="text-sm text-gray-500">رتّب حروف الكلمة الإسلامية الصحيحة</p>
        </Link>

           <Link href="/games/tasbih" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="tasbihBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لحلقة السبحة (لون زمردي إسلامي راقٍ) --> */}
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#tasbihBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- حلقة السبحة الخارجية (مسار الخرزات) --> */}
  <circle cx="60" cy="60" r="38" fill="none" stroke="#E2E8F0" stroke-width="6" />
  
  {/* <!-- خرزات السبحة الموزعة هندسياً على الحلقة --> */}
  <g fill="#059669">
    {/* <!-- خرزات علوية --> */}
    <circle cx="60" cy="22" r="4" />
    <circle cx="43" cy="25" r="3.5" />
    <circle cx="77" cy="25" r="3.5" />
    
    {/* <!-- خرزات جانبية --> */}
    <circle cx="28" cy="45" r="3.5" />
    <circle cx="92" cy="45" r="3.5" />
    <circle cx="22" cy="65" r="3.5" />
    <circle cx="98" cy="65" r="3.5" />
    <circle cx="30" cy="85" r="3.5" />
    <circle cx="90" cy="85" r="3.5" />
    
    {/* <!-- خرزة الشاهد (أكبر حجماً في الأسفل) --> */}
    <circle cx="60" cy="98" r="6" fill="#D97706" stroke="#FFFFFF" stroke-width="1.5" />
  </g>

  {/* <!-- شاشة أو عداد رقمي في المركز --> */}
  <g transform="translate(60, 60)">
    <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="url(#ringGrad)" stroke-width="2.5" />
    {/* <!-- رمز أو رقم تعبيري للعداد (مثل علامة الضغط أو الرقم صفر) --> */}
    <text x="0" y="6" font-family="'Tajawal', sans-serif" font-size="14" font-weight="bold" fill="#047857" text-anchor="middle">33</text>
  </g>
</svg>

          </div>
          <h2 className="font-bold text-lg mb-1">سبحة رقمية</h2>
          <p className="text-sm text-gray-500">تسبيح </p>
          </Link>
       <Link href="/games/speed-quiz" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="speedBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#FEF2F2" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لعداد السرعة (أحمر / برتقالي للطاقة والسرعة) --> */}
    <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EF4444" />
      <stop offset="100%" stop-color="#DC2626" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#speedBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- إطار عداد السرعة الخارجي (مقياس دائري مقطع) --> */}
  <circle cx="60" cy="60" r="38" fill="none" stroke="#E2E8F0" stroke-width="6" stroke-dasharray="200" stroke-dashoffset="50" stroke-linecap="round" />

  {/* <!-- مسار أو مقياس نشط يعبر عن السرعة العالية --> */}
  <circle cx="60" cy="60" r="38" fill="none" stroke="url(#speedGrad)" stroke-width="6" stroke-dasharray="160 80" stroke-dashoffset="30" stroke-linecap="round" />

  {/* <!-- مؤشر عقارب السرعة (إبرة العداد في المنتصف) --> */}
  <g transform="translate(60, 60)">
    {/* <!-- مركز الإبرة --> */}
    <circle cx="0" cy="0" r="6" fill="#1E293B" stroke="#FFFFFF" stroke-width="2" />
    {/* <!-- عقبر السرعة المتحرك نحو الأعلى/اليمين --> */}
    <line x1="0" y1="0" x2="22" y2="-18" stroke="#EF4444" stroke-width="3" stroke-linecap="round" />
  </g>

  {/* <!-- شارة ساعة توقيت صغيرة أو رمز البرق في الأعلى للدلالة على السرعة والتحدي --> */ }
  <g transform="translate(82, 22)">
    <circle cx="12" cy="12" r="11" fill="#F59E0B" stroke="#FFFFFF" stroke-width="2" />
    {/* <!-- رسمة برق مصغرة --> */}
    <polyline points="13 7 9 12 13 12 11 17" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1">تحدي السرعة</h2>
          <p className="text-sm text-gray-500">اختبر معلوماتك الدينية</p>
        </Link>
                <Link href="/games/howami" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="whoBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#EFF6FF" />
    </linearGradient>
    
    {/* <!-- تدرج لوني للشخصية الغامضة (أزرق داكن راقٍ) --> */}
    <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="100%" stop-color="#1E293B" />
    </linearGradient>

    {/* <!-- تدرج لوني لعلامة الاستفهام --> */}
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0EA5E9" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#whoBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- دائرة خلفية داخلية تبرز شكل الشخصية --> */}
  <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />

  {/* <!-- رمز الشخصية الغامضة (User Silhouette) --> */}
  <g transform="translate(60, 60)" fill="url(#profileGrad)">
    {/* <!-- رأس الشخصية --> */}
    <circle cx="0" cy="-6" r="14" />
    {/* <!-- جسم الكتفين المنحني --> */}
    <path d="M -24 24 C -24 13, -13 10, 0 10 C 13 10, 24 13, 24 24 Z" />
  </g>

  {/* <!-- شارة علامة الاستفهام البارزة في الزاوية العلوية (تدل على الغموض والسؤال) --> */}
  <g transform="translate(80, 20)">
    <circle cx="12" cy="12" r="12" fill="url(#badgeGrad)" stroke="#FFFFFF" stroke-width="2" />
    {/* <!-- رسمة هندسية دقيقة لعلامة الاستفهام --> */}
    <path d="M8.5 8.5 C8.5 6.5, 10 5, 12 5 C14 5, 15.5 6.5, 15.5 8.5 C15.5 10.5, 12 11.5, 12 14" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" />
    <circle cx="12" cy="18" r="1.2" fill="#FFFFFF" />
  </g>
</svg>

          </div>
          <h2 className="font-bold text-lg mb-1">من أنا؟ </h2>
          <p className="text-sm text-gray-500">   إقرء التلميحات واكتشف الشخصية المقصودة</p>
        </Link>
  {/* ---------------------------------------- */}
        <Link href="/games/matching" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="matchBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لعقد التوصيل (بنفسجي/تطبيقي أنيق) --> */}
    <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B5CF6" />
      <stop offset="100%" stop-color="#6D28D9" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#matchBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- خطوط الربط والتوصيل المنحنية بين النقاط --> */}
  <path d="M 35 40 Q 60 70, 85 40" fill="none" stroke="#C4B5FD" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4" />
  <path d="M 35 80 Q 60 50, 85 80" fill="none" stroke="url(#nodeGrad)" stroke-width="3.5" stroke-linecap="round" />

  {/* <!-- نقاط التوصيل اليسرى --> */}
  <g fill="url(#nodeGrad)">
    <circle cx="35" cy="40" r="6" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="35" cy="80" r="6" stroke="#FFFFFF" stroke-width="2" />
  </g>

  {/* <!-- نقاط التوصيل اليمنى --> */}
  <g fill="#0EA5E9">
    <circle cx="85" cy="40" r="6" stroke="#FFFFFF" stroke-width="2" />
    <circle cx="85" cy="80" r="6" stroke="#FFFFFF" stroke-width="2" />
  </g>

  {/* <!-- علامة إنجاز أو صح صغيرة في الأعلى للدلالة على نجاح التوصيل --> */}
  <g transform="translate(84, 18)">
    <circle cx="10" cy="10" r="10" fill="#10B981" stroke="#FFFFFF" stroke-width="1.5" />
    <polyline points="6 10 8.5 12.5 14 7" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1"> التوصيل </h2>
          <p className="text-sm text-gray-500">اربط كل لقب أو وصف بالشخصية المناسبة   </p>
        </Link> 
<Link href="/games/reflexion" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="allahBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#F1F5F9" />
    </linearGradient>
    
    {/* <!-- تدرج لوني ذهبي/إسلامي راقٍ لاسم الجلالة --> */}
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#allahBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- إطار هندسي داخلي دافئ يحيط بلفظ الجلالة --> */}
  <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />

 
  <text x="60" y="68" font-family="'Amiri', 'Tajawal', serif" font-size="34" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle">الله</text>

  {/* <!-- شارة توثيق أو نجمة هندسية صغيرة دقيقة في الزاوية العلوية --> */}
  <g transform="translate(82, 22)">
    <circle cx="12" cy="12" r="10" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5" />
    <polyline points="7 12 10.5 15.5 17 9" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1"> تعرف عل الله </h2>
          <p className="text-sm text-gray-500"> اختار المعنى الصحيح لاسم الله الكريم</p>
        </Link> 
      <Link href="/games/compite-word" className="card flex flex-col items-center text-center hover:border-primary">
          <div className="text-5xl mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="70" height="70">
  <defs>
    {/* <!-- تدرج لوني احترافي للخلفية --> */}
    <linearGradient id="blankBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#EFF6FF" />
    </linearGradient>
    
    {/* <!-- تدرج لوني لعنصر إكمال الفراغ (أزرق تقني راقٍ) --> */}
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0EA5E9" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>
  </defs>

  {/* <!-- خلفية دائرية ناعمة مع إطار رفيع --> */}
  <circle cx="60" cy="60" r="56" fill="url(#blankBg)" stroke="#CBD5E1" stroke-width="1.5" />

  {/* <!-- إطار داخلي هندسي يعطي عمقاً للتصميم --> */}
  <circle cx="60" cy="60" r="38" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />

  {/* <!-- سطور النص التعبيرية داخل الأيقونة مع الفراغ في المنتصف --> */}
  <g transform="translate(60, 60)">
    {/* <!-- السطر الأول العلوي --> */}
    <line x1="-22" y1="-12" x2="22" y2="-12" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" />
    
    {/* <!-- السطر الثاني (الذي يحتوي على الفراغ المطلوب إكماله) --> */}
    <line x1="-22" y1="4" x2="-6" y2="4" stroke="#475569" stroke-width="3" stroke-linecap="round" />
    {/* <!-- الفراغ (شرطة سفلية بارزة باللون المميز) --> */}
    <line x1="-3" y1="9" x2="11" y2="9" stroke="url(#accentGrad)" stroke-width="3.5" stroke-linecap="round" />
    <line x1="14" y1="4" x2="22" y2="4" stroke="#475569" stroke-width="3" stroke-linecap="round" />
  </g>

  {/* <!-- شارة صغيرة أو علامة إنجاز في الزاوية العلوية --> */}
  <g transform="translate(82, 22)">
    <circle cx="12" cy="12" r="11" fill="#10B981" stroke="#FFFFFF" stroke-width="2" />
    <polyline points="7 12 10.5 15.5 17 9" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>
          </div>
          <h2 className="font-bold text-lg mb-1"> الآيات</h2>
          <p className="text-sm text-gray-500"> أكمل الفراغ  </p>
        </Link> 
      </div>
      </div>
     
  );
}