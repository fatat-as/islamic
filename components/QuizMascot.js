

"use client";
import styles from "./quiz.module.css";

export default function QuizMascot({ mood = "idle", size = 64 }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 128 128" 
      shapeRendering="crispEdges"
      width={size} 
      height={size}
    >
      {/* الأذن اليسرى */}
      <rect x="36" y="16" width="16" height="32" fill="#3A2D31" />
      <rect x="40" y="20" width="8" height="24" fill="#FFFFFF" />
      <rect x="42" y="24" width="4" height="16" fill="#FFB6C1" />

      {/* الأذن اليمنى */}
      <rect x="76" y="16" width="16" height="32" fill="#3A2D31" />
      <rect x="80" y="20" width="8" height="24" fill="#FFFFFF" />
      <rect x="82" y="24" width="4" height="16" fill="#FFB6C1" />

      {/* الرأس */}
      <rect x="28" y="44" width="72" height="40" fill="#3A2D31" />
      <rect x="32" y="48" width="64" height="32" fill="#FFFFFF" />

      {mood === "sad" ? (
        <>
          {/* العين اليسرى (باكية) */}
          <rect x="40" y="56" width="12" height="16" fill="#3A2D31"/>
          <rect x="44" y="60" width="4" height="4" fill="#FFFFFF"/>
          <rect x="40" y="72" width="4" height="2" fill="#FFFFFF"/> {/* دمعة */}

          {/* العين اليمنى (باكية) */}
          <rect x="76" y="56" width="12" height="16" fill="#3A2D31"/>
          <rect x="80" y="60" width="4" height="4" fill="#FFFFFF"/>
          <rect x="84" y="72" width="4" height="2" fill="#FFFFFF"/> {/* دمعة */}

          {/* الفم الحزين جداً */}
          <rect x="60" y="66" width="8" height="4" fill="#3A2D31"/>
          <rect x="56" y="70" width="4" height="2" fill="#3A2D31"/>
          <rect x="68" y="70" width="4" height="2" fill="#3A2D31"/>
        </>
      ) : (
        <>
          {/* العين اليسرى (عادية/سعيدة) */}
          <rect x="40" y="56" width="12" height="16" fill="#3A2D31" />
          <rect x="42" y="58" width="4" height="6" fill="#FFFFFF" />
          <rect x="48" y="66" width="2" height="2" fill="#FFFFFF" />
          <rect x="44" y="68" width="6" height="2" fill="#FFB6C1" />

          {/* العين اليمنى (عادية/سعيدة) */}
          <rect x="76" y="56" width="12" height="16" fill="#3A2D31" />
          <rect x="78" y="58" width="4" height="6" fill="#FFFFFF" />
          <rect x="84" y="66" width="2" height="2" fill="#FFFFFF" />
          <rect x="78" y="68" width="6" height="2" fill="#FFB6C1" />

          {mood === "happy" ? (
            /* الفم المبتسم والفرحان (عند الإجابة الصحيحة) */
            <>
              <rect x="58" y="66" width="12" height="6" fill="#3A2D31" />
              <rect x="60" y="68" width="8" height="4" fill="#FFB6C1" />
              <rect x="62" y="66" width="4" height="2" fill="#FFFFFF" />
            </>
          ) : (
            /* الفم العادي (الحالة الافتراضية idle) */
            <>
              <rect x="60" y="66" width="8" height="4" fill="#3A2D31" />
              <rect x="58" y="70" width="4" height="2" fill="#3A2D31" />
              <rect x="66" y="70" width="4" height="2" fill="#3A2D31" />
            </>
          )}
        </>
      )}

      {/* الجسم */}
      <rect x="36" y="80" width="56" height="36" fill="#3A2D31" />
      <rect x="40" y="84" width="48" height="28" fill="#FFFFFF" />

      {/* القدم اليسرى */}
      <rect x="36" y="100" width="20" height="16" fill="#3A2D31" />
      <rect x="40" y="104" width="12" height="8" fill="#FFFFFF" />
      <rect x="43" y="106" width="6" height="4" fill="#FFB6C1" />

      {/* القدم اليمنى */}
      <rect x="72" y="100" width="20" height="16" fill="#3A2D31" />
      <rect x="76" y="104" width="12" height="8" fill="#FFFFFF" />
      <rect x="79" y="106" width="6" height="4" fill="#FFB6C1" />

      {/* الذيل الصغير */}
      <rect x="88" y="92" width="12" height="12" fill="#3A2D31" />
      <rect x="90" y="94" width="8" height="8" fill="#FFFFFF" />
    </svg>
  );
}