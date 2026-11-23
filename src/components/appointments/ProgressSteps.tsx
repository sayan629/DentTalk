import { ChevronRightIcon } from "lucide-react";

const PROGRESS_STEPS = ["Select Dentist", "Choose Time", "Confirm"];

function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      {PROGRESS_STEPS.map((stepName, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        const isCurrent = currentStep === stepNumber;

        return (
          <div
            key={stepNumber}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: "backwards" }}
            className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500"
          >
            {/* step circle */}
            <div className="relative w-8 h-8">
              {/* ripple rings on the current step */}
              {isCurrent && (
                <>
                  <span className="absolute inset-0 rounded-full border-2 border-pink-400/50 animate-ripple" />
                  <span
                    style={{ animationDelay: "1.2s" }}
                    className="absolute inset-0 rounded-full border-2 border-purple-400/50 animate-ripple"
                  />
                </>
              )}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 text-white shadow-md shadow-pink-500/30"
                    : "bg-muted text-muted-foreground"
                } ${isCurrent ? "scale-110" : ""}`}
              >
                {stepNumber}
              </div>
            </div>

            {/* step name */}
            <span
              className={`text-sm transition-colors duration-500 ${
                isCurrent
                  ? "font-medium bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent"
                  : isActive
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {stepName}
            </span>

            {/* arrow (not shown for last step) */}
            {stepNumber < PROGRESS_STEPS.length && (
              <ChevronRightIcon
                className={`w-4 h-4 transition-colors duration-500 ${
                  currentStep > stepNumber ? "text-pink-400" : "text-muted-foreground"
                } ${isCurrent ? "animate-pulse" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
export default ProgressSteps;