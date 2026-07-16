import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  Anchor,
  ArrowRight,
  Baby,
  Scan,
  Sparkles,
  Sun,
} from "lucide-react";
import { CLINIC, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cosmetic dentistry, root canal, dental X-rays, teeth whitening, pediatric care, and dental implants in Paonta Sahib.",
};

const iconMap = {
  sparkles: Sparkles,
  activity: Activity,
  scan: Scan,
  sun: Sun,
  baby: Baby,
  anchor: Anchor,
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Our Services</h1>
          <p className="max-w-2xl text-blue-100">
            Complete dental solutions under one roof — from preventive care to
            advanced restorative treatments.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="mb-2 text-xl font-semibold text-primary">
                      {service.title}
                    </h2>
                    <p className="leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-accent-light py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Not Sure Which Service You Need?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted">
            Call us at {CLINIC.phone} or book a consultation. Dr. Nangia will
            assess your needs and recommend the best treatment plan.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${CLINIC.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Call {CLINIC.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
