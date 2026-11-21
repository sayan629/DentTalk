import Navbar from "@/components/Navbar";
import { CrownIcon, LockIcon, MicIcon } from "lucide-react";
import Link from "next/link";

function ProPlanRequired() {
  return (
    <>
      <Navbar />

      {/* Animations (self-contained, no globals.css or tailwind config needed) */}
      <style>{`
        @keyframes ppr-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ppr-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes ppr-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.7); opacity: 0; }
        }
        @keyframes ppr-shimmer {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(260%) skewX(-20deg); }
        }
        @keyframes ppr-twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
          50%      { opacity: 1;   transform: scale(1.2) rotate(15deg); }
        }
        @keyframes ppr-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-8deg); }
          75%      { transform: rotate(8deg); }
        }

        .ppr-fade-up   { opacity: 0; animation: ppr-fade-up 0.7s ease-out forwards; }
        .ppr-delay-1   { animation-delay: 0.1s; }
        .ppr-delay-2   { animation-delay: 0.25s; }
        .ppr-delay-3   { animation-delay: 0.4s; }
        .ppr-delay-4   { animation-delay: 0.55s; }
        .ppr-delay-5   { animation-delay: 0.7s; }
        .ppr-delay-6   { animation-delay: 0.85s; }
        .ppr-float     { animation: ppr-float 4s ease-in-out infinite; }
        .ppr-ring      { animation: ppr-ring 2.4s ease-out infinite; }
        .ppr-ring-2    { animation-delay: 1.2s; }
        .ppr-twinkle   { animation: ppr-twinkle 3s ease-in-out infinite; }
        .ppr-shimmer   { animation: ppr-shimmer 3.5s ease-in-out infinite; }
        .group:hover .ppr-wiggle { animation: ppr-wiggle 0.5s ease-in-out; }

        @media (prefers-reduced-motion: reduce) {
          .ppr-fade-up, .ppr-float, .ppr-ring, .ppr-twinkle, .ppr-shimmer {
            animation: none !important;
            opacity: 1 !important;
          }
          .group:hover .ppr-wiggle { animation: none; }
        }
      `}</style>

      <main className="min-h-screen bg-[#121012] p-4 pt-24 sm:p-8 sm:pt-28">
        {/* Access Denied Section */}
        <section className="ppr-fade-up relative mx-auto max-w-[1200px] overflow-hidden rounded-[36px] border border-[#563725]/70 bg-gradient-to-br from-[#211915] via-[#151214] to-[#211525] px-7 py-10 sm:px-10 lg:px-14">
          {/* Background decorations */}
          <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-purple-600/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

          {/* Twinkling star */}
          <div className="ppr-twinkle absolute bottom-8 right-16 text-purple-700/70">
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

          <div className="relative z-10 flex items-center justify-between gap-8">
            <div>
              {/* Label */}
              <div className="ppr-fade-up ppr-delay-1 mb-6 inline-flex items-center gap-3 rounded-full border border-[#a85b32]/60 bg-[#e9874b]/10 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-[#ef8950]">
                <LockIcon className="h-4 w-4" />
                Pro Feature
              </div>

              {/* Heading */}
              <h1 className="ppr-fade-up ppr-delay-2 max-w-[780px] font-mono text-3xl font-extrabold leading-[1.3] tracking-tight text-[#d1cece] sm:text-4xl lg:text-5xl">
                Voice Assistant
                <br />
                <span className="bg-gradient-to-r from-[#f08b4d] to-[#d17ac1] bg-clip-text text-transparent">
                  Access
                </span>{" "}
                <span className="bg-gradient-to-r from-[#d17ac1] to-[#a63cf2] bg-clip-text text-transparent">
                  Required.
                </span>
              </h1>

              {/* Description */}
              <p className="ppr-fade-up ppr-delay-3 mt-6 max-w-[700px] font-mono text-sm leading-7 text-[#898586] sm:text-base">
                Upgrade to AI Pro or AI Basic to unlock unlimited voice
                consultations with our AI dental assistant.
              </p>
            </div>

            {/* Right icon: floating with pulsing rings */}
            <div className="ppr-fade-up ppr-delay-3 hidden lg:block">
              <div className="ppr-float relative">
                <div className="ppr-ring pointer-events-none absolute inset-0 rounded-full border border-[#ed8950]/40" />
                <div className="ppr-ring ppr-ring-2 pointer-events-none absolute inset-0 rounded-full border border-[#a63cf2]/40" />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#a85b50]/40 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 shadow-[0_0_90px_rgba(164,75,207,0.12)]">
                  <MicIcon className="h-16 w-16 text-[#ed8950]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upgrade Card */}
        <section className="ppr-fade-up ppr-delay-4 mx-auto mt-12 max-w-2xl">
          <div className="group rounded-3xl border border-[#563725]/70 bg-[#1c171b] p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ed8950]/50 hover:shadow-[0_20px_60px_rgba(237,137,80,0.08)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#a85b50]/40 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 transition-transform duration-300 group-hover:scale-110">
              <LockIcon className="ppr-wiggle h-10 w-10 text-[#ed8950]" />
            </div>

            <h3 className="mb-4 font-mono text-2xl font-bold text-white">
              Upgrade Required
            </h3>
            <p className="mb-6 text-[#898586]">
              The voice assistant feature is available to AI Pro and AI Basic
              subscribers. Get instant dental advice through natural voice
              conversations.
            </p>

            <div className="mb-8 space-y-4 font-mono text-sm text-[#c5c0c0]">
              <div className="ppr-fade-up ppr-delay-4 flex items-center justify-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#ed8950]" />
                <span>24/7 voice consultations</span>
              </div>
              <div className="ppr-fade-up ppr-delay-5 flex items-center justify-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#ed8950]" />
                <span>Professional dental guidance</span>
              </div>
              <div className="ppr-fade-up ppr-delay-6 flex items-center justify-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#ed8950]" />
                <span>Instant pain relief advice</span>
              </div>
            </div>

            <Link
              href="/pro"
              className="relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#ed8950] px-8 py-4 font-mono font-bold text-[#17110e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fa9a60]"
            >
              {/* Shimmer sweep */}
              <span className="ppr-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-sm" />
              <CrownIcon className="relative h-5 w-5" />
              <span className="relative">Upgrade to Pro</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default ProPlanRequired;