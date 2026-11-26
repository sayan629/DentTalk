
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

export function useGetAppointments() {
  return useQuery({
    queryKey: ["getAppointments"],
    queryFn: getAppointments,
  });
}

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

export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookAppointment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUserAppointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });
    },

    onError: (error: Error) => {
      console.error("Failed to book appointment:", error);
    },
  });
}

// User-specific appointments
export function useUserAppointments() {
  return useQuery({
    queryKey: ["getUserAppointments"],
    queryFn: getUserAppointments,
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointmentStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAppointments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getUserAppointments"],
      });
    },

    onError: (error: Error) => {
      console.error("Failed to update appointment:", error);
    },
  });
}
