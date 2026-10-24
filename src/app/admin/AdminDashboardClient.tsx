"use client";

import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading: doctorsLoading } = useGetDoctors();
  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointments();

  // calculate stats from real data
  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc) => doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app) => app.status === "COMPLETED").length,
  };