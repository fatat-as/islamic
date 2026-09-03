"use client";
import { useState } from "react";

export default function GenerateQuizButton({ bookId }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generate = async () => {
    if (!confirm("هذا رح يستبدل أي اختبار موجود حاليًا لهذا الكتاب بـ 20 سؤال جديد. متأكدة تكملي؟")) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });
      const data = await res.json();
      if (data.error) {
        setMessage("❌ " + data.error);
      } else {
        setMessage(`✅ تم توليد ${data.questionsCreated} سؤال بنجاح — حدّثي الصفحة لرؤيتهم`);
      }
    } catch {
      setMessage("❌ حدث خطأ أثناء توليد الاختبار");
    }
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <button onClick={generate} disabled={loading} className="btn-primary text-sm">
        {loading ? "جارٍ توليد الأسئلة..." : "🤖 ولّد اختبار (20 سؤال) من محتوى هذا الكتاب"}
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </div>
  );
}