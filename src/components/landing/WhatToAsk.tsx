"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircleIcon, MessageSquareIcon } from "lucide-react";
import Image from "next/image";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const plainText =
  "bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// plays an animation once the block has scrolled into view (hidden until then)
const play = (inView: boolean, animation: string) =>
  inView ? { animation } : { opacity: 0 };

// tells us when an element has scrolled into view
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

const chats = [
  {
    question: '"My tooth hurts when I bite down"',
    answer:
      "Instantly explore pain management strategies, pinpoint common causes like cracks or infection, and know when to seek immediate treatment.",
    pills: ["Instant Response", "Pain Relief"],
  },
  {
    question: '"How much does teeth whitening cost?"',
    answer:
      "Explore whitening options, compare costs side-by-side, and choose the most effective treatment for your lifestyle and budget.",
    pills: ["Cost Analysis", "Treatment Options"],
  },
  {
    question: '"When should I replace my filling?"',
    answer:
      "Prevent unexpected tooth decay by understanding filling longevity, tracking wear and tear, and knowing when to consult your dentist.",
    pills: ["Preventive Care", "Maintenance"],
  },
];

const questionMarks = [
  { pos: "top-6 left-8", delay: 0 },
  { pos: "top-12 right-10", delay: 1.2 },
  { pos: "bottom-24 left-10", delay: 2.4 },
  { pos: "bottom-16 right-8", delay: 3.6 },
];

