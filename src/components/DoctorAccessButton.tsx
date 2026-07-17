import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function DoctorAccessButton() {
  return (
    <Link
      href="/doctor/login"
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white hover:scale-105 sm:text-sm"
    >
      <Stethoscope className="h-4 w-4" />
      Are you the doctor?
    </Link>
  );
}
