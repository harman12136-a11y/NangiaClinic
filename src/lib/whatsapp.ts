import type { Appointment } from "@/lib/types/appointment";
import { CLINIC } from "@/lib/constants";

function formatDate(date: string): string {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length >= 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function buildPatientWhatsAppUrl(
  appointment: Appointment,
  type: "accepted" | "rescheduled",
): string {
  let message: string;

  if (type === "accepted") {
    message = `Hello ${appointment.name}, your appointment at ${CLINIC.shortName} has been CONFIRMED.

Service: ${appointment.service}
Date: ${formatDate(appointment.date)}
Time: ${appointment.time}

Please arrive 10 minutes early. For any changes, call ${CLINIC.phone}.

Thank you,
${CLINIC.doctor.name}`;
  } else {
    const newDate = appointment.rescheduledDate ?? appointment.date;
    const newTime = appointment.rescheduledTime ?? appointment.time;
    message = `Hello ${appointment.name}, your appointment at ${CLINIC.shortName} has been RESCHEDULED.

Service: ${appointment.service}
New Date: ${formatDate(newDate)}
New Time: ${newTime}

If this time does not work for you, please call ${CLINIC.phone}.

Thank you,
${CLINIC.doctor.name}`;
  }

  const number = toWhatsAppNumber(appointment.phone);
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
