"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { BADGE_DEFINITIONS } from "../lib/badges";

export default function BadgeStrip({ bookId, userId, refreshKey }) {
  const [earnedKeys, setEarnedKeys] = useState(new Set());

  useEffect(() => {
    if (!userId || !bookId) return;
    supabase
      .from("user_badges")
      .select("badge_key")
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .then(({ data }) => setEarnedKeys(new Set((data || []).map((b) => b.badge_key))));
  }, [bookId, userId, refreshKey]);

  if (!userId) return null; // ما في بطاقات لزائر مش مسجل دخول

  return (
    <div className="flex gap-3 flex-wrap my-4">
      {BADGE_DEFINITIONS.map((b) => {
        const earned = earnedKeys.has(b.key);
        return (
          <div
            key={b.key}
            title={b.description}
            className={`flex flex-col items-center gap-1 w-20 text-center transition-opacity ${earned ? "opacity-100" : "opacity-35"}`}
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center text-2xl overflow-hidden ${earned ? "bg-accent/20" : "bg-gray-100"}`}>
              {b.iconType === "image" ? (
                <img src={b.icon} alt={b.label} className="w-full h-full object-cover" />
              ) : (
                b.icon
              )}
            </div>
            <span className="text-xs font-medium">{b.label}</span>
          </div>
        );
      })}
    </div>
  );
}