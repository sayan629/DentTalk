"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function getAppointments() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        doctor: { select: { name: true, imageUrl: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return appointments;
  } catch (error) {
    console.log("Error fetching appointments:", error);
    throw new Error("Failed to fetch appointments");
  }
}

export async function getUserAppointmentStats() {
  try {
    const {userId} = await auth();
    if(!userId) throw new Error("You must be authenticated")
    const user = await prisma.user.findUnique({where:{clerkId:userId}})
    
    if(!user) throw new Error("User not found")
      
  } catch (error) {
    
  }
  
}