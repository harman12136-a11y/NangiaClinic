import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  Anchor,
  ArrowRight,
  Baby,
  Scan,
  Sparkles,
  Sun,
} from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import PageHero from "@/components/PageHero";
import { CLINIC, SERVICES } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

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
      <PageHero
        title="Our Services"
        subtitle="Complete dental solutions under one roof — from preventive care to advanced restorative treatments."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateIn>
            <div className="relative mb-12 h-48 overflow-hidden rounded-2xl shadow-lg sm:h-56">
              <Image
                src={IMAGES.clinic}
                alt="Dental clinic interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1152px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-sky-900/50" />
            </div>
          </AnimateIn>

          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <AnimateIn key={service.id} delay={i * 80}>
                  <div className="card-gradient hover-lift flex gap-5 rounded-xl border border-border p-6">
                    <div className="btn-gradient flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white">
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
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <AnimateIn>
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
                className="btn-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              >
                Book Consultation
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${CLINIC.phoneRaw}`}
                className="inline-flex items-center gap-2 rounded-xl border border-primary px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
              >
                Call {CLINIC.phone}
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
