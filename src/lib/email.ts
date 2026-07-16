import emailjs from "@emailjs/browser";

export interface BookingFormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export async function sendBookingEmail(data: BookingFormData): Promise<void> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      "Email service is not configured. Please set EmailJS environment variables.",
    );
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email: "drnangia@gmail.com",
      from_name: data.name,
      phone: data.phone,
      service: data.service,
      appointment_date: data.date,
      appointment_time: data.time,
      message: `New appointment request from ${data.name} (${data.phone}) for ${data.service} on ${data.date} at ${data.time}.`,
    },
    publicKey,
  );
}
