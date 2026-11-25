"use client";

import { useUpdateDoctor } from "@/hooks/use-doctors";
import { formatPhoneNumber } from "@/lib/utils";
import { Doctor, Gender } from "@prisma/client";
import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const gradientBar = "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500";
const inputClass =
  "transition-all duration-300 focus-visible:border-pink-400 focus-visible:ring-pink-400/30";
const triggerClass =
  "transition-all duration-300 focus:border-pink-400 focus:ring-pink-400/30 data-[state=open]:border-pink-400";
const itemClass = "focus:bg-pink-400/15 focus:text-pink-400";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// the fields that count as "edited" when they differ from the saved doctor
const trackedFields = ["name", "speciality", "email", "phone", "gender", "isActive"] as const;

interface EditDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

// a field wrapper: a gradient bar draws down its left edge and an "Edited" tag
// slides in next to the label as soon as its value differs from the saved one
function Field({
  label,
  htmlFor,
  edited,
  children,
}: {
  label: string;
  htmlFor: string;
  edited: boolean;
  children: ReactNode;
}) {
  return (
    <div className="group relative space-y-2">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -left-2.5 top-0 h-full w-0.5 origin-top rounded-full bg-gradient-to-b from-orange-400 via-pink-500 to-purple-500 transition-transform duration-500 ${
          edited ? "scale-y-100" : "scale-y-0"
        }`}
      />
      <Label
        htmlFor={htmlFor}
        className="flex items-center gap-2 transition-colors duration-300 group-focus-within:text-pink-400"
      >
        {label}
        <span
          aria-hidden={!edited}
          className={`text-xs font-normal text-pink-400 transition-all duration-300 ${
            edited ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          }`}
        >
          Edited
        </span>
      </Label>
      {children}
    </div>
  );
}

function EditDoctorDialog({ doctor, isOpen, onClose }: EditDoctorDialogProps) {
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(doctor);
  const updateDoctorMutation = useUpdateDoctor();

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value);
    if (editingDoctor) {
      setEditingDoctor({ ...editingDoctor, phone: formattedPhoneNumber });
    }
  };

  const handleSave = () => {
    if (editingDoctor) {
      updateDoctorMutation.mutate({ ...editingDoctor }, { onSuccess: handleClose });
    }
  };

  const handleClose = () => {
    onClose();
    setEditingDoctor(doctor);
  };

  const handleReset = () => setEditingDoctor(doctor);

  const isEdited = (field: (typeof trackedFields)[number]) =>
    !!doctor && !!editingDoctor && editingDoctor[field] !== doctor[field];
  const editCount = trackedFields.filter(isEdited).length;
  const isPending = updateDoctorMutation.isPending;

  // initials for the header avatar, e.g. "Dr. John Doe" becomes "JD"
  const initials =
    (editingDoctor?.name ?? "")
      .replace(/^dr\.?\s+/i, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-background to-purple-500/5 shadow-xl shadow-pink-500/10">
        <style>{`
          /* the dialog's contents open outward from the top-left like an iris */
          @keyframes ed-iris {
            0% { clip-path: circle(0% at 12% 0%); }
            100% { clip-path: circle(150% at 12% 0%); }
          }
          @keyframes ed-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes ed-pop {
            0% { opacity: 0; transform: scale(0.5); }
            60% { opacity: 1; transform: scale(1.15); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes ed-ring {
            0% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 0 rgba(236, 72, 153, 0.55); }
            35%, 100% { box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.3), 0 0 0 10px rgba(236, 72, 153, 0); }
          }
          @keyframes ed-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes ed-dot {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
            40% { transform: translateY(-3px); opacity: 1; }
          }
          @media (prefers-reduced-motion: reduce) {
            .ed-reveal { animation: none !important; clip-path: none !important; }
            .ed-loop { animation: none !important; }
          }
        `}</style>

        <div
          style={{ animation: `ed-iris 0.9s ${EASE} 0.05s backwards` }}
          className="ed-reveal grid gap-4"
        >
          <DialogHeader>
            <div className="flex items-center gap-3">
              {/* avatar chip: ring spins while the doctor is active, stays flat when inactive */}
              <div className="relative size-12 shrink-0 overflow-hidden rounded-full p-[2px]">
                <span
                  aria-hidden="true"
                  style={
                    editingDoctor?.isActive
                      ? { animation: "ed-spin 6s linear infinite" }
                      : undefined
                  }
                  className={`ed-loop absolute inset-[-60%] ${
                    editingDoctor?.isActive
                      ? "bg-[conic-gradient(from_0deg,#fb923c,#f472b6,#a855f7,#fb923c)]"
                      : "bg-muted-foreground/25"
                  }`}
                />
                <div className="relative flex size-full items-center justify-center rounded-full bg-background">
                  {/* keyed so the initials pop each time they change */}
                  <span
                    key={initials}
                    style={{ animation: `ed-pop 0.4s ${EASE}` }}
                    className={`ed-reveal text-sm font-semibold ${gradientText}`}
                  >
                    {initials}
                  </span>
                </div>
              </div>

              <div className="text-left">
                <DialogTitle className={`w-fit ${gradientText}`}>Edit Doctor</DialogTitle>
                <DialogDescription>Update doctor information and status.</DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {editingDoctor && (
            <div className="grid gap-4 py-4 pl-3">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" htmlFor="name" edited={isEdited("name")}>
                  <Input
                    id="name"
                    value={editingDoctor.name}
                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                    className={inputClass}
                  />
                </Field>
                <Field label="Speciality" htmlFor="speciality" edited={isEdited("speciality")}>
                  <Input
                    id="speciality"
                    value={editingDoctor.speciality}
                    onChange={(e) =>
                      setEditingDoctor({ ...editingDoctor, speciality: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Email" htmlFor="email" edited={isEdited("email")}>
                <Input
                  id="email"
                  type="email"
                  value={editingDoctor.email}
                  onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                  className={inputClass}
                />
              </Field>

              <Field label="Phone" htmlFor="phone" edited={isEdited("phone")}>
                <Input
                  id="phone"
                  value={editingDoctor.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="98765 43210"
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Gender" htmlFor="gender" edited={isEdited("gender")}>
                  <Select
                    value={editingDoctor.gender || ""}
                    onValueChange={(value) =>
                      setEditingDoctor({ ...editingDoctor, gender: value as Gender })
                    }
                  >
                    <SelectTrigger className={triggerClass}>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="border-pink-400/20">
                      <SelectItem value="MALE" className={itemClass}>Male</SelectItem>
                      <SelectItem value="FEMALE" className={itemClass}>Female</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="Status" htmlFor="status" edited={isEdited("isActive")}>
                  <Select
                    value={editingDoctor.isActive ? "active" : "inactive"}
                    onValueChange={(value) =>
                      setEditingDoctor({ ...editingDoctor, isActive: value === "active" })
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
                </Field>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleClose}
              className="border-pink-400/30 transition-all duration-300 hover:border-purple-400/60 hover:bg-gradient-to-r hover:from-orange-400/10 hover:via-pink-400/10 hover:to-purple-500/10"
            >
              Cancel
            </Button>

            {/* appears only once something has changed */}
            {editCount > 0 && !isPending && (
              <Button
                variant="ghost"
                onClick={handleReset}
                style={{ animation: `ed-pop 0.4s ${EASE} backwards` }}
                className="ed-reveal hover:bg-pink-400/10 hover:text-pink-400"
              >
                Reset
              </Button>
            )}

            <Button
              onClick={handleSave}
              disabled={isPending || editCount === 0}
              style={
                editCount > 0 && !isPending
                  ? {
                      animation:
                        "ed-flow 3s ease-in-out infinite alternate, ed-ring 3s ease-out infinite",
                    }
                  : undefined
              }
              className={`ed-loop relative bg-[length:200%_100%] text-white transition-[filter] duration-300 hover:brightness-110 ${gradientBar}`}
            >
              {isPending ? (
                <span className="flex items-center gap-1">
                  Saving
                  <span className="flex gap-0.5" aria-hidden="true">
                    {[0, 1, 2].map((n) => (
                      <span
                        key={n}
                        style={{ animation: `ed-dot 1s ease-in-out ${n * 0.15}s infinite` }}
                        className="ed-loop size-1 rounded-full bg-white"
                      />
                    ))}
                  </span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Save Changes
                  {editCount > 0 && (
                    // keyed so the count pops each time it changes
                    <span
                      key={editCount}
                      style={{ animation: `ed-pop 0.35s ${EASE}` }}
                      className="ed-reveal rounded-full bg-white/25 px-1.5 text-xs tabular-nums"
                    >
                      {editCount}
                    </span>
                  )}
                </span>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditDoctorDialog;