"use client";

// بادج تقدّم القراءة — أرنب كيوت بتصميم أصلي، مع بطارية فوقه بتعكس نسبة الإنجاز
// percent: 0 → فاضية | 1-99 → نص | 100 → ممتلئة خضرا
export default function BookProgressBadge({ percent = 0, size = 40 }) {
  const level = percent >= 100 ? "full" : percent > 0 ? "half" : "empty";

  const batteryColor = level === "full" ? "#7BC96F" : level === "half" ? "#F4C86A" : "#D9D9D9";
  const eyesHappy = level === "full";
  const eyesTired = level === "empty";

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 60 70" width={size} height={size * 1.16}>
        {/* البطارية فوق راس الأرنب */}
        <rect x="22" y="0" width="16" height="9" rx="2" fill="#fff" stroke="#3B2A22" strokeWidth="1.6" />
        <rect x="26" y="-2" width="8" height="3" rx="1" fill="#3B2A22" />
        <rect
          x="24"
          y="2"
          width={level === "empty" ? 0 : level === "half" ? 6 : 12}
          height="5"
          rx="1"
          fill={batteryColor}
        />

        {/* أذنا الأرنب */}
        <ellipse cx="20" cy="20" rx="7" ry="12" fill="#fff" stroke="#3B2A22" strokeWidth="1.6" />
        <ellipse cx="40" cy="20" rx="7" ry="12" fill="#fff" stroke="#3B2A22" strokeWidth="1.6" />
        <ellipse cx="20" cy="21" rx="3" ry="7" fill="#FBE49A" />
        <ellipse cx="40" cy="21" rx="3" ry="7" fill="#FBE49A" />

        {/* جسم الأرنب */}
        <ellipse cx="30" cy="45" rx="24" ry="20" fill="#fff" stroke="#3B2A22" strokeWidth="1.8" />

        {/* الخدود */}
        <ellipse cx="14" cy="48" rx="4" ry="3" fill="#F8B4C0" opacity="0.8" />
        <ellipse cx="46" cy="48" rx="4" ry="3" fill="#F8B4C0" opacity="0.8" />

        {/* العينان */}
        {eyesTired ? (
          <>
            <path d="M20 40 Q24 44 28 40" fill="none" stroke="#3B2A22" strokeWidth="2" strokeLinecap="round" />
            <path d="M32 40 Q36 44 40 40" fill="none" stroke="#3B2A22" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="23" cy="40" r="2.6" fill="#3B2A22" />
            <circle cx="37" cy="40" r="2.6" fill="#3B2A22" />
          </>
        )}

        {/* الفم */}
        {eyesHappy ? (
          <path d="M25 49 Q30 55 35 49" fill="none" stroke="#3B2A22" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <circle cx="30" cy="50" r="1.6" fill="#3B2A22" />
        )}
      </svg>
      <span className="text-[10px] font-bold text-gray-500 mt-0.5">{percent}%</span>
    </div>
  );
}
