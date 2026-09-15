import { NextRequest, NextResponse } from "next/server";
import { readShipment, writeShipment } from "@/lib/shipments";
import type { ShipmentStatus } from "@/lib/shipments";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ tracking: string }> }
) {
  try {
    const { tracking } = await params;
    const body = await req.json();
    const { eventIndex } = body;

    const shipment = await readShipment(tracking);

    if (!shipment) {
      return NextResponse.json(
        { error: "Shipment not found" },
        { status: 404 }
      );
    }

    const updated = {
      ...shipment,
      events: [...shipment.events],
    };

    if (
      typeof eventIndex !== "number" ||
      eventIndex < 0 ||
      eventIndex >= updated.events.length
    ) {
      return NextResponse.json(
        { error: "Invalid event index" },
        { status: 400 }
      );
    }

    updated.events.splice(eventIndex, 1);

    updated.currentStatus =
      updated.events.length > 0
        ? (updated.events[updated.events.length - 1].status as ShipmentStatus)
        : "Order Placed";

    await writeShipment(updated);

    console.log("🗑️ Deleted event", eventIndex, "from", tracking);
    return NextResponse.json({ shipment: updated });
  } catch (err) {
    console.error("DELETE event error:", err);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}