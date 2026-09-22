import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import twilio from 'twilio';

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      requestType,
      company,
      contactName,
      phone,
      email,
      equipmentCategory,
      durationDate,
      emergencyLevel,
      voltageClass,
      scopeNotes,
    } = body;

    const isEmergency = requestType === 'dispatch';
    const subjectTitle = isEmergency
      ? `🚨 EMERGENCY DISPATCH: ${company}`
      : `📦 EQUIPMENT RENTAL: ${company}`;

    const summaryText = isEmergency
      ? `Severity: ${emergencyLevel} | Voltage: ${voltageClass}`
      : `Equipment: ${equipmentCategory} | Date: ${durationDate}`;

    // 1. Send Email Notification via Resend
    await resend.emails.send({
      from: 'Dispatch System <alerts@yourdomain.com>',
      to: [process.env.DISPATCH_ALERT_EMAIL!],
      subject: subjectTitle,
      html: `
        <h2>${subjectTitle}</h2>
        <p><strong>Contact:</strong> ${contactName} (${company})</p>
        <p><strong>Phone:</strong> ${phone} | <strong>Email:</strong> ${email}</p>
        <p><strong>Details:</strong> ${summaryText}</p>
        <p><strong>Scope / Location Notes:</strong></p>
        <blockquote>${scopeNotes}</blockquote>
      `,
    });

    // 2. Send SMS Notification via Twilio
    const smsMessage = `${subjectTitle}\nContact: ${contactName} (${phone})\n${summaryText}\nNotes: ${scopeNotes.slice(0, 100)}...`;

    await twilioClient.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: process.env.DISPATCH_ALERT_PHONE!,
    });

    return NextResponse.json(
      { success: true, message: 'Dispatch notification sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Dispatch error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to dispatch notification.' },
      { status: 500 }
    );
  }
}

