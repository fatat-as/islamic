import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const QUIZ_SCHEMA = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          option_a: { type: "string" },
          option_b: { type: "string" },
          option_c: { type: "string" },
          option_d: { type: "string" },
          correct_option: { type: "string", enum: ["a", "b", "c", "d"] },
        },
        required: ["question", "option_a", "option_b", "option_c", "option_d", "correct_option"],
      },
    },
  },
  required: ["questions"],
};

export async function POST(req) {
  try {
    const { bookId } = await req.json();
    if (!bookId) return Response.json({ error: "لم يتم تحديد الكتاب" }, { status: 400 });

    // جيبي اسم الكتاب واسم الشيخ صاحبه فقط — بلا الاعتماد على أي نص مستخرَج
    const { data: book, error: bookError } = await supabase
      .from("books")
      .select("title_ar, title, scholars(name_ar, name)")
      .eq("id", bookId)
      .single();

    if (bookError || !book) return Response.json({ error: "الكتاب غير موجود" }, { status: 404 });

    const bookTitle = book.title_ar || book.title;
    const scholarName = book.scholars?.name_ar || book.scholars?.name || "";

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: QUIZ_SCHEMA,
      },
      systemInstruction:
        "أنت خبير بإعداد اختبارات علمية إسلامية دقيقة. مهمتك توليد 20 سؤال اختيار من متعدد (4 خيارات لكل سؤال) " +
        "حول كتاب إسلامي محدد بالاسم. اعتمدي فقط على المعلومات الموثوقة والمعروفة جيدًا عن هذا الكتاب تحديدًا " +
        "(محتواه، أبوابه، مسائله المشهورة). لا تخترعي تفاصيل غير متأكدة منها (كأرقام أحاديث دقيقة أو نصوص حرفية) إن لم تكوني " +
        "متأكدة تمامًا من صحتها — في هذه الحالة صيغي السؤال حول الفكرة العامة أو الباب بدل التفصيل الدقيق غير المؤكد. " +
        "ركّزي على أهم الأفكار والمسائل العلمية المعروفة بالكتاب. اجعلي الخيارات الخاطئة معقولة لكن واضحة الخطأ لمن قرأ الكتاب. " +
        "لا تكرري نفس السؤال بصياغات مختلفة.",
    });

    const prompt = `اسم الكتاب: ${bookTitle}${scholarName ? `\nمؤلفه: ${scholarName}` : ""}\n\nولّد الآن 20 سؤال اختيار من متعدد دقيق حول هذا الكتاب تحديدًا، بصيغة JSON حسب الهيكل المطلوب.`;

    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    const questions = parsed.questions || [];

    if (questions.length === 0) {
      return Response.json({ error: "تعذر توليد أسئلة لهذا الكتاب" }, { status: 400 });
    }

    await supabase.from("quiz_questions").delete().eq("book_id", bookId);

    const rows = questions.map((q) => ({
      book_id: bookId,
      question: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_option: q.correct_option,
    }));

    const { error: insertError } = await supabase.from("quiz_questions").insert(rows);
    if (insertError) throw insertError;

    return Response.json({ success: true, questionsCreated: rows.length });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "حدث خطأ أثناء توليد الاختبار: " + err.message }, { status: 500 });
  }
}
