import { getUserAppointments } from "@/lib/actions/appointments";
import { format, isAfter, isSameDay, parseISO } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import NoNextAppointments from "./NoNextAppointments";

async function NextAppointment() {
  const appointments = await getUserAppointments();

  // filter for upcoming CONFIRMED appointments only (today or future)
  const upcomingAppointments =
    appointments?.filter((appointment) => {
      const appointmentDate = parseISO(appointment.date);
      const today = new Date();
      const isUpcoming = isSameDay(appointmentDate, today) || isAfter(appointmentDate, today);
      return isUpcoming && appointment.status === "CONFIRMED";
    }) || [];

  // get the next appointment (earliest upcoming one)
  const nextAppointment = upcomingAppointments[0];

  if (!nextAppointment) return <NoNextAppointments />; // no appointments, return nothing

  const appointmentDate = parseISO(nextAppointment.date);
  const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy");
  const isToday = isSameDay(appointmentDate, new Date());

  const details = [
    {
      icon: UserIcon,
      title: nextAppointment.doctorName,
      subtitle: nextAppointment.reason,
      box: "from-orange-400/20 to-orange-400/10",
      color: "text-orange-400",
    },
    {
      icon: CalendarIcon,
      title: formattedDate,
      subtitle: isToday ? "Today" : format(appointmentDate, "EEEE"),
      box: "from-pink-400/20 to-pink-400/10",
      color: "text-pink-400",
    },
    {
      icon: ClockIcon,
      title: nextAppointment.time,
      subtitle: "Local time",
      box: "from-purple-500/20 to-purple-500/10",
      color: "text-purple-400",
    },
  ];

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
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-400/10 rounded-full border border-pink-400/20">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              {isToday ? "Today" : "Upcoming"}
            </span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
            {nextAppointment.status}
          </span>
        </div>

        {/* Appointment Details */}
        <div className="space-y-3">
          {details.map(({ icon: Icon, title, subtitle, box, color }, i) => (
            <div
              key={i}
              style={{ animationDelay: `${300 + i * 150}ms`, animationFillMode: "backwards" }}
              className="group flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-500"
            >
              <div
                className={`w-8 h-8 bg-gradient-to-br ${box} rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon className={`size-4 ${color}`} />
              </div>
              <div>
                <p className="font-medium text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* More Appointments Count */}
        {upcomingAppointments.length > 1 && (
          <p
            style={{ animationDelay: "800ms", animationFillMode: "backwards" }}
            className="text-xs text-center text-muted-foreground animate-in fade-in duration-700"
          >
            <span className="font-semibold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
              +{upcomingAppointments.length - 1}
            </span>{" "}
            more upcoming appointment
            {upcomingAppointments.length > 2 ? "s" : ""}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default NextAppointment;