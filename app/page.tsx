import Link from "next/link";
import {
  Activity,
  Anchor,
  ArrowRight,
  Award,
  Baby,
  Calendar,
  CheckCircle,
  Phone,
  Scan,
  Shield,
  Sparkles,
  Star,
  Sun,
} from "lucide-react";
import { CLINIC, SERVICES } from "@/lib/constants";

const iconMap = {
  sparkles: Sparkles,
  activity: Activity,
  scan: Scan,
  sun: Sun,
  baby: Baby,
  anchor: Anchor,
} as const;

const highlightIcons = {
  shield: Shield,
  calendar: Calendar,
  star: Star,
} as const;

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1a4f7a] to-primary-dark text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20" />
          <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-accent/30" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Award className="h-4 w-4 text-accent" />
              ISO-Approved Dental Clinic
            </p>
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {CLINIC.name}
            </h1>
            <p className="mb-8 text-lg text-blue-100 sm:text-xl">
              {CLINIC.tagline}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#268f72]"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${CLINIC.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                {CLINIC.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {CLINIC.highlights.map((item) => {
            const Icon = highlightIcons[item.icon];
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl bg-accent-light px-5 py-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-semibold text-primary">{item.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl">
              Our Dental Services
            </h2>
            <p className="mx-auto max-w-xl text-muted">
              Comprehensive dental care for the whole family, using modern
              technology and gentle techniques.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <div
                  key={service.id}
                  className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-primary">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-accent-light py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
                Meet {CLINIC.doctor.name}
              </h2>
              <p className="mb-2 text-sm font-semibold text-accent">
                {CLINIC.doctor.qualifications} &bull;{" "}
                {CLINIC.doctor.experience} Experience
              </p>
              <p className="mb-6 leading-relaxed text-muted">
                {CLINIC.doctor.bio}
              </p>
              <ul className="mb-6 space-y-2">
                {[
                  "Patient-first, pain-free approach",
                  "Advanced cosmetic & restorative dentistry",
                  "Serving Paonta Sahib families since 1980",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex h-64 w-64 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-xl sm:h-80 sm:w-80">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-4xl font-bold">
                    RN
                  </div>
                  <p className="text-xl font-bold">{CLINIC.doctor.name}</p>
                  <p className="text-sm text-blue-200">
                    {CLINIC.doctor.qualifications}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
            Ready for a Healthier Smile?
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted">
            Book your appointment today. Our team will confirm your slot via
            phone or WhatsApp.
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            Book Appointment Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
