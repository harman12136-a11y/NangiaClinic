import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Heart, Users } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${CLINIC.doctor.name} and our dental clinic serving Paonta Sahib since 1980.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">About Us</h1>
          <p className="max-w-2xl text-blue-100">
            Four decades of trusted dental care for families in Paonta Sahib and
            surrounding areas.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="flex justify-center">
              <div className="flex h-72 w-72 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-xl">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-white/20 text-5xl font-bold">
                    RN
                  </div>
                  <p className="text-2xl font-bold">{CLINIC.doctor.name}</p>
                  <p className="text-blue-100">{CLINIC.doctor.qualifications}</p>
                  <p className="mt-1 text-sm text-blue-200">
                    {CLINIC.doctor.experience} Experience
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-primary">
                {CLINIC.doctor.name}
              </h2>
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
          </div>
        </div>
      </section>

      <section className="bg-accent-light py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-primary sm:text-3xl">
            Our Story Since 1980
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 leading-relaxed text-muted">
              {CLINIC.name} was established in 1980 with a simple mission: to
              provide high-quality, affordable dental care to the community of
              Paonta Sahib. What began as a small practice has grown into a
              full-service multispeciality dental clinic, equipped with modern
              technology and staffed by experienced professionals.
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
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-light text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold text-primary">{item.title}</h3>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold text-primary">
            Experience the Difference
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted">
            Schedule a consultation with Dr. Nangia and discover personalized
            dental care tailored to your needs.
          </p>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#268f72]"
          >
            Book Your Visit
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
