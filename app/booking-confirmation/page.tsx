import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Home, MessageCircle } from "lucide-react";
import AnimateIn from "@/components/AnimateIn";
import { CLINIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  description: "Your appointment request has been received. Dr. Nangia will confirm shortly.",
};

export default function BookingConfirmationPage() {
  const whatsappUrl = `https://wa.me/${CLINIC.phoneRaw.replace("+", "")}?text=${encodeURIComponent("Hello Dr. Nangia, I just submitted an appointment request online.")}`;

  return (
    <section className="section-gradient flex flex-1 items-center py-16 sm:py-24">
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <AnimateIn>
          <div className="btn-gradient mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full animate-pulse-glow">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>

          <h1 className="mb-4 text-2xl font-bold text-primary sm:text-3xl">
            Thank You for Your Booking!
          </h1>

          <p className="mb-2 leading-relaxed text-muted">
            Your appointment request has been sent successfully.{" "}
            <strong className="text-foreground">{CLINIC.doctor.name}</strong> or
            our team will contact you shortly to confirm your appointment via
            phone or WhatsApp.
          </p>

          <p className="mb-8 text-sm text-muted">
            If you need immediate assistance, please call us at{" "}
            <a
              href={`tel:${CLINIC.phoneRaw}`}
              className="font-medium text-primary transition-colors hover:text-accent"
            >
              {CLINIC.phone}
            </a>
            .
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="btn-gradient inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#1fb855] hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Message on WhatsApp
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
