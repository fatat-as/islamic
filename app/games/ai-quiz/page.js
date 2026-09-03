
"use client";
import { useState } from "react";
import Link from "next/link";
import QuizMascot from "../../../components/QuizMascot";
import { GoogleGenerativeAI } from "@google/generative-ai";

const TOPICS = [
  { id: "aqeedah", name: "العقيدة الإسلامية" },
  { id: "tafsir", name: "التفسير وعلوم القرآن" },
  { id: "fiqh", name: "الفقه الإسلامي" },
  { id: "seerah", name: "السيرة النبوية" },
];

export default function AIQuizGamePage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [error, setError] = useState("");

  const fetchQuestionsFromAI = async (topicName) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate-true-false-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topicName }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else if (data.questions) {
        setItems(data.questions);
      }
    } catch (err) {
      setError("تعذر الاتصال بالمساعد الذكي، حاولي مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic.name);
    fetchQuestionsFromAI(topic.name);
  };

  const finished = items.length > 0 && index >= items.length;
  const q = items[index];

  const answer = (choice) => {
    if (locked || finished) return;
    setLocked(true);
    const isCorrect = choice === q.answer;
    if (isCorrect) setScore((s) => s + 1);
    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setFeedback(null);
      setLocked(false);
      setIndex((i) => i + 1);
    }, 1100);
  };

  const restart = () => {
    setSelectedTopic(null);
    setItems([]);
    setIndex(0);
    setScore(0);
    setError("");
  };

  if (!selectedTopic) {
    return (
      <div className="max-w-md mx-auto text-center">
        <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>
        <h1 className="text-xl font-bold text-primary mb-2">🧠 اختبار الذكاء الاصطناعي الإسلامي</h1>
        <p className="text-sm text-gray-500 mb-6">اختاري الموضوع الذي ترغبين في اختبار معلوماتك فيه:</p>
        <div className="grid grid-cols-1 gap-3">
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => handleSelectTopic(topic)}
              className="py-4 px-6 rounded-xl font-bold text-primary border-2 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-sm"
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <QuizMascot mood="idle" size={90} />
        <p className="font-bold text-lg mt-4 text-primary">جارٍ توليد الأسئلة بواسطة الذكاء الاصطناعي...</p>
        <p className="text-sm text-gray-400 mt-1">يتم تحضير أسئلة مخصصة في موضوع: {selectedTopic}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={restart} className="btn-primary">رجوع لاختيار موضوع</button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <button onClick={restart} className="text-sm text-primary hover:underline mb-3 inline-block">← تغيير الموضوع</button>
      <h1 className="text-xl font-bold text-primary text-center mb-1"> اختبار: {selectedTopic}</h1>

      {!finished && (
        <p className="text-center text-sm text-gray-500 mb-4">
          سؤال {index + 1} / {items.length} — النقاط: {score}
        </p>
      )}

      {!finished && q ? (
        <>
          <QuizMascot mood={feedback === "correct" ? "happy" : feedback === "wrong" ? "sad" : "idle"} size={80} />
          <div className="card text-center my-4">
            <p className="font-semibold text-lg leading-relaxed">{q.text}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => answer(true)}
              disabled={locked}
              className="flex-1 py-4 rounded-xl font-bold text-white text-lg bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-60"
            >
              ✅ صح
            </button>
            <button
              onClick={() => answer(false)}
              disabled={locked}
              className="flex-1 py-4 rounded-xl font-bold text-white text-lg bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              ❌ خطأ
            </button>
          </div>
        </>
      ) : (
        <div className="card text-center">
          <QuizMascot mood={score >= items.length * 0.6 ? "happy" : "sad"} size={90} />
          <p className="font-bold text-lg mt-2">النتيجة النهائية</p>
          <p className="text-3xl font-bold text-primary my-2">{score} / {items.length}</p>
          <button onClick={restart} className="btn-primary mt-2">🔁 اختيار موضوع آخر</button>
        </div>
      )}
    </div>
  );
}
