import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${CLINIC.name} in Paonta Sahib. Call ${CLINIC.phone} or visit us Mon–Sat 10 AM–8:30 PM.`,
};

export default function ContactPage() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Paonta+Sahib+Himachal+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Contact Us</h1>
          <p className="max-w-2xl text-blue-100">
            We&apos;re here to help. Reach out by phone, email, or visit our
            clinic in Paonta Sahib.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-primary">Address</h2>
                </div>
                <p className="leading-relaxed text-muted">
                  {CLINIC.address.line1}
                  <br />
                  {CLINIC.address.line2}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-primary">Phone</h2>
                </div>
                <a
                  href={`tel:${CLINIC.phoneRaw}`}
                  className="text-lg font-medium text-primary hover:text-primary-dark"
                >
                  {CLINIC.phone}
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-primary">Email</h2>
                </div>
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="text-primary hover:text-primary-dark"
                >
                  {CLINIC.email}
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-light text-accent">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold text-primary">
                    Clinic Hours
                  </h2>
                </div>
                <p className="text-muted">{CLINIC.hours.weekdays}</p>
                <p className="text-muted">{CLINIC.hours.sunday}</p>
              </div>

              <Link
                href="/book-appointment"
                className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#268f72] sm:w-auto"
              >
                Book an Appointment
              </Link>
            </div>

            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                title="Dr. Nangia Dental Clinic Location"
                src={mapEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
