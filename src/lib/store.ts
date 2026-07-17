import { Redis } from "@upstash/redis";
import { promises as fs } from "fs";
import path from "path";
import type { AdminData, Appointment } from "@/lib/types/appointment";

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");
const ADMIN_FILE = path.join(DATA_DIR, "admin.json");

const REDIS_APPOINTMENTS_KEY = "dental:appointments";
const REDIS_ADMIN_KEY = "dental:admin";

let memoryAppointments: Appointment[] | null = null;
let memoryAdmin: AdminData | null = null;

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
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

async function writeJsonFile<T>(filePath: string, data: T): Promise<boolean> {
  try {
    await ensureDataDir();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch {
    return false;
  }
}

export async function getAppointments(): Promise<Appointment[]> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get<Appointment[]>(REDIS_APPOINTMENTS_KEY);
      if (data) {
        memoryAppointments = data;
        return data;
      }
    } catch {
      // fall through to file/memory
    }
  }

  if (memoryAppointments) return memoryAppointments;

  const fromFile = await readJsonFile<Appointment[]>(APPOINTMENTS_FILE, []);
  memoryAppointments = fromFile;
  return fromFile;
}

export async function saveAppointments(
  appointments: Appointment[],
): Promise<void> {
  memoryAppointments = appointments;

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_APPOINTMENTS_KEY, appointments);
      return;
    } catch {
      // fall through
    }
  }

  await writeJsonFile(APPOINTMENTS_FILE, appointments);
}

export async function getAdminData(): Promise<AdminData | null> {
  const redis = getRedis();
  if (redis) {
    try {
      const data = await redis.get<AdminData>(REDIS_ADMIN_KEY);
      if (data?.passwordHash) {
        memoryAdmin = data;
        return data;
      }
    } catch {
      // fall through
    }
  }

  if (memoryAdmin?.passwordHash) return memoryAdmin;

  const fromFile = await readJsonFile<AdminData | null>(ADMIN_FILE, null);
  if (fromFile?.passwordHash) memoryAdmin = fromFile;
  return fromFile;
}

export async function saveAdminData(data: AdminData): Promise<void> {
  memoryAdmin = data;

  const redis = getRedis();
  if (redis) {
    try {
      await redis.set(REDIS_ADMIN_KEY, data);
      return;
    } catch {
      // fall through
    }
  }

  await writeJsonFile(ADMIN_FILE, data);
}

export function setMemoryAdminHash(hash: string): void {
  memoryAdmin = { passwordHash: hash };
}
