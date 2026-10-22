import { ZapIcon } from "lucide-react"

function HowItWorks() {
  return  <section className = "relative py-32 px-6 outline-hidden z-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/10
        rounded-full border border-primary/10 backdrop-blur-sm mb-6">
          <ZapIcon className="size-4 text-primary"/> 
          <span className="text-sm font-medium text-primary">Simple Process</span>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Three steps to
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            better dental health
          </span>
        </h2>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Our streamlined process makes dental care accessible, convenient, and built entirely around you.
        </p>
      </div>

      {/*steps*/}
      
  </section>
  
}

export default HowItWorks