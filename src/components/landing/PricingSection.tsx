"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircleIcon } from "lucide-react";

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

// price that counts up from 0 (reserves its final width, so nothing moves)
function Price({
  value,
  inView,
  delay,
  className = "",
}: {
  value: number;
  inView: boolean;
  delay: number;
  className?: string;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const duration = 1400;
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
      <span className="invisible">${value}</span>
      <span className={`absolute inset-0 ${className}`}>${n}</span>
    </span>
  );
}

// moves the soft light inside a card to follow the mouse
function handleSpot(e: ReactMouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

const plans = [
  {
    kind: "free",
    name: "Free",
    price: 0,
    description: "Essential dental appointment booking",
    button: "Get Started Free",
    entrance: "pr-deal-l",
    delay: 0.45,
    check: "text-orange-400",
    features: [
      "Unlimited appointment booking",
      "Find dentists in your area",
      "Basic text chat support",
      "Appointment reminders",
    ],
  },
  {
    kind: "basic",
    name: "AI Basic",
    price: 9,
    description: "AI consultations + appointment booking",
    button: "Start AI Basic",
    entrance: "pr-drop",
    delay: 0.1,
    check: "text-pink-400",
    features: [
      "Everything in Free",
      "10 AI voice calls per month",
      "AI dental guidance & advice",
      "Symptom assessment",
      "Priority support",
      "Call history & recordings",
    ],
  },
  {
    kind: "pro",
    name: "AI Pro",
    price: 19,
    description: "Unlimited AI consultations",
    button: "Upgrade to AI Pro",
    entrance: "pr-deal-r",
    delay: 0.6,
    check: "text-purple-400",
    features: [
      "Everything in AI Basic",
      "Unlimited AI voice calls",
      "Advanced AI dental analysis",
      "Personalized care plans",
      "24/7 priority AI support",
      "Detailed health reports",
    ],
  },
] as const;

function PricingSection() {
  const [headerRef, headerIn] = useInView<HTMLDivElement>();
  const [cardsRef, cardsIn] = useInView<HTMLDivElement>();

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      <style>{`
        @keyframes pr-zoom {
          0% { opacity: 0; transform: scale(1.3); filter: blur(10px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes pr-focus {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }
        @keyframes pr-deal-l {
          0% { opacity: 0; transform: translateX(-100px) rotate(-6deg); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes pr-deal-r {
          0% { opacity: 0; transform: translateX(100px) rotate(6deg); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes pr-drop {
          0% { opacity: 0; transform: translateY(-140px) scale(0.92); }
          55% { opacity: 1; transform: translateY(16px) scale(1); }
          75% { transform: translateY(-8px); }
          90% { transform: translateY(3px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes pr-slide-in {
          0% { opacity: 0; transform: translateX(-14px); }
          100% { opacity: 1; transform: none; }
        }
        @keyframes pr-stamp {
          0% { opacity: 0; transform: scale(2.4) rotate(-25deg); }
          60% { opacity: 1; transform: scale(0.85) rotate(4deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes pr-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pr-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pr-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes pr-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(450%) skewX(-20deg); }
        }
        @keyframes pr-beam {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(520%) skewX(-12deg); }
        }
        @keyframes pr-glow {
          0%, 100% { box-shadow: 0 0 18px rgba(236, 72, 153, 0.35); }
          50% { box-shadow: 0 0 38px rgba(168, 85, 247, 0.6); }
        }
        @keyframes pr-ping {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3); opacity: 0; }
        }
        .pr-ring {
          padding: 2px;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
        }
        @media (prefers-reduced-motion: reduce) {
          .pr-reveal { animation: none !important; opacity: 1 !important; }
          .pr-loop { animation: none !important; }
          .pr-hide-rm { display: none !important; }
        }
      `}</style>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-purple-500/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(236,72,153,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,72,153,0.18)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_50%,transparent_85%)] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06),transparent_70%)]"></div>

        {/* a soft beam of light that keeps sweeping across the section */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            style={{ animation: "pr-beam 9s ease-in-out infinite" }}
            className="pr-loop pr-hide-rm absolute -top-1/4 left-0 h-[150%] w-1/4 bg-gradient-to-r from-transparent via-pink-400/10 to-transparent blur-xl"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div
            style={play(headerIn, `pr-focus 0.8s ease 0s both`)}
            className="pr-reveal inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-full border border-pink-400/20 backdrop-blur-sm mb-6"
          >
            <span className="relative w-2 h-2">
              <span
                style={{ animation: "pr-ping 1.8s ease-out infinite" }}
                className="pr-loop absolute inset-0 rounded-full bg-pink-400"
              />
              <span className="absolute inset-0 rounded-full bg-pink-400" />
            </span>
            <span className={`text-sm font-medium ${gradientText}`}>Simple Pricing</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span
              style={play(headerIn, `pr-zoom 0.9s ${EASE} 0.2s both`)}
              className={`pr-reveal inline-block ${plainText}`}
            >
              Choose your
            </span>
            <br />
            <span
              style={play(
                headerIn,
                `pr-zoom 0.9s ${EASE} 0.45s both, pr-flow 4s ease-in-out 1.6s infinite alternate`
              )}
              className={`pr-reveal inline-block ${gradientText} bg-[length:200%_auto]`}
            >
              AI dental plan
            </span>
          </h2>

          <p
            style={play(headerIn, `pr-focus 1s ease 0.8s both`)}
            className="pr-reveal text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Book appointments at zero cost, then unlock unlimited AI health consultations with Pro—ideal for complete, continuous dental care.
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const featured = plan.kind === "basic";

            const button =
              plan.kind === "free" ? (
                <SignUpButton mode="modal">
                  <Button className="w-full py-3 bg-gradient-to-r from-muted to-muted/80 hover:from-orange-400/25 hover:via-pink-400/25 hover:to-purple-500/25 text-foreground rounded-xl font-semibold transition-all duration-300">
                    {plan.button}
                  </Button>
                </SignUpButton>
              ) : featured ? (
                <Button
                  style={{
                    animation:
                      "pr-flow 3s ease-in-out infinite alternate, pr-glow 3s ease-in-out infinite",
                  }}
                  className="pr-loop relative overflow-hidden w-full py-3 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white rounded-xl font-semibold transition-[filter] duration-300"
                >
                  <span
                    aria-hidden="true"
                    style={{ animation: "pr-shine 2.8s ease-in-out infinite" }}
                    className="pr-loop pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                  />
                  <span className="relative">{plan.button}</span>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full py-3 border-2 border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 rounded-xl font-semibold transition-all duration-300"
                >
                  {plan.button}
                </Button>
              );

            return (
              <div
                key={plan.kind}
                style={play(cardsIn, `${plan.entrance} 1s ${EASE} ${plan.delay}s both`)}
                className="pr-reveal relative group"
              >
                {/* the middle card also floats gently */}
                <div
                  style={
                    featured
                      ? { animation: "pr-float 6s ease-in-out 1.8s infinite" }
                      : undefined
                  }
                  className="pr-loop relative"
                >
                  {/* Popular Badge */}
                  {featured && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div
                        style={{ animation: "pr-flow 3s ease-in-out infinite alternate" }}
                        className="pr-loop relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-pink-500/30"
                      >
                        <span
                          aria-hidden="true"
                          style={{ animation: "pr-shine 3s ease-in-out 1s infinite" }}
                          className="pr-loop pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-sm"
                        />
                        <span className="relative">Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div
                    onMouseMove={handleSpot}
                    className={
                      featured
                        ? "relative bg-gradient-to-br from-card/95 to-card/70 backdrop-blur-xl rounded-3xl p-8 border-2 border-pink-400/30 hover:border-pink-400/60 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 scale-105"
                        : "relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-pink-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/10"
                    }
                  >
                    {/* soft light that follows the mouse */}
                    <div
                      aria-hidden="true"
                      style={{
                        background:
                          "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(236,72,153,0.14), transparent 60%)",
                      }}
                      className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    <div className="relative space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-bold">
                            <Price
                              value={plan.price}
                              inView={cardsIn}
                              delay={plan.delay + 0.5}
                              className={featured ? gradientText : ""}
                            />
                          </span>
                          <span className="text-muted-foreground mb-1">/month</span>
                        </div>
                        <p className="text-muted-foreground">{plan.description}</p>
                      </div>

                      {button}

                      <div className="space-y-4">
                        {plan.features.map((feature, fi) => {
                          const d = plan.delay + 0.8 + fi * 0.09;
                          return (
                            <div
                              key={feature}
                              style={play(cardsIn, `pr-slide-in 0.5s ease ${d}s both`)}
                              className="pr-reveal flex items-start gap-3"
                            >
                              <CheckCircleIcon
                                style={play(cardsIn, `pr-stamp 0.6s ${EASE} ${d}s both`)}
                                className={`pr-reveal w-5 h-5 ${plan.check} mt-0.5 shrink-0`}
                              />
                              <span className="text-sm">{feature}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* a comet of colour that keeps circling the middle card's border */}
                  {featured && (
                    <>
                      <div
                        aria-hidden="true"
                        className="pr-ring pr-hide-rm pointer-events-none absolute inset-0 scale-105 overflow-hidden rounded-3xl"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div
                            style={{ animation: "pr-spin 5s linear infinite" }}
                            className="pr-loop aspect-square w-[200%] shrink-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_55%,#fb923c_70%,#f472b6_85%,#a855f7_100%)]"
                          />
                        </div>
                      </div>

                      {/* light sweeping across the card every few seconds */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 scale-105 overflow-hidden rounded-3xl"
                      >
                        <span
                          style={{ animation: "pr-shine 5s ease-in-out 2s infinite" }}
                          className="pr-loop absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-pink-400/15 to-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;