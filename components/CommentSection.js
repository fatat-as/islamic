"use client";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { awardBadge } from "../lib/badges";

export default function CommentSection({ bookId, user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const loadComments = async () => {
    const { data: commentsData, error } = await supabase
      .from("comments")
      .select("*")
      .eq("book_id", bookId)
      .order("created_at", { ascending: false });

    if (error || !commentsData) {
      console.error(error);
      setComments([]);
      return;
    }

    const userIds = [...new Set(commentsData.map((c) => c.user_id))];
    let profilesMap = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase.from("profiles").select("id, full_name").in("id", userIds);
      profilesMap = Object.fromEntries((profiles || []).map((p) => [p.id, p.full_name]));
    }

    setComments(commentsData.map((c) => ({ ...c, author_name: profilesMap[c.user_id] || "مستخدم" })));
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const detectAttachmentType = (file) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type === "application/pdf") return "pdf";
    return "text";
  };

  const post = async () => {
    if (!user) return alert("سجل الدخول للمشاركة");
    if (!text.trim() && !file) return;

    let attachment_url = null;
    let attachment_type = null;

    if (file) {
      setUploading(true);
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error: uploadError } = await supabase.storage.from("comment-attachments").upload(safeName, file);
      setUploading(false);

      if (uploadError) {
        alert("تعذر رفع المرفق: " + uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage.from("comment-attachments").getPublicUrl(safeName);
      attachment_url = urlData.publicUrl;
      attachment_type = detectAttachmentType(file);
    }

    const { error } = await supabase
      .from("comments")
      .insert({ user_id: user.id, book_id: bookId, content: text, attachment_url, attachment_type });

    if (error) {
      alert("تعذر نشر التعليق: " + error.message);
      return;
    }

    awardBadge(user.id, bookId, "shared_knowledge");
    setText("");
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadComments();
  };

  const deleteComment = async (commentId) => {
    if (!confirm("متأكد إنك بدك تحذف هذا التعليق؟")) return;
    const { error } = await supabase.from("comments").delete().eq("id", commentId);
    if (error) {
      alert("تعذر حذف التعليق: " + error.message);
      return;
    }
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2">
          <input
            className="border rounded-lg p-2 flex-1"
            placeholder="شارك ما تعلمته من هذا الكتاب..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* زر + دائري لإرفاق ملف */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="أرفق صورة أو PDF أو ملف نصي"
            className="w-9 h-9 shrink-0 rounded-full bg-primary text-white flex items-center justify-center hover:bg-green-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.txt"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          <button onClick={post} disabled={uploading} className="btn-primary whitespace-nowrap">
            {uploading ? "..." : "نشر"}
          </button>
        </div>
        {file && <p className="text-xs text-gray-500">📎 {file.name}</p>}
      </div>

      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="card relative">
            {user?.id === c.user_id && (
              <button
                onClick={() => deleteComment(c.id)}
                title="حذف التعليق"
                className="absolute top-3 left-3 text-red-400 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            )}

            <p className="font-semibold text-sm text-primary">{c.author_name}</p>
            {c.content && <p className="mt-1 pl-6">{c.content}</p>}

            {c.attachment_url && c.attachment_type === "image" && (
              <img src={c.attachment_url} alt="مرفق" className="mt-2 rounded-lg max-h-64 object-cover" />
            )}
            {c.attachment_url && c.attachment_type === "pdf" && (
              <a href={c.attachment_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary underline text-sm">
                📄 فتح ملف PDF المرفق
              </a>
            )}
            {c.attachment_url && c.attachment_type === "text" && (
              <a href={c.attachment_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-primary underline text-sm">
                📎 فتح الملف المرفق
              </a>
            )}
          </div>
        ))}
        {comments.length === 0 && <p className="text-gray-400">لا توجد تعليقات بعد — كن أول من يشارك</p>}
      </div>
    </div>
  );
}