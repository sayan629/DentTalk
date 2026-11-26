
"use client";

import {
  createDoctor,
  getAvailableDoctors,
  getDoctors,
  updateDoctor,
} from "@/lib/actions/doctors";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Automatically derive types from server actions
export type Doctor = Awaited<
  ReturnType<typeof getDoctors>
>[number];

export type AvailableDoctor = Awaited<
  ReturnType<typeof getAvailableDoctors>
>[number];

// Get all doctors
export function useGetDoctors() {
  return useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });
}

// Create doctor
export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctor,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getDoctors"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getAvailableDoctors"],
        }),
      ]);
    },

    onError: (error: Error) => {
      console.error("Error creating doctor:", error);
    },
  });
}

// Update doctor
export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getDoctors"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getAvailableDoctors"],
        }),
      ]);
    },

    onError: (error: Error) => {
      console.error("Error updating doctor:", error);
    },
  });
}

// Get only available doctors
export function useAvailableDoctors() {
  return useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
}
