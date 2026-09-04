// import React from 'react';

// const Welcome = () => {
//     // مصفوفة الأفكار لتسهيل التعديل وإدارتها
//     const featuresList = [
//         "تحديد مستويات لكل كتب مكتبة المشايخ لتعرفوا كيف تبلشوا بدون حيرة أو ضياع.",
//         "كتابة ملاحظات بصفحة كل كتاب، وبيظهر عندكم رقم الصفحة والملاحظة تلقائياً.",
//         "إنشاء خرائط ذهنية وتدوين الفوائد المستفادة داخل صفحات الكتب.",
//         "اختبارات تفاعلية بعد الانتهاء من كل كتاب.",
//         "نشر العلم بالتعليقات (ملخصات أو شروح للدورات والمواقع الموثوقة).",
//         "جرة الرسائل التفاعلية عند كل حالة شعورية (ترند زمان ورجعت بحلة جديدة).",
//         "روبوت مبرمج على عقيدة أهل السنة والجماعة، لا يرجح الخلاف ولا يخوض بلا علم.",
//         "تايمر مخصص لتحديد وقت القراءة أو الاستماع للفيديوهات مع تنبيه عند انتهائه.",
//         "الالتزام بسنة واحدة كل أسبوع، مع فائدة وآية وحديث يومي.",
//         "مكان لتخطيط المهام مع قياس نسبة الإنجاز والتصنيف المخصص بالأسماء والألوان.",
//         "إمكانية تخصيص وتحديد ألوان الموقع حسب رغبتكم وذوقكم.",
//         "ألعاب إسلامية هادفة وممتعة."
//     ];

//     return (
//         <div className="bg-amber-50/50 text-slate-800 min-h-screen flex flex-col justify-between font-sans">
            
//             {/* Header */}
//             <header className="bg-white shadow-sm py-6 px-4 text-center border-b border-amber-100">
//                 <h1 className="text-3xl md:text-4xl font-bold text-amber-900" style={{ fontFamily: 'Amiri, serif' }}>
//                     بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
//                 </h1>
//                 <p className="text-slate-600 mt-2 text-sm md:text-base">أهلاً بكُم في رحلةٍ  إلى  الجنة..</p>
//             </header>

//             {/* Main Content */}
//             <main className="max-w-4xl mx-auto px-4 py-8 space-y-8 w-full">

//                 {/* About Me & Intention Section */}
//                 <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-amber-100">
//                     <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
//                         <span>🌸</span> رسالة قصيرة قبل أن نبدأ
//                     </h2>
//                     <p className="leading-relaxed text-slate-700 mb-4">
// أسال الله العظيم أن يثبت خطواتكم، وأن يشرح صدوركم، وأن يجعل طلبكم للعلم خالصاً لوجهه الكريم. هذه الخطوة التي بدأتموها اليوم هي غراسٌ في طريق الجنة، فاستعينوا بالله ولا تعجزوا.
// <br></br>
// نسأل الله أن يتقبل هذا السعي، وأن يجعله حجةً لنا لا علينا، وأن يجمعنا في الفردوس الأعلى بلا حسابٍ ولا سابق عذاب.
//                     </p>
//                     <div className="bg-amber-50 border-r-4 border-amber-500 p-4 rounded-l-xl text-amber-900 text-sm md:text-base">
//                         <span className="font-bold">تذكرة :</span> 
// <br></br>
// قبل أن نقلّب صفحات الكتب ونغوص في بحور العلم، دعونا نقف وقفةً مع قلوبنا لنجدد العهد. إن طلب العلم من أعظم العبادات، والعبادة لا تُقبل ولا تُبارك إلا إذا كانت خالصةً لوجه الله الكريم، لا رياءً، ولا سُمعة، ولا طلباً لزينة الدنيا.
// <br></br>
// واعلموا أن الإخلاص ليس أمراً يسيراً، بل هو ميدانٌ مستمر لمجاهدة النفس. يقول الإمام سفيان الثوري رحمه الله: "ما عالجت شيئاً أشد عليّ من نيتي؛ لأنها تتقلب عليّ".
// <br></br>
// لذلك، لا تبتئسوا إذا داهمكم تشتت أو فتور، بل جاهدوا أنفسكم، وذكّروها دائماً بالغاية الكبرى: رضا الله والجنة. كلما حادت النية، ردوها بلطف.. وكلما ثقلت النفس، ذكروها بالأجر. فبالمجاهدة تُنار الدروب، وبالإخلاص تُبارك الجهود وتثقل الموازين.
// اللهم طهر قلوبنا من النفاق، وأعمالنا من الرياء، واجعل سعينا كله خالصاً لوجهك الكريم. 🤍
//                     </div>
//                 </section>

