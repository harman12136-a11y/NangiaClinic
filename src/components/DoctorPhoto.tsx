import Image from "next/image";
import { CLINIC } from "@/lib/constants";
import { IMAGES } from "@/lib/images";

interface DoctorPhotoProps {
  size?: "md" | "lg";
  className?: string;
}

export default function DoctorPhoto({ size = "lg", className = "" }: DoctorPhotoProps) {
  const dimensions = size === "lg" ? "h-80 w-80" : "h-72 w-72";

  return (
    <div
      className={`relative ${dimensions} overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/20 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent z-10" />
      <Image
        src={IMAGES.drNangia}
        alt={CLINIC.doctor.name}
        fill
        className="object-cover object-top transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 288px, 320px"
        priority
      />
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
        <p className="text-lg font-bold">{CLINIC.doctor.name}</p>
        <p className="text-sm text-white/80">{CLINIC.doctor.qualifications}</p>
      </div>
    </div>
  );
}
