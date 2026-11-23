import { getUserAppointmentStats } from "@/lib/actions/appointments";
import { currentUser } from "@clerk/nextjs/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BrainIcon, MessageSquareIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";

async function DentalHealthOverview() {
  const appointmentStats = await getUserAppointmentStats();
  const user = await currentUser();

  const stats = [
    { value: appointmentStats.completedAppointments, label: "Completed Visits" },
    { value: appointmentStats.totalAppointments, label: "Total Appointments" },
    { value: format(new Date(user?.createdAt!), "MMM yyyy"), label: "Member Since" },
  ];

  return (
    <Card className="lg:col-span-2 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainIcon className="size-5 text-pink-400 animate-pulse" />
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            Your Dental Health
          </span>
        </CardTitle>
        <CardDescription>Keep track of your dental care journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ animationDelay: `${200 + i * 150}ms`, animationFillMode: "backwards" }}
              className="text-center p-4 bg-muted/30 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:ring-1 hover:ring-pink-400/40 hover:bg-gradient-to-br hover:from-orange-400/10 hover:via-pink-400/5 hover:to-purple-500/10 animate-in fade-in zoom-in-90 duration-500"
            >
              <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          style={{ animationDelay: "700ms", animationFillMode: "backwards" }}
          className="mt-6 p-4 bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 rounded-xl border border-pink-400/20 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <div className="flex items-start gap-3">
            <div className="size-10 bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-500/20 rounded-lg flex items-center justify-center shrink-0 animate-float">
              <MessageSquareIcon className="size-5 text-pink-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent w-fit">
                Ready to get started?
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                Book your first appointment or try our AI voice assistant for instant dental advice.
              </p>
              <div className="flex gap-2">
                <Link href="/voice">
                  <Button
                    size="sm"
                    className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-md shadow-pink-500/30 transition-all duration-300"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm animate-shimmer"
                    />
                    <span className="relative">Try AI Assistant</span>
                  </Button>
                </Link>
                <Link href="/appointments">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DentalHealthOverview;