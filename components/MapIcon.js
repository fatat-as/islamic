"use client";
export default function MapIcon({ size = 26 }) {
  return (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8}>
      {/* شكل الخريطة المطوية (حواف زجزاج فوق) */}
      <path
        d="M8 24 L26 8 L50 22 L74 8 L92 24 L92 62 L74 76 L50 62 L26 76 L8 62 Z"
        fill="#FBE9EE"
        stroke="#7A4A56"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* خطوط الطي الداخلية */}
      <path d="M26 8 L26 76 M50 22 L50 62 M74 8 L74 76" stroke="#F3C6D3" strokeWidth="2" />

      {/* المسار المتقطع */}
      <path
        d="M18 55 Q34 62 40 46 Q46 30 62 34 Q76 37 80 26"
        fill="none"
        stroke="#F28FAE"
        strokeWidth="3"
        strokeDasharray="5 4"
        strokeLinecap="round"
      />

      {/* دبوس قلب صغير بنهاية المسار */}
      <g transform="translate(80,16)">
        <path
          d="M0 14 C-8 6 -8 -2 0 -2 C8 -2 8 6 0 14 Z"
          fill="#F28FAE"
          stroke="#7A4A56"
          strokeWidth="2"
        />
        <path d="M-3 3 C-3 0 3 0 3 3 C3 6 0 8 0 8 C0 8 -3 6 -3 3 Z" fill="#fff" />
      </g>
    </svg>
  );
}