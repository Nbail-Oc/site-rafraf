"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Direct Farm Sourcing",
    description: "Partnership",
    image: "/images/feat-farm-sourcing.jpg",
  },
  {
    title: "Rigorous Quality Control",
    description: "Standards",
    image: "/images/feat-quality-control.jpg",
  },
  {
    title: "Cold Chain Management",
    description: "Freshness",
    image: "/images/feat-cold-chain.jpg",
  },
  {
    title: "International Packaging",
    description: "Export-Ready",
    image: "/images/feat-packaging.jpg",
  },
  {
    title: "Timely Logistics",
    description: "Delivery",
    image: "/images/feat-logistics.jpg",
  },
  {
    title: "Organic Practices",
    description: "Sustainability",
    image: "/images/feat-organic.jpg",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="our-process" className="bg-background">
      {/* Section Title - responsive spacing and text */}
      <div className="px-4 py-12 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground lg:text-4xl xl:text-5xl text-balance">
          Quality at Every Step.
          <br />
          Freshness Guaranteed.
        </h2>
        <p className="mx-auto mt-4 md:mt-6 max-w-md text-xs md:text-sm text-muted-foreground">
          Our Process
        </p>
      </div>

      {/* Features Grid - mobile-first responsive */}
      <div className="grid grid-cols-1 gap-3 px-4 pb-12 md:gap-4 md:px-12 md:pb-20 lg:grid-cols-3 lg:px-20 lg:gap-6">
        {features.map((feature, index) => (
          <div key={feature.title} className="group">
            {/* Image - smaller on mobile */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-2xl">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                loading={index > 2 ? "lazy" : "eager"}
              />
            </div>

            {/* Content - responsive sizing */}
            <div className="py-4 md:py-6">
              <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
                {feature.description}
              </p>
              <h3 className="text-foreground text-lg md:text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>
    </section>
  );
}
