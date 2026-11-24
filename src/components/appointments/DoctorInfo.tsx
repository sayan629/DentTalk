
"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import Image from "next/image";
import { generateAvatar } from "@/lib/utils";

function DoctorInfo({ doctorId }: { doctorId: string }) {
  const { data: doctors = [] } = useAvailableDoctors();
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!doctor) return null;

  const fallbackAvatar = generateAvatar(
    doctor.name,
    doctor.gender === "FEMALE" ? "FEMALE" : "MALE"
  );

  const avatarUrl =
    doctor.imageUrl &&
    !doctor.imageUrl.includes("avatar.iran.liara.run")
      ? doctor.imageUrl
      : fallbackAvatar;

  return (
    <div className="group flex items-center gap-4 animate-in fade-in slide-in-from-left-6 duration-700">
      <style>{`
        @keyframes doctor-ripple {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      {/* Photo with ripple rings */}
      <div className="relative w-12 h-12 shrink-0">
        <span
          style={{ animation: "doctor-ripple 2.4s ease-out infinite" }}
          className="absolute inset-0 rounded-full border-2 border-pink-400/50"
        />

        <span
          style={{ animation: "doctor-ripple 2.4s ease-out 1.2s infinite" }}
          className="absolute inset-0 rounded-full border-2 border-purple-400/50"
        />

        <Image
          src={avatarUrl}
          alt={doctor.name}
          width={48}
          height={48}
          unoptimized
          className="relative w-12 h-12 rounded-full object-cover ring-2 ring-pink-400/50 shadow-md shadow-pink-500/20 transition-all duration-300 group-hover:ring-purple-400"
        />
      </div>

      <div>
        <h3 className="font-medium">{doctor.name}</h3>

        <p className="text-sm bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent w-fit">
          {doctor.speciality || "General Dentistry"}
        </p>
      </div>
    </div>
  );
}

export default DoctorInfo;
