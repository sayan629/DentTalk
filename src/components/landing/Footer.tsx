import Image from "next/image";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

// link with a gradient underline that grows on hover (no size change)
const linkClass =
  "transition-colors duration-300 hover:text-pink-400 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-no-repeat bg-bottom bg-[length:0%_1px] hover:bg-[length:100%_1px] [transition:background-size_0.4s_ease,color_0.3s]";

const columns = [
  { title: "Product", links: ["How it works", "Pricing", "FAQ"] },
  { title: "Support", links: ["Help center", "Contact us", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Security"] },
];

function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 py-12 border-t border-pink-400/20 bg-gradient-to-b from-orange-400/5 via-pink-400/5 to-purple-500/5">
      <style>{`
        @keyframes footer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes footer-glow {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.25); }
        }
      `}</style>

      {/* light sweeping along the top border */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div
          style={{ animation: "footer-line 4s ease-in-out infinite" }}
          className="h-full w-1/4 bg-gradient-to-r from-transparent via-pink-400 to-transparent"
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2">
              {/* logo with a pulsing glow behind it */}
              <div className="relative w-8 h-8">
                <span
                  style={{ animation: "footer-glow 3s ease-in-out infinite" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 blur-md"
                />
                <Image
                  src="/logo.png"
                  alt="DentTalk Logo"
                  width={32}
                  height={32}
                  className="relative w-8 h-8"
                />
              </div>
              <span className={`font-semibold text-lg ${gradientText}`}>DentTalk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered dental assistance that actually helps.
            </p>
          </div>

          {columns.map((column, i) => (
            <div
              key={column.title}
              style={{ animationDelay: `${(i + 1) * 120}ms`, animationFillMode: "backwards" }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <h4 className="font-medium mb-3">{column.title}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className={linkClass}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{ animationDelay: "600ms", animationFillMode: "backwards" }}
          className="border-t border-pink-400/20 mt-8 pt-8 text-center text-sm text-muted-foreground animate-in fade-in duration-1000"
        >
          <p>&copy; 2026 DentTalk. Built for real people with real dental questions.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;