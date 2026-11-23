import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { MessageSquareIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MainActions() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* AI Voice Assistant */}
      <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 border-2 hover:border-pink-400/40 animate-in fade-in slide-in-from-left-8 duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float">
              <Image src="/audio.png" alt="Voice AI" width={32} height={32} className="w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">AI Voice Assistant</h3>
              <p className="text-muted-foreground">Get instant dental advice through voice calls</p>
            </div>
          </div>

          <div className="space-y-4">
            {["24/7 availability", "Professional dental guidance", "Instant pain relief advice"].map(
              (text, i) => (
                <div
                  key={text}
                  style={{ animationDelay: `${300 + i * 150}ms`, animationFillMode: "backwards" }}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      i === 0 ? "bg-orange-400" : i === 1 ? "bg-pink-400" : "bg-purple-500"
                    }`}
                  ></div>
                  <span className="text-sm">{text}</span>
                </div>
              )
            )}
          </div>

          <Link
            href="/voice"
            className={buttonVariants({
              variant: "default",
              className:
                "relative overflow-hidden w-full mt-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300",
            })}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm animate-shimmer"
            />
            <MessageSquareIcon className="relative mr-2 h-5 w-5" />
            <span className="relative">Start Voice Call</span>
          </Link>
        </CardContent>
      </Card>

      {/* Book Appointment */}
      <Card className="relative overflow-hidden group hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border-2 hover:border-purple-400/40 animate-in fade-in slide-in-from-right-8 duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardContent className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              style={{ animationDelay: "0.5s" }}
              className="w-16 h-16 bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 animate-float"
            >
              <Image src="/calendar.png" alt="Calendar" width={32} height={32} className="w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Book Appointment</h3>
              <p className="text-muted-foreground">Schedule with verified dentists in your area</p>
            </div>
          </div>

          <div className="space-y-4">
            {["Verified dental professionals", "Flexible scheduling", "Instant confirmations"].map(
              (text, i) => (
                <div
                  key={text}
                  style={{ animationDelay: `${450 + i * 150}ms`, animationFillMode: "backwards" }}
                  className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      i === 0 ? "bg-orange-400" : i === 1 ? "bg-pink-400" : "bg-purple-500"
                    }`}
                  ></div>
                  <span className="text-sm">{text}</span>
                </div>
              )
            )}
          </div>

          <Link href="/appointments">
            <Button
              variant="outline"
              className="relative overflow-hidden w-full mt-6 border-2 border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 font-semibold py-3 rounded-xl transition-all duration-300"
            >
              <CalendarIcon className="mr-2 h-5 w-5 text-pink-400" />
              Schedule Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}