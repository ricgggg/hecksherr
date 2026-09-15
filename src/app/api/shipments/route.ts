import { NextRequest, NextResponse } from "next/server";
import {
  readShipments,
  readShipment,
  writeShipment,
  generateTrackingNumber,
} from "@/lib/shipments";
import type { Shipment } from "@/lib/shipments";

export async function GET() {
  try {
    const shipments = await readShipments();
    return NextResponse.json({ shipments });
  } catch (err) {
    console.error("GET /api/shipments error:", err);
    return NextResponse.json(
      { error: "Failed to read shipments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      senderName, senderPhone, senderAddress,
      receiverName, receiverPhone, receiverAddress,
      packageDescription, weight,
      estimatedDelivery, estimatedDeliveryTime,
      orderDate, orderTime,
    } = body;

    if (
      !senderName || !senderPhone || !senderAddress ||
      !receiverName || !receiverPhone || !receiverAddress ||
      !packageDescription || !weight ||
      !estimatedDelivery || !orderDate || !orderTime
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique tracking number
    let trackingNumber = generateTrackingNumber();
    let existing = await readShipment(trackingNumber);
    while (existing) {
      trackingNumber = generateTrackingNumber();
      existing = await readShipment(trackingNumber);
    }

    const newShipment: Shipment = {
      trackingNumber,
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      packageDescription,
      weight,
      estimatedDelivery,
      estimatedDeliveryTime: estimatedDeliveryTime ?? "",
      currentStatus: "Order Placed",
      createdAt: new Date().toISOString(),
      events: [
        {
          status: "Order Placed",
          location: senderAddress,
          description:
            "Shipment order has been placed and is being processed by Green Carrier.",
          eventDate: orderDate,
          eventTime: orderTime,
        },
      ],
    };

    await writeShipment(newShipment);

    console.log("✅ Created shipment:", trackingNumber);

    return NextResponse.json({
      trackingNumber,
      shipment: newShipment,
    });
  } catch (err) {
    console.error("POST /api/shipments error:", err);
    return NextResponse.json(
      { error: "Failed to create shipment" },
      { status: 500 }
    );
  }
}