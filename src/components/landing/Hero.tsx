const Hero = () => {
  return <section className="realtive h-screen flex items-center overflow-hidden pt-20">
    {/* GRID BG */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-40"></div>        
    </div>

    {/* Gradient ORBS */}
    <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />
  </section>
  
}

export default Hero