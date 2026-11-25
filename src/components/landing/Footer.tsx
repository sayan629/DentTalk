"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

// link with a gradient underline that grows on hover, and a small nudge to the right
const linkClass =
  "inline-block transition-colors duration-300 hover:text-pink-400 hover:translate-x-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-no-repeat bg-bottom bg-[length:0%_1px] hover:bg-[length:100%_1px] [transition:background-size_0.4s_ease,color_0.3s,transform_0.3s_ease]";

const columns = [
  { title: "Product", links: ["How it works", "Pricing", "FAQ"] },
  { title: "Support", links: ["Help center", "Contact us", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

// fixed values (no Math.random) so server and client render the same markup.
// left = horizontal position, size = px, dur/delay = seconds, drift = sideways sway in px
const sparkles = [
  { left: "6%", size: 6, dur: 9, delay: 0, drift: 14, hue: "bg-orange-300" },
  { left: "14%", size: 4, dur: 11, delay: 2.5, drift: -10, hue: "bg-pink-300" },
  { left: "23%", size: 8, dur: 10, delay: 5, drift: 18, hue: "bg-purple-300" },
  { left: "34%", size: 5, dur: 12, delay: 1, drift: -16, hue: "bg-pink-300" },
  { left: "45%", size: 7, dur: 9.5, delay: 6, drift: 12, hue: "bg-orange-300" },
  { left: "56%", size: 4, dur: 11.5, delay: 3, drift: -14, hue: "bg-purple-300" },
  { left: "67%", size: 6, dur: 10.5, delay: 7, drift: 16, hue: "bg-pink-300" },
  { left: "77%", size: 8, dur: 12.5, delay: 0.5, drift: -18, hue: "bg-orange-300" },
  { left: "86%", size: 5, dur: 9, delay: 4, drift: 10, hue: "bg-purple-300" },
  { left: "94%", size: 6, dur: 11, delay: 8, drift: -12, hue: "bg-pink-300" },
];

function Footer() {
  const [showTop, setShowTop] = useState(false);

  // show the back-to-top button once the page has been scrolled a bit
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative overflow-hidden px-6 py-12 border-t border-pink-400/20 bg-gradient-to-b from-orange-400/5 via-pink-400/5 to-purple-500/5">
        <style>{`
          @keyframes footer-line {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          @keyframes footer-glow {
            0%, 100% { opacity: 0.25; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.25); }
          }
          /* sparkles drift up from the bottom edge, sway sideways, then fade out */
          @keyframes footer-rise {
            0% { opacity: 0; transform: translate3d(0, 0, 0) scale(0.6); }
            15% { opacity: 0.85; }
            50% { transform: translate3d(var(--drift), -110px, 0) scale(1); }
            85% { opacity: 0.5; }
            100% { opacity: 0; transform: translate3d(calc(var(--drift) * -0.6), -240px, 0) scale(0.8); }
          }
          /* wordmark colours slowly flow, so it reads as a living brand mark */
          @keyframes footer-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          /* gentle up-and-down on the back-to-top arrow */
          @keyframes footer-hop {
            0%, 100% { transform: translateY(1px); }
            50% { transform: translateY(-3px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .footer-anim { animation: none !important; }
            .footer-sparkle { display: none !important; }
          }
        `}</style>

        {/* light sweeping along the top border */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
          <div
            style={{ animation: "footer-line 4s ease-in-out infinite" }}
            className="footer-anim h-full w-1/4 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
          />
        </div>

        {/* sparkles rising from the bottom, like fresh, clean-teeth glints */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {sparkles.map((s, i) => (
            <span
              key={i}
              style={
                {
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  "--drift": `${s.drift}px`,
                  animation: `footer-rise ${s.dur}s ease-in-out ${s.delay}s infinite backwards`,
                } as React.CSSProperties
              }
              className={`footer-sparkle footer-anim absolute bottom-2 rounded-full opacity-0 blur-[1px] shadow-[0_0_10px_2px_rgba(244,114,182,0.5)] ${s.hue}`}
            />
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2">
                {/* logo with a pulsing glow behind it */}
                <div className="relative w-8 h-8">
                  <span
                    style={{ animation: "footer-glow 3s ease-in-out infinite" }}
                    className="footer-anim absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 blur-md"
                  />
                  <Image
                    src="/logo.png"
                    alt="DentTalk Logo"
                    width={32}
                    height={32}
                    className="relative w-8 h-8"
                  />
                </div>
                <span
                  style={{ animation: "footer-flow 4s ease-in-out infinite alternate" }}
                  className={`footer-anim font-semibold text-lg bg-[length:200%_auto] ${gradientText}`}
                >
                  DentTalk
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered dental assistance that actually helps.
              </p>
            </div>

            {columns.map((column, i) => (
              <div
                key={column.title}
                style={{ animationDelay: `${(i + 1) * 120}ms`, animationFillMode: "backwards" }}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <h4 className="font-medium mb-3">{column.title}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className={linkClass}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{ animationDelay: "600ms", animationFillMode: "backwards" }}
            className="border-t border-pink-400/20 mt-8 pt-8 text-center text-sm text-muted-foreground animate-in fade-in duration-1000"
          >
            <p>&copy; 2026 DentTalk. Built for real people with real dental questions.</p>
          </div>
        </div>
      </footer>

      {/* back-to-top: slides in after scrolling, arrow hops to invite a click */}
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/30 transition-all duration-500 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400 ${
          showTop
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-75 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "footer-hop 1.6s ease-in-out infinite" }}
          className="footer-anim size-5"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}

export default Footer;