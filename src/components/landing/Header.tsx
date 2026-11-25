import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"

// link with a gradient underline that grows on hover (no size change)
const linkClass =
  "text-muted-foreground transition-colors duration-300 hover:text-pink-400 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-no-repeat bg-bottom bg-[length:0%_1px] hover:bg-[length:100%_1px] [transition:background-size_0.4s_ease,color_0.3s]"

const navLinks = ["How it Works", "Pricing", "About"]

function Header() {
  return <nav className="fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-pink-400/20 bg-background/80 backdrop-blur-md h-16 animate-in fade-in slide-in-from-top-4 duration-700">
    <style>{`
      @keyframes header-line {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }
      @keyframes header-glow {
        0%, 100% { opacity: 0.25; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(1.25); }
      }
      @keyframes header-shine {
        0% { transform: translateX(-150%) skewX(-20deg); }
        100% { transform: translateX(450%) skewX(-20deg); }
      }
    `}</style>

    {/* light sweeping along the bottom border */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px overflow-hidden">
      <div
        style={{ animation: "header-line 4s ease-in-out infinite" }}
        className="h-full w-1/4 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
      />
    </div>

    <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href= "/" className="group flex items-center gap-2">
        {/* logo with a pulsing glow behind it */}
        <div className="relative w-11">
          <span
            style={{ animation: "header-glow 3s ease-in-out infinite" }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 blur-md"
          />
          <Image
            src={"/logo.png"}
            alt="DentTalk Logo"
            width={32}
            height={32}
            className="relative w-11 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <span className={`font-semibold text-lg ${gradientText}`}>DentTalk</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link}
                href="#"
                style={{ animationDelay: `${200 + i * 120}ms`, animationFillMode: "backwards" }}
                className={`${linkClass} animate-in fade-in slide-in-from-top-2 duration-500`}
              >
                {link}
              </a>
            ))}
        </div>

        <div className="flex items-center gap-3">
            <SignInButton mode="modal">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="hover:bg-pink-400/10 hover:text-pink-400 transition-all duration-300"
                >
                    Log In
                </Button>
            </SignInButton>

            <SignUpButton mode="modal">
                <Button
                  size={"sm"}
                  className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-md shadow-pink-500/30 transition-all duration-300"
                >
                <span
                  aria-hidden="true"
                  style={{ animation: "header-shine 2.8s ease-in-out infinite" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                />
                <span className="relative">Sign Up</span>
                </Button>
            </SignUpButton>
        </div>
    </div>
    </nav>

}

export default Header