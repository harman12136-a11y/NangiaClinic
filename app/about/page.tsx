import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, Heart, Users } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import DoctorPhoto from "@/components/DoctorPhoto";
import PageHero from "@/components/PageHero";
import { CLINIC } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${CLINIC.doctor.name} and our dental clinic serving Paonta Sahib since 1980.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        subtitle="Four decades of trusted dental care for families in Paonta Sahib and surrounding areas."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <AnimateIn>
              <div className="flex justify-center">
                <DoctorPhoto size="md" />
              </div>
            </AnimateIn>

            <AnimateIn delay={150}>
              <div>
                <h2 className="mb-4 text-2xl font-bold text-primary">
                  {CLINIC.doctor.name}
                </h2>
                <p className="mb-2 text-sm font-semibold text-accent">
                  {CLINIC.doctor.qualifications} &bull; {CLINIC.doctor.experience} Experience
                </p>
                <p className="mb-4 leading-relaxed text-muted">
                  {CLINIC.doctor.bio}
                </p>
                <p className="mb-4 leading-relaxed text-muted">
                  With qualifications in Bachelor of Dental Surgery (BDS) and Master
                  of Dental Surgery (MDS), Dr. Nangia brings deep expertise across
                  cosmetic dentistry, endodontics, prosthodontics, and implant
                  dentistry. His commitment to continuing education ensures
                  patients receive the latest, evidence-based treatments.
                </p>
                <p className="leading-relaxed text-muted">
                  Known for his calm demeanor and meticulous attention to detail,
                  Dr. Nangia has earned the trust of thousands of patients over his
                  17+ year career.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <section className="section-gradient py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateIn>
            <h2 className="mb-8 text-center text-2xl font-bold text-primary sm:text-3xl">
              Our Story Since 1980
            </h2>
          </AnimateIn>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <AnimateIn delay={100}>
              <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl ring-2 ring-border sm:h-80">
                <Image
                  src={IMAGES.dentalChair}
                  alt="Modern dental treatment room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 to-transparent" />
              </div>
            </AnimateIn>
            <AnimateIn delay={200}>
              <div>
                <p className="mb-4 leading-relaxed text-muted">
                  {CLINIC.name} was established in 1980 with a simple mission: to
                  provide high-quality, affordable dental care to the community of
                  Paonta Sahib. What began as a small practice has grown into a
                  full-service multispeciality dental clinic.
                </p>
                <p className="mb-4 leading-relaxed text-muted">
                  Over four decades, we have served generations of families — from
                  children&apos;s first dental visits to complex restorative
                  procedures for seniors. Our ISO-approved standards reflect our
                  commitment to safety, hygiene, and clinical excellence.
                </p>
                <p className="leading-relaxed text-muted">
                  Today, under the leadership of {CLINIC.doctor.name}, the clinic
                  continues its legacy of compassionate care while embracing
                  innovations in digital dentistry, laser treatments, and minimally
                  invasive procedures.
                </p>
              </div>
            </AnimateIn>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Award,
                title: "ISO Approved",
                text: "Certified quality and safety standards in every procedure.",
              },
              {
                icon: Users,
                title: "10,000+ Patients",
                text: "Trusted by families across Paonta Sahib and Sirmaur district.",
              },
              {
                icon: Heart,
                title: "Patient First",
                text: "Comfortable, anxiety-free environment for all age groups.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.title} delay={i * 100}>
                <div className="card-gradient hover-lift rounded-xl border border-border p-6 text-center">
                  <div className="btn-gradient mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted">{item.text}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateIn>
            <h2 className="mb-4 text-2xl font-bold text-primary">
              Experience the Difference
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-muted">
              Schedule a consultation with Dr. Nangia and discover personalized
              dental care tailored to your needs.
            </p>
            <Link
              href="/book-appointment"
              className="btn-gradient inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            >
              Book Your Visit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
