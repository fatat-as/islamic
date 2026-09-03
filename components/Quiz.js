"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { awardBadge } from "../lib/badges";
import QuizMascot from "./QuizMascot";
import styles from "./quiz.module.css";

export default function Quiz({ bookId, userId }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0); // index السؤال الحالي
  const [selected, setSelected] = useState(null); // إجابة السؤال الحالي
  const [locked, setLocked] = useState(false); // بعد الاختيار، تقفل الأسئلة لحد ما ينتقل
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    supabase.from("quiz_questions").select("*").eq("book_id", bookId).then(({ data }) => setQuestions(data || []));
  }, [bookId]);

  if (questions.length === 0) return <p className="text-gray-400">لا يوجد اختبار مضاف لهذا الكتاب بعد.</p>;

  const q = questions[current];
  const isCorrectSelected = selected === q.correct_option;
  const mascotMood = !locked ? "idle" : isCorrectSelected ? "happy" : "sad";

  const chooseAnswer = (opt) => {
    if (locked) return;
    setSelected(opt);
    setLocked(true);
    if (opt === q.correct_option) setCorrectCount((c) => c + 1);
  };

  const nextQuestion = async () => {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setLocked(false);
    } else {
      const pct = Math.round((correctCount / questions.length) * 100);
      setFinished(true);
      if (userId) {
        await supabase.from("quiz_results").insert({ user_id: userId, book_id: bookId, score: pct });
        if (pct === 100) awardBadge(userId, bookId, "quiz_master");
      }
    }
  };

  // if (finished) {
  //   const score = Math.round((correctCount / questions.length) * 100);
  //   const starsEarned = score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0;
  //   return (
  //     <div className={styles.wrapper}>
  //       <QuizMascot mood={score >= 60 ? "happy" : "sad"} size={80} />
  //       <div className={styles.scoreCard}>
  //         <p className={styles.scoreTitle}>🏆 انتهى المستوى!</p>
  //         <p className={styles.scorePercent}>{score}%</p>
  //         <div className={styles.starsRow}>
  //           {[1, 2, 3].map((n) => (
  //             <span key={n} className={n <= starsEarned ? styles.starFilled : styles.starEmpty}>★</span>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
// ... (باقي مكون الـ Quiz كما هو في الأعلى)

  if (finished) {
    const score = Math.round((correctCount / questions.length) * 100);
    const starsEarned = score >= 90 ? 3 : score >= 60 ? 2 : score > 0 ? 1 : 0;

    // --- تعديل المنطق هنا ---
    const passed = score >= 50;
    const resultMood = passed ? "happy" : "sad";
    const resultMessage = passed 
      ? "أحسنت، استمرّ، بارك الله فيك!" 
      : "حاول مرّة أخرى، وتذكّر أنّ الجنّة هدفك.";
    // -------------------------

    return (
      <div className={styles.wrapper}>
        {/* استخدام الحالة والنص الجديد */}
        <QuizMascot mood={resultMood} size={80} />
        
        <div className={styles.scoreCard}>
          <p className={styles.scoreTitle}>🏆 انتهى المستوى!</p>
          <p className={styles.scorePercent}>{score}%</p>
          
          {/* الرسالة الجديدة */}
          <p className={styles.resultMotivationText}>{resultMessage}</p>

          <div className={styles.starsRow}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= starsEarned ? styles.starFilled : styles.starEmpty}>★</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ... (باقي عرض الأسئلة كما هو)



  return (
    <div className={styles.wrapper}>
      <p className={styles.pixelTitle}>🎮 اختبار المستوى</p>

      {/* نقاط تقدّم — كل نقطة سؤال */}
      <div className={styles.progressDots}>
        {questions.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i < current ? styles.dotDone : i === current ? styles.dotCurrent : ""}`}
          />
        ))}
      </div>

      {/* بطاقة السؤال الرئيسية */}
      <div key={current} className={`${styles.card} ${styles.slideIn}`} style={{ position: "relative" }}>
        
        {/* الأرنب داخل البطاقة على الجهة اليسار */}
        <div style={{ position: "absolute", top: "15px", left: "15px" }}>
          <QuizMascot mood={mascotMood} size={60} />
        </div>

        <p className={styles.questionNum}>سؤال {current + 1} / {questions.length}</p>
        <p className={styles.questionText} style={{ marginTop: "10px" }}>{q.question}</p>

        {["a", "b", "c", "d"].map((opt) => {
          const isCorrect = opt === q.correct_option;
          const isSelected = selected === opt;
          const showWrong = locked && isSelected && !isCorrect;
          const showCorrect = locked && isCorrect;

          return (
            <label
              key={opt}
              onClick={() => chooseAnswer(opt)}
              className={`${styles.optionLabel} ${showWrong ? styles.optionWrong : ""} ${showCorrect ? styles.optionCorrect : ""}`}
            >
              <input type="radio" name={q.id} disabled={locked} checked={isSelected} readOnly />
              <span>
                {q[`option_${opt}`]}
                {showWrong && " ✕"}
                {showCorrect && " ✓"}
              </span>
            </label>
          );
        })}
      </div>

      {locked && (
        <button onClick={nextQuestion} className={styles.nextButton}>
          {current + 1 < questions.length ? "التالي ←" : "🏁 عرض النتيجة"}
        </button>
      )}
    </div>
  );
}

