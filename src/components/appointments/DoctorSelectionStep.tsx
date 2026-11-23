
"use client";

import { useAvailableDoctors } from "@/hooks/use-doctors";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import Image from "next/image";
import { MapPinIcon, PhoneIcon, StarIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DoctorCardsLoading } from "./DoctorCardsLoading";
import { generateAvatar } from "@/lib/utils";

interface DoctorSelectionStepProps {
    selectedDentistId: string | null;
    onSelectDentist: (dentistId: string) => void;
    onContinue: () => void;
}

function DoctorSelectionStep({
    onContinue,
    onSelectDentist,
    selectedDentistId,
}: DoctorSelectionStepProps) {
    const { data: dentists = [], isLoading } = useAvailableDoctors();

    if (isLoading)
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent w-fit">
                    Choose Your Dentist
                </h2>
                <DoctorCardsLoading />
            </div>
        );

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent w-fit animate-in fade-in slide-in-from-left-4 duration-500">
                Choose Your Dentist
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dentists.map((dentist, index) => {
                    const isSelected = selectedDentistId === dentist.id;

                    const fallbackAvatar = generateAvatar(
                        dentist.name,
                        dentist.gender === "FEMALE" ? "FEMALE" : "MALE"
                    );

                    const avatarUrl =
                        dentist.imageUrl &&
                            !dentist.imageUrl.includes("avatar.iran.liara.run")
                            ? dentist.imageUrl
                            : fallbackAvatar;

                    return (
                        <Card
                            key={dentist.id}
                            style={{
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: "backwards",
                            }}
                            className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-orange-400/5 hover:via-pink-400/5 hover:to-purple-500/10 animate-in fade-in slide-in-from-bottom-6 duration-500 ${isSelected
                                    ? "ring-2 ring-pink-400 shadow-lg shadow-pink-500/20 bg-gradient-to-br from-orange-400/5 via-pink-400/5 to-purple-500/10"
                                    : ""
                                }`}
                            onClick={() => onSelectDentist(dentist.id)}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={avatarUrl}
                                        alt={dentist.name}
                                        width={64}
                                        height={64}
                                        unoptimized
                                        className={`w-16 h-16 rounded-full object-cover ring-2 transition-all duration-300 ${isSelected
                                                ? "ring-pink-400"
                                                : "ring-pink-400/20 group-hover:ring-purple-400/60"
                                            }`}
                                    />

                                    <div className="flex-1">
                                        <CardTitle className="text-lg">
                                            {dentist.name}
                                        </CardTitle>

                                        <CardDescription className="font-medium bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 bg-clip-text text-transparent w-fit">
                                            {dentist.speciality || "General Dentistry"}
                                        </CardDescription>

                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex items-center gap-1">
                                                <StarIcon className="w-4 h-4 fill-amber-400 text-amber-400 transition-transform duration-300 group-hover:rotate-12" />
                                                <span className="text-sm font-medium">5</span>
                                            </div>

                                            <span className="text-sm text-muted-foreground">
                                                ({dentist.appointmentCount} appointments)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPinIcon className="w-4 h-4 text-orange-400" />
                                    <span>DentWise</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <PhoneIcon className="w-4 h-4 text-pink-400" />
                                    <span>{dentist.phone}</span>
                                </div>

                                <p className="text-sm text-muted-foreground">
                                    {dentist.bio ||
                                        "Experienced dental professional providing quality care."}
                                </p>

                                <Badge
                                    variant="outline"
                                    className="bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-purple-500/20 text-foreground border-pink-400/40"
                                >
                                    Licensed Professional
                                </Badge>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {selectedDentistId && (
                <div className="flex justify-end animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Button
                        onClick={onContinue}
                        className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 hover:brightness-110 text-white shadow-lg shadow-pink-500/30 transition-all duration-300"
                    >
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-white/30 blur-sm animate-shimmer"
                        />
                        <span className="relative">
                            Continue to Time Selection
                        </span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default DoctorSelectionStep;
