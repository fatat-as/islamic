
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import styles from "./jar.module.css";
import  Image from "next/image";

// أنواع الرسائل الأساسية — كل نوع مرتبط بلون ورمز خاص فيه
const STAR_TYPES = [
  { type: "blue", title:"اللهم أعنا علينا لنسعى إليك", icon: ""
    , defaultText: ["الحمد لله الذي بنعمته تتم الصالحات.","اللهم لك الحمد حتى ترضى ولك الحمد إذا رضيت.","اللهم اني اتبرا من حولي و قوتي و التجأ إلى حولك و قوتك اللهم اعني ولا تعن علي وانصرني ولا تنصر علي  ويسر الهدى لي","كل نعمة أنت فيها فضل من الله، فاستدِمها بالشكر.","لك الحمد والشكر يا الله على نعمك الظاهرة والباطنة، ما علمنا منها وما لم نعلم.","الحمد لله الذي أحيانا بعد ما أماتنا وإليه النشور، والحمد لله على نعمة الصحة والعافية.","اللهم ما أصبح ولا أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر.","لك الحمد ربي على ما أعطيت، ولك الحمد على ما منعت، ولك الحمد على كل حال.","الحمد لله حمداً كثيراً طيباً مباركاً فيه، ملء السماوات وملء الأرض وملء ما شئت من شيء بعد.","اللهم لك الحمد والشكر كما ينبغي لجلال وجهك وعظيم سلطانك." ]},
  { type: "pink", title: " وَاصبِر عَلىٰ ما يَقولونَ وَاهجُرهُم هَجرًا جَميلًا", icon: "💗", defaultText:["لا تحزن إن الله معنا، الفرج قريب.","فإن مع العسر يسرا، إن مع العسر يسرا","لا يكلف الله نفساً إلا وسعها","ألا بذكر الله تطمئن القلوب","وعسى أن تكرهوا شيئاً وهو خير لكم وعسى أن تحبوا شيئاً وهو شر لكم والله يعلم وأنتم لا تعلمون" ,"وَاصْبِرْ لِحُكْمِ رَبِّكَ فَإِنَّكَ بِأَعْيُنِنَا" ,"وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ"," قل لن يصيبنا إلا ما كتب الله لنا هو مولانا وعلى الله فليتوكل المؤمنون" ,"ومن يتق الله يجعل له مخرجا و يرزقه من حيث لايحتسب ","ان الله مع الصابرين" ]},
  { type: "yellow", title:  "حسبُنا اللّه، سيؤتينا اللّه من فضله، إنّا إلى اللّهِ راغبون", icon: "💛", defaultText:["الدنيا مزرعة الآخرة، فازرع خيرًا تحصده." ,"وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ","فَالْيَوْمَ الَّذِينَ آمَنُوا مِنَ الْكُفَّارِ يَضْحَكُونَ * عَلَى الأَرَائِكِ يَنظُرُونَ * هَلْ ثُوِّبَ الْكُفَّارُ مَا كَانُوا يَفْعَلُونَ","كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ فَمَن زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الْجَنَّةَ فَقَدْ فَازَ وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ","وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ * لِسَعْيِهَا رَاضِيَةٌ * فِي جَنَّةٍ عَالِيَةٍ","﴿وَأَمَّا مَنۡ خَافَ مَقَامَ رَبِّهِۦ وَنَهَى ٱلنَّفۡسَ عَنِ ٱلۡهَوَىٰ ﴾","وَاتَّقُوا يَوْماً تُرْجَعُونَ فِيهِ إِلَى اللَّهِ ثُمَّ تُوَفَّى كُلُّ نَفْسٍ مَّا كَسَبَتْ وَهُمْ لا يُظْلَمُونَ","فَأَمَّا مَنْ طَغَى وَآثَرَ الْحَيَاةَ الدُّنْيَا فَإِنَّ الْجَحِيمَ هِيَ الْمَأْوَى","كَلاَّ إِذَا دُكَّتِ الأَرْضُ دَكّاً دَكّاً * وَجَاءَ رَبُّكَ وَالْمَلَكُ صَفّاً صَفّاً * وَجِيءَ يَوْمَئِذٍ بِجَهَنَّمَ يَوْمَئِذٍ يَتَذَكَّرُ الإِنسَانُ وَأَنَّى لَهُ الذِّكْرَى","إِنَّ الأَبْرَارَ لَفِي نَعِيمٍ * عَلَى الأَرَائِكِ يَنظُرُونَ * تَعْرِفُ فِي وُجُوهِهِمْ نَضْرَةَ النَّعِيمِ"]},
  { type: "green", title: "أفوض امري إلى الله ان الله بصير بالعباد", icon: "💚", defaultText:["ومن يتوكل على الله فهو حسبه." ,"الرضا يُفرغ قلب العبد، ويقلل همه وغمه، فيتفرغ لعبادة ربه بقلب خفيف من أثقال الدنيا وهمومها وغمومها. 🤍","الله معك ⁠.. كافل أمرك ، و مُيسر طريقك و كاشِف ظُلمتك استعن بهِ و لاتعجز توكل عليه ولن تضل يأويك رحمٰن رحيم ، يكفيك و يسددك.💛🌧️","الله يُعوض🤍. يعوض لدرجة تجعلك تخشى أن تكون مُقصر في حقه، في حمده وفي وشكره","ولا أدري بأي إتجاه اسير ولكن يارب وكلتك أمري كله..","﴿قُلِ اللَّهُ يُنَجِّيكُم مِّنْهَا وَمِن كُلِّ كَرْبٍ﴾","﴿أَتَعْجَبينَ مِنْ أَمرِ ﷲ ﴾.","‏إِنِّي جَزَيْتُهُمُ الْيَوْمَ بِمَا صَبَرُوا أَنَّهُمْ هم الْفَائزونَ .","‏﴿يُؤْتِكمْ خيرًا مِما أُخذَ منكمْ‏﴾.",    " لِّكَيْلَا تَأْسَوْا عَلَىٰ مَا فَاتَكُمْ"]}
];

