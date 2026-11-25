import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MicIcon, CalendarIcon } from "lucide-react";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

function CTA() {
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-muted/10 via-background to-muted/5">
      <style>{`
        @keyframes cta-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cta-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(24px, -18px); }
        }
        @keyframes cta-ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes cta-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(450%) skewX(-20deg); }
        }
      `}</style>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06),transparent_70%)]"></div>

      {/* drifting glow orbs (no layout change) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          style={{ animation: "cta-drift 9s ease-in-out infinite" }}
          className="absolute -top-24 -left-16 size-72 rounded-full bg-orange-400/15 blur-3xl"
        />
        <div
          style={{ animation: "cta-drift 11s ease-in-out 2s infinite" }}
          className="absolute -bottom-24 -right-16 size-80 rounded-full bg-purple-500/15 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-full border border-pink-400/20">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span className={`text-xs font-medium ${gradientText}`}>Ready When You Are</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your dental health
                </span>
                <br />
                <span className={gradientText}>journey starts here</span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Joined by over 1,200+ patients relying on AI-driven insights for instant clarity and
                custom care.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
              className="flex flex-col sm:flex-row gap-3 pt-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <Button
                size="lg"
                className="relative overflow-hidden px-6 py-3 font-semibold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 rounded-xl"
              >
                <span
                  aria-hidden="true"
                  style={{ animation: "cta-shine 2.8s ease-in-out infinite" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                />
                <MicIcon className="relative mr-2 h-4 w-4" />
                <span className="relative">Start free chat</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group px-6 py-3 font-semibold border border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300 rounded-xl"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-pink-400 transition-transform duration-300 group-hover:scale-110" />
                Book appointment
              </Button>
            </div>
          </div>

          {/* Right Content - CTA Image */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="relative">
              {/* Floating Badge */}
              <div className="absolute -top-4 left-4 bg-gradient-to-r from-orange-400/90 via-pink-500/90 to-purple-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg shadow-pink-500/30 z-10">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Available 24/7
                </div>
              </div>

              {/* Main Image (floats up and down) */}
              <div
                style={{ animation: "cta-float 4s ease-in-out infinite" }}
                className="relative"
              >
                {/* ripple rings behind the image */}
                <span
                  style={{ animation: "cta-ripple 3s ease-out infinite" }}
                  className="absolute inset-0 rounded-2xl border-2 border-pink-400/30"
                />
                <span
                  style={{ animation: "cta-ripple 3s ease-out 1.5s infinite" }}
                  className="absolute inset-0 rounded-2xl border-2 border-purple-400/30"
                />

                {/* Subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl blur-xl scale-110 animate-pulse"></div>
                <Image
                  src="/cta.png"
                  alt="DentTalk AI Assistant"
                  width={300}
                  height={300}
                  className="relative w-80 h-auto drop-shadow-xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400/20 to-purple-500/20 rounded-full blur-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default CTA;