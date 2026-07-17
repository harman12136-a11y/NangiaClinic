import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/session";
import { updateAppointment } from "@/lib/store";
import type { Appointment, AppointmentStatus, UpdateAppointmentInput } from "@/lib/types/appointment";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
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

    if (
      body.status === "rescheduled" &&
      (!body.rescheduledDate || !body.rescheduledTime)
    ) {
      return NextResponse.json(
        { error: "Rescheduled date and time are required." },
        { status: 400 },
      );
    }

    const updates: Partial<Appointment> = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Reschedule = update slot and auto-accept
    if (body.status === "rescheduled") {
      updates.status = "accepted";
      updates.date = body.rescheduledDate!;
      updates.time = body.rescheduledTime!;
      delete updates.rescheduledDate;
      delete updates.rescheduledTime;
    }

    const updated = updateAppointment(id, updates);

    if (!updated) {
      return NextResponse.json(
        { error: "Appointment not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH appointment error:", err);
    return NextResponse.json(
      { error: "Failed to update appointment." },
      { status: 500 },
    );
  }
}
