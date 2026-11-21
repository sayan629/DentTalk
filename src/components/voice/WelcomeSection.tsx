import { MicIcon } from "lucide-react";

function WelcomeSection() {
  return (
    <>
      {/* Animations (self-contained, no globals.css or tailwind config needed) */}
      <style>{`
        @keyframes ws-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ws-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes ws-ring {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        .ws-fade-up { opacity: 0; animation: ws-fade-up 0.7s ease-out forwards; }
        .ws-delay-1 { animation-delay: 0.1s; }
        .ws-delay-2 { animation-delay: 0.25s; }
        .ws-delay-3 { animation-delay: 0.4s; }
        .ws-float   { animation: ws-float 4s ease-in-out infinite; }
        .ws-ring    { animation: ws-ring 2.4s ease-out infinite; }
        .ws-ring-2  { animation-delay: 1.2s; }

        @media (prefers-reduced-motion: reduce) {
          .ws-fade-up, .ws-float, .ws-ring {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>

      <div className="ws-fade-up relative z-10 flex items-center justify-between bg-gradient-to-br from-[#211915] via-[#151214] to-[#211525] rounded-3xl p-8 border border-[#563725]/70 mb-12 overflow-hidden font-mono">
        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-purple-600/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative space-y-4">
          <div className="ws-fade-up ws-delay-1 inline-flex items-center gap-2 px-3 py-1 bg-[#e9874b]/10 rounded-full border border-[#a85b32]/60">
            <div className="w-2 h-2 bg-[#ed8950] rounded-full animate-pulse" />
            <span className="text-sm font-medium text-[#ef8950]">Voice Assistant Ready</span>
          </div>
          <div>
            <h1 className="ws-fade-up ws-delay-2 text-4xl font-bold mb-2 text-[#d1cece]">
              AI{" "}
              <span className="bg-gradient-to-r from-[#f08b4d] to-[#d17ac1] bg-clip-text text-transparent">
                Voice
              </span>{" "}
              <span className="bg-gradient-to-r from-[#d17ac1] to-[#a63cf2] bg-clip-text text-transparent">
                Assistant
              </span>
            </h1>
            <p className="ws-fade-up ws-delay-3 text-[#898586]">
              Talk to your AI dental assistant using natural voice commands. Get instant advice and
              professional guidance.
            </p>
          </div>
        </div>

        {/* Mic: floating with pulsing rings */}
        <div className="ws-fade-up ws-delay-3 relative hidden lg:block">
          <div className="ws-float relative">
            <div className="ws-ring pointer-events-none absolute inset-0 rounded-full border border-[#ed8950]/40" />
            <div className="ws-ring ws-ring-2 pointer-events-none absolute inset-0 rounded-full border border-[#a63cf2]/40" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-full flex items-center justify-center shadow-[0_0_90px_rgba(164,75,207,0.12)]">
              <MicIcon className="w-16 h-16 text-[#ed8950]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default WelcomeSection;