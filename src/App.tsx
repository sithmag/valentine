"use client";
import { useMemo, useState } from "react";

export default function Page() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [bgBump, setBgBump] = useState(false);

  // YES grows and pushes NO away (layout growth)
  // Clamp so it doesn't explode and ruin the layout
  const yesButtonSize = Math.min(noCount * 16 + 16, 110);

  const handleNoClick = () => {
    setNoCount((c) => c + 1);

    // trigger background bump animation
    setBgBump(true);
    setTimeout(() => setBgBump(false), 350);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure baba?",
      "What if I asked really nicely?",
      "Pretty please",
      "Baba please :(",
      "I'll behave I promise",
      "BUDUMPALLAAAAAA",
      "I'll give you a million kisses",
      "<-- Just do me a favour and click yes babaaaa",
      "Ennodu ingane cheyyalle",
      "Chakkare please :(",
      "Ente nenju vedhanikkanu nee illandu :(",
      "I need your permission to treat you babaaaa",
      "Dayavaayi :(",
      "Madiiiii",
      "Nirdeeeee",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // floating hearts
  const hearts = useMemo(() => {
    const count = 22;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 18,
      duration: 8 + Math.random() * 8,
      delay: Math.random() * 6,
      drift: (Math.random() * 40 - 20).toFixed(2),
      opacity: (0.15 + Math.random() * 0.35).toFixed(2),
    }));
  }, []);

  return (
    <div
      className={`relative flex h-screen flex-col items-center justify-start overflow-hidden bg-cover bg-center pt-20 sm:pt-28 ${
        bgBump ? "bg-bump" : ""
      }`}
      style={{ backgroundImage: "url('backgrounds/valentine.jpg')" }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="heart"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDuration: `${h.duration}s`,
              animationDelay: `${h.delay}s`,
              opacity: Number(h.opacity),
            }}
            // TS-safe custom css variable
            ref={(el) => {
              if (el) el.style.setProperty("--drift", `${h.drift}px`);
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* content */}
      <div className="relative z-20 flex flex-col items-center">
        {yesPressed ? (
          <>
            <img
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
              alt="kiss"
            />
            <div className="mt-6 text-4xl font-bold text-white text-center drop-shadow-lg">
              YAYYYYY THANK YOU BABAAAAA I LOVE YOUUU :))
            </div>
          </>
        ) : (
          <>
            <h1 className="mb-16 text-4xl text-white text-center drop-shadow-lg">
              May I be your valentine pleaseeeeeeee babaaaa?
            </h1>

            {/* YES grows and pushes NO away */}
            <div className="flex items-center gap-3 opacity-0 animate-slideUp">
              <button
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                style={{ fontSize: yesButtonSize }}
                onClick={() => setYesPressed(true)}
              >
                Yes
              </button>

              <button
                onClick={handleNoClick}
                className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
