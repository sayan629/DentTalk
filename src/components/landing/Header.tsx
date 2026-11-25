"use client";

import { useEffect, useRef, useState } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)"

const navLinks = ["How it Works", "Pricing", "About"]

function Header() {
  const barRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // scroll progress bar + stronger header once the page is scrolled
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return <nav
    style={{ animation: `hdr-unfold 0.9s ${EASE} backwards` }}
    className={`hdr-reveal fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b backdrop-blur-md h-16 transition-all duration-300 ${
      scrolled
        ? "border-pink-400/40 bg-background/90 shadow-lg shadow-pink-500/10"
        : "border-pink-400/20 bg-background/80"
    }`}
  >
    <style>{`
      @keyframes hdr-unfold {
        0% { opacity: 0; clip-path: inset(0 0 100% 0); }
        100% { opacity: 1; clip-path: inset(0 0 0 0); }
      }
      @keyframes hdr-spin-in {
        0% { opacity: 0; transform: rotate(-360deg) scale(0); }
        100% { opacity: 1; transform: rotate(0deg) scale(1); }
      }
      @keyframes hdr-wipe {
        0% { clip-path: inset(-20% 100% -20% 0); }
        100% { clip-path: inset(-20% -5% -20% -5%); }
      }
      @keyframes hdr-flow {
        0% { background-position: 0% 50%; }
        100% { background-position: 100% 50%; }
      }
      @keyframes hdr-flip {
        0% { opacity: 0; transform: perspective(400px) rotateX(-90deg); }
        100% { opacity: 1; transform: perspective(400px) rotateX(0deg); }
      }
      @keyframes hdr-pop {
        0% { opacity: 0; transform: scale(0.5); }
        60% { opacity: 1; transform: scale(1.1); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes hdr-twinkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      @keyframes hdr-breathe {
        0%, 100% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(-4deg) scale(1.06); }
      }
      @keyframes hdr-wobble {
        0% { transform: rotate(0deg) scale(1); }
        25% { transform: rotate(-14deg) scale(1.15); }
        50% { transform: rotate(10deg) scale(1.15); }
        75% { transform: rotate(-5deg) scale(1.1); }
        100% { transform: rotate(0deg) scale(1.1); }
      }
      @keyframes hdr-ring {
        0% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 0 rgba(236, 72, 153, 0.55); }
        35%, 100% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 10px rgba(236, 72, 153, 0); }
      }
      @keyframes hdr-glint {
        0%, 70% { transform: translateX(-150%) skewX(-20deg); }
        100% { transform: translateX(450%) skewX(-20deg); }
      }
      .hdr-logo { animation: hdr-breathe 5s ease-in-out 1.4s infinite; }
      .group:hover .hdr-logo { animation: hdr-wobble 0.7s ease forwards; }
      @media (prefers-reduced-motion: reduce) {
        .hdr-reveal { animation: none !important; opacity: 1 !important; }
        .hdr-loop, .hdr-logo { animation: none !important; }
        .hdr-hide-rm { display: none !important; }
      }
    `}</style>

    {/* scroll progress bar along the bottom border */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5">
      <div
        ref={barRef}
        style={{ transform: "scaleX(0)", transition: "transform 0.15s linear" }}
        className="hdr-hide-rm h-full origin-left bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-[0_0_10px_1px_rgba(236,72,153,0.7)]"
      />
    </div>

    <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href= "/" className="group flex items-center gap-2">
        {/* logo spins in once, then breathes; sparkles twinkle around it */}
        <div
          style={{ animation: `hdr-spin-in 1s ${EASE} 0.2s backwards` }}
          className="hdr-reveal relative w-11"
        >
          <span
            aria-hidden="true"
            style={{ animation: "hdr-twinkle 2.6s ease-in-out 1.4s infinite" }}
            className="hdr-loop absolute -top-1 -right-1 size-1.5 rounded-full bg-orange-300 shadow-[0_0_8px_2px_rgba(251,146,60,0.8)]"
          />
          <span
            aria-hidden="true"
            style={{ animation: "hdr-twinkle 2.6s ease-in-out 2.7s infinite" }}
            className="hdr-loop absolute -bottom-1 -left-1 size-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_2px_rgba(168,85,247,0.8)]"
          />
          <Image
            src={"/logo.png"}
            alt="DentTalk Logo"
            width={32}
            height={32}
            className="hdr-logo relative w-11"
          />
        </div>

        {/* brand name is wiped in, then its colours keep flowing */}
        <span
          style={{
            animation: `hdr-wipe 0.9s ${EASE} 0.5s backwards, hdr-flow 4s ease-in-out 1.5s infinite alternate`,
          }}
          className={`hdr-reveal font-semibold text-lg ${gradientText} bg-[length:200%_auto]`}
        >
          DentTalk
        </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                style={{
                  animation: `hdr-flip 0.7s ${EASE} ${0.5 + i * 0.12}s backwards`,
                  transformOrigin: "50% 0%",
                }}
                className="hdr-reveal group/nav relative text-muted-foreground transition-colors duration-300 hover:text-pink-400"
              >
                {/* soft gradient pill that grows behind the link on hover */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-3 -inset-y-1.5 scale-75 rounded-full bg-gradient-to-r from-orange-400/15 via-pink-400/15 to-purple-500/15 opacity-0 ring-1 ring-inset ring-pink-400/20 transition-all duration-300 group-hover/nav:scale-100 group-hover/nav:opacity-100"
                />
                <span className="relative">{link}</span>
              </a>
            ))}
        </div>

        <div className="flex items-center gap-3">
            <SignInButton mode="modal">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  style={{ animation: `hdr-pop 0.6s ${EASE} 0.9s backwards` }}
                  className="hdr-reveal hover:bg-pink-400/10 hover:text-pink-400 transition-colors duration-300"
                >
                    Log In
                </Button>
            </SignInButton>

            <SignUpButton mode="modal">
                <Button
                  size={"sm"}
                  style={{
                    animation: `hdr-pop 0.6s ${EASE} 1.05s backwards, hdr-flow 3s ease-in-out 1.7s infinite alternate, hdr-ring 3.2s ease-out 2s infinite`,
                  }}
                  className="hdr-reveal hdr-loop relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white shadow-md shadow-pink-500/30 transition-[filter] duration-300"
                >
                <span
                  aria-hidden="true"
                  style={{ animation: "hdr-glint 4s ease-in-out 2s infinite" }}
                  className="hdr-loop pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                />
                <span className="relative">Sign Up</span>
                </Button>
            </SignUpButton>
        </div>
    </div>
    </nav>

}

export default Header