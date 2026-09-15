import { Redis } from "@upstash/redis";
import bcrypt from "bcryptjs";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ADMIN_KEY = "gc:admin:password_hash";

export async function isAdminPasswordSet(): Promise<boolean> {
  const hash = await redis.get<string>(ADMIN_KEY);
  return !!hash;
}

export async function setAdminPassword(password: string): Promise<void> {
  const hash = await bcrypt.hash(password, 10);
  await redis.set(ADMIN_KEY, hash);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const hash = await redis.get<string>(ADMIN_KEY);
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}