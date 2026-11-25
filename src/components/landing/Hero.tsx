import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { CalendarIcon, MicIcon, StarIcon } from "lucide-react";
import Image from "next/image";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const flowText = `${gradientText} bg-[length:200%_auto]`;
const plainText =
  "bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent";

const avatars = [
  {
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    alt: "Jessica Davis",
  },
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    alt: "Sam Miller",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    alt: "Anna Lopez",
  },
  {
    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
    alt: "Mike Rodriguez",
  },
  {
    src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face",
    alt: "Katie Lee",
  },
];

// rising sparkles in the background
const sparkles = [
  { left: "8%", size: 6, duration: 11, delay: 0, color: "bg-orange-400" },
  { left: "18%", size: 4, duration: 14, delay: 3, color: "bg-pink-400" },
  { left: "30%", size: 5, duration: 12, delay: 6, color: "bg-purple-400" },
  { left: "42%", size: 4, duration: 15, delay: 1, color: "bg-orange-400" },
  { left: "55%", size: 6, duration: 13, delay: 4, color: "bg-pink-400" },
  { left: "66%", size: 4, duration: 10, delay: 7, color: "bg-purple-400" },
  { left: "76%", size: 5, duration: 14, delay: 2, color: "bg-orange-400" },
  { left: "86%", size: 4, duration: 12, delay: 5, color: "bg-pink-400" },
  { left: "94%", size: 6, duration: 16, delay: 8, color: "bg-purple-400" },
];

