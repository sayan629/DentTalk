"use client";

import { useGetDoctors } from "@/hooks/use-doctors";
import { useState, type MouseEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  MailIcon,
  PhoneIcon,
  PlusIcon,
  StethoscopeIcon,
  EditIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AddDoctorDialog from "./AddDoctorDialog";
import { generateAvatar } from "@/lib/utils";
import EditDoctorDialog from "./EditDoctorDialog";
import { Doctor } from "@prisma/client";

// shared colour classes (orange, pink and purple)
const gradientText =
  "bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent";
const gradientBar = "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500";

const EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// a soft pink-orange light that follows the cursor inside a row
const SPOTLIGHT =
  "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(236,72,153,0.14), rgba(251,146,60,0.06) 45%, transparent 70%)";

// feeds the cursor position to the row's spotlight
const trackPointer = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

function DoctorsManagement() {
  const { data: doctors = [] } = useGetDoctors();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
  };

  // busiest doctor sets the scale for every workload bar
  const maxAppointments = Math.max(...doctors.map((d) => d.appointmentCount ?? 0), 1);

  return (
    <>
      <Card className="relative mb-12 overflow-hidden border-2 border-pink-400/20 bg-gradient-to-br from-orange-400/5 via-background to-purple-500/5 shadow-xl shadow-pink-500/5">
        <style>{`
          @keyframes dm-slide {
            0% { opacity: 0; clip-path: inset(0 100% 0 0); transform: translateX(-16px); }
            100% { opacity: 1; clip-path: inset(0 0 0 0); transform: none; }
          }
          @keyframes dm-fade {
            0% { opacity: 0; transform: translateY(-8px); }
            100% { opacity: 1; transform: none; }
          }
          /* lub-dub heartbeat */
          @keyframes dm-beat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.22); }
            28% { transform: scale(1); }
            42% { transform: scale(1.15); }
            70% { transform: scale(1); }
          }
          @keyframes dm-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes dm-fill {
            0% { transform: scaleX(0); }
          }
          @keyframes dm-flow {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @media (prefers-reduced-motion: reduce) {
            .dm-reveal { animation: none !important; opacity: 1 !important; clip-path: none !important; }
            .dm-loop { animation: none !important; }
          }
        `}</style>

        {/* static gradient hairline along the top edge */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 ${gradientBar}`}
        />

        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {/* the stethoscope beats like a pulse */}
              <StethoscopeIcon
                style={{ animation: "dm-beat 2.4s ease-in-out 1s infinite" }}
                className="dm-loop size-5 text-pink-400"
              />
              <span
                style={{ animation: "dm-flow 4s ease-in-out infinite alternate" }}
                className={`dm-loop bg-[length:200%_auto] ${gradientText}`}
              >
                Doctors Management
              </span>
            </CardTitle>
            <CardDescription>
              Manage your doctors and their information
            </CardDescription>
          </div>

          <Button
            onClick={() => setIsAddDialogOpen(true)}
            className={`group/add bg-[length:200%_100%] text-white shadow-md shadow-pink-500/30 transition-all duration-500 hover:bg-right hover:brightness-110 ${gradientBar}`}
          >
            <PlusIcon className="mr-2 size-4 transition-transform duration-300 group-hover/add:rotate-90" />
            Add Doctor
          </Button>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {doctors.length === 0 && (
              <div
                style={{ animation: `dm-fade 0.7s ${EASE} 0.2s backwards` }}
                className="dm-reveal flex flex-col items-center gap-2 rounded-xl border border-dashed border-pink-400/30 py-10 text-center"
              >
                <StethoscopeIcon
                  style={{ animation: "dm-beat 2.4s ease-in-out infinite" }}
                  className="dm-loop size-8 text-pink-400/70"
                />
                <div className="font-medium">No doctors yet</div>
                <div className="text-sm text-muted-foreground">
                  Select Add Doctor to create the first profile.
                </div>
              </div>
            )}

            {doctors.map((doctor, i) => {
              const fallbackAvatar = generateAvatar(
                doctor.name,
                doctor.gender === "FEMALE" ? "FEMALE" : "MALE"
              );

              const avatarUrl =
                doctor.imageUrl &&
                !doctor.imageUrl.includes("avatar.iran.liara.run")
                  ? doctor.imageUrl
                  : fallbackAvatar;

              const workload = (doctor.appointmentCount ?? 0) / maxAppointments;
              const delay = 0.15 + Math.min(i, 8) * 0.08; // seconds, capped for long lists

              return (
                <div
                  key={doctor.id}
                  onMouseMove={trackPointer}
                  style={{ animation: `dm-slide 0.8s ${EASE} ${delay}s backwards` }}
                  className="dm-reveal group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-pink-400/15 bg-muted/30 p-4 transition-colors duration-300 hover:border-pink-400/40"
                >
                  {/* spotlight that follows the cursor */}
                  <span
                    aria-hidden="true"
                    style={{ background: SPOTLIGHT }}
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative flex items-center gap-4">
                    {/* active doctors get a slowly rotating colour ring; inactive ones a flat grey ring */}
                    <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full p-[2px]">
                      <span
                        aria-hidden="true"
                        style={
                          doctor.isActive
                            ? { animation: "dm-spin 6s linear infinite" }
                            : undefined
                        }
                        className={`dm-loop absolute inset-[-60%] ${
                          doctor.isActive
                            ? "bg-[conic-gradient(from_0deg,#fb923c,#f472b6,#a855f7,#fb923c)]"
                            : "bg-muted-foreground/25"
                        }`}
                      />
                      <Image
                        src={avatarUrl}
                        alt={doctor.name}
                        width={48}
                        height={48}
                        unoptimized
                        className="relative rounded-full bg-background object-cover"
                      />
                    </div>

                    <div>
                      <div className="font-semibold transition-colors duration-300 group-hover:text-pink-400">
                        {doctor.name}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {doctor.speciality}
                        <span className="ml-2 rounded bg-pink-400/10 px-2 py-0.5 text-xs text-pink-400">
                          {doctor.gender === "MALE" ? "Male" : "Female"}
                        </span>
                      </div>

                      <div className="mt-1 flex items-center gap-4">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MailIcon className="h-3 w-3 text-pink-400/70" />
                          {doctor.email}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <PhoneIcon className="h-3 w-3 text-pink-400/70" />
                          {doctor.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <div className="text-center">
                      <div className={`font-semibold tabular-nums ${gradientText}`}>
                        {doctor.appointmentCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Appointments
                      </div>
                      {/* workload bar, scaled to the busiest doctor */}
                      <div
                        role="progressbar"
                        aria-label={`${doctor.name} workload`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(workload * 100)}
                        className="mx-auto mt-1.5 h-1 w-16 overflow-hidden rounded-full bg-pink-400/10"
                      >
                        <div
                          style={{
                            transform: `scaleX(${workload})`,
                            animation: `dm-fill 1s ${EASE} ${delay + 0.4}s backwards`,
                          }}
                          className={`dm-loop h-full origin-left rounded-full ${gradientBar}`}
                        />
                      </div>
                    </div>

                    {doctor.isActive ? (
                      <Badge className="gap-1.5 border border-emerald-400/30 bg-emerald-400/10 text-emerald-500 hover:bg-emerald-400/10">
                        {/* live dot pings while the doctor is active */}
                        <span className="relative flex size-1.5">
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                        </span>
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="group/edit h-8 border-pink-400/30 px-3 transition-all duration-300 hover:border-pink-400/60 hover:bg-pink-400/10 hover:text-pink-400"
                      onClick={() => handleEditDoctor(doctor)}
                    >
                      <EditIcon className="mr-1 size-4 transition-transform duration-300 group-hover/edit:-rotate-12 group-hover/edit:scale-110" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <AddDoctorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      <EditDoctorDialog
        key={selectedDoctor?.id}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        doctor={selectedDoctor}
      />
    </>
  );
}

export default DoctorsManagement;