
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

// Automatically derive types from Prisma server actions
export type Doctor = Awaited<
  ReturnType<typeof getDoctors>
>[number];

export type AvailableDoctor = Awaited<
  ReturnType<typeof getAvailableDoctors>
>[number];

export function useGetDoctors() {
  return useQuery({
    queryKey: ["getDoctors"],
    queryFn: getDoctors,
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDoctor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDoctors"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getAvailableDoctors"],
      });
    },

    onError: (error: Error) => {
      console.error("Error creating doctor:", error);
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDoctor,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getDoctors"],
      });

      queryClient.invalidateQueries({
        queryKey: ["getAvailableDoctors"],
      });
    },

    onError: (error: Error) => {
      console.error("Error updating doctor:", error);
    },
  });
}

export function useAvailableDoctors() {
  return useQuery({
    queryKey: ["getAvailableDoctors"],
    queryFn: getAvailableDoctors,
  });
}
