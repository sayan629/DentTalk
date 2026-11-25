"use client";

import { useEffect, useRef, useState } from "react";
import { SignUpButton } from "@clerk/nextjs"
import { ArrowRightIcon, ZapIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "../ui/button"

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

const steps = [
  {
    number: 1,
    image: "/audio.png",
    alt: "Voice Chat",
    title: "Ask Questions",
    text: "Chat with our AI companion to decode symptoms, explore treatment options, and elevate your daily dental routine in seconds.",
    pills: ["24/7 Available", "Instant Response"],
  },
  {
    number: 2,
    image: "/brain.png",
    alt: "AI Brain",
    title: "Get Expert Advice",
    text: "Every smile is unique. Our AI analyzes thousands of clinical patterns to give you reliable, tailor-made dental recommendations.",
    pills: ["AI-Powered", "Personalized"],
  },
  {
    number: 3,
    image: "/calendar.png",
    alt: "Calendar",
    title: "Book & Get Care",
    text: "Book certified dental specialists in seconds, access personalized post-care plans, and watch your smile transform with real-time tracking.",
    pills: ["Verified Doctors", "Follow-up Care"],
  },
];

function HowItWorks() {
  const [headerRef, headerIn] = useInView<HTMLDivElement>();
  const [stepsRef, stepsIn] = useInView<HTMLDivElement>();
  const [ctaRef, ctaIn] = useInView<HTMLDivElement>();

  return  <section className = "relative py-32 px-6 outline-hidden z-10 max-w-7xl mx-auto">
      <style>{`
        @keyframes hiw-wipe {
          0% { clip-path: inset(-20% 100% -20% -5%); }
          100% { clip-path: inset(-20% -5% -20% -5%); }
        }
        @keyframes hiw-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes hiw-focus {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes hiw-zap {
          0%, 18%, 24%, 100% { opacity: 1; filter: drop-shadow(0 0 6px rgba(251,146,60,0.9)); }
          20% { opacity: 0.3; filter: none; }
          60% { opacity: 1; filter: drop-shadow(0 0 2px rgba(251,146,60,0.5)); }
        }
        @keyframes hiw-draw {
          0% { clip-path: inset(-2000% 50% -2000% 50%); }
          100% { clip-path: inset(-2000% 0% -2000% 0%); }
        }
        @keyframes hiw-travel {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes hiw-flip {
          0% { opacity: 0; transform: perspective(900px) rotateX(30deg) translateY(60px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes hiw-pop {
          0% { opacity: 0; transform: scale(0) rotate(-180deg); }
          60% { opacity: 1; transform: scale(1.3) rotate(15deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes hiw-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hiw-pill {
          0% { opacity: 0; transform: scale(0.6) translateY(8px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes hiw-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
        @keyframes hiw-wobble {
          0% { transform: rotate(0deg) scale(1); }
          20% { transform: rotate(-12deg) scale(1.1); }
          40% { transform: rotate(10deg) scale(1.1); }
          60% { transform: rotate(-6deg) scale(1.05); }
          80% { transform: rotate(3deg) scale(1.02); }
          100% { transform: rotate(0deg) scale(1); }
        }
        @keyframes hiw-nudge {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @keyframes hiw-glow {
          0%, 100% { box-shadow: 0 0 18px rgba(236, 72, 153, 0.35); }
          50% { box-shadow: 0 0 38px rgba(168, 85, 247, 0.6); }
        }
        .hiw-breathe { animation: hiw-breathe 4s ease-in-out infinite; }
        .group:hover .hiw-breathe { animation: hiw-wobble 0.8s ease 1; }
        @media (prefers-reduced-motion: reduce) {
          .hiw-anim, .hiw-breathe { animation: none !important; opacity: 1 !important; }
          .hiw-dot { display: none; }
        }
      `}</style>

      {/* Header */}
      <div ref={headerRef} className="text-center mb-20">
        <div
          style={play(headerIn, `hiw-focus 0.8s ${EASE} 0s both`)}
          className="hiw-anim inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10
        rounded-full border border-pink-400/20 backdrop-blur-sm mb-6">
          <ZapIcon
            style={{ animation: "hiw-zap 3.5s ease-in-out infinite" }}
            className="hiw-anim size-4 text-orange-400"
          />
          <span className={`text-sm font-medium ${gradientText}`}>Simple Process</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span
            style={play(headerIn, `hiw-wipe 0.9s ${EASE} 0.2s both`)}
            className={`hiw-anim ${plainText}`}
          >
            Three steps to
          </span>
          <br />
          <span
            style={play(
              headerIn,
              `hiw-wipe 1s ${EASE} 0.5s both, hiw-flow 4s ease-in-out 1.6s infinite alternate`
            )}
            className={`hiw-anim ${gradientText} bg-[length:200%_auto]`}
          >
            better dental health
          </span>
        </h2>

        <p
          style={play(headerIn, `hiw-focus 1s ease 0.9s both`)}
          className="hiw-anim text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          Our streamlined process makes dental care accessible, convenient, and built entirely around you.
        </p>
      </div>

      {/*steps*/}
      <div ref={stepsRef} className="relative">
        {/* CONNECTION LINE (draws itself, then a light travels along it) */}
        <div
          style={play(stepsIn, "hiw-draw 1.4s ease 0.2s both")}
          className="hiw-anim absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-400/40 to-transparent transform -translate-y-1/2 hidden lg:block"
        >
          {stepsIn && (
            <span
              style={{ animation: "hiw-travel 5s ease-in-out 2s infinite" }}
              className="hiw-anim hiw-dot absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_4px_rgba(236,72,153,0.8)]"
            />
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                ...play(stepsIn, `hiw-flip 0.9s ${EASE} ${0.3 + i * 0.2}s both`),
                transformOrigin: "50% 0%",
              }}
              className="hiw-anim relative group"
            >
              <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-pink-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10">
                {/* sheen that sweeps across the card on hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
                >
                  <span className="absolute inset-y-0 -left-1/2 w-1/3 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[500%]" />
                </div>

                {/* Step Number (pops in with a spinning colour ring) */}
                <div
                  style={play(stepsIn, `hiw-pop 0.7s ${EASE} ${0.7 + i * 0.2}s both`)}
                  className="hiw-anim absolute -top-4 left-8 w-8 h-8"
                >
                  <span
                    aria-hidden="true"
                    style={{ animation: "hiw-spin 3s linear infinite" }}
                    className="hiw-anim absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,#fb923c,#f472b6,#a855f7,#fb923c)] blur-[2px]"
                  />
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {step.number}
                  </span>
                </div>

                {/* Icon (breathes, wobbles on hover) */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400/15 via-pink-400/10 to-purple-500/15 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={40}
                    height={40}
                    className="hiw-breathe w-14"
                  />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-center">{step.title}</h3>
                <p className="text-muted-foreground text-center leading-relaxed mb-6">
                  {step.text}
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {step.pills.map((pill, p) => (
                    <span
                      key={pill}
                      style={play(
                        stepsIn,
                        `hiw-pill 0.5s ${EASE} ${1 + i * 0.2 + p * 0.15}s both`
                      )}
                      className="hiw-anim px-3 py-1 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 ring-1 ring-inset ring-pink-400/20 text-pink-400 text-xs rounded-full"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div
        ref={ctaRef}
        style={play(ctaIn, `hiw-pill 0.7s ${EASE} 0.1s both`)}
        className="hiw-anim text-center mt-16"
      >
        <SignUpButton mode="modal">
          <Button
            size="lg"
            style={{
              animation:
                "hiw-flow 3s ease-in-out infinite alternate, hiw-glow 3s ease-in-out infinite",
            }}
            className="hiw-anim bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white transition-[filter] duration-300"
          >
            <ArrowRightIcon
              style={{ animation: "hiw-nudge 1.4s ease-in-out infinite" }}
              className="hiw-anim mr-2 size-5"
            />
            Get started now
          </Button>
        </SignUpButton>
      </div>


  </section>
  
}

export default HowItWorks