import { useCreateDoctor } from "@/hooks/use-doctors";
import { Gender } from "@prisma/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { formatPhoneNumber } from "@/lib/utils";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const inputClass =
  "transition-all duration-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30";
const triggerClass =
  "transition-all duration-300 focus:border-pink-400 focus:ring-pink-400/30 data-[state=open]:border-pink-400";
const itemClass = "focus:bg-pink-400/15 focus:text-pink-400";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// each field slides in from alternating sides, one after another
const fieldIn = (i: number) => ({
  animation: `ad-in-${i % 2 === 0 ? "l" : "r"} 0.7s ${EASE} ${0.25 + i * 0.1}s backwards`,
});

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDoctorDialog({ isOpen, onClose }: AddDoctorDialogProps) {
    const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true,
  });

  const createDoctorMutation = useCreateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    setNewDoctor({ ...newDoctor, phone: formattedPhoneNumber });
  };

  const handleSave = () => {
    createDoctorMutation.mutate({...newDoctor },{ onSuccess: handleClose});
}

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE" as Gender,
      isActive: true,
    });
  }

  // how many of the required fields are filled (drives the progress bar)
  const filled = [newDoctor.name, newDoctor.email, newDoctor.speciality].filter(Boolean).length;
  const progress = filled / 3;
  const canSave =
    !!newDoctor.name && !!newDoctor.email && !!newDoctor.speciality && !createDoctorMutation.isPending;

  return (
    <Dialog open = {isOpen} onOpenChange = {handleClose}>
      <DialogContent className="sm:max-w-[500px] border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-background to-purple-500/5 shadow-xl shadow-pink-500/10">
        <style>{`
          @keyframes ad-in-l {
            0% { opacity: 0; transform: translateX(-28px); filter: blur(6px); }
            100% { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes ad-in-r {
            0% { opacity: 0; transform: translateX(28px); filter: blur(6px); }
            100% { opacity: 1; transform: none; filter: blur(0); }
          }
          @keyframes ad-focus {
            0% { opacity: 0; filter: blur(8px); }
            100% { opacity: 1; filter: blur(0); }
          }
          @keyframes ad-wipe {
            0% { clip-path: inset(-20% 100% -20% 0); }
            100% { clip-path: inset(-20% -5% -20% -5%); }
          }
          @keyframes ad-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes ad-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes ad-star {
            0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.35) rotate(90deg); opacity: 0.7; }
          }
          @keyframes ad-ring {
            0% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 0 rgba(236, 72, 153, 0.55); }
            35%, 100% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 10px rgba(236, 72, 153, 0); }
          }
          @keyframes ad-glint {
            0%, 60% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(450%) skewX(-20deg); }
          }
          @keyframes ad-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
          @keyframes ad-shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          .ad-ring {
            padding: 1px;
            -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask-composite: exclude;
          }
          @media (prefers-reduced-motion: reduce) {
            .ad-reveal { animation: none !important; opacity: 1 !important; filter: none !important; }
            .ad-loop { animation: none !important; }
            .ad-hide-rm { display: none !important; }
          }
        `}</style>

        {/* a comet of colour circling the dialog border */}
        <div
          aria-hidden="true"
          className="ad-ring ad-hide-rm pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{ animation: "ad-spin 7s linear infinite" }}
              className="ad-loop aspect-square w-[200%] shrink-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_60%,#fb923c_74%,#f472b6_88%,#a855f7_100%)]"
            />
          </div>
        </div>

        {/* progress bar: fills as the required fields are completed */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-lg"
        >
          <div
            style={{
              transform: `scaleX(${progress})`,
              transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            className="relative h-full origin-left overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 shadow-[0_0_10px_1px_rgba(236,72,153,0.7)]"
          >
            <span
              style={{ animation: "ad-shimmer 2s ease-in-out infinite" }}
              className="ad-loop ad-hide-rm absolute inset-y-0 left-0 w-1/3 bg-white/60 blur-sm"
            />
          </div>
        </div>

        <DialogHeader>
          <DialogTitle
            style={{
              animation: `ad-wipe 0.9s ${EASE} 0.1s backwards, ad-flow 4s ease-in-out 1.2s infinite alternate`,
            }}
            className={`ad-reveal w-fit ${gradientText} bg-[length:200%_auto]`}
          >
            Add New Doctor
          </DialogTitle>
          <DialogDescription
            style={{ animation: "ad-focus 0.8s ease 0.35s backwards" }}
            className="ad-reveal"
          >
            Add a new doctor to the system
          </DialogDescription>
        </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div style={fieldIn(0)} className="ad-reveal group relative space-y-2">
                <Label
                  htmlFor="new-name"
                  className="transition-colors duration-300 group-focus-within:text-pink-400"
                >
                  Name{" "}
                  <span
                    style={{ animation: "ad-star 2.4s ease-in-out infinite" }}
                    className="ad-loop inline-block text-pink-400"
                  >
                    *
                  </span>
                </Label>
                <Input
                  id="new-name"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                  placeholder="Dr. John Doe"
                  className={inputClass}
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 transition-transform duration-500 group-focus-within:scale-x-100"
                />
              </div>
              <div style={fieldIn(1)} className="ad-reveal group relative space-y-2">
              <Label
                htmlFor="new-speciality"
                className="transition-colors duration-300 group-focus-within:text-pink-400"
              >
                Speciality{" "}
                <span
                  style={{ animation: "ad-star 2.4s ease-in-out 0.4s infinite" }}
                  className="ad-loop inline-block text-pink-400"
                >
                  *
                </span>
              </Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) => setNewDoctor({ ...newDoctor, speciality: e.target.value })}
                placeholder="General Surgeon"
                className={inputClass}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 transition-transform duration-500 group-focus-within:scale-x-100"
              />
            </div>
            </div>
            <div style={fieldIn(2)} className="ad-reveal group relative space-y-2">
            <Label
              htmlFor="new-email"
              className="transition-colors duration-300 group-focus-within:text-pink-400"
            >
              Email{" "}
              <span
                style={{ animation: "ad-star 2.4s ease-in-out 0.8s infinite" }}
                className="ad-loop inline-block text-pink-400"
              >
                *
              </span>
            </Label>
            <Input
              id="new-email"
              type="email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
              placeholder="doctor@example.com"
              className={inputClass}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 transition-transform duration-500 group-focus-within:scale-x-100"
            />
          </div>

           <div style={fieldIn(3)} className="ad-reveal group relative space-y-2">
            <Label
              htmlFor="new-phone"
              className="transition-colors duration-300 group-focus-within:text-pink-400"
            >
              Phone
            </Label>
            <Input
              id="new-phone"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="+91 98766 43210"
              className={inputClass}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 transition-transform duration-500 group-focus-within:scale-x-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div style={fieldIn(4)} className="ad-reveal group space-y-2">
              <Label
                htmlFor="new-gender"
                className="transition-colors duration-300 group-focus-within:text-pink-400"
              >
                Gender
              </Label>
              <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) => setNewDoctor({ ...newDoctor, gender: value as Gender })}
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="border-pink-400/20">
                  <SelectItem value="MALE" className={itemClass}>Male</SelectItem>
                  <SelectItem value="FEMALE" className={itemClass}>Female</SelectItem>
                </SelectContent>
              </Select>
            </div>  

             <div style={fieldIn(5)} className="ad-reveal group space-y-2">
              <Label
                htmlFor="new-status"
                className="transition-colors duration-300 group-focus-within:text-pink-400"
              >
                Status
              </Label>
              <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) =>
                  setNewDoctor({ ...newDoctor, isActive: value === "active" })
                }
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-pink-400/20">
                  <SelectItem value="active" className={itemClass}>Active</SelectItem>
                  <SelectItem value="inactive" className={itemClass}>Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-pink-400/30 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              style={
                canSave
                  ? {
                      animation:
                        "ad-flow 3s ease-in-out infinite alternate, ad-ring 3s ease-out infinite",
                    }
                  : undefined
              }
              className="ad-loop relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-[length:200%_100%] hover:brightness-110 text-white transition-[filter] duration-300"
              disabled={!newDoctor.name || !newDoctor.email || !newDoctor.speciality || createDoctorMutation.isPending}
              >
              {/* glint when the form is ready to save */}
              {canSave && (
                <span
                  aria-hidden="true"
                  style={{ animation: "ad-glint 3.5s ease-in-out infinite" }}
                  className="ad-loop pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm"
                />
              )}
              {/* sweeping line while saving */}
              {createDoctorMutation.isPending && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20">
                  <span
                    style={{ animation: "ad-sweep 1.2s ease-in-out infinite" }}
                    className="ad-loop block h-full w-1/3 bg-white/80"
                  />
                </span>
              )}
              <span className="relative">
                {createDoctorMutation.isPending ? "Saving..." : "Save"}
              </span>
              </Button>
          </DialogFooter>
        </DialogContent> 
    </Dialog>
  )
}

export default AddDoctorDialog