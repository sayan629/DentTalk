import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MicIcon, ShieldIcon, CalendarIcon } from "lucide-react";

function FeatureCards() {
  return (
    <>
      {/* Animations (self-contained, no globals.css or tailwind config needed) */}
      <style>{`
        @keyframes fc-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fc-slide-in {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fc-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(-10deg); }
          75%      { transform: rotate(10deg); }
        }

        /* "backwards" fill so hover transforms still work after the entrance ends */
        .fc-fade-up  { animation: fc-fade-up 0.7s ease-out backwards; }
        .fc-slide-in { animation: fc-slide-in 0.6s ease-out backwards; }
        .fc-d-1 { animation-delay: 0.1s; }
        .fc-d-2 { animation-delay: 0.25s; }
        .fc-d-3 { animation-delay: 0.4s; }
        .fc-d-4 { animation-delay: 0.55s; }
        .fc-d-5 { animation-delay: 0.7s; }
        .fc-d-6 { animation-delay: 0.85s; }
        .group:hover .fc-wiggle { animation: fc-wiggle 0.5s ease-in-out; }

        @media (prefers-reduced-motion: reduce) {
          .fc-fade-up, .fc-slide-in { animation: none !important; }
          .group:hover .fc-wiggle { animation: none; }
        }
      `}</style>

      <div className="grid md:grid-cols-2 gap-8 mb-12 font-mono">
        {/* how to use card */}
        <Card className="fc-fade-up fc-d-1 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(237,137,80,0.08)] transition-all duration-300 border-2 border-[#563725]/70 bg-[#1c171b] text-white hover:border-[#ed8950]/50">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e9874b]/5 to-[#a63cf2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-[#d1cece]">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-xl flex items-center justify-center">
                <MicIcon className="fc-wiggle h-5 w-5 text-[#ed8950]" />
              </div>
              How to Use
            </CardTitle>
            <CardDescription className="text-[#898586]">
              Simple steps to get started with voice assistance
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="fc-slide-in fc-d-2 flex items-start gap-3">
              <div className="w-2 h-2 bg-[#ed8950] rounded-full mt-2 animate-pulse"></div>
              <span className="text-sm text-[#c5c0c0]">Click the microphone button to start talking</span>
            </div>
            <div className="fc-slide-in fc-d-3 flex items-start gap-3">
              <div className="w-2 h-2 bg-[#ed8950] rounded-full mt-2 animate-pulse"></div>
              <span className="text-sm text-[#c5c0c0]">Ask questions about dental health and treatments</span>
            </div>
            <div className="fc-slide-in fc-d-4 flex items-start gap-3">
              <div className="w-2 h-2 bg-[#ed8950] rounded-full mt-2 animate-pulse"></div>
              <span className="text-sm text-[#c5c0c0]">Get instant voice responses from the AI</span>
            </div>
            <div className="fc-slide-in fc-d-5 flex items-start gap-3">
              <div className="w-2 h-2 bg-[#ed8950] rounded-full mt-2 animate-pulse"></div>
              <span className="text-sm text-[#c5c0c0]">View conversation transcript in real-time</span>
            </div>
          </CardContent>
        </Card>

        {/* features card */}
        <Card className="fc-fade-up fc-d-2 relative overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(237,137,80,0.08)] transition-all duration-300 border-2 border-[#563725]/70 bg-[#1c171b] text-white hover:border-[#ed8950]/50">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e9874b]/5 to-[#a63cf2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-[#d1cece]">
              <div className="w-10 h-10 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-xl flex items-center justify-center">
                <ShieldIcon className="fc-wiggle h-5 w-5 text-[#ed8950]" />
              </div>
              Features
            </CardTitle>
            <CardDescription className="text-[#898586]">
              Advanced capabilities for dental care
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="fc-slide-in fc-d-3 flex items-center p-3 bg-white/[0.04] hover:bg-[#e9874b]/10 hover:translate-x-1 transition-all duration-300 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-lg flex items-center justify-center mr-3">
                <MicIcon className="h-4 w-4 text-[#ed8950]" />
              </div>
              <span className="font-medium text-sm text-[#c5c0c0]">Real-time Voice Recognition</span>
            </div>
            <div className="fc-slide-in fc-d-4 flex items-center p-3 bg-white/[0.04] hover:bg-[#e9874b]/10 hover:translate-x-1 transition-all duration-300 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-lg flex items-center justify-center mr-3">
                <ShieldIcon className="h-4 w-4 text-[#ed8950]" />
              </div>
              <span className="font-medium text-sm text-[#c5c0c0]">AI-Powered Responses</span>
            </div>
            <div className="fc-slide-in fc-d-5 flex items-center p-3 bg-white/[0.04] hover:bg-[#e9874b]/10 hover:translate-x-1 transition-all duration-300 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e9874b]/15 to-[#a63cf2]/20 border border-[#a85b50]/40 rounded-lg flex items-center justify-center mr-3">
                <CalendarIcon className="h-4 w-4 text-[#ed8950]" />
              </div>
              <span className="font-medium text-sm text-[#c5c0c0]">Conversation History</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default FeatureCards;