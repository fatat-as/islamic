// "use client";
// import styles from "./noorAvatar.module.css";

// // state: "idle" | "welcome" | "thinking" | "answer"
// export default function NoorAvatar({ state = "idle", size = 56 }) {
//   return (
//     <div className={`${styles.wrapper} ${styles[state]}`} style={{ width: size, height: size }}>
//       {state === "welcome" && (
//         <>
//           <span className={`${styles.heart} ${styles.heart1}`}>💗</span>
//           <span className={`${styles.heart} ${styles.heart2}`}>💗</span>
//         </>
//       )}
//       {state === "answer" && <span className={styles.sparkle}>⭐</span>}

//       <svg viewBox="0 0 120 120" className={styles.body}>
//         {/* الهالة الذهبية الخفيفة */}
//         <ellipse cx="60" cy="55" rx="46" ry="46" className={styles.halo} />

//         {/* جسم الروبوت الزهري */}
//         <circle cx="60" cy="55" r="34" fill="#F4B9C9" />

//         {/* العباءة البيضاء بأطراف ذهبية */}
//         <path
//           d="M26 62 Q60 100 94 62 L94 92 Q60 112 26 92 Z"
//           fill="#FFFFFF"
//           stroke="#E4B65C"
//           strokeWidth="2"
//         />
//         <path d="M26 92 Q60 112 94 92" fill="none" stroke="#E4B65C" strokeWidth="2" strokeDasharray="3 4" />

//         {/* الكتاب الصغير */}
//         <g transform="translate(78,78) rotate(-10)">
//           <rect x="-9" y="-7" width="18" height="14" rx="1.5" fill="#1E3A8A" />
//           <polygon points="0,-4 2,-1 0,2 -2,-1" fill="#E4B65C" />
//         </g>

//         {/* العينان */}
//         <g className={styles.eyes}>
//           <circle cx="48" cy="52" r="7" fill="#3B2A22" className={styles.eye} />
//           <circle cx="72" cy="52" r="7" fill="#3B2A22" className={styles.eye} />
//           <circle cx="50" cy="49" r="2" fill="#fff" />
//           <circle cx="74" cy="49" r="2" fill="#fff" />
//         </g>

//         {/* الفم */}
//         <path d="M52 66 Q60 71 68 66" fill="none" stroke="#3B2A22" strokeWidth="2.5" strokeLinecap="round" />
//       </svg>
//     </div>
//   );
// }
// "use client";
// import styles from "./noorAvatar.module.css";

// // نسخة مبسّطة: الراس بس (بدون جسم/أذرع/أرجل) — أنضف وأثبت بالأحجام الصغيرة زي أيقونة الشات
// // state: "idle" | "welcome" | "thinking" | "answer"
// // export default function NoorAvatar({ state = "idle", size = 44 }) {
// //   return (
//     // <div className={`${styles.robotContainer} ${styles[state]}`} style={{ width: size, height: size }}>
//     //   <div className={styles.antennaStick} />
//     //   <div className={styles.heartTop}>💗</div>
//     //   <div className={styles.floatingHeart}>💗</div>
// <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
//   <defs>
   
//     <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
//       <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.08"/>
//     </filter>

//   </defs>

//   <circle cx="100" cy="90" r="75" fill="none" stroke="#ffd700" stroke-width="2" stroke-dasharray="4 4" class="halo-glow" />

//   <g transform="translate(10, 10)">
 
//     <circle cx="20" cy="85" r="18" fill="#ffcccc" />
//     <circle cx="160" cy="85" r="18" fill="#ffcccc" />

//     <g transform="translate(90, 10)">
//       <line x1="0" y1="0" x2="0" y2="20" stroke="#ccc" stroke-width="4" stroke-linecap="round" />
//       <path d="M0, -10 C -10, -25 -20, -5 0, 10 C 20, -5 10, -25 0, -10 Z" fill="#ffcccc" transform="translate(0, -15) scale(0.9)" />
//     </g>

//     <g class="robot-head" style="transform-origin: 90px 80px; transform: translateX(-50%); position: absolute; left: 50%;">
//       <rect x="20" y="25" width="140" height="115" rx="55" fill="#ffffff" filter="url(#soft-shadow)" />

   
//       <rect x="32" y="38" width="116" height="85" rx="14" fill="#111111" />
      
    
//       <path d="M 40 45 Q 60 40 80 45" stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none" stroke-linecap="round" />

