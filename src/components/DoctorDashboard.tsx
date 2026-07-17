"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Check,
  Clock,
  KeyRound,
  Loader2,
  LogOut,
  Phone,
  RefreshCw,
  Settings,
  User,
  X,
} from "lucide-react";
import { CLINIC, TIME_SLOTS } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import type { Appointment, AppointmentStatus } from "@/lib/types/appointment";

const TABS: { key: AppointmentStatus; label: string; color: string }[] = [
  { key: "pending", label: "Pending", color: "text-amber-400" },
  { key: "accepted", label: "Accepted", color: "text-emerald-400" },
  { key: "declined", label: "Declined", color: "text-red-400" },
  { key: "rescheduled", label: "Rescheduled", color: "text-sky-400" },
];

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  const styles: Record<AppointmentStatus, string> = {
    pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    accepted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    declined: "bg-red-500/15 text-red-300 border-red-500/30",
    rescheduled: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function DoctorDashboard() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("pending");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [rescheduleTarget, setRescheduleTarget] = useState<Appointment | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const fetchAppointments = useCallback(async () => {
    const res = await fetch("/api/appointments");
    if (res.status === 401) {
      router.push("/doctor/login");
      return null;
    }
    return (await res.json()) as Appointment[];
  }, [router]);

  useEffect(() => {
    let active = true;

    async function load() {
      const data = await fetchAppointments();
      if (active && data) {
        setAppointments(data);
        setLoading(false);
      }
    }

    void load();
    const interval = setInterval(() => void load(), 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [fetchAppointments]);

  async function updateStatus(
    id: string,
    status: AppointmentStatus,
    extra?: { rescheduledDate?: string; rescheduledTime?: string },
  ) {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, ...extra }),
      });
      if (res.ok) {
        const data = await fetchAppointments();
        if (data) setAppointments(data);
        setRescheduleTarget(null);
      }
    } finally {
      setActionLoading(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/doctor/login");
    router.refresh();
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg("");
    if (newPassword !== confirmPassword) {
      setPasswordMsg("New passwords do not match.");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setPasswordMsg(data.error ?? "Failed to update password.");
        return;
      }
      setPasswordMsg("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } finally {
      setPasswordLoading(false);
    }
  }

  const filtered = appointments.filter((a) => a.status === activeTab);
  const counts = TABS.reduce(
    (acc, tab) => {
      acc[tab.key] = appointments.filter((a) => a.status === tab.key).length;
      return acc;
    },
    {} as Record<AppointmentStatus, number>,
  );

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0618]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-purple-500/40">
              <Image
                src={IMAGES.drNangia}
                alt={CLINIC.doctor.name}
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{CLINIC.doctor.name}</p>
              <p className="text-xs text-slate-400">Appointment Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void fetchAppointments().then((data) => data && setAppointments(data))}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-xl border p-4 text-left transition-all ${
                activeTab === tab.key
                  ? "border-purple-500/50 bg-purple-500/10 shadow-lg shadow-purple-500/10"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              <p className={`text-2xl font-bold ${tab.color}`}>{counts[tab.key]}</p>
              <p className="mt-1 text-xs text-slate-400">{tab.label}</p>
            </button>
          ))}
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Change Password</h2>
            </div>
            <form onSubmit={handlePasswordChange} className="grid gap-4 sm:grid-cols-3">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50"
                required
              />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50"
                required
                minLength={6}
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-500/50"
                required
                minLength={6}
              />
              <div className="flex items-center gap-3 sm:col-span-3">
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
                {passwordMsg && (
                  <p
                    className={`text-sm ${passwordMsg.includes("success") ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {passwordMsg}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Tab label */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            {TABS.find((t) => t.key === activeTab)?.label} Appointments
            <span className="ml-2 text-sm font-normal text-slate-400">
              ({filtered.length})
            </span>
          </h2>
        </div>

        {/* Appointment list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-16 text-center">
            <p className="text-slate-400">No {activeTab} appointments.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appt) => (
              <div
                key={appt.id}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-white/20"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-white">
                        {appt.name}
                      </h3>
                      <StatusBadge status={appt.status} />
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" />
                        <a href={`tel:${appt.phone}`} className="hover:text-sky-400">
                          {appt.phone}
                        </a>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        {appt.service}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-purple-400" />
                        {formatDate(appt.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-sky-400" />
                        {appt.time}
                      </span>
                    </div>
                    {appt.status === "rescheduled" && appt.rescheduledDate && (
                      <p className="text-sm text-sky-300">
                        Rescheduled to: {formatDate(appt.rescheduledDate)} at{" "}
                        {appt.rescheduledTime}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      Requested {new Date(appt.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>

                  {(appt.status === "pending" || appt.status === "rescheduled") && (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        disabled={actionLoading === appt.id}
                        onClick={() => updateStatus(appt.id, "accepted")}
                        className="flex items-center gap-1.5 rounded-lg bg-emerald-600/20 px-3 py-2 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-600/30 disabled:opacity-50"
                      >
                        {actionLoading === appt.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                        Accept
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading === appt.id}
                        onClick={() => {
                          setRescheduleTarget(appt);
                          setRescheduleDate(appt.date);
                          setRescheduleTime(appt.time);
                        }}
                        className="flex items-center gap-1.5 rounded-lg bg-sky-600/20 px-3 py-2 text-xs font-medium text-sky-300 transition-colors hover:bg-sky-600/30 disabled:opacity-50"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        Reschedule
                      </button>
                      <button
                        type="button"
                        disabled={actionLoading === appt.id}
                        onClick={() => updateStatus(appt.id, "declined")}
                        className="flex items-center gap-1.5 rounded-lg bg-red-600/20 px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-600/30 disabled:opacity-50"
                      >
                        <X className="h-3.5 w-3.5" />
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reschedule modal */}
      {rescheduleTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#130d24] p-6 shadow-2xl">
            <h3 className="mb-1 text-lg font-semibold text-white">
              Reschedule Appointment
            </h3>
            <p className="mb-5 text-sm text-slate-400">
              {rescheduleTarget.name} &mdash; {rescheduleTarget.service}
            </p>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  New Date
                </label>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={today}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500/50"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-400">
                  New Time
                </label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-sky-500/50"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#130d24]">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  updateStatus(rescheduleTarget.id, "rescheduled", {
                    rescheduledDate: rescheduleDate,
                    rescheduledTime: rescheduleTime,
                  })
                }
                disabled={actionLoading === rescheduleTarget.id}
                className="flex-1 rounded-lg bg-gradient-to-r from-sky-500 to-purple-600 py-2.5 text-sm font-medium text-white disabled:opacity-50"
              >
                {actionLoading === rescheduleTarget.id
                  ? "Saving..."
                  : "Confirm Reschedule"}
              </button>
              <button
                type="button"
                onClick={() => setRescheduleTarget(null)}
                className="rounded-lg border border-white/10 px-4 py-2.5 text-sm text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
