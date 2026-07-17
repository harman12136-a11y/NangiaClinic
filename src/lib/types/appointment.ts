export type AppointmentStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "rescheduled";

export interface Appointment {
  id: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  rescheduledDate?: string;
  rescheduledTime?: string;
  doctorNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentInput {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export interface UpdateAppointmentInput {
  status?: AppointmentStatus;
  rescheduledDate?: string;
  rescheduledTime?: string;
  doctorNote?: string;
}

export interface AdminData {
  passwordHash: string;
}
