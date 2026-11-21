
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { PricingTable } from "@clerk/nextjs";

export default async function ProPage() {
  const user = await currentUser();

  return (
    <main className="min-h-screen bg-[#121012] p-4 sm:p-8">
      {/* Hero Card */}
      <section className="relative mx-auto min-h-[620px] max-w-[1200px] overflow-hidden rounded-[36px] border border-[#563725]/70 bg-gradient-to-br from-[#211915] via-[#151214] to-[#211525] px-7 py-10 sm:px-10 lg:px-14">

        {/* Background decorations */}
        <div className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full bg-purple-600/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

        {/* Top-right star */}
        <div className="absolute right-10 top-8 text-[#70452f]">
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
        <div className="absolute bottom-8 right-16 text-purple-700/70">
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
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[#a85b32]/60 bg-[#e9874b]/10 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-[#ef8950]">
              <span className="text-lg">✧</span>
              The Premium Experience
            </div>

            {/* Heading */}
            <h1 className="max-w-[780px] font-mono text-4xl font-extrabold leading-[1.3] tracking-tight text-[#d1cece] sm:text-5xl lg:text-[52px]">
              Your Smile Deserves
              <br />

              <span className="bg-gradient-to-r from-[#f08b4d] to-[#d17ac1] bg-clip-text text-transparent">
                Something
              </span>

              <br />

              <span className="bg-gradient-to-r from-[#d17ac1] to-[#a63cf2] bg-clip-text text-transparent">
                Extraordinary.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[700px] font-mono text-sm leading-7 text-[#898586] sm:text-base">
              Experience a smarter approach to dental wellness. Unlock
              advanced AI-powered insights, personalized consultations,
              and exclusive tools designed around your smile.
            </p>

            {/* Features */}
            <div className="mt-7 flex flex-wrap items-center gap-6 font-mono text-sm font-semibold text-[#c5c0c0]">
              <div className="flex items-center gap-3">
                <svg
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

              <div className="flex items-center gap-3">
                <svg
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
            <Link
              href="#plans"
              className="mt-7 inline-flex items-center gap-4 rounded-2xl bg-[#ed8950] px-8 py-4 font-mono font-bold text-[#17110e] transition-all duration-300 hover:-translate-y-1 hover:bg-[#fa9a60]"
            >
              Explore Plans
              <span className="text-xl">↓</span>
            </Link>
          </div>

          {/* Right illustration */}
          <div className="flex items-center justify-center py-8">
            <div className="relative flex h-[250px] w-[250px] items-center justify-center rounded-full border border-[#a85b50]/40 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 shadow-[0_0_90px_rgba(164,75,207,0.12)]">

              {/* Inner circle */}
              <div className="absolute inset-5 rounded-full border border-[#b87561]/25" />

              {/* Floating tooth */}
              <div className="tooth-float relative z-10">
                <svg
                  viewBox="0 0 120 120"
                  className="h-32 w-32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Tooth illustration"
                >
                  <path
                    d="M31 15C19 15 12 25 15 42C18 59 26 69 30 91C32 102 40 108 46 96L54 76C57 68 63 68 66 76L74 96C80 108 88 102 90 91C94 69 102 59 105 42C108 25 101 15 89 15C77 15 70 23 60 23C50 23 43 15 31 15Z"
                    fill="url(#toothGradient)"
                    stroke="#ed8950"
                    strokeWidth="2.8"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M35 34C43 29 50 33 56 36"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

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
                  </defs>
                </svg>
              </div>

              {/* Sparkle decoration */}
              <div className="absolute right-12 top-7 text-[#ed8950]">
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

      {/* Pricing section */}
      <section
        id="plans"
        className="mx-auto max-w-[1200px] scroll-mt-10 px-4 py-20 sm:px-8"
      >
        <div className="mb-12 text-center">
          <span className="font-mono text-sm font-bold uppercase tracking-widest text-[#ed8950]">
            Find Your Perfect Plan
          </span>

          <h2 className="mt-4 font-mono text-3xl font-bold text-white sm:text-4xl">
            Choose Your Premium Experience
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#898586]">
            Take your dental wellness journey to the next level with
            a plan designed around your needs.
          </p>
        </div>

        {user ? (
          <PricingTable />
        ) : (
          <div className="mx-auto max-w-lg rounded-3xl border border-[#563725]/70 bg-[#1c171b] p-10 text-center">
            <h3 className="text-2xl font-bold text-white">
              Sign in to explore plans
            </h3>

            <p className="mt-3 text-[#898586]">
              Sign in to view available premium subscription options.
            </p>

            <Link
              href="/sign-in"
              className="mt-7 inline-flex rounded-xl bg-[#ed8950] px-7 py-3 font-semibold text-[#17110e] transition hover:bg-[#fa9a60]"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
