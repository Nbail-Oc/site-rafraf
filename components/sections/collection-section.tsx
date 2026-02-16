"use client";

import { FadeImage } from "@/components/fade-image";

const products = [
  {
    id: 1,
    name: "Onion",
    description: "Grade A Indian red onions. Available year-round.",
    price: "Request Quote",
    image: "/images/col-onion.jpg",
  },
  {
    id: 2,
    name: "Green Chilli",
    description: "Fresh, vibrant green chilies with perfect heat.",
    price: "Request Quote",
    image: "/images/col-chili.jpg",
  },
  {
    id: 3,
    name: "Banana",
    description: "Export-quality yellow bananas. Perfectly ripened.",
    price: "Request Quote",
    image: "/images/col-banana.jpg",
  },
  {
    id: 4,
    name: "Pomegranate",
    description: "Juicy, ruby-red pomegranates rich in antioxidants.",
    price: "Request Quote",
    image: "/images/col-pomegranate.jpg",
  },
  {
    id: 5,
    name: "Grapes",
    description: "Sweet, seedless grapes in green and purple varieties.",
    price: "Request Quote",
    image: "/images/col-grapes.jpg",
  },
  {
    id: 6,
    name: "Drumstick",
    description: "Fresh drumsticks packed with nutrients.",
    price: "Request Quote",
    image: "/images/col-drumstick.jpg",
  },
  {
    id: 7,
    name: "Semi-Husk Coconut",
    description: "Premium semi-husked coconuts for export.",
    price: "Request Quote",
    image: "/images/col-coconut.jpg",
  },
];

export function CollectionSection() {
  return (
    <section id="product-range" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Our Premium Export Range
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div key={product.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {products.map((product) => (
            <div key={product.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                  <span className="font-medium text-accent text-base">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
