// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { awardBadge } from "../lib/badges";

// // يستخرج playlist id من أي رابط بلاي ليست يوتيوب
// function extractPlaylistId(url) {
//   try {
//     const u = new URL(url);
//     return u.searchParams.get("list");
//   } catch {
//     return null;
//   }
// }

// export default function VideoPlaylist({ bookId, userId, playlistUrl }) {
//   const [videos, setVideos] = useState([]);
//   const [watchedIds, setWatchedIds] = useState(new Set());
//   const [openedIds, setOpenedIds] = useState(new Set()); // فيديوهات تم فتحها بس لسا ما تأكدت مشاهدتها
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!playlistUrl) {
//       setLoading(false);
//       return;
//     }
//     const playlistId = extractPlaylistId(playlistUrl);
//     if (!playlistId) {
//       setLoading(false);
//       return;
//     }

//     let isMounted = true;

//     async function fetchPlaylistData() {
//       try {
//         const res = await fetch(`/api/youtube-playlist?playlistId=${playlistId}`);
//         const data = await res.json();
//         const list = data.videos || [];
//         if (!isMounted) return;
//         setVideos(list);

//         if (userId && list.length > 0) {
//           const { data: watched } = await supabase
//             .from("video_progress")
//             .select("video_id")
//             .eq("book_id", bookId)
//             .eq("user_id", userId);
//           if (watched) setWatchedIds(new Set(watched.map((w) => w.video_id)));
//         }
//       } catch (err) {
//         console.error("Error fetching playlist:", err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     }

//     fetchPlaylistData();
//     return () => {
//       isMounted = false;
//     };
//   }, [playlistUrl, bookId, userId]);

//   // خطوة 1: فتح الفيديو على يوتيوب — لسا ما بينحسب مشاهَد
//   const openVideo = (video) => {
//     window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank", "noopener,noreferrer");
//     setOpenedIds((prev) => new Set(prev).add(video.videoId));
//   };

//   // خطوة 2: تأكيد يدوي من المستخدم — يستخدم functional update فقط،
//   // حتى لو انضغط الزر أكتر من مرة بسرعة، النتيجة نفسها دايمًا (بدون تكرار)
//   const confirmWatched = async (video) => {
//     if (!userId) return alert("سجل الدخول أولًا حتى يُحفظ تقدمك");

//     setWatchedIds((prev) => {
//       if (prev.has(video.videoId)) return prev;
//       return new Set(prev).add(video.videoId);
//     });

//     const { error } = await supabase.from("video_progress").upsert(
//       { user_id: userId, book_id: bookId, video_id: video.videoId },
//       { onConflict: "user_id,video_id" }
//     );

//     if (error) {
//       console.error("فشل حفظ تقدم الفيديو:", error);
//       alert("تعذر حفظ التقدم: " + error.message);
//     }
//   };

//   // يحدّث نسبة تقدم الكتاب + يمنح البطاقة، فقط عند تغيّر فعلي بعدد الفيديوهات المشاهَدة
//   useEffect(() => {
//     if (!userId || videos.length === 0) return;
//     const percent = Math.round((watchedIds.size / videos.length) * 100);

//     supabase.from("reading_progress").upsert(
//       { user_id: userId, book_id: bookId, percent_complete: percent, updated_at: new Date().toISOString() },
//       { onConflict: "user_id,book_id" }
//     );

//     if (watchedIds.size === videos.length) awardBadge(userId, bookId, "video_complete");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [watchedIds, videos.length, userId, bookId]);

//   if (loading) return <p className="text-gray-400">جارٍ تحميل الفيديوهات...</p>;
//   if (!playlistUrl) return <p className="text-gray-400">لا يوجد فيديو شرح مضاف لهذا الكتاب بعد</p>;
//   if (videos.length === 0) return <p className="text-gray-400">تعذر تحميل فيديوهات هذه البلاي ليست</p>;

//   return (
//     <div>
//       <p className="text-sm text-gray-500 mb-3 font-medium">
//         تمت مشاهدة {watchedIds.size} من {videos.length} فيديو
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//         {videos.map((v) => {
//           const isWatched = watchedIds.has(v.videoId);
//           const wasOpened = openedIds.has(v.videoId);

//           return (
//             <div key={v.videoId} className="card flex flex-col overflow-hidden p-0">
//               <button onClick={() => openVideo(v)} className="relative text-right">
//                 <img src={v.thumbnail} alt="" className="w-full aspect-video object-cover" />
//                 <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//                   <span className="text-white text-3xl">▶</span>
//                 </div>
//                 {isWatched && (
//                   <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">✔ تمت المشاهدة</span>
//                 )}
//               </button>
//               <span className="text-sm p-2 line-clamp-2">{v.title}</span>

//               {!isWatched && (
//                 <button
//                   onClick={() => confirmWatched(v)}
//                   disabled={!wasOpened}
//                   className={`text-xs m-2 mt-0 py-1.5 rounded-lg font-semibold ${
//                     wasOpened ? "bg-primary text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
//                   }`}
//                 >
//                   {wasOpened ? "شفت الفيديو ✔" : "افتح الفيديو أولًا"}
//                 </button>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { awardBadge } from "../lib/badges";

// يستخرج playlist id من أي رابط بلاي ليست يوتيوب
function extractPlaylistId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get("list");
  } catch {
    return null;
  }
}

