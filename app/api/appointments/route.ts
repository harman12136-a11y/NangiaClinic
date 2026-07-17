import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/session";
import { getAppointments, addAppointment } from "@/lib/store";
import type { Appointment, CreateAppointmentInput } from "@/lib/types/appointment";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sorted = getAppointments().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateAppointmentInput;

  if (
    !body.name?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !body.service ||
    !body.date ||
    !body.time
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(body.email.trim())) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const appointment: Appointment = {
    id: randomUUID(),
    name: body.name.trim(),
    email: body.email.trim().toLowerCase(),
    phone: body.phone.trim(),
    service: body.service,
    date: body.date,
    time: body.time,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  addAppointment(appointment);
  return NextResponse.json(appointment, { status: 201 });
}
