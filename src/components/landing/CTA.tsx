"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon, CalendarIcon } from "lucide-react";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView] as const;
}

// number that counts up (reserves its final width, so nothing moves)
function Count({ value, inView, delay }: { value: number; inView: boolean; delay: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{value.toLocaleString("en-US")}</span>
      <span className={`absolute inset-0 ${gradientText}`}>{n.toLocaleString("en-US")}</span>
    </span>
  );
}

// the image tilts in 3D to follow the mouse
function handleTilt(e: ReactMouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  e.currentTarget.style.setProperty("--ry", `${x * 14}deg`);
  e.currentTarget.style.setProperty("--rx", `${-y * 14}deg`);
}

function resetTilt(e: ReactMouseEvent<HTMLDivElement>) {
  e.currentTarget.style.setProperty("--ry", "0deg");
  e.currentTarget.style.setProperty("--rx", "0deg");
}

// confetti that bursts out from the image once
const confetti = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const dist = i % 2 === 0 ? 150 : 210;
  return {
    dx: Math.round(Math.cos(angle) * dist),
    dy: Math.round(Math.sin(angle) * dist),
    rot: (i % 2 === 0 ? 1 : -1) * (180 + i * 40),
    color: ["bg-orange-400", "bg-pink-400", "bg-purple-400", "bg-amber-400"][i % 4],
    round: i % 3 === 0,
    delay: (i % 5) * 0.04,
  };
});

