

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import BookProgressBadge from "../../../components/BookProgressBadge";
import ScholarBookMap from "../../../components/ScholarBookMap";

export default function ScholarPage() {
  const { id } = useParams();
  const [scholar, setScholar] = useState(null);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [bookProgress, setBookProgress] = useState({}); // { book_id: percent_complete }
  const [userId, setUserId] = useState(null);
  const [hint, setHint] = useState("");

  const hints = [
    "«من سلك طريقًا يلتمس فيه علمًا سهل الله له به طريقًا إلى الجنة» — رواه مسلم",
    "اجعل لك وردًا ثابتًا من العلم كل يوم، ولو كان قليلًا؛ فدوام القليل يصنع إنجازًا كبيرًا.",
    "الإخلاص هو أول ما يحتاجه طالب العلم، قبل كثرة ما يقرأ",
   " قال النبي ﷺ: «مَنْ يُرِدِ اللَّهُ بِه خَيْراً يُفَقِّهْهُ فِي الدِّينِ» (متفق عليه)",
   "لا تجعل كثرة الكتب هدفك، بل اجعل الفهم والعمل بها هدفك.",
   "﴿يَرْفَعِ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَالَّذِينَ أُوتُوا الْعِلْمَ دَرَجَاتٍ﴾",
  ];

  useEffect(() => {
    if (!id) return;

    supabase.from("scholars").select("*").eq("id", id).single().then(({ data }) => setScholar(data));
    supabase.from("categories").select("*").then(({ data }) => setCategories(data || []));

    supabase
      .from("books")
      .select("*")
      .eq("scholar_id", id)
      .then(async ({ data }) => {
        setBooks(data || []);

        // Compute overall progress across this scholar's books for the logged-in user
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) setUserId(userData.user.id);
        if (userData?.user && data?.length) {
          const bookIds = data.map((b) => b.id);
          const { data: progressRows } = await supabase
            .from("reading_progress")
            .select("*")
            .in("book_id", bookIds)
            .eq("user_id", userData.user.id);

          const done = (progressRows || []).filter((p) => p.percent_complete >= 100).length;
          setProgress({ done, total: data.length });

          const map = {};
          (progressRows || []).forEach((p) => {
            map[p.book_id] = p.percent_complete || 0;
          });
          setBookProgress(map);
        } else {
          setProgress({ done: 0, total: data?.length || 0 });
        }
      });

    setHint(hints[Math.floor(Math.random() * hints.length)]);
  }, [id]);

  const filteredBooks = books.filter((b) => {
    const matchesSearch = (b.title_ar || b.title || "").includes(search) || (b.title || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "all" || b.category_id === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const percent = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div>
      {scholar && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">{scholar.name_ar || scholar.name}</h1>
          <p className="text-gray-600">{scholar.bio}</p>
        </div>
      )}

      <ScholarBookMap scholarId={id} userId={userId} />

      {/* Progress + motivational hint */}
      <div className="card mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span >تقدمك في هذه المكتبة </span>
          <span>{progress.done} / {progress.total} كتب</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
        </div>
        {hint && <p className="text-sm text-accent mt-3">💡 {hint}</p>}
      </div>

      {/* Search + category filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="ابحث عن كتاب بالاسم..."
          className="border rounded-lg p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-lg p-2"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}
        >
          <option value="all">كل الأصناف</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name_ar || c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((b) => (
          <Link key={b.id} href={`/books/${b.id}`} className="card p-0 overflow-hidden relative">
            <div className="absolute top-2 left-2 z-10 bg-white/90 rounded-full p-1 shadow">
              <BookProgressBadge percent={Math.round(bookProgress[b.id] || 0)} size={32} />
            </div>
            {b.cover_image_url ? (
              <img src={b.cover_image_url} alt={b.title_ar || b.title} className="w-full aspect-[3/4] object-cover" />
            ) : (
              <div className="w-full aspect-[3/4] bg-primary/10 flex items-center justify-center text-4xl">📕</div>
            )}
            <div className="p-4">
              <h3 className="font-bold">{b.title_ar || b.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-3 mt-1">{b.summary}</p>
            </div>
          </Link>
        ))}
        {filteredBooks.length === 0 && (
          <p className="text-gray-400 col-span-full text-center py-10">لا توجد كتب مطابقة</p>
        )}
      </div>
    </div>
  );
}