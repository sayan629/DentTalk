
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import {
  CalendarIcon,
  CrownIcon,
  HomeIcon,
  MicIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  // Prevent server/client hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => {
    if (!mounted || !pathname) return false;

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  const navLinkClass = (href: string) => {
    const active = isActive(href);

    return `flex items-center gap-2 transition-colors ${
      active
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">

        {/* LOGO */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="DentTalk Logo"
              width={32}
              height={32}
              className="w-11"
            />
          </Link>

          {/* NAVIGATION */}
          <div className="flex items-center gap-6">

            <Link
              href="/dashboard"
              className={navLinkClass("/dashboard")}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden md:inline">
                Dashboard
              </span>
            </Link>

            <Link
              href="/appointments"
              className={navLinkClass("/appointments")}
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">
                Appointments
              </span>
            </Link>

            <Link
              href="/voice"
              className={navLinkClass("/voice")}
            >
              <MicIcon className="w-4 h-4" />
              <span className="hidden md:inline">
                Voice
              </span>
            </Link>

            <Link
              href="/pro"
              className={navLinkClass("/pro")}
            >
              <CrownIcon className="w-4 h-4" />
              <span className="hidden md:inline">
                Pro
              </span>
            </Link>

          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">

            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {isLoaded
                  ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()
                  : ""}
              </span>

              <span className="text-xs text-muted-foreground">
                {isLoaded
                  ? user?.emailAddresses?.[0]?.emailAddress ?? ""
                  : ""}
              </span>
            </div>

            <UserButton />

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
