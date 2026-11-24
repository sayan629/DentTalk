import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, MailIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AppointmentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentDetails: {
    doctorName: string;
    appointmentDate: string;
    appointmentTime: string;
    userEmail: string;
  };
}

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

export function AppointmentConfirmationModal({
  open,
  onOpenChange,
  appointmentDetails,
}: AppointmentConfirmationModalProps) {
  const summary = appointmentDetails
    ? [
        {
          icon: UserIcon,
          text: appointmentDetails.doctorName,
          color: "text-orange-400",
          bold: true,
        },
        {
          icon: CalendarIcon,
          text: appointmentDetails.appointmentDate,
          color: "text-pink-400",
          bold: false,
        },
        {
          icon: ClockIcon,
          text: appointmentDetails.appointmentTime,
          color: "text-purple-400",
          bold: false,
        },
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/5 shadow-xl shadow-pink-500/10">
        <style>{`
          @keyframes modal-ripple {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.7); opacity: 0; }
          }
          @keyframes modal-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
          @keyframes modal-shine {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(450%) skewX(-20deg); }
          }
        `}</style>

        <DialogHeader className="text-center space-y-4">
          {/* success icon with ripple rings */}
          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400/20 via-pink-400/20 to-purple-500/20 animate-in zoom-in-50 duration-500">
            <span
              style={{ animation: "modal-ripple 2.4s ease-out infinite" }}
              className="absolute inset-0 rounded-full border-2 border-pink-400/50"
            />
            <span
              style={{ animation: "modal-ripple 2.4s ease-out 1.2s infinite" }}
              className="absolute inset-0 rounded-full border-2 border-purple-400/50"
            />
            <CheckCircleIcon className="relative h-8 w-8 text-pink-400" />
          </div>

          <DialogTitle
            className={`text-xl font-semibold text-center w-fit mx-auto ${gradientText} animate-in fade-in slide-in-from-bottom-3 duration-500`}
          >
            Appointment Confirmed!
          </DialogTitle>

          <DialogDescription
            style={{ animationDelay: "150ms", animationFillMode: "backwards" }}
            className="text-center text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-500"
          >
            Your appointment has been successfully booked
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Email Notification Section */}
          <div
            style={{ animationDelay: "250ms", animationFillMode: "backwards" }}
            className="flex flex-col items-center space-y-3 animate-in fade-in zoom-in-90 duration-500"
          >
            <div className="relative">
              <Image
                src="/email-sent.png"
                alt="Email sent"
                width={120}
                height={120}
                className="mx-auto"
                style={{ animation: "modal-float 3s ease-in-out infinite" }}
              />
            </div>

            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <MailIcon className="h-4 w-4 text-pink-400 animate-pulse" />
                <span className={gradientText}>Details sent to your inbox</span>
              </div>
              {appointmentDetails?.userEmail && (
                <p className="text-xs text-muted-foreground">{appointmentDetails.userEmail}</p>
              )}
            </div>
          </div>

          {/* Appointment Summary */}
          {appointmentDetails && (
            <div
              style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
              className="bg-gradient-to-br from-orange-400/10 via-pink-400/5 to-purple-500/10 border border-pink-400/20 rounded-lg p-4 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <h4 className={`font-medium text-sm text-center mb-3 w-fit mx-auto ${gradientText}`}>
                Quick Summary
              </h4>

              <div className="space-y-2">
                {summary.map(({ icon: Icon, text, color, bold }, i) => (
                  <div
                    key={i}
                    style={{ animationDelay: `${550 + i * 120}ms`, animationFillMode: "backwards" }}
                    className="flex items-center gap-3 text-sm animate-in fade-in slide-in-from-left-4 duration-500"
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span className={bold ? "font-medium" : ""}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{ animationDelay: "850ms", animationFillMode: "backwards" }}
            className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <Link href="/appointments" className="w-full">
              <Button
                className="relative overflow-hidden w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/30 transition-all duration-300"
                onClick={() => onOpenChange(false)}
              >
                <span
                  aria-hidden="true"
                  style={{ animation: "modal-shine 2.8s ease-in-out infinite" }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                />
                <span className="relative">View My Appointments</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              className="w-full border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>

          {/* Additional Info */}
          <div
            style={{ animationDelay: "1000ms", animationFillMode: "backwards" }}
            className="text-center text-xs text-muted-foreground border-t border-pink-400/20 pt-4 animate-in fade-in duration-700"
          >
            <p>
              Please arrive 15 minutes early for your appointment.
              <br />
              Need to reschedule? Contact us 24 hours in advance.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}