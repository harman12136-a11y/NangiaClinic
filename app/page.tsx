import Link from "next/link";
import Image from "next/image";
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
import AnimateIn from "@/components/AnimateIn";
import DoctorPhoto from "@/components/DoctorPhoto";
import ReviewsSection from "@/components/ReviewsSection";
import { CLINIC, SERVICES } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

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
      <section className="hero-gradient relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="blob blob-1 absolute -right-20 -top-20 h-96 w-96 rounded-full bg-pink-400/25 blur-3xl" />
          <div className="blob blob-2 absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
          <div className="blob blob-3 absolute right-1/4 top-1/2 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div>
            <p className="animate-fade-in mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Award className="h-4 w-4 text-sky-300" />
              ISO-Approved Dental Clinic
            </p>
            <h1 className="animate-fade-in mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ animationDelay: "100ms" }}>
              {CLINIC.name}
            </h1>
            <p className="animate-fade-in mb-8 text-lg text-white/85 sm:text-xl" style={{ animationDelay: "200ms" }}>
              {CLINIC.tagline}
            </p>
            <div className="animate-fade-in flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "300ms" }}>
              <Link
                href="/book-appointment"
                className="btn-gradient animate-pulse-glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${CLINIC.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                <Phone className="h-4 w-4" />
                {CLINIC.phone}
              </a>
            </div>
          </div>
          <div className="animate-fade-in relative hidden lg:block" style={{ animationDelay: "400ms" }}>
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl shadow-2xl ring-2 ring-white/20">
              <Image
                src={IMAGES.clinic}
                alt="Modern dental clinic"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 animate-float">
              <div className="relative h-full w-full overflow-hidden rounded-xl shadow-xl ring-2 ring-white/30">
                <Image
                  src={IMAGES.drNangia}
                  alt={CLINIC.doctor.name}
                  fill
                  className="object-cover object-top"
                  sizes="128px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {CLINIC.highlights.map((item, i) => {
            const Icon = highlightIcons[item.icon];
            return (
              <AnimateIn key={item.label} delay={i * 100}>
                <div className="card-gradient hover-lift flex items-center gap-3 rounded-xl border border-border px-5 py-4">
                  <div className="btn-gradient flex h-10 w-10 items-center justify-center rounded-full text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-primary">{item.label}</span>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateIn>
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl">
                Our Dental Services
              </h2>
              <p className="mx-auto max-w-xl text-muted">
                Comprehensive dental care for the whole family, using modern
                technology and gentle techniques.
              </p>
            </div>
          </AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon];
              return (
                <AnimateIn key={service.id} delay={i * 80}>
                  <div className="card-gradient hover-lift h-full rounded-xl border border-border p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-light text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {service.description}
                    </p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
          <AnimateIn delay={200}>
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      <section className="section-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateIn>
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
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div className="flex justify-center">
                <DoctorPhoto />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateIn>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="relative h-64 sm:h-80">
                <Image
                  src={IMAGES.dentist}
                  alt="Professional dental care"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 via-purple-800/60 to-sky-900/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                    Ready for a Healthier Smile?
                  </h2>
                  <p className="mx-auto mb-8 max-w-lg text-white/85">
                    Book your appointment today. Our team will confirm your slot
                    via phone or WhatsApp.
                  </p>
                  <Link
                    href="/book-appointment"
                    className="btn-gradient inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white"
                  >
                    Book Appointment Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
