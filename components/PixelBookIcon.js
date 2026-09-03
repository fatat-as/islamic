// "use client";

// const GRID = 12;
// const OUTLINE = "#6B5560";
// const COVER = "#F6C2D0";
// const COVER_DONE = "#FFFFFF";
// const PAGES = "#FFFDF8";
// const RIBBON = "#F4C86A";

// // كتاب بيكسل كيوت — يتغيّر لونه قليلًا لو "منتهي"
// export default function PixelBookIcon({ done = false, size = 28 }) {
//   const cells = [];

//   const push = (x, y, fill) => cells.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);

//   for (let y = 1; y <= 10; y++) {
//     for (let x = 1; x <= 9; x++) {
//       if ((x === 1 && (y === 1 || y === 10)) || (x === 9 && (y === 1 || y === 10))) continue;
//       const isEdge = x === 1 || x === 9 || y === 1 || y === 10;
//       push(x, y, isEdge ? OUTLINE : done ? COVER_DONE : COVER);
//     }
//   }

//   for (let y = 2; y <= 9; y++) push(9.4, y, PAGES);
//   for (let y = 2; y <= 9; y++) push(5, y, OUTLINE);

//   push(3, 0, RIBBON);
//   push(3, 1, RIBBON);

//   push(6.5, 5, RIBBON);
//   push(7, 4, RIBBON);
//   push(7.5, 5, RIBBON);

//   return (
//     <svg viewBox={`0 0 ${GRID} ${GRID}`} width={size} height={size} shapeRendering="crispEdges">
//       {cells}
//     </svg>
//   );
// }
// djsncnscnncnc
"use client";

// كتاب كيوت بوجه لطيف — رسم ناعم (مش بيكسل)، بروح الصورة المرجعية
export default function PixelBookIcon({ done = false, size = 36 }) {
  const cover = done ? "#FFFFFF" : "#F6BFD1";
  const coverDark = done ? "#F3D9E0" : "#EE9CB6";
  const outline = "#7A4A56";

  return (
    <svg viewBox="0 0 100 100" width={size} height={size}>
      {/* الأرجل الصغيرة */}
      <ellipse cx="34" cy="88" rx="9" ry="6" fill={coverDark} stroke={outline} strokeWidth="2.5" />
      <ellipse cx="66" cy="88" rx="9" ry="6" fill={coverDark} stroke={outline} strokeWidth="2.5" />

      {/* جسم الكتاب */}
      <rect x="18" y="26" width="64" height="60" rx="10" fill={cover} stroke={outline} strokeWidth="3" />
      {/* عطفة الكتاب (يسار) */}
      <rect x="18" y="26" width="14" height="60" rx="10" fill={coverDark} stroke={outline} strokeWidth="3" />

      {/* خط تنقيط زخرفي */}
      <rect x="38" y="34" width="38" height="44" rx="7" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="3 4" opacity="0.8" />

      {/* شريطة/إشارة مرجعية أعلى الكتاب */}
      <rect x="46" y="10" width="8" height="20" fill="#F4C86A" stroke={outline} strokeWidth="2" />
      {/* نجمة صغيرة أعلى الشريطة */}
      <path
        d="M50 4 L52.2 9 L57.5 9.5 L53.5 13 L54.8 18.3 L50 15.4 L45.2 18.3 L46.5 13 L42.5 9.5 L47.8 9 Z"
        fill="#FBE07A"
        stroke={outline}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* العينان */}
      <g>
        <circle cx="45" cy="56" r="7" fill="#3B2A30" />
        <circle cx="63" cy="56" r="7" fill="#3B2A30" />
        <circle cx="47.5" cy="53.5" r="1.8" fill="#fff" />
        <circle cx="65.5" cy="53.5" r="1.8" fill="#fff" />
        {/* رموش خفيفة */}
        <path d="M39 49 Q45 46 50 49" stroke={outline} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M58 49 Q63 46 69 49" stroke={outline} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>

      {/* الخدود */}
      <ellipse cx="38" cy="66" rx="5" ry="3.2" fill="#F5A0B8" opacity="0.75" />
      <ellipse cx="70" cy="66" rx="5" ry="3.2" fill="#F5A0B8" opacity="0.75" />

      {/* الفم */}
      <path d="M50 66 Q54 71 58 66" stroke={outline} strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}