export default function VideoPlaylist({ bookId, userId, playlistUrl }) {
  const [videos, setVideos] = useState([]);
  const [watchedIds, setWatchedIds] = useState(new Set());
  const [openedIds, setOpenedIds] = useState(new Set()); // فيديوهات تم فتحها بس لسا ما تأكدت مشاهدتها
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setWatchedIds(new Set());
    setOpenedIds(new Set());

    if (!playlistUrl) {
      setLoading(false);
      return;
    }
    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchPlaylistData() {
      try {
        const res = await fetch(`/api/youtube-playlist?playlistId=${playlistId}`);
        const data = await res.json();
        const list = data.videos || [];
        if (!isMounted) return;
        setVideos(list);

        if (userId && list.length > 0) {
          const listVideoIds = new Set(list.map((v) => v.videoId));
          const { data: watched } = await supabase
            .from("video_progress")
            .select("video_id")
            .eq("book_id", bookId)
            .eq("user_id", userId);
          if (watched) {
            // نحسب بس الفيديوهات الموجودة فعليًا بهذه البلاي ليست تحديدًا،
            // حتى لا يختلط تقدم شرح بتقدم شرح ثانٍ لنفس الكتاب
            const relevantWatched = watched.map((w) => w.video_id).filter((id) => listVideoIds.has(id));
            setWatchedIds(new Set(relevantWatched));
          }
        }
      } catch (err) {
        console.error("Error fetching playlist:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPlaylistData();
    return () => {
      isMounted = false;
    };
  }, [playlistUrl, bookId, userId]);

  // خطوة 1: فتح الفيديو على يوتيوب — لسا ما بينحسب مشاهَد
  const openVideo = (video) => {
    window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank", "noopener,noreferrer");
    setOpenedIds((prev) => new Set(prev).add(video.videoId));
  };

  // خطوة 2: تأكيد يدوي من المستخدم — يستخدم functional update فقط،
  // حتى لو انضغط الزر أكتر من مرة بسرعة، النتيجة نفسها دايمًا (بدون تكرار)
  const confirmWatched = async (video) => {
    if (!userId) return alert("سجل الدخول أولًا حتى يُحفظ تقدمك");

    setWatchedIds((prev) => {
      if (prev.has(video.videoId)) return prev;
      return new Set(prev).add(video.videoId);
    });

    const { error } = await supabase.from("video_progress").upsert(
      { user_id: userId, book_id: bookId, video_id: video.videoId },
      { onConflict: "user_id,video_id" }
    );

    if (error) {
      console.error("فشل حفظ تقدم الفيديو:", error);
      alert("تعذر حفظ التقدم: " + error.message);
    }
  };

  // يحدّث نسبة تقدم الكتاب + يمنح البطاقة، فقط عند تغيّر فعلي بعدد الفيديوهات المشاهَدة
  useEffect(() => {
    if (!userId || videos.length === 0) return;
    const percent = Math.round((watchedIds.size / videos.length) * 100);

    supabase.from("reading_progress").upsert(
      { user_id: userId, book_id: bookId, percent_complete: percent, updated_at: new Date().toISOString() },
      { onConflict: "user_id,book_id" }
    );

    if (watchedIds.size === videos.length) awardBadge(userId, bookId, "video_complete");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedIds, videos.length, userId, bookId]);

  if (loading) return <p className="text-gray-400">جارٍ تحميل الفيديوهات...</p>;
  if (!playlistUrl) return <p className="text-gray-400">لا يوجد فيديو شرح مضاف لهذا الكتاب بعد</p>;
  if (videos.length === 0) return <p className="text-gray-400">تعذر تحميل فيديوهات هذه البلاي ليست</p>;

  return (
    <div>
      <p className="text-sm text-gray-500 mb-3 font-medium">
        تمت مشاهدة {watchedIds.size} من {videos.length} فيديو
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {videos.map((v) => {
          const isWatched = watchedIds.has(v.videoId);
          const wasOpened = openedIds.has(v.videoId);

          return (
            <div key={v.videoId} className="card flex flex-col overflow-hidden p-0">
              <button onClick={() => openVideo(v)} className="relative text-right">
                <img src={v.thumbnail} alt="" className="w-full aspect-video object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <span className="text-white text-3xl">▶</span>
                </div>
                {isWatched && (
                  <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">✔ تمت المشاهدة</span>
                )}
              </button>
              <span className="text-sm p-2 line-clamp-2">{v.title}</span>

              {!isWatched && (
                <button
                  onClick={() => confirmWatched(v)}
                  disabled={!wasOpened}
                  className={`text-xs m-2 mt-0 py-1.5 rounded-lg font-semibold ${
                    wasOpened ? "bg-primary text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {wasOpened ? "شفت الفيديو ✔" : "افتح الفيديو أولًا"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}