import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

function NoNextAppointments() {
  return (
    <Card className="border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/10 animate-in fade-in slide-in-from-right-8 duration-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="size-5 text-pink-400 animate-pulse" />
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Next Appointment
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          {/* icon box with ripple rings and floating motion */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <span className="absolute inset-0 rounded-2xl border-2 border-pink-400/40 animate-ripple" />
            <span
              style={{ animationDelay: "1.2s" }}
              className="absolute inset-0 rounded-2xl border-2 border-purple-400/40 animate-ripple"
            />
            <div className="relative w-full h-full bg-gradient-to-br from-orange-400/20 via-pink-400/15 to-purple-500/20 rounded-2xl flex items-center justify-center animate-float">
              <CalendarIcon className="size-8 text-pink-400 opacity-70" />
            </div>
          </div>

          <p
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
            className="text-sm mb-3 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            No upcoming appointments
          </p>

          <div
            style={{ animationDelay: "500ms", animationFillMode: "backwards" }}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <Link href="/appointments">
              <Button
                size="sm"
                variant="outline"
                className="relative overflow-hidden w-full border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-orange-400/30 via-pink-400/30 to-purple-500/30 blur-sm animate-shimmer"
                />
                <span className="relative">Schedule Your Next Visit</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NoNextAppointments;