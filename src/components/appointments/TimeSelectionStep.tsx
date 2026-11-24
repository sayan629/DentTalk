import { useBookedTimeSlots } from "@/hooks/use-appointment";
import { APPOINTMENT_TYPES, getAvailableTimeSlots, getNext5Days } from "@/lib/utils";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ClockIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface TimeSelectionStepProps {
  selectedDentistId: string;
  selectedDate: string;
  selectedTime: string;
  selectedType: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onTypeChange: (type: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const gradientFill =
  "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 text-white hover:brightness-110 shadow-md shadow-pink-500/30";
const outlineHover =
  "border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10";

function TimeSelectionStep({
  onBack,
  onContinue,
  onDateChange,
  onTimeChange,
  onTypeChange,
  selectedDate,
  selectedDentistId,
  selectedTime,
  selectedType,
}: TimeSelectionStepProps) {
  const { data: bookedTimeSlots = [] } = useBookedTimeSlots(selectedDentistId, selectedDate);

  const availableDates = getNext5Days();
  const availableTimeSlots = getAvailableTimeSlots();

  const handleDateSelect = (date: string) => {
    onDateChange(date);
    // reset time when the date changes
    onTimeChange("");
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes time-shine {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(450%) skewX(-20deg); }
        }
      `}</style>

      {/* header with back button */}
      <div className="flex items-center gap-4 mb-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <Button
          variant="ghost"
          onClick={onBack}
          className="group hover:bg-pink-400/10 transition-colors duration-300"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-2 text-pink-400 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </Button>

        <h2 className={`text-2xl font-semibold ${gradientText}`}>Select Date & Time</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* appointment type selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Appointment Type</h3>
          <div className="space-y-3">
            {APPOINTMENT_TYPES.map((type, index) => {
              const isSelected = selectedType === type.id;

              return (
                <Card
                  key={type.id}
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-pink-500/10 hover:-translate-y-0.5 hover:border-pink-400/40 animate-in fade-in slide-in-from-left-6 duration-500 ${
                    isSelected
                      ? "ring-2 ring-pink-400 shadow-lg shadow-pink-500/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/10"
                      : ""
                  }`}
                  onClick={() => onTypeChange(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{type.name}</h4>
                        <p className="text-sm text-muted-foreground">{type.duration}</p>
                      </div>
                      <span className={`font-semibold ${gradientText}`}>{type.price}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* date & time selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Available Dates</h3>

          {/* date Selection */}
          <div className="grid grid-cols-2 gap-3">
            {availableDates.map((date, index) => {
              const isSelected = selectedDate === date;

              return (
                <Button
                  key={date}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handleDateSelect(date)}
                  style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
                  className={`h-auto p-3 transition-all duration-300 animate-in fade-in slide-in-from-right-6 duration-500 ${
                    isSelected ? gradientFill : outlineHover
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          {selectedDate && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h4 className="font-medium">Available Times</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableTimeSlots.map((time, index) => {
                  const isBooked = bookedTimeSlots.includes(time);
                  const isSelected = selectedTime === time;

                  return (
                    <Button
                      key={time}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => !isBooked && onTimeChange(time)}
                      size="sm"
                      disabled={isBooked}
                      style={{ animationDelay: `${index * 40}ms`, animationFillMode: "backwards" }}
                      className={`transition-all duration-300 animate-in fade-in zoom-in-90 duration-500 ${
                        isBooked
                          ? "opacity-50 cursor-not-allowed"
                          : isSelected
                          ? gradientFill
                          : outlineHover
                      }`}
                    >
                      <ClockIcon
                        className={`w-3 h-3 mr-1 ${
                          isSelected ? "text-white" : isBooked ? "" : "text-pink-400"
                        }`}
                      />
                      {time}
                      {isBooked && " (Booked)"}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedType && selectedDate && selectedTime && (
        <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Button
            onClick={onContinue}
            className={`relative overflow-hidden transition-all duration-300 ${gradientFill}`}
          >
            <span
              aria-hidden="true"
              style={{ animation: "time-shine 2.8s ease-in-out infinite" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
            />
            <span className="relative">Review Booking</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default TimeSelectionStep;