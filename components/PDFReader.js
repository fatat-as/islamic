"use client";
import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { supabase } from "../lib/supabaseClient";
import { awardBadge } from "../lib/badges";


// ربط العامل (Worker) الخاص بالمكتبة لتعمل في المتصفح بشكل صحيح
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;


export default function PDFReader({ bookId, pdfUrl, userId }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);

  // Load saved progress + notes for this user/book when component mounts
  useEffect(() => {
    if (!userId || !bookId) return;

    supabase
      .from("reading_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("book_id", bookId)
      .single()
      .then(({ data }) => {
        if (data) setPageNumber(data.last_page || 1);
      });

    loadNotes();
  }, [userId, bookId]);

  const loadNotes = async () => {
    const { data } = await supabase
      .from("notes")
      .select("*")
      .eq("book_id", bookId)
      .eq("user_id", userId)
      .order("page");
    setNotes(data || []);
  };

  // تسجّل الصفحات الجديدة المقروءة بجدول النشاط (يغذّي لوحة "حسابي": صفحات اليوم، هدف الأسبوع، الأيام المتتالية)
  const logActivity = async (newPage) => {
    if (!userId) return;
    const delta = newPage - lastLoggedPage.current;
    if (delta > 0) {
      await supabase.from("reading_activity_log").insert({
        user_id: userId,
        book_id: bookId,
        pages_delta: delta,
        activity_date: new Date().toISOString().slice(0, 10),
      });
    }
    lastLoggedPage.current = newPage;
  };
 
  // Save progress every time the page changes (debounced via simple effect)
  const saveProgress = useCallback(
    async (page, total) => {
      if (!userId) return;
      const percent = total ? Math.min(100, Math.round((page / total) * 100)) : 0;
      await supabase.from("reading_progress").upsert(
        {
          user_id: userId,
          book_id: bookId,
          last_page: page,
          percent_complete: percent,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,book_id" }
      );
      if (percent >= 100) awardBadge(userId, bookId, "finished_reading");
    },
    [userId, bookId]
  );

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    saveProgress(pageNumber, numPages);
  };

  const goToPage = (delta) => {
    const next = Math.min(Math.max(1, pageNumber + delta), numPages || 1);
    setPageNumber(next);
    saveProgress(next, numPages);
  };

  const jumpToPage = (value) => {
    const num = parseInt(value, 10);
    if (!num || num < 1) return;
    const clamped = Math.min(Math.max(1, num), numPages || num);
    setPageNumber(clamped);
    saveProgress(clamped, numPages);
  };

  const addNote = async () => {
    if (!userId) return alert("سجل الدخول لإضافة ملاحظات");
    if (!noteText.trim()) return;
    await supabase.from("notes").insert({ user_id: userId, book_id: bookId, page: pageNumber, content: noteText });
    setNoteText("");
    loadNotes();
  };

  const deleteNote = async (noteId) => {
    if (!confirm("متأكد إنك بدك تحذف هذه الملاحظة؟")) return;
    await supabase.from("notes").delete().eq("id", noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  if (!pdfUrl) return <p className="text-gray-400">لم يتم رفع ملف PDF لهذا الكتاب بعد.</p>;
const getGoogleDrivePdfUrl = (url) => {
  if (!url) return "";

  // إذا كان رابط Google Drive
  const match = url.match(/\/file\/d\/([^/]+)/);

  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // إذا كان الرابط أصلًا رابط مباشر
  return url;
};

const finalPdfUrl = getGoogleDrivePdfUrl(pdfUrl);

  return (  

    <div className="flex flex-col lg:flex-row gap-6">

      {/* PDF viewer */}
      <div className="flex-1">
        <div className="border rounded-xl overflow-hidden bg-gray-50 flex justify-center">
          <Document file={finalPdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading="جارٍ تحميل الكتاب...">
            <Page pageNumber={pageNumber} width={Math.min(700, typeof window !== "undefined" ? window.innerWidth - 60 : 700)} />
          </Document>
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <button onClick={() => goToPage(1)} className="btn-primary">التالي 
           
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
</svg>
          </button>
          <span className="flex items-center gap-1">
            صفحة
            <input
              type="number"
              min={1}
              max={numPages || undefined}
              value={pageNumber}
              onChange={(e) => setPageNumber(e.target.value === "" ? "" : parseInt(e.target.value, 10))}
              onBlur={(e) => jumpToPage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && jumpToPage(e.target.value)}
              className="w-16 border rounded-lg text-center p-1"
            />
            من {numPages || "..."}
          </span>
          <button onClick={() => goToPage(-1)} className="btn-primary">
          السابق
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
            </button>
        </div>

        <div className="text-center mt-3">
          <a
            href={finalPdfUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary underline inline-flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
</svg>
             <span>تحميل الكتاب PDF على جهازك</span>
          </a>
        </div>
      </div>

      {/* Notes sidebar */}
      <div className="w-full lg:w-80">
        <h3 className="font-bold mb-2">ملاحظاتي على هذه الصفحة</h3>
        <textarea
          className="border rounded-lg p-2 w-full h-24"
          placeholder="اكتب ملاحظتك هنا..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button onClick={addNote} className="btn-primary w-full mt-2">حفظ الملاحظة</button>

        <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
          {notes.map((n) => (
            <div key={n.id} className="bg-gray-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-lg p-2 text-sm relative">
              <button
                onClick={() => deleteNote(n.id)}
                title="حذف الملاحظة"
                className="absolute top-2 left-2 text-red-400 hover:text-red-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <span className="text-xs text-accent font-semibold">صفحة {n.page}</span>
              <p className="pl-5">{n.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
