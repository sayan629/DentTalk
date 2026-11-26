import Link from "next/link";
import Navbar from "@/components/Navbar";
import { currentUser } from "@clerk/nextjs/server";
import { PricingTable } from "@clerk/nextjs";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// outline of the tooth, shared by the drawing and by the clip that keeps the shine inside it
const TOOTH_PATH =
  "M31 15C19 15 12 25 15 42C18 59 26 69 30 91C32 102 40 108 46 96L54 76C57 68 63 68 66 76L74 96C80 108 88 102 90 91C94 69 102 59 105 42C108 25 101 15 89 15C77 15 70 23 60 23C50 23 43 15 31 15Z";

// phrases for the scrolling ribbon (all taken from the hero copy)
const highlights = [
  "AI-Powered Insights",
  "Personalized Consultations",
  "Exclusive Tools",
  "Secure Experience",
  "Smarter Dental Wellness",
];
const sparkColours = ["text-[#ed8950]", "text-[#d17ac1]", "text-[#a63cf2]"];

// a comet of colour that keeps circling a rounded border
function Comet({ radius, className = "" }: { radius: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{ borderRadius: radius }}
      className={`pf-ring pf-hide-rm pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{ animation: "pf-spin 9s linear infinite" }}
          className="pf-anim aspect-square w-[200%] shrink-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_62%,#f08b4d_76%,#d17ac1_90%,#a63cf2_100%)]"
        />
      </div>
    </div>
  );
}

export default async function ProPage() {
  const user = await currentUser();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#121012] p-4 pt-24 sm:p-8 sm:pt-28">
        <style>{`
          @keyframes pf-rise {
            0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
            100% { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes pf-focus {
            0% { opacity: 0; filter: blur(10px); }
            100% { opacity: 1; filter: blur(0); }
          }
          @keyframes pf-pop {
            0% { opacity: 0; transform: scale(0.5); }
            60% { opacity: 1; transform: scale(1.08); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes pf-line {
            0% { opacity: 0; transform: translateY(110%) rotate(3deg); }
            100% { opacity: 1; transform: none; }
          }
          @keyframes pf-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes pf-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pf-spin-rev {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          @keyframes pf-ripple {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.55); opacity: 0; }
          }
          @keyframes pf-twinkle {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.3) rotate(25deg); opacity: 0.55; }
          }
          @keyframes pf-tooth {
            0%, 100% { transform: translateY(0) rotate(-3deg); }
            50% { transform: translateY(-14px) rotate(3deg); }
          }
          @keyframes pf-breathe {
            0%, 100% { box-shadow: 0 0 90px rgba(164, 75, 207, 0.12); }
            50% { box-shadow: 0 0 120px rgba(237, 137, 80, 0.3); }
          }
          @keyframes pf-drift {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, -24px); }
          }
          @keyframes pf-ring {
            0% { box-shadow: 0 0 0 0 rgba(237, 137, 80, 0.55); }
            35%, 100% { box-shadow: 0 0 0 14px rgba(237, 137, 80, 0); }
          }
          @keyframes pf-glint {
            0%, 55% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(450%) skewX(-20deg); }
          }
          @keyframes pf-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(5px); }
          }
          @keyframes pf-wiggle {
            0%, 80%, 100% { transform: rotate(0deg) scale(1); }
            86% { transform: rotate(-14deg) scale(1.2); }
            92% { transform: rotate(10deg) scale(1.2); }
            96% { transform: rotate(-4deg) scale(1.05); }
          }
          /* NEW: a band of colour sweeps across the tooth (it is clipped to the tooth shape) */
          @keyframes pf-shine {
            0%, 62% { transform: translateX(-70px) skewX(-20deg); }
            100% { transform: translateX(170px) skewX(-20deg); }
          }
          /* NEW: a tiny star pops at the tooth's edge just as the shine leaves, like a toothpaste-ad "ting" */
          @keyframes pf-ting {
            0%, 80%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            88% { opacity: 1; transform: scale(1.25) rotate(20deg); }
            96% { opacity: 0; transform: scale(0.5) rotate(45deg); }
          }
          /* NEW: highlights ribbon scrolls endlessly (two identical lists, so -50% loops seamlessly) */
          @keyframes pf-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          /* NEW: slow-turning colour halo behind the pricing table */
          @keyframes pf-halo {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .pf-ring {
            padding: 1.5px;
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
          }
          .pf-marquee { animation: pf-marquee 32s linear infinite; }
          .pf-marquee-wrap:hover .pf-marquee { animation-play-state: paused; }
          .pf-edges {
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
            mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
          }
          /* plays as the block scrolls into view (browsers without support just show it) */
          @supports (animation-timeline: view()) {
            .pf-scroll {
              animation: pf-rise linear both;
              animation-timeline: view();
              animation-range: entry 0% entry 55%;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .pf-anim { animation: none !important; opacity: 1 !important; filter: none !important; }
            .pf-scroll { animation: none !important; }
            .pf-hide-rm { display: none !important; }
            .pf-marquee { animation: none !important; width: auto !important; flex-wrap: wrap; justify-content: center; }
          }
        `}</style>

        {/* Hero Card */}
        <section className="relative mx-auto min-h-[620px] max-w-[1200px] overflow-hidden rounded-[36px] border border-[#563725]/70 bg-gradient-to-br from-[#211915] via-[#151214] to-[#211525] px-7 py-10 sm:px-10 lg:px-14">

          {/* colour comet circling the card border */}
          <Comet radius="36px" />

          {/* Background decorations (slowly drifting) */}
          <div
            style={{ animation: "pf-drift 11s ease-in-out infinite" }}
            className="pf-anim pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-purple-600/5 blur-3xl"
          />
          <div
            style={{ animation: "pf-drift 13s ease-in-out 2s infinite" }}
            className="pf-anim pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl"
          />

          {/* Top-right star */}
          <div
            style={{ animation: "pf-twinkle 4s ease-in-out infinite" }}
            className="pf-anim absolute right-10 top-8 text-[#70452f]"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
          </div>

          {/* Bottom-right star */}
          <div
            style={{ animation: "pf-twinkle 5s ease-in-out 1.5s infinite" }}
            className="pf-anim absolute bottom-8 right-16 text-purple-700/70"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
              <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
            </svg>
          </div>

          {/* Main content */}
          <div className="relative z-10 grid min-h-[520px] items-center gap-8 lg:grid-cols-[1.5fr_0.8fr]">

            {/* Left content */}
            <div>
              {/* Premium label */}
              <div
                style={{ animation: `pf-pop 0.8s ${EASE} 0.1s backwards` }}
                className="pf-anim relative mb-8 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#a85b32]/60 bg-[#e9874b]/10 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-[#ef8950]"
              >
                <span
                  aria-hidden="true"
                  style={{ animation: "pf-glint 4s ease-in-out 1.2s infinite" }}
                  className="pf-anim pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/20 blur-sm"
                />
                <span
                  style={{ animation: "pf-spin 6s linear infinite" }}
                  className="pf-anim relative inline-block text-lg"
                >
                  ✧
                </span>
                <span className="relative">The Premium Experience</span>
              </div>

              {/* Heading (each line rises up from behind a mask) */}
              <h1 className="max-w-[780px] font-mono text-4xl font-extrabold leading-[1.3] tracking-tight text-[#d1cece] sm:text-5xl lg:text-[52px]">
                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    style={{ animation: `pf-line 0.9s ${EASE} 0.25s backwards` }}
                    className="pf-anim inline-block"
                  >
                    Your Smile Deserves
                  </span>
                </span>
                <br />

                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    style={{
                      animation: `pf-line 0.9s ${EASE} 0.45s backwards, pf-flow 4s ease-in-out 1.5s infinite alternate`,
                    }}
                    className="pf-anim inline-block bg-gradient-to-r from-[#f08b4d] to-[#d17ac1] bg-[length:200%_auto] bg-clip-text text-transparent"
                  >
                    Something
                  </span>
                </span>

                <br />

                <span className="inline-block overflow-hidden align-bottom">
                  <span
                    style={{
                      animation: `pf-line 0.9s ${EASE} 0.65s backwards, pf-flow 4s ease-in-out 1.7s infinite alternate`,
                    }}
                    className="pf-anim inline-block bg-gradient-to-r from-[#d17ac1] to-[#a63cf2] bg-[length:200%_auto] bg-clip-text text-transparent"
                  >
                    Extraordinary.
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p
                style={{ animation: "pf-focus 1s ease 0.95s backwards" }}
                className="pf-anim mt-6 max-w-[700px] font-mono text-sm leading-7 text-[#898586] sm:text-base"
              >
                Experience a smarter approach to dental wellness. Unlock
                advanced AI-powered insights, personalized consultations,
                and exclusive tools designed around your smile.
              </p>

              {/* Features */}
              <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-sm font-semibold text-[#c5c0c0]">
                <div
                  style={{ animation: `pf-pop 0.7s ${EASE} 1.15s backwards` }}
                  className="pf-anim flex items-center gap-3"
                >
                  <svg
                    style={{ animation: "pf-wiggle 5s ease-in-out 2.5s infinite" }}
                    className="pf-anim"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef8950"
                    strokeWidth="1.8"
                  >
                    <path d="M12 2 9.5 8.5 3 11l6.5 2.5L12 20l2.5-6.5L21 11l-6.5-2.5L12 2Z" />
                    <path d="m19 14 1.2 3.2L23 18.5l-2.8 1.2L19 23l-1.2-3.3-2.8-1.2 2.8-1.3L19 14Z" />
                  </svg>
                  AI-Powered Insights
                </div>

                <div
                  style={{ animation: `pf-pop 0.7s ${EASE} 1.3s backwards` }}
                  className="pf-anim flex items-center gap-3"
                >
                  <svg
                    style={{ animation: "pf-wiggle 5s ease-in-out 4s infinite" }}
                    className="pf-anim"
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ef8950"
                    strokeWidth="2"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  Secure Experience
                </div>
              </div>

              {/* Explore plans button */}
              <div
                style={{ animation: `pf-pop 0.8s ${EASE} 1.45s backwards` }}
                className="pf-anim mt-7 inline-block"
              >
                <Link
                  href="#plans"
                  style={{ animation: "pf-ring 3s ease-out 2.4s infinite" }}
                  className="pf-anim relative inline-flex items-center gap-4 overflow-hidden rounded-2xl bg-[#ed8950] px-8 py-4 font-mono font-bold text-[#17110e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fa9a60]"
                >
                  <span
                    aria-hidden="true"
                    style={{ animation: "pf-glint 3.5s ease-in-out 2.4s infinite" }}
                    className="pf-anim pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-sm"
                  />
                  <span className="relative">Explore Plans</span>
                  <span
                    style={{ animation: "pf-bounce 1.4s ease-in-out infinite" }}
                    className="pf-anim relative inline-block text-xl"
                  >
                    ↓
                  </span>
                </Link>
              </div>
            </div>

            {/* Right illustration */}
            <div
              style={{ animation: `pf-focus 1.1s ease 0.4s backwards` }}
              className="pf-anim flex items-center justify-center py-8"
            >
              <div
                style={{ animation: "pf-breathe 5s ease-in-out infinite" }}
                className="pf-anim relative flex h-[250px] w-[250px] items-center justify-center rounded-full border border-[#a85b50]/40 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 shadow-[0_0_90px_rgba(164,75,207,0.12)]"
              >

                {/* ripples spreading out from the circle */}
                <span
                  aria-hidden="true"
                  style={{ animation: "pf-ripple 3.6s ease-out infinite" }}
                  className="pf-anim pf-hide-rm pointer-events-none absolute inset-0 rounded-full border border-[#ed8950]/40"
                />
                <span
                  aria-hidden="true"
                  style={{ animation: "pf-ripple 3.6s ease-out 1.8s infinite" }}
                  className="pf-anim pf-hide-rm pointer-events-none absolute inset-0 rounded-full border border-[#a63cf2]/40"
                />

                {/* Inner circle (slowly turning dashed ring) */}
                <div
                  style={{ animation: "pf-spin-rev 30s linear infinite" }}
                  className="pf-anim absolute inset-5 rounded-full border border-dashed border-[#b87561]/40"
                />

                {/* orbiting glowing dots */}
                <div
                  aria-hidden="true"
                  style={{ animation: "pf-spin 10s linear infinite" }}
                  className="pf-anim pf-hide-rm pointer-events-none absolute inset-0"
                >
                  <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#ed8950] shadow-[0_0_16px_4px_rgba(237,137,80,0.7)]" />
                </div>
                <div
                  aria-hidden="true"
                  style={{ animation: "pf-spin-rev 16s linear infinite" }}
                  className="pf-anim pf-hide-rm pointer-events-none absolute inset-5"
                >
                  <span className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-[#a63cf2] shadow-[0_0_16px_4px_rgba(166,60,242,0.7)]" />
                </div>

                {/* Floating tooth */}
                <div
                  style={{ animation: "pf-tooth 6s ease-in-out infinite" }}
                  className="tooth-float pf-anim relative z-10"
                >
                  <svg
                    viewBox="0 0 120 120"
                    className="h-32 w-32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Tooth illustration"
                  >
                    <defs>
                      <linearGradient
                        id="toothGradient"
                        x1="25"
                        y1="15"
                        x2="95"
                        y2="105"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#FFFFFF" />
                        <stop offset="1" stopColor="#DCEBFF" />
                      </linearGradient>
                      {/* keeps the shine inside the tooth outline */}
                      <clipPath id="toothClip">
                        <path d={TOOTH_PATH} />
                      </clipPath>
                      {/* orange to pink to purple band, fading out at both edges */}
                      <linearGradient id="toothShine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#a63cf2" stopOpacity="0" />
                        <stop offset="0.5" stopColor="#ed8950" stopOpacity="0.6" />
                        <stop offset="1" stopColor="#d17ac1" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d={TOOTH_PATH}
                      fill="url(#toothGradient)"
                      stroke="#ed8950"
                      strokeWidth="2.8"
                      strokeLinejoin="round"
                    />

                    {/* the moving shine */}
                    <g clipPath="url(#toothClip)">
                      <rect
                        x="0"
                        y="-10"
                        width="34"
                        height="140"
                        fill="url(#toothShine)"
                        style={{ animation: "pf-shine 5s ease-in-out infinite" }}
                        className="pf-hide-rm"
                      />
                    </g>

                    <path
                      d="M35 34C43 29 50 33 56 36"
                      stroke="white"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.85"
                    />
                  </svg>

                  {/* the "ting" sparkle, timed to pop as the shine passes */}
                  <svg
                    aria-hidden="true"
                    style={{ animation: "pf-ting 5s ease-in-out infinite" }}
                    className="pf-hide-rm pointer-events-none absolute -right-2 top-2 text-[#f6b48a] drop-shadow-[0_0_6px_rgba(237,137,80,0.9)]"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 1.5 14.2 9.8 22.5 12l-8.3 2.2L12 22.5l-2.2-8.3L1.5 12l8.3-2.2L12 1.5Z" />
                  </svg>
                </div>

                {/* Sparkle decoration */}
                <div
                  style={{ animation: "pf-twinkle 2.8s ease-in-out infinite" }}
                  className="pf-anim absolute right-12 top-7 text-[#ed8950]"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
                    <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEW: highlights ribbon that scrolls endlessly (pauses on hover) */}
        <div
          aria-label="Premium highlights"
          className="pf-marquee-wrap pf-edges mx-auto mt-10 max-w-[1200px] overflow-hidden border-y border-[#563725]/50 py-4"
        >
          <div className="pf-marquee flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className={`flex shrink-0 items-center ${copy === 1 ? "pf-hide-rm" : ""}`}
              >
                {highlights.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center font-mono text-sm font-semibold uppercase tracking-wide text-[#898586]"
                  >
                    <span className="px-8">{item}</span>
                    <span aria-hidden="true" className={`text-base ${sparkColours[i % 3]}`}>
                      ✧
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Pricing section */}
        <section
          id="plans"
          className="mx-auto max-w-[1200px] scroll-mt-10 px-4 py-20 sm:px-8"
        >
          <div className="mb-12 text-center">
            <span className="pf-scroll inline-block bg-gradient-to-r from-[#ed8950] via-[#d17ac1] to-[#ed8950] bg-[length:200%_auto] bg-clip-text font-mono text-sm font-bold uppercase tracking-widest text-transparent">
              <span
                style={{ animation: "pf-flow 4s linear infinite" }}
                className="pf-anim block bg-gradient-to-r from-[#ed8950] via-[#d17ac1] to-[#ed8950] bg-[length:200%_auto] bg-clip-text text-transparent"
              >
                Find Your Perfect Plan
              </span>
            </span>

            <h2 className="pf-scroll mt-4 font-mono text-3xl font-bold text-white sm:text-4xl">
              Choose Your Premium Experience
            </h2>

            <p className="pf-scroll mx-auto mt-4 max-w-xl text-base leading-7 text-[#898586]">
              Take your dental wellness journey to the next level with
              a plan designed around your needs.
            </p>
          </div>

          {user ? (
            <div className="pf-scroll relative">
              {/* NEW: a blurred conic halo slowly turns behind the pricing table */}
              <div
                aria-hidden="true"
                className="pf-hide-rm pointer-events-none absolute inset-x-0 -inset-y-8 flex items-center justify-center overflow-hidden rounded-[48px]"
              >
                <div
                  style={{ animation: "pf-halo 24s linear infinite" }}
                  className="aspect-square w-[70%] shrink-0 bg-[conic-gradient(from_0deg,#ed8950,#d17ac1,#a63cf2,#ed8950)] opacity-20 blur-3xl"
                />
              </div>
              <div className="relative">
                <PricingTable />
              </div>
            </div>
          ) : (
            <div className="pf-scroll relative mx-auto max-w-lg overflow-hidden rounded-3xl border border-[#563725]/70 bg-[#1c171b] p-10 text-center">
              <Comet radius="24px" />

              <h3 className="relative text-2xl font-bold text-white">
                Sign in to explore plans
              </h3>

              <p className="relative mt-3 text-[#898586]">
                Sign in to view available premium subscription options.
              </p>

              <Link
                href="/sign-in"
                style={{ animation: "pf-ring 3s ease-out 1s infinite" }}
                className="pf-anim relative mt-7 inline-flex overflow-hidden rounded-xl bg-[#ed8950] px-7 py-3 font-semibold text-[#17110e] transition hover:bg-[#fa9a60]"
              >
                <span
                  aria-hidden="true"
                  style={{ animation: "pf-glint 3.5s ease-in-out 1s infinite" }}
                  className="pf-anim pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/40 blur-sm"
                />
                <span className="relative">Sign In</span>
              </Link>
            </div>
          )}
        </section>
      </main>
    </>
  );
}