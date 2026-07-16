import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CLINIC, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="hero-gradient mt-auto text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold">{CLINIC.shortName}</h3>
          <p className="mb-4 text-sm text-white/75">{CLINIC.tagline}</p>
          <div className="flex items-start gap-2 text-sm text-white/75">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {CLINIC.address.line1}
              <br />
              {CLINIC.address.line2}
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold">Contact</h3>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${CLINIC.phoneRaw}`} className="hover:text-white">
                {CLINIC.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${CLINIC.email}`} className="hover:text-white">
                {CLINIC.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {CLINIC.hours.weekdays}
                <br />
                {CLINIC.hours.sunday}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
      </div>
    </footer>
  );
}
