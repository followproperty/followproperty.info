import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, resumeLink, leadSource } = body;

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
    if (!phone || !phone.trim()) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      return NextResponse.json({ success: false, message: 'Please enter a valid 10-digit phone number' }, { status: 400 });
    }
    if (!resumeLink || !resumeLink.trim()) {
      return NextResponse.json({ success: false, message: 'Google Drive resume link is required' }, { status: 400 });
    }
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(resumeLink.trim())) {
      return NextResponse.json({ success: false, message: 'Please enter a valid resume URL link' }, { status: 400 });
    }

    // Connect to MongoDB Atlas
    const client = await clientPromise;
    const db = client.db('followproperty');
    const collection = db.collection('careers');

    // Insert payload
    const newEntry = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      resumeLink: resumeLink.trim(),
      leadSource: leadSource ? leadSource.trim() : 'careers',
      registeredAt: new Date()
    };

    const result = await collection.insertOne(newEntry);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully.',
      applicationId: result.insertedId.toString()
    });

  } catch (error) {
    console.error('Careers MongoDB API Error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server database error. Please verify your connection config and try again.'
    }, { status: 500 });
  }
}
