"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import ChatBot from "../components/ChatBot";
import Welcome from "../app/welcome/welcome";
export default function Home() {
  const [scholars, setScholars] = useState([]);
  const [started, setStarted] = useState(false);

const [isLoaded, setIsLoaded] = useState(false);
 // لحتى ما يصير فليشينغ أول ما تفتح الصفحة
// دالة لما يكبس المستخدم "نعم، مستعد"
 const handleEnter = () => { localStorage.setItem("hasSeenWelcome", "true"); // بنحفظها بالمتصفح للأبد 
 setStarted(true); // بنخفي صفحة الـ Welcome
   };
// ننتظر تحميل الـ localStorage أولاً 



  useEffect(() => {

     const hasSeenWelcome = localStorage.getItem("hasSeenWelcome"); if (hasSeenWelcome === "true") { setStarted(true); } setIsLoaded(true);
// جلب بيانات المشايخ
    supabase
      .from("scholars")
      .select("*")
      .order("name")
      .then(({ data }) => setScholars(data || []));
  }, []);
 if (!isLoaded) return null;
if (!started) { return <Welcome onEnter={handleEnter} />; }

  return (

  <div>
    <div className="md:col-span-7  bg-[#fff0f3] rounded-[32px] p-6 border-2 border-[#ffccd5] relative shadow-sm flex flex-col justify-between">
              <p className="text-xs text-gray-700 text-center leading-relaxed md:text-right">
                منصة إسلامية صُممت لتكون رفيقك في رحلة طلب العلم الشرعي، وتساعدك على التعلّم بطريقة مبسّطة، منظّمة وممتعة.

نوفّر لك كتبًا ومتونًا علمية موثوقة، مع شروحات ميسّرة تساعدك على فهم ما تتعلّمه، بالإضافة إلى ألعاب وأنشطة إسلامية تفاعلية تجعل رحلة التعلّم أكثر متعة.

كما يمكنك من خلال المخطط التعليمي تنظيم دراستك، متابعة إنجازك، وبناء عادات ثابتة في طلب العلم، لتتقدّم خطوةً بعد خطوة نحو الجنة . 🌱
              </p></div>
              

        {/* رف الكتب اللطيف (تعبير بيكسل أرت مرئي) */}
            <div className="mt-4 pt-4 border-t border-[#ffd1dc]/60 flex items-center justify-around">
           
         <p className="text-xs text-black-700 leading-loose italic text-justify font-medium">
           
           "الفُتور وما يتبعه من الضّيق والوحشة، مرحلة لابدّ منها، ومحطة قد تطول، حتّى طالب العلم  النّهم  يصيبه الملل والفُتور والضّيق والوحشة.. <br></br>الفُتور مرحلة امتحان واختبار، يثبّت الله فيها من يشاء من عباده، ويضلّ الله من يشاء. والصّادق المُلازم للدُّعاء والافتقار والنّوافل، يحبّه ربّه ويصطفيه، ويثبّته ويجتبيه، ويخرج من ذلك الحال أقوى ممّا كان!"
          <br></br>

          مجاهدة النفس ليست أمرًا سهلًا،ولهذا سُمّيت مجاهدة، فلو كان ترك الذنوب، والثبات على الطاعة، ومخالفة الهوى أمرًا هينًا، لما احتاج إلى صبر ومصابرة ومجاهدة، <br></br> فلا تستغرب تعبك، ولا تظن أن كثرة المقاومة علامة فشل، بل قد تكون دليلًا على أنك تسير في الاتجاه الصحيح، والله لا يضيع أجر من جاهد نفسه ابتغاء مرضاته.
<br></br>
قال تعالى:
﴿وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ﴾
          </p>
            </div>
 <br></br>
  
      <h1 className="text-3xl font-bold text-primary mb-2">مكتبة المشايخ</h1>
      <p className="text-gray-600 mb-6">اختر شيخًا لتصفح مكتبته العلمية</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {scholars.map((s) => (
          <Link key={s.id} href={`/scholars/${s.id}`} className="card flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-full bg-dynamic-bg/10 flex items-center justify-center text-3xl mb-3">
      <img src={s.photo_url } className="w-full h-full rounded-full object-cover" />
            </div>
            <h2 className="font-bold text-lg">{s.name_ar || s.name}</h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.bio}</p>
          </Link>
        ))}
       
      </div>
    
       
    </div>

  );
}



