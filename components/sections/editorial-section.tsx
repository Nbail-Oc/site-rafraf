"use client";

import Image from "next/image";

const specs = [
  { label: "Established", value: "2025" },
  { label: "Export Market", value: "UAE" },
  { label: "Products", value: "7+ Items" },
  { label: "Sourcing", value: "100% Organic" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Specs Grid */}
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {spec.label}
            </p>
            <p className="font-medium text-foreground text-4xl">
              {spec.value}
            </p>
          </div>
        ))}
      </div>

      {/* Full-width Image */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src="/images/tech-aerial-farm.jpg"
          alt="Aerial view of Indian agricultural fields"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/20" />
      </div>
    </section>
  );
}