const BASE_COUNT = 40; // عدد الرسائل الأساسية عند فتح الصفحة
const MAX_USER_ADDED = 8; // أقصى عدد رسائل يقدر المستخدم يضيفها



function generateBaseStars() {
  const stars = [];
  for (let i = 0; i < BASE_COUNT / STAR_TYPES.length; i++) {
    STAR_TYPES.forEach((s) => {
      // اختيار رسالة عشوائية من قائمة رسائل هذا التصنيف
      const randomMsg = s.defaultText[Math.floor(Math.random() * s.defaultText.length)];
      
      stars.push({
        ...s,
        text: randomMsg, // تعيين الرسالة العشوائية بدلاً من النص الثابت
        id: `${s.type}-${i}-${Math.random()}`,
        delay: (Math.random() * 4).toFixed(2),
        duration: (2.5 + Math.random() * 2.5).toFixed(2),
        drift: (Math.random() * 10 - 5).toFixed(1),
      });
    });
  }
  return stars.sort(() => Math.random() - 0.5);
}
 
// }

export default function TranquilityJarPage() {
  const [stars, setStars] = useState(generateBaseStars);
  const [shaking, setShaking] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null); // { title, icon, text }
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategory, setNewCategory] = useState("blue");
  const [newText, setNewText] = useState("");

  const addedCount = stars.length - BASE_COUNT;
  const remaining = Math.max(0, MAX_USER_ADDED - addedCount);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const lastShakeTime = useRef(0);
  const lastAccel = useRef({ x: 0, y: 0, z: 0 });
  const lastMousePos = useRef(null);

  const shakeJar = useCallback(() => {
    const now = Date.now();
    if (now - lastShakeTime.current < 500) return; // avoid re-triggering mid-animation
    lastShakeTime.current = now;
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }, []);

  // Real phone shake detection (accelerometer)
  useEffect(() => {
    const handleMotion = (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;
      const delta =
        Math.abs(acc.x - lastAccel.current.x) +
        Math.abs(acc.y - lastAccel.current.y) +
        Math.abs(acc.z - lastAccel.current.z);
      lastAccel.current = { x: acc.x, y: acc.y, z: acc.z };
      if (delta > 18) shakeJar(); // threshold tuned for a deliberate shake, not just walking
    };

    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      // iOS 13+ requires an explicit user gesture to grant motion permission
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        // Wait for the user to tap "فعّل الحركة" button before subscribing
      } else {
        window.addEventListener("devicemotion", handleMotion);
        setMotionEnabled(true);
      }
    }
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [shakeJar]);

  // Desktop substitute: a fast mouse swing over the jar area also shakes it
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lastMousePos.current) {
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 90) shakeJar();
      }
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shakeJar]);

  const requestMotionPermission = async () => {
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      try {
        const result = await DeviceMotionEvent.requestPermission();
        if (result === "granted") {
          window.addEventListener("devicemotion", (event) => {
            const acc = event.accelerationIncludingGravity;
            if (!acc) return;
            const delta =
              Math.abs(acc.x - lastAccel.current.x) +
              Math.abs(acc.y - lastAccel.current.y) +
              Math.abs(acc.z - lastAccel.current.z);
            lastAccel.current = { x: acc.x, y: acc.y, z: acc.z };
            if (delta > 18) shakeJar();
          });
          setMotionEnabled(true);
        }
      } catch {
        // permission dialog dismissed or unsupported — silently ignore
      }
    }
  };

  const openAddForm = () => {
    if (remaining <= 0) {
      alert("عذرًا، لقد وصلت إلى الحد الأقصى للإضافة (8).");
      return;
    }
    setNewText("");
    setShowAddForm(true);
  };

  const submitNewMessage = () => {
    if (remaining <= 0) return;
    const trimmed = newText.trim();
    if (!trimmed) {
      alert("الرجاء كتابة نص الرسالة أولًا.");
      return;
    }
    const category = STAR_TYPES.find((s) => s.type === newCategory);
    setStars((prev) => [
      ...prev,
      {
        ...category,
        title: `رسالتك الخاصة (${category.title.split("(")[1] || category.title})`,
        text: trimmed,
        id: `custom-${Date.now()}`,
        delay: (Math.random() * 4).toFixed(2),
        duration: (2.5 + Math.random() * 2.5).toFixed(2),
        drift: (Math.random() * 10 - 5).toFixed(1),
      },
    ]);      
    setShowAddForm(false);
    alert("REMEMBER JANNAH IS THE GOAL !! ");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.iconBtn}>→</Link>
      
        <span className={styles.iconBtn} />
      </header>

      <div className={styles.mainContainer}>
        <div className={styles.jarTitle}>
          <h2>جرة الرسائل اللطيفة</h2>
          <p>انقر على الجرة لرجّها، أو انقر على أي نجمة لقراءة رسالتك.</p>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}><span className={`${styles.dot} ${styles.dotBlue}`} /> سعداء </div>
          <div className={styles.legendItem}><span className={`${styles.dot} ${styles.dotPink}`} /> حزينين </div>
          <div className={styles.legendItem}><span className={`${styles.dot} ${styles.dotYellow}`} /> الآخرة </div>
          <div className={styles.legendItem}><span className={`${styles.dot} ${styles.dotGreen}`} /> التوكل </div>
        </div>

        <div className={styles.jarWrapper} onClick={shakeJar}>
          <div className={styles.jarLidTop} />
          <div className={styles.jarLidBody} />
          <div className={styles.jarNeck} />
          <div className={`${styles.jarBody} ${shaking ? styles.shake : ""}`}>
            {stars.map((star) => (
              <span
                key={star.id}
                className={`${styles.starItem} ${styles[`star${star.type[0].toUpperCase()}${star.type.slice(1)}`]} ${shaking ? styles.shakingStars : ""}`}
                style={{
                  "--twinkle-duration": `${star.duration}s`,
                  "--twinkle-delay": `${star.delay}s`,
                  "--drift-x": `${star.drift}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMessage(star);
                }}
              >
                ★
              </span>
            ))}
          </div>
         
        </div>

        {!motionEnabled && typeof window !== "undefined" && typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function" && (
          <button className={styles.enableMotionBtn} onClick={requestMotionPermission}>
            📳 فعّل هزّ الجرة بالموبايل
          </button>
        )}

        <div className={styles.recordsCount}>{stars.length} رسالة مخزنة في الجرة</div>

      </div>

      <div className={styles.actionContainer}>
        <button className={styles.addBtn} onClick={openAddForm}>
          + أضف رسالة جديدة إلى الجرة ({remaining} متبقية)
        </button>
      </div>

      {/* نافذة قراءة الرسالة */}
      {activeMessage && (
        <div className={styles.modalOverlay} onClick={() => setActiveMessage(null)}>
 <div
  className={`${styles.modalCard} ${styles.messageCard}`}
  onClick={(e) => e.stopPropagation()}
>
   <button
              onClick={() => setActiveMessage(null)}
              className="text-dark/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
  <br></br>
            {/* <div className={styles.modalTitle}>{activeMessage.title} </div> */}
            <div className={styles.modalMessage}>{activeMessage.text}</div>
            <br></br>
            
            {/* <button className={styles.closeModal} style={{ width: "100%" }} onClick={() => setActiveMessage(null)}>
              إغلاق
            </button> */}
          </div>
        </div>
      )}

      {/* نافذة إضافة رسالة */}
      {showAddForm && (
        <div className={styles.modalOverlay} onClick={() => setShowAddForm(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTitle}>إضافة رسالة جديدة للجرة</div>
            <div className={styles.formGroup}>
              <label>اختر تصنيف الرسالة (لون النجمة):</label>
              <select className={styles.formControl} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                <option value="blue">سعداء </option>
                <option value="pink">حزينين </option>
                <option value="yellow">الآخرة</option>
                <option value="green">التوكل </option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>نص الرسالة:</label>
              <textarea
                className={styles.formControl}
                style={{ height: "80px", resize: "none" }}
                placeholder="اكتب رسالتك  هنا..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </div>
            <div className={styles.modalBtns}>
              <button className={styles.btnPrimaryCustom} onClick={submitNewMessage}>إضافة للجرة</button>
              <button className={styles.closeModal} onClick={() => setShowAddForm(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}