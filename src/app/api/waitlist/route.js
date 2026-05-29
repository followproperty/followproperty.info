import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, city, phone, alreadyOwn, leadSource, projectName } = body;

    // Server-side validation
    if (!firstName || !firstName.trim()) {
      return NextResponse.json({ success: false, message: 'First name is required' }, { status: 400 });
    }
    if (!lastName || !lastName.trim()) {
      return NextResponse.json({ success: false, message: 'Last name is required' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ success: false, message: 'Email address is required' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ success: false, message: 'Please enter a valid email address' }, { status: 400 });
    }
    if (!city || !city.trim()) {
      return NextResponse.json({ success: false, message: 'City is required' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ success: false, message: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }

    // Connect to MongoDB Atlas via connection pool client promise
    const client = await clientPromise;
    const db = client.db('followproperty');
    const collection = db.collection('waitlist');

    // De-duplicate email submissions
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await collection.findOne({ 
      email: normalizedEmail,
      projectName: projectName ? projectName.trim() : null
    });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: projectName
          ? `You have already registered your interest for ${projectName} with this email.`
          : 'This email is already registered on our early access waitlist.'
      }, { status: 400 });
    }

    // Insert payload
    const newEntry = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      city: city.trim(),
      phone: phone.trim(),
      alreadyOwn: typeof alreadyOwn === 'boolean' ? alreadyOwn : false,
      leadSource: leadSource ? leadSource.trim() : 'general',
      projectName: projectName ? projectName.trim() : null,
      registeredAt: new Date()
    };

    const result = await collection.insertOne(newEntry);

    return NextResponse.json({
      success: true,
      message: 'Successfully registered for waitlist early access.',
      registrationId: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Waitlist MongoDB API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server database error. Please verify your connection config and try again.'
    }, { status: 500 });
  }
}
