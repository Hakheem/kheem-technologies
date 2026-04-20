import { STATS } from "@/lib/data";



export default function StatsSection() {

return(



<div className='container mx-auto px-6 max-w-7xl py-24 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>

          {/* Left side - Text (20% width on desktop) */}
          <div className="lg:w-[25%] shrink-0 text-center lg:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <div className="w-8 h-px bg-primary" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
                Trusted globally
              </span>
            </div>
            
            <h3 id="trusted-heading" className="text-3xl font-semibold tracking-wide text-foreground mb-3">
          Transforming Ideas Into Impact
            </h3>
            
            <p className=" text-muted-foreground leading-relaxed">
              We've partnered with innovative companies to build digital products that scale.
            </p>
          </div>


<div className='flex gap-12 lg:w-[70%] w-full  justify-end '>
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1  ">
                <span className="title text-3xl md:text-4xl font-bold text-foreground tracking-tight">{s.value}</span>
                <span className="text-[13px] md:text-[17px] font-semibold uppercase tracking-wide text-muted-foreground leading-tight">{s.label}</span>
              </div>
            ))}
         
  </div>

</div> 


)
}