// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
// const CHUNK_SIZE = 800;

// function splitIntoChunks(text, size) {
//   const chunks = [];
//   let start = 0;
//   while (start < text.length) {
//     let end = Math.min(start + size, text.length);
//     if (end < text.length) {
//       const lastDot = text.lastIndexOf(".", end);
//       if (lastDot > start + size * 0.5) end = lastDot + 1;
//     }
//     const piece = text.slice(start, end).trim();
//     if (piece.length > 20) chunks.push(piece);
//     start = end;
//   }
//   return chunks;
// }

// export async function POST(req) {
//   try {
//     const { bookId, pageTexts } = await req.json();
//     if (!bookId || !Array.isArray(pageTexts)) {
//       return Response.json({ error: "بيانات ناقصة" }, { status: 400 });
//     }

//     const { data: book } = await supabase.from("books").select("title_ar, title").eq("id", bookId).single();

//     const rows = [];
//     for (const { page, text } of pageTexts) {
//       if (!text) continue;
//       const pieces = splitIntoChunks(text, CHUNK_SIZE);
//       pieces.forEach((piece) => {
//         rows.push({
//           book_id: bookId,
//           source_reference: `${book?.title_ar || book?.title || "الكتاب"} — صفحة ${page}`,
//           content: piece,
//         });
//       });
//     }

//     if (rows.length === 0) {
//       return Response.json({ error: "لم يتم استخراج أي نص قابل للحفظ" }, { status: 400 });
//     }

//     await supabase.from("knowledge_chunks").delete().eq("book_id", bookId);

//     const BATCH_SIZE = 200;
//     for (let i = 0; i < rows.length; i += BATCH_SIZE) {
//       const { error } = await supabase.from("knowledge_chunks").insert(rows.slice(i, i + BATCH_SIZE));
//       if (error) return Response.json({ error: "خطأ أثناء الحفظ: " + error.message }, { status: 500 });
//     }

//     return Response.json({ success: true, chunksCreated: rows.length });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ error: "خطأ غير متوقع: " + err.message }, { status: 500 });
//   }
// }