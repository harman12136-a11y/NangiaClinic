import type { Metadata } from "next";
import AppointmentForm from "@/components/AppointmentForm";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: `Book a dental appointment at ${CLINIC.name}. Choose your service, date, and time online.`,
};

export default function BookAppointmentPage() {
  return (
    <>
      <section className="bg-gradient-to-r from-primary to-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
            Book an Appointment
          </h1>
          <p className="max-w-2xl text-blue-100">
            Fill in the form below and we&apos;ll get back to you to confirm your
            appointment via phone or WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <AppointmentForm />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            Prefer to call? Reach us at{" "}
            <a
              href={`tel:${CLINIC.phoneRaw}`}
              className="font-medium text-primary hover:text-primary-dark"
            >
              {CLINIC.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