function ChatCard({ item, index }: { item: (typeof chats)[number]; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={play(inView, `wta-rise 0.7s ${EASE} 0s both`)}
      className="wta-reveal group relative"
    >
      <div className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-6 border border-border/50 hover:border-pink-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl flex items-center justify-center shrink-0">
            <MessageSquareIcon
              style={{ animation: `wta-chat 5s ease-in-out ${index * 1.2}s infinite` }}
              className="wta-loop h-6 w-6 text-pink-400"
            />
          </div>
          <div className="space-y-3 flex-1">
            {/* the question pops in like a sent message */}
            <div
              style={{
                ...play(inView, `wta-pop 0.7s ${EASE} 0.3s both`),
                transformOrigin: "0% 100%",
              }}
              className="wta-reveal bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-2xl p-4 border border-pink-400/20"
            >
              <p className={`font-semibold w-fit ${gradientText}`}>{item.question}</p>
            </div>

            {/* typing dots first, then the answer fades into focus */}
            <div className="relative bg-muted/30 rounded-2xl p-4">
              <div
                aria-hidden="true"
                style={play(inView, "wta-typing 1.1s linear 0.9s both")}
                className="wta-hide-rm pointer-events-none absolute inset-0 flex items-center gap-1.5 px-4"
              >
                {["bg-orange-400", "bg-pink-400", "bg-purple-400"].map((color, d) => (
                  <span
                    key={color}
                    style={{ animation: `wta-dot 0.9s ease-in-out ${d * 0.15}s infinite` }}
                    className={`size-1.5 rounded-full ${color}`}
                  />
                ))}
              </div>

              <p
                style={play(inView, "wta-focus 0.8s ease 2s both")}
                className="wta-reveal text-sm text-muted-foreground leading-relaxed"
              >
                {item.answer}
              </p>
              <div className="flex gap-2 mt-3">
                {item.pills.map((pill, p) => (
                  <span
                    key={pill}
                    style={play(inView, `wta-pill 0.5s ${EASE} ${2.2 + p * 0.15}s both`)}
                    className="wta-reveal px-2 py-1 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 ring-1 ring-inset ring-pink-400/20 text-pink-400 text-xs rounded-full"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatToAsk() {
  const [headerRef, headerIn] = useInView<HTMLDivElement>();
  const [titleRef, titleIn] = useInView<HTMLHeadingElement>();
  const [rightRef, rightIn] = useInView<HTMLDivElement>();

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/20">
      <style>{`
        @keyframes wta-flip {
          0% { opacity: 0; transform: perspective(700px) rotateX(-80deg) translateY(20px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes wta-focus {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes wta-rise {
          0% { opacity: 0; transform: translateY(36px) scale(0.96); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes wta-pop {
          0% { opacity: 0; transform: scale(0.6) translateY(12px); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes wta-swing {
          0% { opacity: 0; transform: translateX(70px) rotate(4deg); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes wta-pill {
          0% { opacity: 0; transform: scale(0.6) translateY(8px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes wta-typing {
          0% { opacity: 0; }
          8% { opacity: 1; }
          88% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes wta-dot {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes wta-chat {
          0%, 88%, 100% { transform: rotate(0deg) scale(1); }
          91% { transform: rotate(-12deg) scale(1.2); }
          94% { transform: rotate(10deg) scale(1.2); }
          97% { transform: rotate(-5deg) scale(1.05); }
        }
        @keyframes wta-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes wta-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(450%) skewX(-20deg); }
        }
        @keyframes wta-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes wta-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes wta-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wta-tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-6deg); }
          20% { transform: rotate(6deg); }
          30% { transform: rotate(-3deg); }
          40% { transform: rotate(2deg); }
        }
        @keyframes wta-qmark {
          0% { opacity: 0; transform: translateY(14px) scale(0.6) rotate(-12deg); }
          20% { opacity: 0.9; }
          100% { opacity: 0; transform: translateY(-46px) scale(1.15) rotate(14deg); }
        }
        @keyframes wta-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(26px, -20px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wta-reveal { animation: none !important; opacity: 1 !important; }
          .wta-loop { animation: none !important; }
          .wta-hide-rm { display: none !important; }
        }
      `}</style>

      {/* drifting colour orbs (no layout change) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          style={{ animation: "wta-drift 10s ease-in-out infinite" }}
          className="wta-loop absolute top-24 -left-20 size-72 rounded-full bg-orange-400/10 blur-3xl"
        />
        <div
          style={{ animation: "wta-drift 12s ease-in-out 2s infinite" }}
          className="wta-loop absolute bottom-20 -right-20 size-80 rounded-full bg-purple-500/10 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div
            style={play(headerIn, `wta-focus 0.8s ease 0s both`)}
            className="wta-reveal relative overflow-hidden inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-full border border-pink-400/20 backdrop-blur-sm mb-6"
          >
            {/* light sweeping across the badge */}
            <span
              aria-hidden="true"
              style={{ animation: "wta-shine 3.5s ease-in-out 1s infinite" }}
              className="wta-loop pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-pink-400/25 to-transparent"
            />
            <MessageCircleIcon
              style={{ animation: "wta-bounce 1.6s ease-in-out infinite" }}
              className="wta-loop relative w-4 h-4 text-pink-400"
            />
            <span className={`relative text-sm font-medium ${gradientText}`}>
              AI-Powered Conversations
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span
              style={{
                ...play(headerIn, `wta-flip 0.9s ${EASE} 0.2s both`),
                transformOrigin: "50% 100%",
              }}
              className={`wta-reveal inline-block ${plainText}`}
            >
              Ask about
            </span>
            <br />
            <span
              style={{
                ...play(
                  headerIn,
                  `wta-flip 0.9s ${EASE} 0.45s both, wta-flow 4s ease-in-out 1.6s infinite alternate`
                ),
                transformOrigin: "50% 100%",
              }}
              className={`wta-reveal inline-block ${gradientText} bg-[length:200%_auto]`}
            >
              anything dental
            </span>
          </h2>

          <p
            style={play(headerIn, `wta-rise 0.9s ${EASE} 0.8s both`)}
            className="wta-reveal text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            From minor routine check-ins to deep treatment questions—get reliable, 
            data-backed dental guidance powered by real clinical insights
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Interactive Chat Examples */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3
                ref={titleRef}
                style={play(titleIn, `wta-focus 0.8s ease 0s both`)}
                className="wta-reveal text-2xl font-bold mb-8"
              >
                Common questions our AI answers:
              </h3>

              {chats.map((item, i) => (
                <ChatCard key={item.question} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Right Side - AI Illustration */}
          <div
            ref={rightRef}
            style={play(rightIn, `wta-swing 1s ${EASE} 0.2s both`)}
            className="wta-reveal relative"
          >
            {/* slowly turning colour glow behind the card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div
                style={{ animation: "wta-spin 16s linear infinite" }}
                className="wta-loop w-3/4 aspect-square rounded-full bg-[conic-gradient(from_0deg,#fb923c,#f472b6,#a855f7,#fb923c)] opacity-30 blur-3xl"
              />
            </div>

            <div className="relative z-10 bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-pink-400/40 transition-all duration-500">
              {/* question marks floating up around the character */}
              {rightIn &&
                questionMarks.map((q) => (
                  <span
                    key={q.pos}
                    aria-hidden="true"
                    style={{ animation: `wta-qmark 4.8s ease-out ${q.delay}s infinite` }}
                    className={`wta-loop wta-hide-rm pointer-events-none absolute text-3xl font-bold opacity-0 ${q.pos} ${gradientText}`}
                  >
                    ?
                  </span>
                ))}

              <div className="relative flex items-center justify-center h-full">
                <div
                  style={{ animation: "wta-float 6s ease-in-out infinite" }}
                  className="wta-loop w-full max-w-lg"
                >
                  <Image
                    src="/confused.png"
                    alt="AI Assistant"
                    width={500}
                    height={500}
                    style={{ animation: "wta-tilt 7s ease-in-out 1.5s infinite" }}
                    className="wta-loop w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default WhatToAsk;