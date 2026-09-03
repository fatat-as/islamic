// "use client";
// import { useState } from "react"; import styles from "./Welcome.module.css";
// import Link from "next/link";

// export default function Welcome({ onEnter }) { const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%", });
// const moveNoButton = () => { const maxX = window.innerWidth - 130; const maxY = window.innerHeight - 60;
// const randomX = Math.max(10, Math.random() * maxX);
// const randomY = Math.max(10, Math.random() * maxY);

// setNoPosition({
//   left: `${randomX}px`,
//   top: `${randomY}px`,
// });
// };
// return ( <div className={styles.welcomePage}> <div className={styles.content}> <div className={styles.emoji}>
// {/* // 1. إضافة الـ HTML الخاص بالـ Tenor داخل الـ div */}


//   <h1>هل أنت مستعد لتبدأ معنا هذه الرحلة؟</h1>

//     <p>
//       رحلة جميلة نحو العلم والمعرفة 🤍
//     </p>

//     <button
//       className={styles.yesButton}
//       onClick={onEnter}
//     >
//       نعم، مستعد 🤍
//     </button>
//     <br></br>
//   </div>
//  </div>
//   <button
//     className={styles.noButton}
//     style={{
//       top: noPosition.top,
//       left: noPosition.left,
//     }}
//     onMouseEnter={moveNoButton}
//     onTouchStart={moveNoButton}
//     onClick={moveNoButton}
//   >
//     لا 
//   </button>
// </div>
// ); }
"use client"; import { useState, useEffect } from "react"; import styles from "./Welcome.module.css";
export default function Welcome({ onEnter }) { const [noPosition, setNoPosition] = useState({ top: "60%", left: "55%" }); const [isMounted, setIsMounted] = useState(false); const [showWelcome, setShowWelcome] = useState(false);
useEffect(() => { setIsMounted(true); // بنفحص إذا المستخدم شاف صفحة الـ Welcome من قبل 
 const hasSeenWelcome = localStorage.getItem("hasSeenWelcome"); if (!hasSeenWelcome) { setShowWelcome(true); 
    // إذا ما شافها، بنخليها تظهر 
   } }, []);
const moveNoButton = () => { const maxX = window.innerWidth - 130; const maxY = window.innerHeight - 60; const randomX = Math.max(10, Math.random() * maxX); const randomY = Math.max(10, Math.random() * maxY);
setNoPosition({
  left: `${randomX}px`,
  top: `${randomY}px`,
});
};
const handleReady = () => { // لما يكبس "نعم"، بنحفظ بالمخزن إنه شافها 
 localStorage.setItem("hasSeenWelcome", "true"); setShowWelcome(false);
// إذا في دالة جايته من برة (مثل onEnter) بتتنفذ كمان
if (onEnter) {
  onEnter();
}
};
// لنتأكد إنه الكود عم يشتغل متصفح حصراً وما يصير مشاكل بالـ SSR if (!isMounted || !showWelcome) return null;
return ( <div className={styles.welcomePage}> <div className={styles.content}> <div className={styles.emoji}> {/* // 1. إضافة الـ HTML الخاص بالـ Tenor داخل الـ div */}
      <h1>هل أنت مستعد لتبدأ معنا هذه الرحلة؟</h1>

      <p>رحلة جميلة نحو العلم والمعرفة 🤍</p>

      <button className={styles.yesButton} onClick={handleReady}>
        نعم، مستعد 🤍
      </button>
      <br></br>
    </div>
  </div>
  <button
    className={styles.noButton}
    style={{
      top: noPosition.top,
      left: noPosition.left,
    }}
    onMouseEnter={moveNoButton}
    onTouchStart={moveNoButton}
    onClick={moveNoButton}
  >
    لا
  </button>
</div>
); }