//                 {/* Features Section */}
//                 <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-amber-100">
//                     <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
//                         <span>💡</span> بعض الأفكار التي جمعتُها  لكم
//                     </h2>
//                     <p className="text-slate-600 mb-6 text-sm leading-relaxed">
//                         والله كتير حاولت ضم كل الأفكار يلي حالياً عليها إقبال وتخدم طالب العلم بكل حب وسهولة:
//                     </p>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
//                         {featuresList.map((feature, index) => (
//                             <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
//                                 <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-lg text-xs">
//                                     {index + 1}
//                                 </span>
//                                 <p className="text-sm text-slate-700">{feature}</p>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* Feedback Section */}
//                   </main>   
//               {/* Contact with us */}
//         <footer className="w-full py-6 mt-12 border-t border-purple-100 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center gap-3 text-center">
//   <p className="text-xs text-gray-500 font-medium">تواصل معنا عبر منصاتنا للاستفسار أو مشاركة الملاحظات 🌸</p>
//   <div className="flex items-center gap-4">
//     <a 
//       href="https://www.instagram.com/f21.xo?igsh=MXFpcXhnZHZ6bnlubg%3D%3D&igsi=MXFpcXhnZHZ6bnlubg%3D%3D&utm_source=qr" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FBCAD9] text-[#D87093] text-xs font-bold hover:opacity-90 transition-all"
//     >
//       <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
//   <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
// </svg></span> إنستغرام
//     </a>
//     <a 
//       href="https://whatsapp.com/channel/0029VbBX2es2kNFvXaklaO3I" 
//       target="_blank" 
//       rel="noopener noreferrer"
//       className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4F9F4] border border-[#C8E6C9] text-[#2E7D32] text-xs font-bold hover:opacity-90 transition-all"
//     >
//       <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
//   <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
// </svg></span> واتساب
//     </a>
//   </div>
// </footer>  


          


//         </div>
//     );
// };

// export default Welcome;
   import React from 'react';

