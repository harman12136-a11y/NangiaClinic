import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { AdminData, Appointment } from "@/lib/types/appointment";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

const REDIS_APPOINTMENTS_KEY = "dental:appointments";
const REDIS_ADMIN_KEY = "dental:admin";

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getAppointments(): Promise<Appointment[]> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<Appointment[]>(REDIS_APPOINTMENTS_KEY);
    return data ?? [];
  }
  return readJsonFile<Appointment[]>(APPOINTMENTS_FILE, []);
}

export async function saveAppointments(
  appointments: Appointment[],
): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_APPOINTMENTS_KEY, appointments);
    return;
  }
  await writeJsonFile(APPOINTMENTS_FILE, appointments);
}

export async function getAdminData(): Promise<AdminData | null> {
  const redis = getRedis();
  if (redis) {
    return redis.get<AdminData>(REDIS_ADMIN_KEY);
  }
  return readJsonFile<AdminData | null>(ADMIN_FILE, null);
}

export async function saveAdminData(data: AdminData): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(REDIS_ADMIN_KEY, data);
    return;
  }
  await writeJsonFile(ADMIN_FILE, data);
}
