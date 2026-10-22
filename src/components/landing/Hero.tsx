const Hero = () => {
  return <section className="realtive h-screen flex items-center overflow-hidden pt-20">
    {/* GRID BG */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"></div>        
    </div>

    {/* Gradient ORBS */}
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />
    
    <div className="relative z-10 w-full px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT CONTENT */}
                <div className="space-y-10">
                    <div className="space-y-6">
                        {/* BADGE */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                            <span className="text-sm">
                                AI-Powered Dental Assistant
                            </span>
                        </div>

                        {/* MAIN HEADING */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                            Your Smile
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                           Your Questions
                        </span>
                        <br />
                        <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                            AnsweredInstantly
                        </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                            Ask questions, understand your dental concerns, and find the right care—all with an AI assistant available whenever you need it.
                        </p>

                    </div>

                </div>
            </div>
        </div>
    </div>
  </section>
  
}

export default Hero