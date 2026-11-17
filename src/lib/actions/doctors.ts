"use server";

import { Gender } from "@prisma/client";
import { prisma } from "../prisma";
import { generateAvatar } from "../utils";

export async function getDoctors() {
    try {
        const doctors = await prisma.doctor.findMany({
            include: {
                _count: {select: { appointments: true }},
            },
            orderBy: { createdAt: "desc" },
        });
        return doctors.map((doctor)=>({
            ...doctor,
            appointmentCount: doctor._count.appointments,
        }));
    } catch (error) {
        console.log("Error fetching doctors:", error);
        throw new Error("Failed to fetch doctors");
    }
}

interface CreateDoctorInput {
    name: string;
    email: string;
    phone: string;
    speciality: string;
    gender: Gender;
    isActive: boolean;
}

export async function createDoctor(input: CreateDoctorInput) {
    try {
        if(!input.name || !input.email) throw new Error("Name and email are required");
        await prisma.doctor.create({
            data: {
        ...input,
        imageUrl: generateAvatar(input.name, input.gender),
      },
    });
    } catch (error) {
    }
}