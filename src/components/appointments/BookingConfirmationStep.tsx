import { APPOINTMENT_TYPES } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import DoctorInfo from "./DoctorInfo";

interface BookingConfirmationStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  isBooking: boolean;
  onBack: () => void;
  onConfirm: () => void;
  onModify: () => void;
}

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";

function BookingConfirmationStep({
  selectedDentistId,
  selectedDate,
  selectedTime,
  selectedType,
  isBooking,
  onBack,
  onConfirm,
  onModify,
}: BookingConfirmationStepProps) {
  const appointmentType = APPOINTMENT_TYPES.find((t) => t.id === selectedType);

  const details = [
    { label: "Appointment Type", value: appointmentType?.name },
    { label: "Duration", value: appointmentType?.duration },
    {
      label: "Date",
      value: new Date(selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    { label: "Time", value: selectedTime },
    { label: "Location", value: "Dental Center" },
    { label: "Cost", value: appointmentType?.price, highlight: true },
  ];

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes confirm-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(450%) skewX(-20deg); }
        }
        @keyframes booking-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>

      {/* Header with back button */}
      <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Button
          variant="ghost"
          onClick={onBack}
          className="group hover:bg-pink-400/10 transition-colors duration-300"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2 text-pink-400 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </Button>
        <h2 className={`text-2xl font-semibold ${gradientText}`}>Confirm Your Appointment</h2>
      </div>

      <Card className="max-w-2xl border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-500/10 animate-in fade-in slide-in-from-bottom-6 duration-700">
        <CardHeader>
          <CardTitle className={`w-fit ${gradientText}`}>Appointment Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* doctor info */}
          <DoctorInfo doctorId={selectedDentistId} />

          {/* appointment details */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-pink-400/20">
            {details.map(({ label, value, highlight }, i) => (
              <div
                key={label}
                style={{ animationDelay: `${300 + i * 100}ms`, animationFillMode: "backwards" }}
                className="animate-in fade-in slide-in-from-bottom-3 duration-500"
              >
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className={`font-medium ${highlight ? gradientText : ""}`}>{value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* action buttons */}
      <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Button
          variant="outline"
          onClick={onModify}
          className="border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
        >
          Modify Appointment
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isBooking}
          className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/30 transition-all duration-300"
        >
          {/* shine while idle */}
          {!isBooking && (
            <span
              aria-hidden="true"
              style={{ animation: "confirm-shine 2.8s ease-in-out infinite" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
            />
          )}
          {/* sweeping line while booking */}
          {isBooking && (
            <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
              <span
                style={{ animation: "booking-sweep 1.4s ease-in-out infinite" }}
                className="block w-1/3 h-full bg-white/70"
              />
            </span>
          )}
          <span className="relative">{isBooking ? "Booking..." : "Confirm Booking"}</span>
        </Button>
      </div>
    </div>
  );
}

export default BookingConfirmationStep;