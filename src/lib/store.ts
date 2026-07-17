import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { Appointment } from "@/lib/types/appointment";

declare global {
  var __dentalAppointments: Appointment[] | undefined;
}

function getStorePath(): string {
  if (process.env.VERCEL) {
    return "/tmp/dental-appointments.json";
  }
  return path.join(process.cwd(), "data", "appointments.json");
}

function loadFromDisk(): Appointment[] {
  try {
    const filePath = getStorePath();
    if (existsSync(filePath)) {
      const raw = readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw) as Appointment[];
      globalThis.__dentalAppointments = parsed;
      return parsed;
    }
  } catch (err) {
    console.error("Failed to load appointments:", err);
  }
  return [];
}

function persistToDisk(data: Appointment[]): void {
  globalThis.__dentalAppointments = data;
  try {
    const filePath = getStorePath();
    if (!process.env.VERCEL) {
      mkdirSync(path.dirname(filePath), { recursive: true });
    }
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save appointments:", err);
  }
}

function getAll(): Appointment[] {
  // On Vercel always read from /tmp so writes are visible to the next request
  if (process.env.VERCEL) {
    return loadFromDisk();
  }
  if (globalThis.__dentalAppointments?.length) {
    return globalThis.__dentalAppointments;
  }
  return loadFromDisk();
}

export function getAppointments(): Appointment[] {
  return [...getAll()];
}

export function addAppointment(appointment: Appointment): void {
  const all = getAll();
  all.push(appointment);
  persistToDisk(all);
}

export function updateAppointment(
  id: string,
  updates: Partial<Appointment>,
): Appointment | null {
  const all = getAll();
  const index = all.findIndex((a) => a.id === id);
  if (index === -1) return null;
  all[index] = { ...all[index], ...updates };
  persistToDisk(all);
  return all[index];
}