const rise = (delay: number) => ({
  animation: `hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay}s backwards`,
});

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      <style>{`
        @keyframes hero-rise {
          0% { opacity: 0; transform: translateY(40px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes hero-reveal {
          0% { opacity: 0; transform: scale(0.88); filter: blur(12px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes hero-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes hero-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hero-sway {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(1.5deg); }
        }
        @keyframes hero-drift {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(28px, -22px); }
        }
        @keyframes hero-sparkle {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.9; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
        @keyframes hero-pulse {
          0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.5); }
          70% { box-shadow: 0 0 0 14px rgba(236, 72, 153, 0); }
          100% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
        }
        @keyframes hero-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes hero-star {
          0%, 40%, 100% { transform: scale(1) rotate(0deg); }
          20% { transform: scale(1.4) rotate(18deg); }
        }
        @keyframes hero-ping {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(3); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-anim { animation: none !important; }
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-background to-purple-500/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(236,72,153,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,72,153,0.15)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"></div>
      </div>

      {/* rising sparkles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {sparkles.map((s, i) => (
          <span
            key={i}
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              animation: `hero-sparkle ${s.duration}s linear ${s.delay}s infinite`,
            }}
            className={`hero-anim absolute bottom-0 rounded-full opacity-0 blur-[1px] ${s.color}`}
          />
        ))}
      </div>

      {/* Gradient ORBS (drifting) */}
      <div
        style={{ animation: "hero-drift 9s ease-in-out infinite" }}
        className="hero-anim absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-400/25 to-pink-400/15 rounded-full blur-3xl"
      />
      <div
        style={{ animation: "hero-drift 11s ease-in-out 2s infinite" }}
        className="hero-anim absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* BADGE */}
                <div
                  style={rise(0)}
                  className="hero-anim inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-full border border-pink-400/20 backdrop-blur-sm"
                >
                  <div className="relative w-2 h-2">
                    <span
                      style={{ animation: "hero-ping 1.8s ease-out infinite" }}
                      className="hero-anim absolute inset-0 rounded-full bg-pink-400"
                    />
                    <span className="absolute inset-0 rounded-full bg-pink-400" />
                  </div>
                  <span className={`text-sm ${gradientText}`}>AI-Powered Dental Assistant</span>
                </div>

                {/* MAIN HEADING (each line rises in with a blur) */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block">
                    <span style={rise(0.15)} className={`hero-anim inline-block ${plainText}`}>
                      Your Smile
                    </span>
                  </span>
                  <span className="block">
                    <span
                      style={{
                        animation:
                          "hero-rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s backwards, hero-flow 4s ease-in-out 1.2s infinite alternate",
                      }}
                      className={`hero-anim inline-block ${flowText}`}
                    >
                      Your Questions
                    </span>
                  </span>
                  <span className="block">
                    <span style={rise(0.45)} className={`hero-anim inline-block ${plainText}`}>
                      Answered Instantly
                    </span>
                  </span>
                </h1>

                {/* Subtitle */}
                <p
                  style={rise(0.6)}
                  className="hero-anim text-lg text-muted-foreground leading-relaxed max-w-xl font-medium"
                >
                  Ask questions, understand your dental concerns, and find the
                  right care—all with an AI assistant available whenever you
                  need it.
                </p>
              </div>

              {/* CTA BUTTONS */}
              <div style={rise(0.75)} className="hero-anim flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button
                    size={"lg"}
                    style={{
                      animation:
                        "hero-flow 3s ease-in-out infinite alternate, hero-pulse 2.4s ease-out infinite",
                    }}
                    className="hero-anim bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white shadow-lg shadow-pink-500/30 transition-[filter] duration-300"
                  >
                    <MicIcon className="mr-2 size-5" />
                    Try Voice Agent
                  </Button>
                </SignUpButton>

                <SignUpButton mode="modal">
                  <Button
                    size={"lg"}
                    variant={"outline"}
                    className="group border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
                  >
                    <CalendarIcon className="mr-2 size-5 text-pink-400 transition-transform duration-300 group-hover:scale-110" />
                    Book Appointment
                  </Button>
                </SignUpButton>
              </div>

              {/* USER TESTIMONIALS */}
              <div style={rise(0.9)} className="hero-anim pt-8">
                <div className="flex items-center gap-6">
                  {/* USER AVATARS (gentle wave) */}
                  <div className="flex -space-x-3">
                    {avatars.map((avatar, i) => (
                      <div
                        key={avatar.alt}
                        style={{ animation: `hero-bob 3.5s ease-in-out ${i * 0.25}s infinite` }}
                        className="hero-anim relative"
                      >
                        <Image
                          src={avatar.src}
                          alt={avatar.alt}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover ring-4 ring-background transition-shadow duration-300 hover:ring-pink-400/60"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Rating and Stats */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {[1, 2, 3, 4].map((star) => (
                          <StarIcon
                            key={star}
                            style={{
                              animation: `hero-star 3s ease-in-out ${star * 0.25}s infinite`,
                            }}
                            className="hero-anim h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      <span className={`text-sm font-bold ${gradientText}`}>4.8/5</span>

                      <span className="text-xs text-muted-foreground">Excellent</span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Loved by{" "}
                      <span className="font-semibold text-foreground">1,500+ users</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT - HERO IMAGE */}
            <div
              style={{ animation: "hero-reveal 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s backwards" }}
              className="hero-anim relative lg:pl-8"
            >
              {/* rotating colour halo */}
              <div
                aria-hidden="true"
                style={{ animation: "hero-spin 14s linear infinite" }}
                className="hero-anim absolute inset-10 rounded-full bg-[conic-gradient(from_0deg,#fb923c,#f472b6,#a855f7,#fb923c)] opacity-30 blur-3xl"
              />

              {/* orbiting dots */}
              <div
                aria-hidden="true"
                style={{ animation: "hero-spin 16s linear infinite" }}
                className="hero-anim absolute inset-4"
              >
                <span className="absolute left-1/2 top-0 size-3 -translate-x-1/2 rounded-full bg-orange-400 shadow-[0_0_16px_4px_rgba(251,146,60,0.7)]" />
              </div>
              <div
                aria-hidden="true"
                style={{ animation: "hero-spin 22s linear infinite reverse" }}
                className="hero-anim absolute inset-12"
              >
                <span className="absolute bottom-0 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-purple-500 shadow-[0_0_16px_4px_rgba(168,85,247,0.7)]" />
              </div>

              {/* GRADIENT ORBS */}
              <div
                style={{ animation: "hero-drift 8s ease-in-out infinite" }}
                className="hero-anim absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-orange-400/30 to-pink-400/20 rounded-2xl rotate-45 blur-xl"
              ></div>
              <div
                style={{ animation: "hero-drift 10s ease-in-out 1.5s infinite" }}
                className="hero-anim absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-purple-500/30 rounded-full blur-2xl"
              ></div>

              <Image
                src={"/hero.png"}
                alt="DentTalk AI"
                width={600}
                height={600}
                style={{ animation: "hero-sway 6s ease-in-out infinite" }}
                className="hero-anim relative w-full h-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;