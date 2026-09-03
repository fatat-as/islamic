"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./memory.module.css";

const DHIKR_LIST = [
  "سبحان الله",
  "الحمد لله",
  "الله أكبر",
  "لا إله إلا الله",
  "أستغفر الله",
  "لا حول ولا قوة إلا بالله",
];

function shuffledDeck() {
  const pairs = [...DHIKR_LIST, ...DHIKR_LIST];
  return pairs
    .map((text, i) => ({ id: `${text}-${i}`, text, matched: false }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryGamePage() {
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    setDeck(shuffledDeck());
    setFlipped([]);
    setMoves(0);
    setMatchedCount(0);
    setLocked(false);
  };

  const flipCard = (index) => {
    if (locked || flipped.includes(index) || deck[index].matched) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLocked(true);
      setMoves((m) => m + 1);
      const [i1, i2] = newFlipped;

      if (deck[i1].text === deck[i2].text) {
        setTimeout(() => {
          setDeck((prev) => prev.map((c, idx) => (idx === i1 || idx === i2 ? { ...c, matched: true } : c)));
          setMatchedCount((c) => c + 1);
          setFlipped([]);
          setLocked(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  const won = matchedCount === DHIKR_LIST.length;

  return (
    <div className={styles.page}>
           <Link href="/games" className="text-sm text-primary hover:underline mb-3 inline-block">← رجوع للألعاب</Link>

      <h1 className={styles.title}>🌸 لعبة الأذكار 🌸</h1>
      <p className={styles.subtitle}>حاولات: {moves}</p>

      <div className={styles.grid}>
        {deck.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          return (
            <button
              key={card.id}
              onClick={() => flipCard(i)}
              className={`${styles.cardOuter} ${isFlipped ? styles.flipped : ""} ${card.matched ? styles.matched : ""}`}
            >
              <div className={styles.cardInner}>
                <div className={styles.cardBack}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    {/* <!-- خلفية باستيل متدرجة ناعمة --> */}
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff0f5" />
      <stop offset="50%" stop-color="#fdf4ff" />
      <stop offset="100%" stop-color="#e0f2fe" />
    </linearGradient>
{/* 
    <!-- تدرج الغيمة --> */}
    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#fbcfe8" />
    </linearGradient>

    {/* <!-- تدرج العباية والحجاب الأبيض اللؤلؤي --> */}
    <linearGradient id="whiteHijabGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="70%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#f1f5f9" />
    </linearGradient>


    <radialGradient id="beadGrad" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#fbcfe8" />
      <stop offset="100%" stop-color="#f472b6" />
    </radialGradient>

    <filter id="dreamyShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#fda4af" flood-opacity="0.25" />
    </filter>
  </defs>

  {/* <!-- الخلفية -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" rx="30" /> */}

  <g fill="#f472b6" opacity="0.6">
    <path d="M 100,120 L 103,128 L 111,131 L 103,134 L 100,142 L 97,134 L 89,131 L 97,128 Z" fill="#fbbf24" />
    <path d="M 480,100 L 482,105 L 487,107 L 482,109 L 480,114 L 478,109 L 473,107 L 478,105 Z" fill="#fbbf24" transform="scale(1.2) translate(50, -20)" />
    <path d="M 150,220 C 150,212 162,212 162,220 C 162,228 150,236 150,236 C 150,236 138,228 138,220 C 138,212 150,212 150,220 Z" opacity="0.5" />
    <path d="M 440,240 C 440,234 449,234 449,240 C 449,246 440,252 440,252 C 440,252 431,246 431,240 C 431,234 440,234 440,240 Z" fill="#c084fc" opacity="0.5" />
  </g>

 
  <g filter="url(#dreamyShadow)">
    <path d="M 150,450 
             C 120,450 100,420 120,390 
             C 110,360 140,330 170,340 
             C 200,310 260,310 290,340 
             C 330,315 380,340 390,370 
             C 420,360 450,390 440,420 
             C 460,450 430,480 390,480 
             L 170,480 
             Z" fill="url(#cloudGrad)" />
  </g>

  <g transform="translate(160, 410)">
    <path d="M 0,0 Q -10,30 -5,50" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" />
    <circle cx="-12" cy="15" r="5" fill="#fbcfe8" />
    <circle cx="5" cy="10" r="5" fill="#fbcfe8" />
    <circle cx="-3" cy="2" r="5" fill="#fbcfe8" />
    <circle cx="-4" cy="9" r="3" fill="#fef08a" />
  </g>

  <g transform="translate(420, 400)">
    <path d="M 0,0 Q 10,35 5,55" fill="none" stroke="#86efac" stroke-width="3" stroke-linecap="round" />
    <circle cx="10" cy="10" r="5" fill="#ddd6fe" />
    <circle cx="-5" cy="12" r="5" fill="#ddd6fe" />
    <circle cx="2" cy="2" r="5" fill="#ddd6fe" />
    <circle cx="2" cy="8" r="3" fill="#fef08a" />
  </g>

 
  <g filter="url(#dreamyShadow)">
    

    <ellipse cx="265" cy="165" rx="20" ry="60" fill="#fff5f7" />
    <ellipse cx="265" cy="165" rx="11" ry="42" fill="#fbcfe8" />
    
    <ellipse cx="335" cy="165" rx="20" ry="60" fill="#fff5f7" />
    <ellipse cx="335" cy="165" rx="11" ry="42" fill="#fbcfe8" />

  
    <ellipse cx="255" cy="425" rx="22" ry="14" fill="#fbcfe8" />
    <ellipse cx="345" cy="425" rx="22" ry="14" fill="#fbcfe8" />


    <path d="M 235,310 Q 300,300 365,310 C 390,360 405,400 385,425 C 360,440 240,440 215,425 C 195,400 210,360 235,310 Z" fill="url(#whiteHijabGrad)" stroke="#e2e8f0" stroke-width="1.5" />
    

    <path d="M 270,320 Q 260,370 250,425 M 330,320 Q 340,370 350,425" stroke="#cbd5e1" stroke-width="1.8" stroke-linecap="round" fill="none" />

   
    <circle cx="300" cy="285" r="65" fill="#fbcfe8" />


    <path d="M 242,245 C 242,220 358,220 358,245 C 375,270 395,350 375,410 C 350,425 250,425 225,410 C 205,350 225,270 242,245 Z" fill="url(#whiteHijabGrad)" stroke="#e2e8f0" stroke-width="1.5" />

    <circle cx="262" cy="295" r="12" fill="#fda4af" opacity="0.5" />
    <circle cx="338" cy="295" r="12" fill="#fda4af" opacity="0.5" />

    <ellipse cx="278" cy="275" rx="9" ry="13" fill="#3f3f46" />
    <circle cx="275" cy="270" r="3.5" fill="#ffffff" />
    <circle cx="281" cy="281" r="1.5" fill="#ffffff" />

    <ellipse cx="322" cy="275" rx="9" ry="13" fill="#3f3f46" />
    <circle cx="319" cy="270" r="3.5" fill="#ffffff" />
    <circle cx="325" cy="281" r="1.5" fill="#ffffff" />

    <path d="M 297,288 Q 300,293 303,288 Z" fill="#fda4af" />
    <path d="M 294,293 Q 300,300 306,293" fill="none" stroke="#3f3f46" stroke-width="2" stroke-linecap="round" />

    <circle cx="275" cy="355" r="12" fill="#fbcfe8" stroke="#e2e8f0" stroke-width="1" />
    <circle cx="325" cy="355" r="12" fill="#fbcfe8" stroke="#e2e8f0" stroke-width="1" />


  </g>


  <g filter="url(#dreamyShadow)">
    <path d="M 285,355 Q 300,380 315,355" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" />
    <circle cx="282" cy="353" r="5" fill="url(#beadGrad)" />
    <circle cx="289" cy="362" r="5" fill="url(#beadGrad)" />
    <circle cx="298" cy="367" r="5" fill="url(#beadGrad)" />
    <circle cx="308" cy="367" r="5" fill="url(#beadGrad)" />
    <circle cx="316" cy="362" r="5" fill="url(#beadGrad)" />
    <circle cx="323" cy="353" r="5" fill="url(#beadGrad)" />

    <line x1="303" y1="367" x2="303" y2="400" stroke="#f472b6" stroke-width="2" />
    <ellipse cx="303" cy="382" rx="4" ry="8" fill="#fde047" />

    <path d="M 297,400 Q 303,396 309,400 L 307,412 Q 303,415 299,412 Z" fill="#fde047" />
    <path d="M 300,412 L 297,430 M 303,412 L 303,433 M 306,412 L 309,430" stroke="#f472b6" stroke-width="2" stroke-linecap="round" />
    <path d="M 303,438 C 303,434 309,434 309,438 C 309,443 303,447 303,447 C 303,447 297,443 297,438 C 297,434 303,434 303,438 Z" fill="#fda4af" />
  </g>

</svg> </div>
                <div className={styles.cardFront}>{card.text}</div>
              </div>
            </button>
          );
        })}
      </div>

      {won && (
        <div className={styles.restartRow}>
          <button onClick={startGame} className={styles.restartButton}>🔁 العب من جديد</button>
        </div>
      )}
    </div>
  );
}