import type { Appointment } from "@/lib/types/appointment";

// In-memory store — works on Vercel without any cloud/database setup
const appointments: Appointment[] = [];

export function getAppointments(): Appointment[] {
  return [...appointments];
}

export function saveAppointments(data: Appointment[]): void {
  appointments.length = 0;
  appointments.push(...data);
}

export function addAppointment(appointment: Appointment): void {
  appointments.push(appointment);
}

export function updateAppointment(
  id: string,
  updates: Partial<Appointment>,
): Appointment | null {
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) return null;
  appointments[index] = { ...appointments[index], ...updates };
  return appointments[index];
}
