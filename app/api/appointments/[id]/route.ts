import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { updateAppointment } from "@/lib/store";
import type { AppointmentStatus, UpdateAppointmentInput } from "@/lib/types/appointment";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = (await request.json()) as UpdateAppointmentInput;

  const validStatuses: AppointmentStatus[] = [
    "pending",
    "accepted",
    "declined",
    "rescheduled",
  ];

  if (body.status && !validStatuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  if (body.status === "rescheduled" && (!body.rescheduledDate || !body.rescheduledTime)) {
    return NextResponse.json(
      { error: "Rescheduled date and time are required." },
      { status: 400 },
    );
  }

  const updated = updateAppointment(id, {
    ...body,
    updatedAt: new Date().toISOString(),
  });

  if (!updated) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  return NextResponse.json(updated);
}
