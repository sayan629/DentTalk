"use client";

import { useEffect, useState } from "react";
import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

const dashKeyframes = `
  /* banner opens outward from its centre line */
  @keyframes dash-curtain {
    0% { clip-path: inset(0 50% 0 50% round 24px); opacity: 0; }
    100% { clip-path: inset(0 0 0 0 round 24px); opacity: 1; }
  }
  /* three blurred colour clouds drift slowly behind the banner */
  @keyframes dash-drift-a {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(70px, 36px) scale(1.2); }
  }
  @keyframes dash-drift-b {
    0% { transform: translate(0, 0) scale(1.1); }
    100% { transform: translate(-60px, -30px) scale(0.9); }
  }
  @keyframes dash-drift-c {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-40px, 50px) scale(1.25); }
  }
  @keyframes dash-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes dash-spin-rev {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes dash-blink {
    0%, 45% { opacity: 1; }
    50%, 95% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes dash-fade {
    0% { opacity: 0; transform: translateY(8px); }
    100% { opacity: 1; transform: none; }
  }
  /* a bright segment travels along the heartbeat line */
  @keyframes dash-ecg {
    0% { stroke-dashoffset: 30; }
    100% { stroke-dashoffset: -70; }
  }
  @keyframes dash-dot {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    .dash-reveal { animation: none !important; opacity: 1 !important; clip-path: none !important; transform: none !important; }
    .dash-loop { animation: none !important; }
    .dash-ecg-live { stroke-dasharray: none !important; }
  }
`;

// types the heading out one character at a time (skips straight to the full text under reduced motion)
function useTypewriter(text: string, startDelayMs = 700, speedMs = 45) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    setCount(0);
    let n = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= text.length) clearInterval(interval);
      }, speedMs);
    }, startDelayMs);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, startDelayMs, speedMs]);

  return count;
}

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointments();

  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc: { isActive: boolean }) => doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length,
  };

  const headline = `Welcome back, ${user?.firstName || "Admin"}!`;
  const typed = useTypewriter(headline);
  const typing = typed < headline.length;

  if (doctorsLoading || appointmentsLoading) return <LoadingUI />;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <style>{dashKeyframes}</style>

        {/* Admin Welcome section */}
        <div
          style={{ animation: `dash-curtain 1s ${EASE} backwards` }}
          className="dash-reveal relative mb-12 flex items-center justify-between overflow-hidden rounded-3xl border border-pink-400/20 bg-gradient-to-br from-orange-400/10 via-pink-400/5 to-purple-500/10 p-8"
        >
          {/* aurora: slow-drifting clouds of brand colour */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <span
              style={{ animation: "dash-drift-a 14s ease-in-out infinite alternate" }}
              className="dash-loop absolute -left-10 -top-16 size-64 rounded-full bg-orange-400/25 blur-3xl"
            />
            <span
              style={{ animation: "dash-drift-b 18s ease-in-out infinite alternate" }}
              className="dash-loop absolute -bottom-24 left-1/3 size-72 rounded-full bg-pink-400/25 blur-3xl"
            />
            <span
              style={{ animation: "dash-drift-c 22s ease-in-out infinite alternate" }}
              className="dash-loop absolute -right-10 -top-10 size-64 rounded-full bg-purple-500/25 blur-3xl"
            />
          </div>

          <div className="relative space-y-4">
            <div
              style={{ animation: `dash-fade 0.7s ${EASE} 0.6s backwards` }}
              className="dash-reveal inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-400/10 px-3 py-1"
            >
              <div className="size-2 animate-pulse rounded-full bg-gradient-to-r from-orange-400 to-pink-500 motion-reduce:animate-none" />
              <span className="text-sm font-medium text-pink-400">Admin Dashboard</span>
            </div>

            <div>
              <h1 className={`mb-2 text-4xl font-bold ${gradientText}`}>
                {/* full text for screen readers; the typed copy below is decorative */}
                <span className="sr-only">{headline}</span>
                <span aria-hidden="true">
                  {headline.slice(0, typed)}
                  {/* zero-width caret that blinks while typing, then fades out */}
                  <span className="relative inline-block w-0 align-baseline">
                    <span
                      className={`absolute left-0.5 top-[-0.85em] h-[0.9em] w-0.5 transition-opacity duration-700 ${
                        typing ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <span
                        style={{ animation: "dash-blink 1s step-end infinite" }}
                        className="dash-loop block size-full bg-pink-400"
                      />
                    </span>
                  </span>
                  {/* untyped remainder holds the space so the layout never jumps */}
                  <span className="invisible">{headline.slice(typed)}</span>
                </span>
              </h1>
              <p
                style={{ animation: `dash-fade 0.8s ${EASE} 1s backwards` }}
                className="dash-reveal text-muted-foreground"
              >
                Monitor practice health, coordinate team schedules, and manage appointments seamlessly.
              </p>
            </div>
          </div>

          {/* two orbit rings circle a slowly turning gear */}
          <div className="relative hidden lg:block">
            <div className="relative size-36">
              <div
                aria-hidden="true"
                style={{ animation: "dash-spin 14s linear infinite" }}
                className="dash-loop absolute inset-0 rounded-full border border-pink-400/30"
              >
                <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-orange-400 shadow-[0_0_8px_2px_rgba(251,146,60,0.8)]" />
              </div>
              <div
                aria-hidden="true"
                style={{ animation: "dash-spin-rev 9s linear infinite" }}
                className="dash-loop absolute inset-4 rounded-full border border-dashed border-purple-400/40"
              >
                <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-purple-400 shadow-[0_0_8px_2px_rgba(168,85,247,0.8)]" />
              </div>
              <div className="absolute inset-9 flex items-center justify-center rounded-full bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-500/20 ring-1 ring-inset ring-pink-400/30">
                <SettingsIcon
                  style={{ animation: "dash-spin 24s linear infinite" }}
                  className="dash-loop size-9 text-pink-400"
                />
              </div>
            </div>
          </div>
        </div>

        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />

        <DoctorsManagement />
        <RecentAppointments />
      </div>
    </div>
  );
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <style>{dashKeyframes}</style>
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-96">
          <div role="status" className="text-center">
            {/* a heartbeat trace is drawn across the screen while data loads */}
            <svg
              viewBox="0 0 240 64"
              width="240"
              height="64"
              aria-hidden="true"
              className="mx-auto mb-6 overflow-visible drop-shadow-[0_0_6px_rgba(236,72,153,0.6)]"
            >
              <defs>
                <linearGradient id="dash-ecg-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="240" y2="0">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              {/* faint full trace underneath */}
              <path
                d="M0 32 H48 q6 -8 12 0 H78 L86 38 L96 6 L106 54 L114 32 H140 q10 -14 20 0 H240"
                fill="none"
                stroke="#f472b6"
                strokeOpacity="0.18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* bright travelling segment */}
              <path
                d="M0 32 H48 q6 -8 12 0 H78 L86 38 L96 6 L106 54 L114 32 H140 q10 -14 20 0 H240"
                fill="none"
                stroke="url(#dash-ecg-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                strokeDasharray="30 70"
                style={{ animation: "dash-ecg 1.8s linear infinite" }}
                className="dash-loop dash-ecg-live"
              />
            </svg>

            <p className="flex items-center justify-center gap-2 text-muted-foreground">
              Loading dashboard data
              <span className="flex gap-1" aria-hidden="true">
                {[0, 0.25, 0.5].map((d) => (
                  <span
                    key={d}
                    style={{ animation: `dash-dot 1.2s ease-in-out ${d}s infinite` }}
                    className="dash-loop size-1.5 rounded-full bg-pink-400"
                  />
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}