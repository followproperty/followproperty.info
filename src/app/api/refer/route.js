import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { referrerName, referrerPhone, referrals } = body;
    
    if (!referrerName || !referrerPhone || !referrals || !Array.isArray(referrals) || referrals.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: referrerName, referrerPhone, and referrals are required." },
        { status: 400 }
      );
    }

    // Basic format validation
    for (const r of referrals) {
      if (!r.name || !r.phone) {
        return NextResponse.json(
          { success: false, error: "Each referral contact must have both a name and a phone number." },
          { status: 400 }
        );
      }
    }
    
    // Connect to MongoDB Atlas via native client promise
    const client = await clientPromise;
    const db = client.db("followproperty");
    const collection = db.collection("referrals");
    
    // Insert payload
    const newEntry = {
      referrerName: referrerName.trim(),
      referrerPhone: referrerPhone.trim(),
      referrals: referrals.map(r => ({
        name: r.name.trim(),
        phone: r.phone.trim()
      })),
      projectName: "BPTP Downtown",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await collection.insertOne(newEntry);
    
    return NextResponse.json(
      { success: true, data: { ...newEntry, _id: result.insertedId.toString() } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/refer:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error occurred" },
      { status: 500 }
    );
  }
}
