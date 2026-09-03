"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import PixelBookIcon from "./PixelBookIcon";

export default function ScholarBookMap({ scholarId, userId }) {
  const [levels, setLevels] = useState([]); // [{ level, books: [...] }]
  const [progressMap, setProgressMap] = useState({}); // { book_id: percent }
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!scholarId) return;

    supabase
      .from("books")
      .select("*")
      .eq("scholar_id", scholarId)
      .order("level")
      .then(async ({ data }) => {
        const books = data || [];
        const grouped = {};
        books.forEach((b) => {
          const lvl = b.level || 1;
          if (!grouped[lvl]) grouped[lvl] = [];
          grouped[lvl].push(b);
        });
        setLevels(Object.keys(grouped).sort((a, b) => a - b).map((lvl) => ({ level: lvl, books: grouped[lvl] })));

        if (userId && books.length > 0) {
          const { data: progressRows } = await supabase
            .from("reading_progress")
            .select("book_id, percent_complete")
            .in("book_id", books.map((b) => b.id))
            .eq("user_id", userId);
          const map = {};
          (progressRows || []).forEach((p) => (map[p.book_id] = p.percent_complete));
          setProgressMap(map);
        }
      });
  }, [scholarId, userId]);

  if (levels.length === 0) return null;

  return (
    <div className="card mb-6">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between">
        {/* <h2 className="font-bold text-lg text-primary"> <span>خريطة المراحل الدراسية</span></h2> */}

          <div className="flex items-center gap-2">
  
<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 5.5L8.5 3.5L15.5 5.5L20.5 3.5V18.5L15.5 20.5L8.5 18.5L3.5 20.5V5.5Z"
      fill="#FFF1F7"
      stroke="#D98BAF"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />

    <path
      d="M8.5 3.5V18.5M15.5 5.5V20.5"
      stroke="#E5A3BE"
      strokeWidth="1.2"
    />

    <path
      d="M6 15C8 12 9 14 10.5 11.5C12 9 13 12 14.5 10C16 8 17 9 18 7"
      stroke="#E987AD"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeDasharray="2 2"
    />

    <path
      d="M17.8 5.8C17.2 5 15.9 5.4 15.9 6.5C15.9 7.6 17.8 8.7 17.8 8.7C17.8 8.7 19.7 7.6 19.7 6.5C19.7 5.4 18.4 5 17.8 5.8Z"
      fill="#F28FB5"
    />
  </svg>

  <span className="text-sm font-bold text-primary">
    رحلتي في طلب العلم
  </span>
</div>

        <span className="text-sm text-gray-500 flex items-center gap-2">
          {levels.length} مستويات
          <span className={`transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
        </span>
      </button>

      {expanded && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
          {levels.map(({ level, books }) => {
            const levelDone = books.every((b) => Math.round(progressMap[b.id] || 0) >= 100);
            return (
              <div
                key={level}
                className={`rounded-xl border p-3 flex flex-col items-center ${levelDone ? "bg-[var(--color-primary)]/10" : ""}`}
                style={levelDone ? { borderColor: "var(--color-primary)" } : {}}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs mb-2"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  {level}
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {books.map((b) => {
                    const percent = Math.round(progressMap[b.id] || 0);
                    const done = percent >= 100;
                    return (
                      <Link key={b.id} href={`/books/${b.id}`} className="flex flex-col items-center gap-1 w-16 text-center group">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-transform group-hover:scale-105 ${
                            done ? "border-transparent" : "bg-white"
                          }`}
                          style={done ? { backgroundColor: "var(--color-primary)" } : { borderColor: "var(--color-accent)" }}
                        >
                          <PixelBookIcon done={done} size={28} />
                        </div>
                        <span className="text-[10px] line-clamp-2">{b.title_ar || b.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
