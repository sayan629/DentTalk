"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, UserCheck, Clock } from "lucide-react";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const gradientBar = "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500";
const cardClass =
  "as-reveal group relative overflow-hidden border-2 border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-background to-purple-500/5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-500/10";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

interface AdminStatsProps {
  totalDoctors: number;
  activeDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

// counts from 0 up to the target once the card has entered
function useCountUp(target: number, delayMs: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let startedAt = 0;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (!startedAt) startedAt = now;
        const t = Math.min((now - startedAt) / durationMs, 1);
        const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setValue(Math.round(target * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delayMs);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, delayMs, durationMs]);

  return value;
}

function StatNumber({ value, delay }: { value: number; delay: number }) {
  const shown = useCountUp(value, delay);
  return (
    <div className={`text-2xl font-bold tabular-nums ${gradientText}`}>{shown}</div>
  );
}

function AdminStats({
  activeDoctors,
  totalDoctors,
  completedAppointments,
  totalAppointments,
}: AdminStatsProps) {
  const ratio = (part: number, whole: number) => (whole > 0 ? Math.min(part / whole, 1) : 0);

  // `meter` is only set for the two cards where a share of the total makes sense
  const stats = [
    { label: "Total Doctors", value: totalDoctors, Icon: Users },
    {
      label: "Active Doctors",
      value: activeDoctors,
      Icon: UserCheck,
      meter: { share: ratio(activeDoctors, totalDoctors), caption: "of doctors are active" },
    },
    { label: "Total Appointments", value: totalAppointments, Icon: Calendar },
    {
      label: "Completed Appointments",
      value: completedAppointments,
      Icon: Clock,
      meter: {
        share: ratio(completedAppointments, totalAppointments),
        caption: "of appointments completed",
      },
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-12">
      <style>{`
        @keyframes as-rise {
          0% { opacity: 0; transform: translateY(32px) scale(0.94); filter: blur(6px); }
          100% { opacity: 1; transform: none; filter: blur(0); }
        }
        @keyframes as-ring {
          0% { box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.5); }
          40%, 100% { box-shadow: 0 0 0 10px rgba(236, 72, 153, 0); }
        }
        @keyframes as-wobble {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-14deg) scale(1.15); }
          50% { transform: rotate(10deg) scale(1.15); }
          75% { transform: rotate(-5deg) scale(1.1); }
          100% { transform: rotate(0deg) scale(1.1); }
        }
        @keyframes as-fill {
          0% { transform: scaleX(0); }
        }
        @keyframes as-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .group:hover .as-icon { animation: as-wobble 0.7s ease forwards; }
        @media (prefers-reduced-motion: reduce) {
          .as-reveal { animation: none !important; opacity: 1 !important; filter: none !important; }
          .as-loop, .as-fill { animation: none !important; }
          .group:hover .as-icon { animation: none !important; }
        }
      `}</style>

      {stats.map(({ label, value, Icon, meter }, i) => {
        const enterDelay = 0.15 + i * 0.12; // seconds

        return (
          <Card
            key={label}
            style={{ animation: `as-rise 0.8s ${EASE} ${enterDelay}s backwards` }}
            className={cardClass}
          >
            {/* gradient line draws across the top edge on hover */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${gradientBar}`}
            />
            {/* a soft band of light passes over the card on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -translate-x-[150%] -skew-x-[20deg] bg-pink-400/15 blur-sm transition-transform duration-1000 group-hover:translate-x-[450%]"
            />

            <CardContent className="relative p-6">
              <div className="flex items-center gap-4">
                <div className="relative size-12 shrink-0">
                  {/* slow ring pulse, staggered so the cards don't pulse together */}
                  <span
                    aria-hidden="true"
                    style={{ animation: `as-ring 4s ease-out ${1.5 + i * 0.6}s infinite` }}
                    className="as-loop absolute inset-0 rounded-xl"
                  />
                  <div className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-500/20 ring-1 ring-inset ring-pink-400/30">
                    <Icon className="as-icon size-6 text-pink-400" />
                  </div>
                </div>

                <div>
                  <StatNumber value={value} delay={enterDelay * 1000 + 200} />
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              </div>

              {meter && (
                <div className="mt-5 space-y-1.5">
                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(meter.share * 100)}
                    aria-label={`${label} share`}
                    className="h-1.5 overflow-hidden rounded-full bg-pink-400/10"
                  >
                    <div
                      style={{
                        transform: `scaleX(${meter.share})`,
                        animation: `as-fill 1.2s ${EASE} ${enterDelay + 0.3}s backwards, as-flow 3s ease-in-out ${enterDelay + 1.5}s infinite alternate`,
                      }}
                      className={`as-fill as-loop h-full origin-left rounded-full bg-[length:200%_100%] shadow-[0_0_8px_1px_rgba(236,72,153,0.5)] ${gradientBar}`}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-pink-400">
                      {Math.round(meter.share * 100)}%
                    </span>{" "}
                    {meter.caption}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default AdminStats;