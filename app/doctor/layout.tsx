import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doctor Portal",
  robots: { index: false, follow: false },
};

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0618] text-slate-100">
      {children}
    </div>
  );
}
