import { NextRequest, NextResponse } from "next/server";
import {
  readShipment,
  writeShipment,
  deleteShipment,
} from "@/lib/shipments";
import type { ShipmentStatus, TrackingEvent } from "@/lib/shipments";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ tracking: string }> }
) {
  try {
    const { tracking } = await params;
    const shipment = await readShipment(tracking);

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ shipment });
  } catch (err) {
    console.error("GET shipment error:", err);
    return NextResponse.json(
      { error: "Failed to fetch shipment" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tracking: string }> }
) {
  try {
    const { tracking } = await params;
    const body = await req.json();

    const shipment = await readShipment(tracking);

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    // Work on a deep copy
    const updated = {
      ...shipment,
      events: [...shipment.events],
    };

    // ── Mode: edit-delivery ──
    if (body.mode === "edit-delivery") {
      if (!body.estimatedDelivery) {
        return NextResponse.json(
          { error: "estimatedDelivery is required" },
          { status: 400 }
        );
      }
      updated.estimatedDelivery     = body.estimatedDelivery;
      updated.estimatedDeliveryTime = body.estimatedDeliveryTime ?? "";
      await writeShipment(updated);
      return NextResponse.json({ shipment: updated });
    }

    // ── Mode: edit-event ──
    if (body.mode === "edit-event") {
      const {
        eventIndex, status, location,
        description, eventDate, eventTime,
      } = body;

      if (
        eventIndex === undefined ||
        eventIndex < 0 ||
        eventIndex >= updated.events.length
      ) {
        return NextResponse.json(
          { error: "Invalid event index" },
          { status: 400 }
        );
      }

      updated.events[eventIndex] = {
        status,
        location,
        description,
        eventDate,
        eventTime,
      };

      updated.currentStatus =
        updated.events[updated.events.length - 1].status as ShipmentStatus;

      await writeShipment(updated);
      return NextResponse.json({ shipment: updated });
    }

    // ── Default: add new tracking event ──
    const { status, location, description, eventDate, eventTime } = body;

    if (!status || !location || !description || !eventDate || !eventTime) {
      return NextResponse.json(
        { error: "Missing event fields" },
        { status: 400 }
      );
    }

    const newEvent: TrackingEvent = {
      status,
      location,
      description,
      eventDate,
      eventTime,
    };

    updated.events.push(newEvent);
    updated.currentStatus = status as ShipmentStatus;

    await writeShipment(updated);

    console.log("✅ Updated shipment:", tracking, "→", status);
    return NextResponse.json({ shipment: updated });
  } catch (err) {
    console.error("PATCH shipment error:", err);
    return NextResponse.json(
      { error: "Failed to update shipment" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ tracking: string }> }
) {
  try {
    const { tracking } = await params;
    const shipment = await readShipment(tracking);

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    await deleteShipment(tracking);

    console.log("🗑️ Deleted shipment:", tracking);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE shipment error:", err);
    return NextResponse.json(
      { error: "Failed to delete shipment" },
      { status: 500 }
    );
  }
}