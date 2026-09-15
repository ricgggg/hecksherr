export type ShipmentStatus =
  | "Order Placed"
  | "Picked Up"
  | "In Transit"
  | "On Hold"
  | "Customs Hold"
  | "Pending Customs Clearance"
  | "Customs Documentation Required"
  | "Duty Payment Required"
  | "Customs Cleared"
  | "Released from Customs"
  | "Seized by Customs"
  | "Out for Delivery"
  | "Delivered"
  | "Exception";

export interface TrackingEvent {
  status: ShipmentStatus;
  location: string;
  description: string;
  eventDate: string;
  eventTime: string;
}

export interface Shipment {
  trackingNumber: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  packageDescription: string;
  weight: string;
  estimatedDelivery: string;
  estimatedDeliveryTime: string;
  currentStatus: ShipmentStatus;
  events: TrackingEvent[];
  createdAt: string;
}

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url:   process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ALL_KEY = "gc:shipments:all"; // a Redis Set that stores all tracking numbers

// ── Read all shipments ──────────────────────────────────────────────────────
export async function readShipments(): Promise<Shipment[]> {
  try {
    // Get all tracking numbers from the set
    const trackingNumbers = await redis.smembers(ALL_KEY);

    if (!trackingNumbers || trackingNumbers.length === 0) return [];

    // Fetch each shipment by its key
    const pipeline = redis.pipeline();
    for (const tn of trackingNumbers) {
      pipeline.get(`gc:shipment:${tn}`);
    }

    const results = await pipeline.exec();

    const shipments: Shipment[] = [];
    for (const result of results) {
      if (result) {
        // Upstash auto-parses JSON
        const s = result as Shipment;
        if (s && s.trackingNumber) shipments.push(s);
      }
    }

    // Sort by createdAt descending (newest first)
    shipments.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return shipments;
  } catch (err) {
    console.error("readShipments error:", err);
    return [];
  }
}

// ── Read single shipment ────────────────────────────────────────────────────
export async function readShipment(
  trackingNumber: string
): Promise<Shipment | null> {
  try {
    const shipment = await redis.get<Shipment>(`gc:shipment:${trackingNumber}`);
    return shipment ?? null;
  } catch (err) {
    console.error("readShipment error:", err);
    return null;
  }
}

// ── Write (save/update) a single shipment ───────────────────────────────────
export async function writeShipment(shipment: Shipment): Promise<void> {
  try {
    // Save the shipment object
    await redis.set(`gc:shipment:${shipment.trackingNumber}`, shipment);
    // Add tracking number to the set (safe to call even if already exists)
    await redis.sadd(ALL_KEY, shipment.trackingNumber);
  } catch (err) {
    console.error("writeShipment error:", err);
    throw err;
  }
}

// ── Delete a shipment ───────────────────────────────────────────────────────
export async function deleteShipment(trackingNumber: string): Promise<void> {
  try {
    await redis.del(`gc:shipment:${trackingNumber}`);
    await redis.srem(ALL_KEY, trackingNumber);
  } catch (err) {
    console.error("deleteShipment error:", err);
    throw err;
  }
}

// ── Generate unique tracking number ────────────────────────────────────────
export function generateTrackingNumber(): string {
  const prefix = "GC";
  const year   = new Date().getFullYear().toString().slice(-2);
  const chars  = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rand     = "";
  for (let i = 0; i < 7; i++) {
    rand += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}${year}-${rand}`;
}