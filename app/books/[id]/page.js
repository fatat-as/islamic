
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import PDFReader from "../../../components/PDFReader";
import Quiz from "../../../components/Quiz";
import CommentSection from "../../../components/CommentSection";
import VideoPlaylist from "../../../components/VideoPlaylist";
import BadgeStrip from "../../../components/BadgeStrip";
import GenerateQuizButton from "../../../components/GenerateQuizButton";

// مكون الخريطة الذهنية التفاعلية الحرة (مدمج مباشرة داخل الصفحة)
function BookMindMap({ bookId, userId, bookTitle }) {
  const [branches, setBranches] = useState([
    { id: 1, text: "المقدمة والهدف الأساسي" },
    { id: 2, text: "الأفكار المحورية" },
    { id: 3, text: "الدروس المستفادة" },
  ]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!bookId || !userId) return;
    supabase
      .from("book_mind_maps")
      .select("branches")
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        if (data?.branches && Array.isArray(data.branches)) {
          setBranches(data.branches);
        }
      });
  }, [bookId, userId]);

  const handleBranchChange = (index, value) => {
    const newBranches = [...branches];
    newBranches[index].text = value;
    setBranches(newBranches);
    setIsSaved(false);
  };

  const addBranch = () => {
    setBranches([...branches, { id: Date.now(), text: "" }]);
    setIsSaved(false);
  };

  const removeBranch = (index) => {
    if (branches.length <= 1) return;
    const newBranches = branches.filter((_, i) => i !== index);
    setBranches(newBranches);
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (!userId) return alert("سجل الدخول أولًا لحفظ الخريطة الذهنية");
    
    const { error } = await supabase
      .from("book_mind_maps")
      .upsert({ user_id: userId, book_id: bookId, branches }, { onConflict: "user_id,book_id" });

    if (!error) {
      setIsSaved(true);
    } else {
      alert("حدث خطأ أثناء الحفظ");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
      <h2 className="text-xl font-bold mb-1 text-primary">🧠 الخريطة الذهنية التفاعلية</h2>
      <p className="text-xs text-gray-400 mb-8">صممي خريطتك الذهنية بحرية، أضيفي الفروع وربطي أفكار كتاب "{bookTitle}"</p>

      {/* العقدة المركزية (قلب الخريطة الذهنية) */}
      <div className="relative flex justify-center mb-6">
        <div className="bg-primary text-white px-8 py-4 rounded-3xl font-bold text-sm shadow-md border-4 border-white z-10 scale-105">
          ✨ {bookTitle} ✨
        </div>
      </div>

      {/* خط التفرع المركزي */}
      <div className="w-1 h-8 bg-primary/30 mx-auto mb-4"></div>

      {/* شبكة الفروع المتفرعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 relative">
        {branches.map((branch, index) => (
          <div 
            key={branch.id} 
            className="relative bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-2 transition-all hover:border-primary/40 group"
          >
            <span className="w-7 h-7 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              {index + 1}
            </span>
            <input
              type="text"
              value={branch.text}
              onChange={(e) => handleBranchChange(index, e.target.value)}
              placeholder="اكتبي الفكرة المتفرعة هنا..."
              className="w-full bg-transparent border-none text-xs font-medium text-gray-700 outline-none text-right"
            />
            {branches.length > 1 && (
              <button
                onClick={() => removeBranch(index)}
                className="text-gray-300 hover:text-red-500 text-xs px-1.5 transition-colors"
                title="حذف الفكرة"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* زر إضافة فرع جديد للخريطة */}
      <button
        onClick={addBranch}
        className="mb-6 py-2 px-6 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl font-bold text-xs transition-all border border-dashed border-primary/30"
      >
        + إضافة فرع جديد للخريطة 
      </button>

      {/* زر الحفظ */}
      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-xl font-bold text-xs transition-all shadow-sm ${
          isSaved ? "bg-green-500 text-white" : "bg-primary text-white hover:opacity-90"
        }`}
      >
        {isSaved ? "تم حفظ الخريطة الذهنية بنجاح! 🎉" : "حفظ الخريطة الذهنية 💾"}
      </button>
    </div>
  );
}

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [user, setUser] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [tab, setTab] = useState("read"); // read | video | quiz | mindmap | comments
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    if (!id) return;
    supabase
      .from("books")
      .select("*, scholars(name_ar, name)")
      .eq("id", id)
      .single()
      .then(({ data }) => setBook(data));
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    supabase.from("ratings").select("stars").eq("book_id", id).then(({ data }) => {
      if (data?.length) {
        setAvgRating((data.reduce((a, r) => a + r.stars, 0) / data.length).toFixed(1));
      }
    });

    supabase
      .from("book_playlists")
      .select("*")
      .eq("book_id", id)
      .then(({ data }) => {
        setPlaylists(data || []);
        if (data?.length === 1) setSelectedPlaylist(data[0]);
      });
  }, [id]);

  const rateBook = async (stars) => {
    if (!user) return alert("سجل الدخول أولًا للتقييم");
    setMyRating(stars);
    await supabase.from("ratings").upsert({ user_id: user.id, book_id: id, stars }, { onConflict: "user_id,book_id" });
  };

  if (!book) return <p className="text-center py-20 text-gray-400">جارٍ التحميل...</p>;

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-3 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-primary hover:underline">المشايخ</Link>
        {book.scholar_id && (
          <>
            <span>/</span>
            <Link href={`/scholars/${book.scholar_id}`} className="hover:text-primary hover:underline">
              {book.scholars?.name_ar || book.scholars?.name || "الشيخ"}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-primary font-medium">{book.title_ar || book.title}</span>
      </nav>
      
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-primary">{book.title_ar || book.title}</h1>
        <p className="text-gray-600 mt-1">{book.summary}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-accent">⭐ {avgRating || "لا يوجد تقييم بعد"}</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => rateBook(n)} className={`text-xl ${n <= myRating ? "text-accent" : "text-gray-300"}`}>
              ★
            </button>
          ))}
        </div>
        <div>قبل البدء:
<br></br>
•الأخلاص وتجديد النية 
<br>
</br>
•الالتزام والصبر على الطلب 
<br></br>
•معرفة فضيلة هذا العلم وأهميته 
<br>
</br>
يقول النبي الكريم صل الله عليه وسلم فيما رواه أهل السنن:
<br></br>
"مَنْ سَلَكَ طَرِيقًا يَطْلُبُ فِيهِ عِلْمًا سَلَكَ اللَّهُ بِهِ طَرِيقًا مِنْ طُرُقِ الْجَنَّةِ، وَإِنَّ الْمَلَائِكَةَ لَتَضَعُ أَجْنِحَتَهَا رِضًا لِطَالِبِ الْعِلْمِ، وَإِنَّ الْعَالِمَ لَيَسْتَغْفِرُ لَهُ مَنْ فِي السَّمَاوَاتِ وَمَنْ فِي الْأَرْضِ وَالْحِيتَانُ فِي جَوْفِ الْمَاءِ، وَإِنَّ فَضْلَ الْعَالِمِ عَلَى الْعَابِدِ كَفَضْلِ الْقَمَرِ لَيْلَةَ الْبَدْرِ عَلَى سَائِرِ الْكَوَاكِبِ، وَإِنَّ الْعُلَمَاءَ وَرَثَةُ الْأَنْبِيَاءِ، وَإِنَّ الْأَنْبِيَاءَ لَمْ يُوَرِّثُوا دِينَارًا وَلَا دِرْهَمًا، وَرَّثُوا الْعِلْمَ، فَمَنْ أَخَذَهُ أَخَذَ بِحَظٍّ وَافِرٍ ".</div>
        <BadgeStrip bookId={id} userId={user?.id} refreshKey={tab} />
      </div>

      {/* Tabs - قائمة التبويبات */}
      <div className="flex gap-2 border-b mb-4 overflow-x-auto">
        {[
          ["read", "قراءة الكتاب"],
          ["video", "شرح فيديو"],
          ["quiz", "اختبار قصير"],
          ["mindmap", "🧠 الخريطة الذهنية"],
          ["comments", "التعليقات والمناقشة"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 font-medium whitespace-nowrap ${tab === key ? "border-b-2 border-primary text-primary" : "text-gray-500"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* محتوى تبويب القراءة */}
      {tab === "read" && (
        <div>
          <PDFReader bookId={id} pdfUrl={book.pdf_url} userId={user?.id} />
        </div>
      )}

      {/* محتوى تبويب شرح الفيديو */}
      {tab === "video" && (
        <div>
          {playlists.length === 0 && <p className="text-gray-400">لا يوجد شرح فيديو مضاف لهذا الكتاب بعد</p>}

          {playlists.length > 1 && !selectedPlaylist && (
            <div>
              <p className="font-semibold mb-3">اختر الشرح الذي تريد الاستماع إليه:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {playlists.map((p) => (
                  <button key={p.id} onClick={() => setSelectedPlaylist(p)} className="card text-right hover:border-primary">
                    <span className="font-bold text-primary">{p.presenter_name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedPlaylist && (
            <div>
              {playlists.length > 1 && (
                <button onClick={() => setSelectedPlaylist(null)} className="text-sm text-primary mb-3">
                  ← تغيير الشرح ({selectedPlaylist.presenter_name})
                </button>
              )}
              <VideoPlaylist bookId={id} userId={user?.id} playlistUrl={selectedPlaylist.youtube_playlist_url} />
            </div>
          )}
        </div>
      )}

      {/* محتوى تبويب الاختبار */}
      {tab === "quiz" && (
        <div>
          <GenerateQuizButton bookId={id} />
          <Quiz bookId={id} userId={user?.id} />
        </div>
      )}

      {/* محتوى تبويب الخريطة الذهنية التفاعلية */}
      {tab === "mindmap" && (
        <BookMindMap 
          bookId={id} 
          userId={user?.id} 
          bookTitle={book.title_ar || book.title} 
        />
      )}

      {/* محتوى تبويب التعليقات */}
      {tab === "comments" && <CommentSection bookId={id} user={user} />}
    </div>
  );
}