import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import PageHero from "@/components/PageHero";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${CLINIC.name} in Paonta Sahib. Call ${CLINIC.phone} or visit us Mon–Sat 10 AM–8:30 PM.`,
};

export default function ContactPage() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Paonta+Sahib+Himachal+Pradesh&t=&z=14&ie=UTF8&iwloc=&output=embed";

  const contactCards = [
    {
      icon: MapPin,
      title: "Address",
      content: (
        <p className="leading-relaxed text-muted">
          {CLINIC.address.line1}
          <br />
          {CLINIC.address.line2}
        </p>
      ),
    },
    {
      icon: Phone,
      title: "Phone",
      content: (
        <a
          href={`tel:${CLINIC.phoneRaw}`}
          className="text-lg font-medium text-primary transition-colors hover:text-accent"
        >
          {CLINIC.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a
          href={`mailto:${CLINIC.email}`}
          className="text-primary transition-colors hover:text-accent"
        >
          {CLINIC.email}
        </a>
      ),
    },
    {
      icon: Clock,
      title: "Clinic Hours",
      content: (
        <>
          <p className="text-muted">{CLINIC.hours.weekdays}</p>
          <p className="text-muted">{CLINIC.hours.sunday}</p>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out by phone, email, or visit our clinic in Paonta Sahib."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              {contactCards.map((card, i) => (
                <AnimateIn key={card.title} delay={i * 80}>
                  <div className="card-gradient hover-lift rounded-xl border border-border p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="btn-gradient flex h-10 w-10 items-center justify-center rounded-lg text-white">
                        <card.icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-semibold text-primary">
                        {card.title}
                      </h2>
                    </div>
                    {card.content}
                  </div>
                </AnimateIn>
              ))}

              <AnimateIn delay={350}>
                <Link
                  href="/book-appointment"
                  className="btn-gradient inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white sm:w-auto"
                >
                  Book an Appointment
                </Link>
              </AnimateIn>
            </div>

            <AnimateIn delay={200}>
              <div className="hover-lift overflow-hidden rounded-xl border border-border shadow-lg">
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
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
