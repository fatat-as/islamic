"use client";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// ربط العامل (Worker) الخاص بالمكتبة لتعمل في المتصفح بشكل صحيح
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PDFViewer({ pdfUrl }) {
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfUrl) return;

    async function loadPDF() {
      try {
        setLoading(true);
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        // جلب الصفحة الأولى كمثال (يمكنك لاحقاً تطويرها لعرض كل الصفحات)
        const page = await pdf.getPage(1);
        
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        setLoading(false);
      } catch (err) {
        console.error("خطأ في قراءة ملف الـ PDF:", err);
        setError("تعذر تحميل ملف الـ PDF");
        setLoading(false);
      }
    }

    loadPDF();
  }, [pdfUrl]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white shadow rounded-lg border">
      {loading && <p className="text-gray-500 my-4">جاري تحميل صفحة الكتاب...</p>}
      {error && <p className="text-red-500 my-4">{error}</p>}
      <canvas ref={canvasRef} className="max-w-full h-auto shadow-sm" />
    </div>
  );
}