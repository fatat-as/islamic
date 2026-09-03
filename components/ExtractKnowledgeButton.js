// "use client";
// import { useState } from "react";
// import { pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function ExtractKnowledgeButton({ bookId, pdfUrl }) {
//   const [status, setStatus] = useState(""); // نص تقدّم العملية
//   const [running, setRunning] = useState(false);
//   const [result, setResult] = useState("");

//   const run = async () => {
//     setRunning(true);
//     setResult("");
//     try {
//       // مكتبة Tesseract.js تُحمَّل هنا فقط (client-side) لتفادي مشاكل التحميل على السيرفر
//       const { createWorker } = await import("tesseract.js");

//       setStatus("جارٍ تحميل محرك القراءة الضوئية (مرة واحدة فقط)...");
//       const worker = await createWorker("ara");

//       const loadingTask = pdfjs.getDocument(pdfUrl);
//       const pdf = await loadingTask.promise;
//       const pageTexts = [];

//       for (let i = 1; i <= pdf.numPages; i++) {
//         setStatus(`جارٍ قراءة الصفحة ${i} من ${pdf.numPages}...`);
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 2 }); // دقة أعلى = قراءة أدق

//         const canvas = document.createElement("canvas");
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;
//         const ctx = canvas.getContext("2d");
//         await page.render({ canvasContext: ctx, viewport }).promise;

//         const { data } = await worker.recognize(canvas);
//         pageTexts.push({ page: i, text: data.text });
//       }

//       await worker.terminate();

//       setStatus("جارٍ حفظ النصوص بالمكتبة...");
//       const res = await fetch("/api/save-knowledge-chunks", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookId, pageTexts }),
//       });
//       const responseData = await res.json();

//       if (responseData.error) {
//         setResult("❌ " + responseData.error);
//       } else {
//         setResult(`✅ تم استخراج ${responseData.chunksCreated} مقطع من ${pdf.numPages} صفحة بنجاح`);
//       }
//     } catch (err) {
//       console.error(err);
//       setResult("❌ حدث خطأ أثناء القراءة الضوئية: " + err.message);
//     }
//     setStatus("");
//     setRunning(false);
//   };


