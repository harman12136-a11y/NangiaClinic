import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthenticated } from "@/lib/auth";
import { getAppointments, saveAppointments } from "@/lib/store";
import type { Appointment, CreateAppointmentInput } from "@/lib/types/appointment";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const appointments = await getAppointments();
  const sorted = [...appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return NextResponse.json(sorted);
}

export async function POST(request: Request) {
  const body = (await request.json()) as CreateAppointmentInput;

  if (!body.name?.trim() || !body.phone?.trim() || !body.service || !body.date || !body.time) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const now = new Date().toISOString();
  const appointment: Appointment = {
    id: randomUUID(),
    name: body.name.trim(),
    phone: body.phone.trim(),
    service: body.service,
    date: body.date,
    time: body.time,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };

  const appointments = await getAppointments();
  appointments.push(appointment);
  await saveAppointments(appointments);

  return NextResponse.json(appointment, { status: 201 });
}
