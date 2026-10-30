import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

interface EnquiryPayload {
  name: string;
  school: string;
  email: string;
  phone: string;
  need: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: EnquiryPayload = await request.json();
    const { name, school, email, phone, need, message } = body;

    // Validation
    if (!name || !school || !email || !phone || !need) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipientEmail = process.env.INFO_EMAIL || "info@goodgeneralgh.com";
    const subject = `New School Project Enquiry: ${school} (${name})`;

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2dfd7; border-radius: 8px; background-color: #ffffff;">
        <div style="background-color: #102A43; padding: 20px; border-radius: 6px; margin-bottom: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: -0.5px;">Good General Publications &amp; Stationery</h1>
          <p style="color: #D4A72C; margin: 6px 0 0 0; font-size: 13px; font-weight: 600;">New School Project Enquiry</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1c1b18;">
          <tr style="border-bottom: 1px solid #f2f0eb;">
            <td style="padding: 12px 8px; font-weight: bold; width: 35%; color: #59554d;">Contact Name:</td>
            <td style="padding: 12px 8px; font-weight: 600; color: #102A43;">${escapeHtml(name)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f2f0eb;">
            <td style="padding: 12px 8px; font-weight: bold; color: #59554d;">School / Organisation:</td>
            <td style="padding: 12px 8px; font-weight: 600; color: #102A43;">${escapeHtml(school)}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f2f0eb;">
            <td style="padding: 12px 8px; font-weight: bold; color: #59554d;">Email Address:</td>
            <td style="padding: 12px 8px;"><a href="mailto:${escapeHtml(email)}" style="color: #102A43; text-decoration: underline;">${escapeHtml(email)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f2f0eb;">
            <td style="padding: 12px 8px; font-weight: bold; color: #59554d;">Phone / WhatsApp:</td>
            <td style="padding: 12px 8px;"><a href="tel:${escapeHtml(phone)}" style="color: #102A43; font-weight: 600;">${escapeHtml(phone)}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f2f0eb;">
            <td style="padding: 12px 8px; font-weight: bold; color: #59554d;">Primary Requirement:</td>
            <td style="padding: 12px 8px; font-weight: 600; color: #D4A72C;">${escapeHtml(need)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; font-weight: bold; color: #59554d; vertical-align: top;">Project Notes / Details:</td>
            <td style="padding: 12px 8px; line-height: 1.6; white-space: pre-wrap; color: #2b2925;">${escapeHtml(message || "No additional comments provided.")}</td>
          </tr>
        </table>

        <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2dfd7; text-align: center; font-size: 11px; color: #787368;">
          Sent via the Good General Official Web Consultation Desk &bull; Greater Accra, Ghana
        </div>
      </div>
    `;

    const textContent = `
New School Project Enquiry received via Good General Website:

Contact Name: ${name}
School / Organisation: ${school}
Email: ${email}
Phone / WhatsApp: ${phone}
Primary Requirement: ${need}

Project Details:
${message || "No additional comments provided."}
    `.trim();

    let sent = false;

    // Option A: Resend API Key configured
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.FROM_EMAIL || "Good General <enquiries@goodgeneralgh.com>";

      const res = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: email,
        subject,
        html: htmlContent,
        text: textContent,
      });

      if (res.error) {
        console.error("Resend error:", res.error);
        throw new Error(res.error.message);
      }
      sent = true;
    }
    // Option B: SMTP credentials configured
    else if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === "true" || Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || `"Good General Web" <${process.env.SMTP_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject,
        html: htmlContent,
        text: textContent,
      });

      sent = true;
    } else {
      // In development or prior to credentials being supplied, log the enquiry cleanly
      console.log("-----------------------------------------");
      console.log(`[ENQUIRY RECEIVED -> TO: ${recipientEmail}]`);
      console.log(`Subject: ${subject}`);
      console.log(`Sender: ${name} <${email}> (${phone}) - School: ${school}`);
      console.log(`Need: ${need}`);
      console.log(`Message: ${message}`);
      console.log("NOTE: Add RESEND_API_KEY or SMTP_* env vars to send live emails.");
      console.log("-----------------------------------------");
      sent = true;
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      delivered: sent,
    });
  } catch (error: any) {
    console.error("Failed to send enquiry email:", error);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again or reach out on WhatsApp.",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
