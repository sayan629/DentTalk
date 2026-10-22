import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { CheckCircleIcon } from "lucide-react";

function PricingSection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-muted/3 to-background">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_50%_at_50%_50%,#000_50%,transparent_85%)] opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06),transparent_70%)]"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto">


        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full border border-primary/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">Simple Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Choose your
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              AI dental plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Book appointments for free and upgrade for unlimited AI consultations. Perfect for
            ongoing dental care.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="relative group">
            <div className="relative bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground mb-1">/month</span>
                  </div>
                  <p className="text-muted-foreground">Essential dental appointment booking</p>
                </div>
                <SignUpButton mode="modal">
                  <Button className="w-full py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl font-semibold">
                    Get Started Free
                  </Button>
                </SignUpButton>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Unlimited appointment booking</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Find dentists in your area</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Basic text chat support</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">Appointment reminders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>