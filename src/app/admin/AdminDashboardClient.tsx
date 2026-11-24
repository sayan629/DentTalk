"use client";

import AdminStats from "@/components/admin/AdminStats";
import DoctorsManagement from "@/components/admin/DoctorsManagement";
import RecentAppointments from "@/components/admin/RecentAppointments";
import Navbar from "@/components/Navbar";
import { useGetAppointments } from "@/hooks/use-appointment";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { SettingsIcon } from "lucide-react";
import { HeartPulseIcon } from "lucide-react";

function AdminDashboardClient() {
  const { user } = useUser();
  const { data: doctors = [], isLoading:doctorsLoading } = useGetDoctors();
  const { data: appointments = [], isLoading:appointmentsLoading } = useGetAppointments();

  const stats = {
    totalDoctors: doctors.length,
    activeDoctors: doctors.filter((doc)=> doc.isActive).length,
    totalAppointments: appointments.length,
    completedAppointments: appointments.filter((app)=> app.status === "COMPLETED").length, 
  };

  if(doctorsLoading || appointmentsLoading) return <LoadingUI />;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Admin Welcome section */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Admin Dashboard
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground">
                Monitor practice health, coordinate team schedules, and manage appointments seamlessly.
              </p>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
        <AdminStats
          totalDoctors = {stats.totalDoctors}
          activeDoctors = {stats.activeDoctors}
          totalAppointments = {stats.totalAppointments}
          completedAppointments = {stats.completedAppointments}
          />

          <DoctorsManagement />
          <RecentAppointments />
          
      </div>
    </div>
  );
}

export default AdminDashboardClient;

function LoadingUI() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <div className="flex items-center justify-center h-96">
          <div role="status" className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
              <span className="absolute inset-1 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <span className="absolute inset-5 rounded-full bg-primary/10 flex items-center justify-center">
                <HeartPulseIcon className="w-8 h-8 text-primary animate-pulse" />
              </span>
            </div>
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              Loading dashboard data
              <span className="flex gap-1">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    style={{ animationDelay: `${d}ms` }}
                    className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                  />
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}