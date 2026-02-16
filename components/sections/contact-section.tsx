"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const productOptions = [
  "Onion",
  "Green Chilli",
  "Banana",
  "Pomegranate",
  "Grapes",
  "Drumstick",
  "Semi-Husk Coconut",
  "Multiple Products",
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-background">
      <div className="border-t border-border px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Get in Touch
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
              Request a Quote
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              Interested in sourcing premium Indian produce for your business? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-6">
                <Send className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-medium text-foreground">
                Thank you for your inquiry
              </h3>
              <p className="mt-4 max-w-md text-muted-foreground">
                Our export team will review your request and get back to you within 24 hours with a detailed quotation.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm font-medium text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Company Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="company" className="text-sm font-medium text-foreground">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  placeholder="Your company name"
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Contact Person */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-person" className="text-sm font-medium text-foreground">
                  Contact Person
                </label>
                <input
                  id="contact-person"
                  name="contactPerson"
                  type="text"
                  required
                  placeholder="Full name"
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+971 XX XXX XXXX"
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Product Interest */}
              <div className="flex flex-col gap-2">
                <label htmlFor="product" className="text-sm font-medium text-foreground">
                  Product Interest
                </label>
                <select
                  id="product"
                  name="product"
                  required
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none"
                >
                  <option value="" disabled selected>Select a product</option>
                  {productOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity" className="text-sm font-medium text-foreground">
                  Estimated Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  placeholder="e.g. 5 tons per month"
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your requirements, preferred delivery schedule, or any special requests..."
                  className="rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
                >
                  <Send className="h-4 w-4" />
                  Request Quote
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