//       <ellipse class="eye" cx="67" cy="75" rx="8" ry="15" fill="#ffcccc" />
//       <ellipse class="eye" cx="113" cy="75" rx="8" ry="15" fill="#ffcccc" />

    
//       <path class="smile" d="M 88 92 Q 90 98 92 92" stroke="#ffcccc" stroke-width="4" fill="none" stroke-linecap="round" />
//     </g>

   
//     <g class="sparkle" opacity="0">
//       <path d="M 150 40 L 153 48 L 161 50 L 153 52 L 150 60 L 147 52 L 139 50 L 147 48 Z" fill="#ffd700" />
//       <path d="M 30 110 L 32 115 L 37 117 L 32 119 L 30 124 L 28 119 L 23 117 L 28 115 Z" fill="#ffd700" transform="scale(0.7) translate(10, 20)" />
//     </g>
//     </g>
//     </svg>
    
"use client";
import React from "react";

export default function NoorFace({ state = "idle", size = 200 }) {
  return (
    <div className={`robot-wrapper ${state}`} style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.08"/>
          </filter>

          <style>{`
            .eye {
              animation: eyeBlink 4s infinite;
              transform-origin: center;
            }
            @keyframes eyeBlink {
              0%, 96%, 98% { transform: scaleY(1); }
              97%, 99% { transform: scaleY(0.1); }
            }

            .robot-head {
              transform-origin: 100px 90px;
              transition: transform 0.4s ease;
            }

            /* 1. الاستماع */
            .listening .robot-head {
              transform: rotate(4deg) translateY(3px);
            }
            .listening .eye {
              transform: scaleY(0.6);
            }

            /* 2. التفكير / البحث */
            .thinking .robot-head {
              animation: searchSway 1.5s ease-in-out infinite;
            }
            .thinking .eye {
              transform: scaleY(0.15);
            }
            .thinking .halo-glow {
              opacity: 0.8 !important;
              transform: scale(1.1);
            }

            @keyframes searchSway {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }

            /* 3. الإجابة والتبشير */
            .answer .robot-head {
              animation: joyNod 0.5s ease-out;
            }
            .answer .smile {
              d: path("M 85 90 Q 90 102 95 90");
            }
            .answer .sparkles-group {
              opacity: 1 !important;
              transform: scale(1.2);
            }

            @keyframes joyNod {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }

            .halo-glow {
              transition: all 0.5s ease;
              opacity: 0.3;
              transform-origin: 100px 90px;
            }

            .sparkles-group {
              transition: all 0.3s ease;
              opacity: 0;
            }
          `}</style>
        </defs>

        {/* الهالة النورانية الدينية */}
        <circle cx="100" cy="90" r="75" fill="none" stroke="#ffd700" strokeWidth="2" strokeDasharray="4 4" className="halo-glow" />

        <g transform="translate(10, 10)">
          {/* الأذنين */}
          <circle cx="20" cy="85" r="18" fill="#ffcccc" />
          <circle cx="160" cy="85" r="18" fill="#ffcccc" />

          {/* الهوائي العلوي */}
          <g transform="translate(90, 10)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#ccc" strokeWidth="4" strokeLinecap="round" />
            <path d="M0, -10 C -10, -25 -20, -5 0, 10 C 20, -5 10, -25 0, -10 Z" fill="#ffcccc" transform="translate(0, -15) scale(0.9)" />
          </g>

          {/* رأس الروبوت */}
          <g className="robot-head">
            <rect x="20" y="25" width="140" height="115" rx="55" fill="#ffffff" filter="url(#soft-shadow)" />

            {/* الشاشة */}
            <rect x="32" y="38" width="116" height="85" rx="14" fill="#111111" />
            <path d="M 40 45 Q 60 40 80 45" stroke="rgba(255,255,255,0.15)" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* العيون */}
            <ellipse className="eye" cx="67" cy="75" rx="8" ry="15" fill="#ffcccc" />
            <ellipse className="eye" cx="113" cy="75" rx="8" ry="15" fill="#ffcccc" />

            {/* الفم */}
            <path className="smile" d="M 88 92 Q 90 98 92 92" stroke="#ffcccc" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>

          {/* نجوم المعرفة وقت الإجابة */}
          <g className="sparkles-group">
            <path d="M 150 40 L 153 48 L 161 50 L 153 52 L 150 60 L 147 52 L 139 50 L 147 48 Z" fill="#ffd700" />
            <path d="M 30 110 L 32 115 L 37 117 L 32 119 L 30 124 L 28 119 L 23 117 L 28 115 Z" fill="#ffd700" transform="scale(0.7) translate(10, 20)" />
          </g>
        </g>
      </svg>
    </div>
  );
}