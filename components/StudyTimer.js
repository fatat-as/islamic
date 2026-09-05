"use client";
import { useEffect, useRef, useState } from "react";

const PRESETS = [10, 15, 25, 30, 45, 60,75,90,120];

export default function StudyTimer() {
  const [open, setOpen] = useState(false);
  const [minutesInput, setMinutesInput] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [ringing, setRinging] = useState(false);
  const intervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      // اطلبي إذن التنبيهات بهدوء بأول استخدام (بلا إجبار)
    }
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          triggerAlarm();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  //dofeta 
useEffect(() => { const unlockAudio = async () => { try { if (!audioCtxRef.current) { const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
  }

  if (audioCtxRef.current.state === "suspended") {
    await audioCtxRef.current.resume();
  }

  console.log("🔊 الصوت جاهز");
} catch (error) {
  console.log("Audio unlock error:", error);
}
};
document.addEventListener("click", unlockAudio, { once: true }); document.addEventListener("touchstart", unlockAudio, { once: true });
return () => { document.removeEventListener("click", unlockAudio); document.removeEventListener("touchstart", unlockAudio); }; }, []);


// 🔊 تشغيل صوت التنبيه 
 const playBeep = async () => { try { if (!audioCtxRef.current) { const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtxRef.current = new AudioContextClass();
}

const ctx = audioCtxRef.current;

// مهم جدًا لـ Safari
if (ctx.state === "suspended") {
  await ctx.resume();
}

for (let i = 0; i < 3; i++) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);

  const startTime = ctx.currentTime + i * 0.35;

  gain.gain.setValueAtTime(0.001, startTime);
  gain.gain.exponentialRampToValueAtTime(
    0.2,
    startTime + 0.03
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + 0.25
  );

  osc.start(startTime);
  osc.stop(startTime + 0.26);
}
} catch (error) { console.log("Audio error:", error); } };
  // صوت تنبيه بسيط عبر Web Audio API — بلا حاجة لملف صوتي خارجي
  // const playBeep = () => {
  //   try {
  //     if (!audioCtxRef.current) {
  //       audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  //     }
  //     const ctx = audioCtxRef.current;
  //     for (let i = 0; i < 3; i++) {
  //       const osc = ctx.createOscillator();
  //       const gain = ctx.createGain();
  //       osc.connect(gain);
  //       gain.connect(ctx.destination);
  //       osc.frequency.value = 880;
  //       gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.35);
  //       osc.start(ctx.currentTime + i * 0.35);
  //       osc.stop(ctx.currentTime + i * 0.35 + 0.25);
  //     }
  //   } catch {
     
     
  //     // بعض المتصفحات بتحتاج تفاعل مستخدم أول — تجاهلي الخطأ بأمان
  //   }
  // };

  const triggerAlarm = () => {
    playBeep();
    setRinging(true);
    setOpen(true);

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification(" انتهى الوقت!", { body: "بارك الله بوقتك وعلمك، وجعل هالوقت حُجّة لك لا عليك، ونفعك بما تعلّمت وفتح عليك أبواب العلم والعمل..الله يثبتك ويزيدك علمًا وفهمًا ويكتبلك أجر كل دقيقة درست فيها 🤍" });
    }
  };

  const start = () => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission();
    }
    setSecondsLeft(minutesInput * 60);
    setRunning(true);
    setRinging(false);
  };

  const pause = () => setRunning(false);
  const resume = () => {
    if (secondsLeft > 0) setRunning(true);
  };
  const reset = () => {
    setRunning(false);
    setSecondsLeft(0);
    setRinging(false);
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 rounded-full w-14 h-14 shadow-lg flex items-center justify-center z-50 text-2xl text-white transition-transform ${
          ringing ? "animate-bounce" : ""
        }`}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
  <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z"/>
  <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1"/>
</svg>
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 w-72 bg-[url('../public/images/badges/p6.jpg')] bg-opacity-50  bg-cover  bg-center bg-no-repeat rounded-2xl shadow-2xl border z-50 p-4">
          <div className="flex items-center justify-between mb-3 ">

   <span className="font-bold text-primary">
   المؤقت 
</span>

            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
          </div>

          {ringing && (
            <div className="bg-red-50 text-red-600 text-sm rounded-lg p-2 mb-3 text-center font-semibold">
               انتهى الوقت! بارك الله بوقتك وعلمك، وجعل هالوقت حُجّة لك لا عليك، ونفعك بما تعلّمت وفتح عليك أبواب العلم والعمل.. 
الله يثبتك ويزيدك علمًا وفهمًا ويكتبلك أجر كل دقيقة درست فيها 🤍
            </div>
          )}

          <div className="text-center text-4xl font-bold text-primary mb-4 " dir="ltr">
            {mm}:{ss}
          </div>
          <br></br><br></br><br></br>
          {!running && secondsLeft === 0 && (
            <>
              <p className="text-xs text-gray-500 mb-2">اختر المدة (بالدقائق):</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {PRESETS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMinutesInput(m)}
                    className={`px-3 py-1 rounded-lg text-sm border ${
                      minutesInput === m ? "border-primary bg-primary/10 text-primary font-bold" : "border-gray-200"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={1}
                value={minutesInput}
                onChange={(e) => setMinutesInput(parseInt(e.target.value) || 1)}
                className="border rounded-lg p-2 w-full mb-3 text-center "
              />
              <button onClick={start} className="btn-primary w-full">▶ ابدأ </button>
            </>
          )}

          {(running || (secondsLeft > 0 && !running)) && (
            <div className="flex gap-2  ">
              {running ? (
                <button onClick={pause} className="flex-1 py-2 rounded-lg border border-primary text-primary font-semibold">⏸ إيقاف مؤقت</button>
              ) : (
                <button onClick={resume} className="flex-1 py-2 rounded-lg btn-primary">▶ استئناف</button>
              )}
              <button onClick={reset} className="flex-1 py-2 rounded-lg border border-gray-200 text-gray-500">إعادة ضبط</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}