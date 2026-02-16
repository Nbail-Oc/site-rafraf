"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="about" className="bg-background">
      {/* Large Text Statement */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-foreground md:text-3xl lg:text-[2.5rem] lg:leading-snug text-balance">
          RafRaf International partners directly with trusted Indian farmers to deliver premium organic produce to UAE businesses. 
          Founded in 2025, we combine traditional farming excellence with modern export logistics to ensure every shipment meets the highest international quality standards.
        </p>
      </div>

      {/* About Image */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="/images/about-farmland.jpg"
          alt="Indian farmland at sunrise"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - white at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>
    </section>
  );
}
