
"use client";

import {
  bookAppointment,
  getAppointments,
  getBookedTimeSlots,
  getUserAppointments,
  updateAppointmentStatus,
} from "@/lib/actions/appointments";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Automatically derive types from server actions
export type Appointment = Awaited<
  ReturnType<typeof getAppointments>
>[number];

export type UserAppointment = Awaited<
  ReturnType<typeof getUserAppointments>
>[number];

// Get all appointments (Admin)
export function useGetAppointments() {
  return useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });
}

// Get booked time slots
export function useBookedTimeSlots(
  doctorId: string,
  date: string
) {
  return useQuery({
    queryKey: ["getBookedTimeSlots", doctorId, date],
    queryFn: () => getBookedTimeSlots(doctorId, date),
    enabled: Boolean(doctorId && date),
  });
}

// Book appointment
export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getUserAppointments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getAppointments"],
        }),
      ]);
    },

    onError: (error: Error) => {
      console.error("Failed to book appointment:", error);
    },
  });
}

// Get appointments for logged-in user
export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
}

// Update appointment status
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getAppointments"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getUserAppointments"],
        }),
      ]);
    },

    onError: (error: Error) => {
      console.error("Failed to update appointment:", error);
    },
  });
}
