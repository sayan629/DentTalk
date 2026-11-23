import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";

export default async function WelcomeSection() {
  const user = await currentUser();

  return (
    <div className="relative z-10 flex items-center justify-between bg-gradient-to-br from-orange-400/10 via-pink-400/5 to-purple-500/10 rounded-3xl p-8 border border-pink-400/20 mb-12 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* animated glow orbs inside the banner (no layout change) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          style={{ animationDuration: "5s" }}
          className="absolute -top-16 -left-10 size-56 rounded-full bg-orange-400/20 blur-3xl animate-pulse"
        />
        <div
          style={{ animationDuration: "7s", animationDelay: "1.5s" }}
          className="absolute -bottom-20 -right-10 size-64 rounded-full bg-purple-500/20 blur-3xl animate-pulse"
        />
      </div>

      <div className="relative space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-400/10 rounded-full border border-pink-400/20">
          <div className="size-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Online & Ready
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
              ? "afternoon"
              : "evening"}
            ,{" "}
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              {user?.firstName}!
            </span>
          </h1>
          <p className="text-muted-foreground">
            Your personal AI dental assistant is ready to help you maintain perfect oral health.
          </p>
        </div>
      </div>

      <div className="relative lg:flex hidden items-center justify-center size-32 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-full">
        {/* ripple rings around the logo */}
        <span className="absolute inset-0 rounded-full border-2 border-pink-400/40 animate-ripple" />
        <span
          style={{ animationDelay: "1.2s" }}
          className="absolute inset-0 rounded-full border-2 border-purple-400/40 animate-ripple"
        />
        <Image src="/logo.png" alt="DentWise" width={64} height={64} className="relative w-16 h-16" />
      </div>
    </div>
  );
}