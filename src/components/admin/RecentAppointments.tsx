import { useGetAppointments, useUpdateAppointmentStatus } from "@/hooks/use-appointment";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Calendar } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

function RecentAppointments() {
  const { data: appointments = [] } = useGetAppointments();
  const updateAppointmentMutation = useUpdateAppointmentStatus();

  const handleToggleAppointmentStatus = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);

    const newStatus = appointment?.status === "CONFIRMED" ? "COMPLETED" : "CONFIRMED";

    updateAppointmentMutation.mutate({ id: appointmentId, status: newStatus });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return (
          <Badge className="bg-gradient-to-r from-orange-400/20 to-pink-400/20 text-orange-300 border border-orange-400/30 hover:from-orange-400/30 hover:to-pink-400/30 transition-all duration-300">
            Confirmed
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-gradient-to-r from-pink-400/20 to-purple-500/20 text-purple-300 border border-purple-400/30 hover:from-pink-400/30 hover:to-purple-500/30 transition-all duration-300">
            Completed
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card className="border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-pink-400 animate-pulse" />
          <span className={gradientText}>Recent Appointments</span>
        </CardTitle>
        <CardDescription>Monitor and manage all patient appointments</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-pink-400/20 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-orange-400/10 via-pink-400/10 to-purple-500/10 border-pink-400/20 hover:bg-transparent">
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.map((appointment, index) => (
                <TableRow
                  key={appointment.id}
                  style={{
                    animationDelay: `${Math.min(index, 10) * 60}ms`,
                    animationFillMode: "backwards",
                  }}
                  className="border-pink-400/10 transition-colors duration-300 hover:bg-gradient-to-r hover:from-orange-400/5 hover:via-pink-400/5 hover:to-purple-500/10 animate-in fade-in slide-in-from-left-4 duration-500"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patientEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{appointment.doctorName}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {new Date(appointment.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">{appointment.time}</div>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleAppointmentStatus(appointment.id)}
                      className="h-6 px-2 hover:bg-pink-400/10 transition-all duration-300 hover:scale-105"
                    >
                      {getStatusBadge(appointment.status)}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="text-xs text-muted-foreground">Click status to toggle</div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentAppointments;