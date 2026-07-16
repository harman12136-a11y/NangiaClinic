import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import AnimateIn from "@/components/AnimateIn";
import PageHero from "@/components/PageHero";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: `Book a dental appointment at ${CLINIC.name}. Choose your service, date, and time online.`,
};

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        title="Book an Appointment"
        subtitle="Fill in the form below and we'll get back to you to confirm your appointment via phone or WhatsApp."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <AnimateIn>
            <div className="card-gradient rounded-xl border border-border p-6 sm:p-8">
              <AppointmentForm />
            </div>
          </AnimateIn>
          <p className="mt-6 text-center text-sm text-muted">
            Prefer to call? Reach us at{" "}
            <a
              href={`tel:${CLINIC.phoneRaw}`}
              className="font-medium text-primary transition-colors hover:text-accent"
            >
              {CLINIC.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
