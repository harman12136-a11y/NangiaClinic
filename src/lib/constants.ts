export const CLINIC = {
  name: "Dr. Nangia's Multispeciality Dental Clinic",
  shortName: "Dr. Nangia's Dental Clinic",
  tagline: "Trusted Dental Care in Paonta Sahib Since 1980",
  phone: "+91 94184 90757",
  phoneRaw: "+919418490757",
  email: "drnangia@gmail.com",
  address: {
    line1: "Near Main Market, Paonta Sahib",
    line2: "District Sirmaur, Himachal Pradesh 173025",
    full: "Near Main Market, Paonta Sahib, District Sirmaur, Himachal Pradesh 173025",
  },
  hours: {
    weekdays: "Mon – Sat: 10:00 AM – 8:30 PM",
    sunday: "Sun: 11:00 AM – 2:00 PM",
  },
  doctor: {
    name: "Dr. Rajat Nangia",
    qualifications: "BDS, MDS",
    experience: "17+ years",
    bio: "Dr. Rajat Nangia is a highly skilled dental surgeon with advanced training in cosmetic dentistry, endodontics, and implantology. He leads the clinic with a patient-first approach, combining modern techniques with compassionate care.",
  },
  highlights: [
    { label: "ISO Approved", icon: "shield" as const },
    { label: "Since 1980", icon: "calendar" as const },
    { label: "4.9 Star Rating", icon: "star" as const },
  ],
  whatsappMessage: "Hello Dr. Nangia, I would like to book a dental appointment.",
} as const;

export const SERVICES = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with veneers, bonding, and smile makeovers tailored to your facial features.",
    icon: "sparkles" as const,
  },
  {
    id: "root-canal",
    title: "Root Canal Treatment",
    description:
      "Pain-free root canal therapy using modern rotary instruments and digital imaging for precise results.",
    icon: "activity" as const,
  },
  {
    id: "x-rays",
    title: "Dental X-Rays",
    description:
      "Digital radiography for accurate diagnosis with minimal radiation exposure and instant results.",
    icon: "scan" as const,
  },
  {
    id: "whitening",
    title: "Teeth Whitening",
    description:
      "Professional in-office and take-home whitening treatments for a brighter, confident smile.",
    icon: "sun" as const,
  },
  {
    id: "pediatric",
    title: "Pediatric Dental Care",
    description:
      "Gentle, child-friendly dental care in a calm environment to build healthy habits early.",
    icon: "baby" as const,
  },
  {
    id: "implants",
    title: "Dental Implants",
    description:
      "Permanent tooth replacement solutions with titanium implants and natural-looking crowns.",
    icon: "anchor" as const,
  },
] as const;

export const SERVICE_OPTIONS = SERVICES.map((s) => ({
  value: s.id,
  label: s.title,
}));

export const TIME_SLOTS = [
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/book-appointment", label: "Book Appointment" },
] as const;

export const REVIEWS = [
  {
    name: "Rahul D.",
    rating: 5,
    text: "Dr Rajat Nangia runs a thoroughly professional dental care setup. Hygiene and personalised care are hallmarks of this clinic. Extremely attentive, soft spoken, gentle and precise. Charges are very reasonable. Hats off!",
    source: "Google Review",
  },
  {
    name: "Happy Patient",
    rating: 5,
    text: "Got multiple treatments done here — RCTs, scaling, wisdom tooth extraction and every experience has been great! Dr. Rajat's hand is super steady and gentle. Service is top-notch. Totally recommend!",
    source: "Google Review",
  },
  {
    name: "Hemant",
    rating: 5,
    text: "Very nicely done. Great value for the treatment. Professional, caring and one of the best dental clinics in Paonta Sahib.",
    source: "Google Review",
  },
  {
    name: "Local Guide",
    rating: 5,
    text: "An awesome dental clinic! The office reflects genuine concern for patient comfort. Dr. Nangia has extensive knowledge, flawless technique and a warm bedside manner.",
    source: "Google Review",
  },
  {
    name: "Family Patient",
    rating: 5,
    text: "The clinic is well set up for both adults and children. Dr. Nangia and the staff are the utmost professionals — warm, caring and attentive to every patient's needs.",
    source: "Google Review",
  },
  {
    name: "Verified Patient",
    rating: 5,
    text: "Surely one of the finest dental clinics in Paonta Sahib. Sound knowledge, skilled hands, and a calm environment. Highly recommended for families.",
    source: "Google Review",
  },
] as const;

export const GOOGLE_RATING = {
  score: 4.9,
  totalReviews: "75+",
} as const;