function CTA() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-muted/10 via-background to-muted/5">
      <style>{`
        @keyframes cta-zoom {
          0% { opacity: 0; transform: scale(0.6); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes cta-badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
          50% { box-shadow: 0 0 16px 2px rgba(236, 72, 153, 0.35); }
        }
        @keyframes cta-skew {
          0% { opacity: 0; transform: translateY(34px) skewY(7deg); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes cta-type {
          0% { clip-path: inset(-20% 100% -20% 0); }
          100% { clip-path: inset(-20% 0 -20% 0); }
        }
        @keyframes cta-caret {
          0% { left: 0; }
          100% { left: calc(100% - 2px); }
        }
        @keyframes cta-caret-out {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes cta-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes cta-focus {
          0% { opacity: 0; filter: blur(8px); transform: translateY(16px); }
          100% { opacity: 1; filter: blur(0); transform: none; }
        }
        @keyframes cta-spring {
          0% { opacity: 0; transform: scale(0.6) translateY(20px); }
          55% { opacity: 1; transform: scale(1.08) translateY(-4px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes cta-beat {
          0% { transform: scale(1); }
          6% { transform: scale(1.06); }
          12% { transform: scale(1); }
          18% { transform: scale(1.04); }
          26%, 100% { transform: scale(1); }
        }
        @keyframes cta-ring {
          0% { box-shadow: 0 10px 15px -3px rgba(236, 72, 153, 0.3), 0 0 0 0 rgba(236, 72, 153, 0.55); }
          30%, 100% { box-shadow: 0 10px 15px -3px rgba(236, 72, 153, 0.3), 0 0 0 14px rgba(236, 72, 153, 0); }
        }
        @keyframes cta-ping {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes cta-flip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes cta-pop {
          0%, 86%, 100% { transform: scale(1); }
          91% { transform: scale(1.15); }
          96% { transform: scale(0.97); }
        }
        @keyframes cta-iris {
          0% { clip-path: circle(0% at 50% 50%); }
          100% { clip-path: circle(150% at 50% 50%); }
        }
        @keyframes cta-bob {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(6px, -8px); }
          50% { transform: translate(0, -12px); }
          75% { transform: translate(-6px, -8px); }
        }
        @keyframes cta-glow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes cta-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cta-spin-rev {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes cta-sweep-a {
          0%, 100% { transform: rotate(-22deg); }
          50% { transform: rotate(22deg); }
        }
        @keyframes cta-sweep-b {
          0%, 100% { transform: rotate(22deg); }
          50% { transform: rotate(-22deg); }
        }
        @keyframes cta-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-10px, -12px); }
        }
        @keyframes cta-burst {
          0% { opacity: 0; transform: translate(0, 0) rotate(0deg) scale(0); }
          15% { opacity: 1; }
          70% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--dx), calc(var(--dy) + 40px)) rotate(var(--rot)) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-reveal { animation: none !important; opacity: 1 !important; }
          .cta-loop { animation: none !important; }
          .cta-hide-rm { display: none !important; }
        }
      `}</style>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06),transparent_70%)]"></div>

      {/* two searchlight beams swinging across the section (no layout change) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          style={{ animation: "cta-sweep-a 9s ease-in-out infinite", transformOrigin: "50% 0%" }}
          className="cta-loop cta-hide-rm absolute -top-10 left-1/4 h-[140%] w-32 bg-gradient-to-b from-orange-400/25 to-transparent blur-2xl"
        />
        <div
          style={{ animation: "cta-sweep-b 11s ease-in-out infinite", transformOrigin: "50% 0%" }}
          className="cta-loop cta-hide-rm absolute -top-10 right-1/4 h-[140%] w-32 bg-gradient-to-b from-purple-500/25 to-transparent blur-2xl"
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div
                style={play(
                  inView,
                  `cta-zoom 0.7s ${EASE} 0s both, cta-badge-glow 3s ease-in-out 1s infinite`
                )}
                className="cta-reveal inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-full border border-pink-400/20"
              >
                <div className="relative w-2 h-2">
                  <span
                    style={{ animation: "cta-ping 1.8s ease-out infinite" }}
                    className="cta-loop absolute inset-0 rounded-full bg-pink-400"
                  />
                  <span className="absolute inset-0 rounded-full bg-pink-400" />
                </div>
                <span className={`text-xs font-medium ${gradientText}`}>Ready When You Are</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span
                  style={play(inView, `cta-skew 0.8s ${EASE} 0.2s both`)}
                  className="cta-reveal inline-block bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent"
                >
                  Your dental health
                </span>
                <br />
                {/* typed out letter by letter, with a caret */}
                <span
                  style={play(
                    inView,
                    `cta-type 1.4s steps(19, end) 0.7s both, cta-flow 4s ease-in-out 2.4s infinite alternate`
                  )}
                  className={`cta-reveal relative inline-block ${gradientText} bg-[length:200%_auto]`}
                >
                  journey starts here
                  {inView && (
                    <span
                      aria-hidden="true"
                      style={{
                        animation:
                          "cta-caret 1.4s steps(19, end) 0.7s both, cta-caret-out 0.3s ease 2.2s both",
                      }}
                      className="cta-hide-rm absolute inset-y-1 hidden w-0.5 rounded-full bg-pink-400 md:block"
                    />
                  )}
                </span>
              </h2>

              <p
                style={play(inView, `cta-focus 0.9s ease 0.9s both`)}
                className="cta-reveal text-lg text-muted-foreground leading-relaxed"
              >
                Joined by over{" "}
                <Count value={1200} inView={inView} delay={1.1} />
                + patients relying on AI-driven insights for instant clarity and
                custom care.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <div style={play(inView, `cta-spring 0.8s ${EASE} 1.2s both`)} className="cta-reveal">
                <Button
                  size="lg"
                  style={{
                    animation:
                      "cta-flow 3s ease-in-out infinite alternate, cta-beat 3.2s ease-in-out 2.2s infinite, cta-ring 3.2s ease-out 2.2s infinite",
                  }}
                  className="cta-loop relative px-6 py-3 font-semibold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white shadow-lg shadow-pink-500/30 transition-[filter] duration-300 rounded-xl"
                >
                  <span className="relative mr-2 inline-flex size-4 shrink-0">
                    <span
                      aria-hidden="true"
                      style={{ animation: "cta-ping 1.8s ease-out infinite" }}
                      className="cta-loop absolute inset-0 rounded-full bg-white/60"
                    />
                    <MicIcon className="relative h-4 w-4" />
                  </span>
                  <span className="relative">Start free chat</span>
                </Button>
              </div>

              <div style={play(inView, `cta-spring 0.8s ${EASE} 1.35s both`)} className="cta-reveal">
                <Button
                  size="lg"
                  variant="outline"
                  className="group px-6 py-3 font-semibold border border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300 rounded-xl"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-pink-400 group-hover:[animation:cta-flip_0.7s_ease]" />
                  Book appointment
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - CTA Image */}
          <div
            style={play(inView, `cta-focus 1s ease 0.3s both`)}
            className="cta-reveal relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Floating Badge (pops every few seconds) */}
              <div
                style={{ animation: "cta-pop 5s ease-in-out 2s infinite" }}
                className="cta-loop absolute -top-4 left-4 bg-gradient-to-r from-orange-400/90 via-pink-500/90 to-purple-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-pink-500/30 z-10"
              >
                <div className="flex items-center gap-1">
                  <div className="relative w-1.5 h-1.5">
                    <span
                      style={{ animation: "cta-ping 1.6s ease-out infinite" }}
                      className="cta-loop absolute inset-0 rounded-full bg-white"
                    />
                    <span className="absolute inset-0 rounded-full bg-white" />
                  </div>
                  Available 24/7
                </div>
              </div>

              {/* Main Image (drifts in a slow loop) */}
              <div
                style={{ animation: "cta-bob 7s ease-in-out infinite" }}
                className="cta-loop relative"
              >
                {/* radar: a colour sweep turning around the image, plus a dashed orbit */}
                <div aria-hidden="true" className="pointer-events-none absolute -inset-8">
                  <div
                    style={{ animation: "cta-spin 8s linear infinite" }}
                    className="cta-loop absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_65%,rgba(251,146,60,0.35)_82%,rgba(244,114,182,0.55)_95%,transparent_100%)] [mask-image:radial-gradient(circle,transparent_58%,#000_60%,#000_68%,transparent_70%)]"
                  />
                  <div
                    style={{ animation: "cta-spin-rev 22s linear infinite" }}
                    className="cta-loop absolute inset-3 rounded-full border border-dashed border-pink-400/30"
                  >
                    <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_10px_3px_rgba(168,85,247,0.7)]" />
                  </div>
                </div>

                {/* Subtle glow */}
                <div
                  style={{ animation: "cta-glow 4s ease-in-out infinite" }}
                  className="cta-loop absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl blur-xl scale-110"
                ></div>

                {/* image tilts toward the mouse and opens like an iris */}
                <div
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  style={{
                    transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
                    transition: "transform 0.25s ease-out",
                  }}
                  className="relative"
                >
                  <Image
                    src="/cta.png"
                    alt="DentTalk AI Assistant"
                    width={300}
                    height={300}
                    style={play(inView, `cta-iris 1.2s ${EASE} 0.5s both`)}
                    className="cta-reveal relative w-80 h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>

                {/* confetti bursts out once */}
                {inView && (
                  <div aria-hidden="true" className="cta-hide-rm pointer-events-none absolute inset-0">
                    {confetti.map((c, i) => (
                      <span
                        key={i}
                        style={
                          {
                            "--dx": `${c.dx}px`,
                            "--dy": `${c.dy}px`,
                            "--rot": `${c.rot}deg`,
                            animation: `cta-burst 1.6s cubic-bezier(0.1, 0.7, 0.3, 1) ${1 + c.delay}s both`,
                          } as CSSProperties
                        }
                        className={`absolute left-1/2 top-1/2 -ml-1 -mt-1 size-2 opacity-0 ${c.color} ${
                          c.round ? "rounded-full" : "rounded-[2px]"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div
                style={{ animation: "cta-drift 6s ease-in-out infinite" }}
                className="cta-loop absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-purple-500/20 rounded-full blur-lg"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CTA;