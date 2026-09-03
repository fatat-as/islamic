
"use client";
import { useState } from "react";
import NoorFace from "./NoorFace";

const MODES = [
  { key: "fatwa", label: "🤖 المجيب الشرعي" },
  { key: "explain_book", label: "📖 شارح الكتب" },
  { key: "quiz", label: "📝 اختبار" },
  { key: "study_guide", label: "📚 خطة طلب علم" },
  { key: "adhkar", label: "🌸 أذكار وأدعية" },
  { key: "summarize", label: "🎯 تلخيص كتاب" },
  { key: "simplify_fatwa", label: "💬 تبسيط فتوى" },
];

export default function ChatBot() {
  // أضيفي هذا السطر مع الـ states الموجودة عندك (سطر 17-20 تقريباً)
 
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("fatwa");
  const [avatarState, setAvatarState] = useState("idle");
  const [messages, setMessages] = useState([
    { role: "bot", text: "السلام عليكم ورحمة الله! اختر النمط المناسب لسؤالك، وأنا جاهز للمساعدة ", sources: [] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setAvatarState("answer");
      setTimeout(() => setAvatarState("idle"), 900);
    }
  };

  const send = async () => {
    if (!input.trim()) return;
    const question = input;
    const newHistory = [...messages, { role: "user", text: question }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);
    setAvatarState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          mode,
          history: messages.slice(-10),
        }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.answer || data.error, sources: data.sources || [] }]);
      setAvatarState("answer");
      setTimeout(() => setAvatarState("idle"), 1200);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "حدث خطأ أثناء الاتصال، حاول مرة أخرى.", sources: [] }]);
      setAvatarState("idle");
    }
    setLoading(false);
  };

  const changeMode = (key) => {
    setMode(key);
  };

  return (
    <div dir="rtl" className="font-sans antialiased text-slate-800">

      {/* زر الشات العائم */}
      <button
        onClick={toggleOpen}
        className=" fixed bottom-6 left-6 bg-[var(--color-primary)] text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center z-50 hover:scale-105 active:scale-95 transition-all duration-300   group"
        aria-label="مساعد نور"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-[var(--color-accent)] opacity-15 pointer-events-none"></div>
        <div className="transform group-hover:scale-105 transition-transform">
          <NoorFace state={open ? "listening" : avatarState} size={40} />
        </div>
      </button>

{/* باقي مكونات الشات بوت الخاصة بك */} 

      {/* نافذة المحادثة */}
      {open && (
        <div className="fixed bottom-24 left-6 w-[90vw] sm:w-[400px] h-[36rem] bg-white rounded-3xl shadow-2xl flex flex-col z-50 border border-[var(--color-primary)]/15 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">

          {/* رأس الشات */}
           <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-1 rounded-2xl backdrop-blur-md border border-white/15">
                <NoorFace state={avatarState} size={34} />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-wide">نور — مساعد رحلة إلى الجنة</h3>
                <span className="text-[11px] text-white/80 font-light flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-white/70 inline-block animate-pulse"></span>
                  متواجد للإجابة 
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
            >
              ✕
            </button>
          </div>

          {/* تنبيه المصادر الشرعية */}
          <div className="bg-amber-50/90 text-amber-900 text-[11px] px-3.5 py-2 border-b border-amber-100/60 flex items-center gap-2 leading-relaxed">
            <span>💡</span>
            <span>تأكد دائمًا من المصدر المذكور قبل الاعتماد عليه.</span>
          </div>

          {/* شريط الأنماط السريعة */}
          <div className="flex gap-1.5 p-2.5 bg-slate-50/80 border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => changeMode(m.key)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-200 shrink-0 ${
                  mode === m.key
                    ? "bg-[var(--color-primary)] text-white shadow-sm scale-105"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]/30"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* صندوق رسائل المحادثة — نور يمين، أنا (المستخدم) شمال */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-slate-50/30 to-[var(--color-primary)]/5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "bot" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-2xs whitespace-pre-line ${
                    m.role === "bot"
                      ? "bg-gradient-to-bl from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-bl-xs"
                      : "bg-slate-100 text-slate-700 rounded-br-xs border border-slate-200/50"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* مؤشر التفكير */}
            {loading && (
              <div className="flex justify-end">
                <div className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs px-4 py-2.5 rounded-2xl animate-pulse flex items-center gap-2 border border-[var(--color-primary)]/15 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.4s]"></span>
                  <span>جاري استحضار الإجابة..</span>
                </div>
              </div>
            )}
          </div>

          {/* شريط إدخال الرسائل */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
            <textarea
             
              className="resize-none overflow-hidden border border-slate-200 rounded-xl px-4 py-2.5 flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] bg-slate-50/50 transition-all text-slate-700 placeholder:text-slate-400"
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onInput ={(e)=>{
               const target = e.target;
              
                target.style.height = '${target.scrollHeight}px';
              }}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-[var(--color-primary)] hover:opacity-90 text-white text-sm px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              إرسال
            </button>
          </div>

        </div>
      )}
    </div>
  );
}