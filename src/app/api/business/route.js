import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, city, businessType, location, designation, requirements } = body;

    // Server-side validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: 'Full name is required' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ success: false, message: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }
    if (!city || !city.trim()) {
      return NextResponse.json({ success: false, message: 'Personal city is required' }, { status: 400 });
    }
    if (!businessType || !businessType.trim()) {
      return NextResponse.json({ success: false, message: 'Business type is required' }, { status: 400 });
    }
    if (!location || !location.trim()) {
      return NextResponse.json({ success: false, message: 'Business location is required' }, { status: 400 });
    }
    if (!designation || !designation.trim()) {
      return NextResponse.json({ success: false, message: 'Designation is required' }, { status: 400 });
    }
    if (!requirements || !requirements.trim()) {
      return NextResponse.json({ success: false, message: 'Real estate requirements are required' }, { status: 400 });
    }

    // Connect to MongoDB Atlas via connection pool client promise
    const client = await clientPromise;
    const db = client.db('followproperty');
    const collection = db.collection('business_inquiries');

    // Insert payload
    const newEntry = {
      name: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      businessType: businessType.trim(),
      location: location.trim(),
      designation: designation.trim(),
      requirements: requirements.trim(),
      registeredAt: new Date()
    };

    const result = await collection.insertOne(newEntry);

    return NextResponse.json({
      success: true,
      message: 'Business expansion inquiry successfully submitted.',
      inquiryId: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Business MongoDB API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server database error. Please verify your connection config and try again.'
    }, { status: 500 });
  }
}