import link from "next/link";
const Welcome = () => {
    // مصفوفة الأفكار لتسهيل التعديل وإدارتها
    const featuresList = [
        "تحديد مستويات لكل كتب مكتبة المشايخ لتعرفوا كيف تبلشوا بدون حيرة أو ضياع.",
        "كتابة ملاحظات بصفحة كل كتاب، وبيظهر عندكم رقم الصفحة والملاحظة تلقائياً.",
        "إنشاء خرائط ذهنية وتدوين الفوائد المستفادة داخل صفحات الكتب.",
        "اختبارات تفاعلية بعد الانتهاء من كل كتاب.",
        "نشر العلم بالتعليقات (ملخصات أو شروح للدورات والمواقع الموثوقة).",
        "جرة الرسائل التفاعلية عند كل حالة شعورية (ترند زمان ورجعت بحلة جديدة).",
        "روبوت مبرمج على عقيدة أهل السنة والجماعة، لا يرجح الخلاف ولا يخوض بلا علم.",
        "تايمر مخصص لتحديد وقت القراءة أو الاستماع للفيديوهات مع تنبيه عند انتهائه.",
        "الالتزام بسنة واحدة كل أسبوع، مع فائدة وآية وحديث يومي.",
        "مكان لتخطيط المهام مع قياس نسبة الإنجاز والتصنيف المخصص بالأسماء والألوان.",
        "إمكانية تخصيص وتحديد ألوان الموقع حسب رغبتكم وذوقكم.",
        "ألعاب إسلامية هادفة وممتعة."
    ];

    return (
        <div className="bg-[#FAF7F2] text-slate-800 min-h-screen flex flex-col justify-between font-sans selection:bg-amber-200">
           
            {/* Header
            <header className="bg-white/80 backdrop-blur-md shadow-sm py-8 px-4 text-center border-b border-amber-100/60 sticky top-0 z-50">
                <h1 className="text-3xl md:text-5xl font-extrabold text-amber-900 tracking-wide drop-shadow-sm" style={{ fontFamily: 'Amiri, serif' }}>
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h1>
                <p className="text-slate-600 mt-2 text-base md:text-lg font-medium">أهلاً بكُم في رحلةٍ إلى الجنة.. 🤍</p>
            </header> */}
 {/* Header */}
            <header className="bg-white/90 shadow-sm py-6 px-4 text-center border-b border-amber-100">
                <h1 className="text-3xl md:text-4xl font-bold text-amber-900" style={{ fontFamily: 'Amiri, serif' }}>
                     بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h1>
                 <p className="text-slate-600 mt-2 text-sm md:text-base">أهلاً بكُم في رحلةٍ  إلى  الجنة..</p>
             </header>
            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-10 space-y-10 w-full">

                {/* About Me & Intention Section */}
                <section className="bg-white/90 rounded-3xl p-6 md:p-10 shadow-sm border border-amber-100/80 transition-all hover:shadow-md">
                    <div className="  flex items-center gap-3 mb-6">
                        <span className="text-3xl">🌸</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-900">رسالة قصيرة قبل أن نبدأ</h2>
                    </div>
                    
                    <p className="leading-relaxed text-slate-700 text-base md:text-lg mb-8 text-justify ">
                        أسال الله العظيم أن يثبت خطواتكم، وأن يشرح صدوركم، وأن يجعل طلبكم للعلم خالصاً لوجهه الكريم. هذه الخطوة التي بدأتموها اليوم هي غراسٌ في طريق الجنة، فاستعينوا بالله ولا تعجزوا.<br/><br/>
                        نسأل الله أن يتقبل هذا السعي، وأن يجعله حجةً لنا لا علينا، وأن يجمعنا في الفردوس الأعلى بلا حسابٍ ولا سابق عذاب.
                    </p>

                    <div className="bg-white/90 border-r-4 border-amber-500 p-6 rounded-2xl text-amber/90 text-sm md:text-base leading-relaxed shadow-inner">
                        <div className="flex items-center gap-2 font-bold text-amber-900 text-lg mb-3 bg-amber-100/80">
                            <span>💡</span>
                            <span>تذكرة :</span>
                        </div>
                        <p className="mb-4 text-justify">
                            قبل أن نقلّب صفحات الكتب ونغوص في بحور العلم، دعونا نقف وقفةً مع قلوبنا لنجدد العهد. إن طلب العلم من أعظم العبادات، والعبادة لا تُقبل ولا تُبارك إلا إذا كانت خالصةً لوجه الله الكريم، لا رياءً، ولا سُمعة، ولا طلباً لزينة الدنيا.
                        </p>
                        <p className="mb-4 text-justify font-medium text-amber-900/90">
                            واعلموا أن الإخلاص ليس أمراً يسيراً، بل هو ميدانٌ مستمر لمجاهدة النفس. يقول الإمام سفيان الثوري رحمه الله: <span className="italic font-bold">"ما عالجت شيئاً أشد عليّ من نيتي؛ لأنها تتقلب عليّ"</span>.
                        </p>
                        <p className="mb-4 text-justify">
                            لذلك، لا تبتئسوا إذا داهمكم تشتت أو فتور، بل جاهدوا أنفسكم، وذكّروها دائماً بالغاية الكبرى: رضا الله والجنة. كلما حادت النية، ردوها بلطف.. وكلما ثقلت النفس، ذكروها بالأجر. فبالمجاهدة تُنار الدروب، وبالإخلاص تُبارك الجهود وتثقل الموازين.
                        </p>
                        <p className="font-semibold text-center mt-6 text-amber-900 bg-amber-100/60 py-3 rounded-xl">
                            اللهم طهر قلوبنا من النفاق، وأعمالنا من الرياء، واجعل سعينا كله خالصاً لوجهك الكريم. 🤍
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className=" rounded-3xl p-6 md:p-10 shadow-sm border border-amber-100/80">
                    <div className="  flex items-center gap-3 mb-3">
                        <span className="text-3xl">💡</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-amber-900">بعض الأفكار التي جمعتُها لكم</h2>
                    </div>
                    <p className="text-slate-600 mb-8 text-sm md:text-base leading-relaxed">
                        والله كتير حاولت ضم كل الأفكار يلي حالياً عليها إقبال وتخدم طالب العلم بكل حب وسهولة:
                    </p>
                   
                    <div className="   grid grid-cols-1 md:grid-cols-2 gap-5 ">
                        {featuresList.map((feature, index) => (
                            <div key={index} className="bg-white/80 p-5 rounded-2xl bg-amber-50/30 border border-amber-100/60 flex items-start gap-4 hover:bg-amber-50/70 transition-all shadow-sm">
                                <span className="  flex-shrink-0 bg-amber-200/70 text-amber-900 font-bold w-7 h-7 rounded-xl flex items-center justify-center text-xs shadow-sm">
                                    {index + 1}
                                </span>
                                <p className="text-sm md:text-base text-slate-700 leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>  

            {/* Contact with us */}
            <footer className="w-full py-8 mt-16 border-t border-amber-200/40 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center shadow-inner">
                <p className="text-xs md:text-sm text-slate-600 font-medium">تواصل معنا عبر منصاتنا للاستفسار أو مشاركة الملاحظات 🌸</p>
                <div className="flex items-center gap-4 flex-wrap justify-center">
                    <a
                        href="https://www.instagram.com/f21.xo?igsh=MXFpcXhnZHZ6bnlubg%3D%3D&igsi=MXFpcXhnZHZ6bnlubg%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0F5] border border-[#FBCAD9] text-[#D87093] text-xs md:text-sm font-bold hover:shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                            </svg>
                        </span> إنستغرام
                    </a>
                    <a
                        href="https://whatsapp.com/channel/0029VbBX2es2kNFvXaklaO3I"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F9F4] border border-[#C8E6C9] text-[#2E7D32] text-xs md:text-sm font-bold hover:shadow-md transition-all scale-100 hover:scale-105"
                    >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                            </svg>
                        </span> واتساب
                    </a>
                </div>
            </footer>  
        </div>
    );
};

export default Welcome;
                 