import { Resend } from "resend";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);
const APP_NAME = "MDSU-Charge";
const FROM = env.FROM_EMAIL;
const APP_URL = env.NEXT_PUBLIC_APP_URL;

function baseLayout(content: string, accentColor = "#1d4ed8"): string {
  return `
    <div style="font-family:'Inter',sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <!-- Top accent bar -->
      <div style="height:4px;background:${accentColor};"></div>

      <!-- Logo header -->
      <div style="padding:24px 32px;border-bottom:1px solid #f1f5f9;background:#fafbfc;">
        <p style="margin:0;font-size:18px;font-weight:800;color:#0f172a;letter-spacing:-0.4px;">${APP_NAME}</p>
      </div>

      <!-- Content -->
      <div style="padding:32px;">
        ${content}
      </div>

      <!-- Footer -->
      <div style="padding:20px 32px;background:#f8fafc;border-top:1px solid #f1f5f9;">
        <p style="margin:0;font-size:12px;color:#94a3b8;line-height:1.6;">
          This email was sent by ${APP_NAME}. If you did not expect this email, please ignore it.<br/>
          © ${new Date().getFullYear()} MDSSC. All rights reserved.
        </p>
      </div>
    </div>
  `;
}

function ctaButton(text: string, url: string, color = "#1d4ed8"): string {
  return `
    <a href="${url}" style="display:inline-block;background:${color};color:#fff;padding:12px 24px;border-radius:9px;text-decoration:none;font-size:14px;font-weight:600;margin:16px 0;letter-spacing:-0.1px;">
      ${text}
    </a>
  `;
}

function infoRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;font-size:13px;color:#64748b;font-weight:500;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:8px 0;font-size:13px;color:#0f172a;font-weight:600;vertical-align:top;">${value}</td>
    </tr>
  `;
}

// ── V1 — Verification email ───────────────────────────────────

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${APP_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Verify your email — ${APP_NAME}`,
    html: baseLayout(`
      <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.4px;">Verify your email address</h2>
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0 0 20px;">Click the button below to verify your email. This link expires in <strong>24 hours</strong>.</p>
      ${ctaButton("Verify Email", verifyUrl)}
      <p style="font-size:12px;color:#94a3b8;margin-top:16px;">Or copy this link: <a href="${verifyUrl}" style="color:#1d4ed8;">${verifyUrl}</a></p>
    `),
  });
}

// ── V1 — Password reset email ─────────────────────────────────

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Reset your password — ${APP_NAME}`,
    html: baseLayout(`
      <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.4px;">Reset your password</h2>
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0 0 20px;">Click the button below to set a new password. This link expires in <strong>15 minutes</strong>.</p>
      ${ctaButton("Reset Password", resetUrl)}
      <p style="font-size:12px;color:#94a3b8;margin-top:16px;">If you did not request a password reset, ignore this email.</p>
    `),
  });
}

// ── V3 — Course rejected email ────────────────────────────────

export async function sendCourseRejectedEmail(
  email: string,
  courseTitle: string,
  reason: string,
) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Course "${courseTitle}" needs changes — ${APP_NAME}`,
    html: baseLayout(
      `
      <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 8px;letter-spacing:-0.4px;">Course Needs Changes</h2>
      <p style="font-size:14px;color:#64748b;line-height:1.6;margin:0 0 20px;">Your course <strong style="color:#0f172a;">${courseTitle}</strong> was reviewed by our admin team and requires changes before it can be published.</p>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin-bottom:20px;">
        <p style="font-size:12px;font-weight:700;color:#991b1b;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.05em;">Rejection Reason</p>
        <p style="font-size:14px;color:#dc2626;margin:0;line-height:1.6;">${reason}</p>
      </div>
      <p style="font-size:14px;color:#64748b;">Please make the necessary edits and resubmit for review.</p>
      ${ctaButton("Go to My Courses", `${APP_URL}/cms/courses`)}
    `,
      "#dc2626",
    ),
  });
}

// ── V4 — Free event registration confirmation ─────────────────

export async function sendEventRegistrationEmail({
  email,
  name,
  eventTitle,
  eventSlug,
  startDate,
  endDate,
  mode,
  venue,
  ticketCode,
  qrCodeBase64,
}: {
  email: string;
  name: string;
  eventTitle: string;
  eventSlug: string;
  startDate: Date;
  endDate: Date | null;
  mode: string;
  venue: string | null;
  ticketCode: string;
  qrCodeBase64: string;
}) {
  const eventUrl = `${APP_URL}/events/${eventSlug}`;
  const ticketUrl = `${APP_URL}/events/verify/${ticketCode}`;

  const dateStr = startDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = startDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  const locationInfo =
    mode === "ONLINE"
      ? "Online Event — Join link will be shared after check-in"
      : mode === "OFFLINE"
        ? (venue ?? "Venue details will be shared soon")
        : `Hybrid — ${venue ?? "Details coming soon"}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `You're registered! ${eventTitle} — ${APP_NAME}`,
    html: baseLayout(`
      <!-- Success header -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:56px;height:56px;border-radius:50%;background:#f0fdf4;border:2px solid #86efac;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;">
          <span style="font-size:24px;">✓</span>
        </div>
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.4px;">Registration Confirmed!</h2>
        <p style="font-size:14px;color:#64748b;margin:0;">Hi ${name}, you're all set for</p>
        <p style="font-size:16px;font-weight:700;color:#0f172a;margin:4px 0 0;">${eventTitle}</p>
      </div>

      <!-- Event details table -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Event Details</p>
        <table style="width:100%;border-collapse:collapse;">
          ${infoRow("Date", dateStr)}
          ${infoRow("Time", `${timeStr} IST`)}
          ${infoRow("Mode", mode === "ONLINE" ? "Online" : mode === "OFFLINE" ? "In Person" : "Hybrid")}
          ${infoRow("Location", locationInfo)}
          ${endDate ? infoRow("End Time", endDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }) + " IST") : ""}
        </table>
      </div>

      <!-- QR Ticket -->
      <div style="background:#fff;border:1.5px solid #bfdbfe;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Your Ticket</p>
        <img src="${qrCodeBase64}" alt="QR Code" width="160" height="160" style="display:block;margin:0 auto 12px;border-radius:8px;" />
        <p style="font-size:11px;color:#94a3b8;margin:0 0 4px;">Ticket Code</p>
        <p style="font-family:monospace;font-size:14px;font-weight:700;color:#0f172a;margin:0;letter-spacing:0.05em;">${ticketCode}</p>
        <p style="font-size:12px;color:#64748b;margin:10px 0 0;">Show this QR code at the venue for entry</p>
      </div>

      ${ctaButton("View Event Details", eventUrl)}

      <p style="font-size:13px;color:#64748b;margin-top:20px;line-height:1.6;">
        To cancel your registration, visit the event page and click "Cancel Registration" before the event starts.
      </p>
    `),
  });
}

// ── V4 — Paid event ticket confirmation ──────────────────────

export async function sendPaidEventTicketEmail({
  email,
  name,
  eventTitle,
  eventSlug,
  startDate,
  endDate,
  mode,
  venue,
  ticketCode,
  qrCodeBase64,
  amountPaid,
  razorpayPaymentId,
  refundPolicy,
  cancellationDeadline,
}: {
  email: string;
  name: string;
  eventTitle: string;
  eventSlug: string;
  startDate: Date;
  endDate: Date | null;
  mode: string;
  venue: string | null;
  ticketCode: string;
  qrCodeBase64: string;
  amountPaid: number; // paise
  razorpayPaymentId: string;
  refundPolicy: string | null;
  cancellationDeadline: Date | null;
}) {
  const eventUrl = `${APP_URL}/events/${eventSlug}`;
  const dateStr = startDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = startDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
  const amountStr = `₹${(amountPaid / 100).toLocaleString("en-IN")}`;
  const locationInfo =
    mode === "ONLINE"
      ? "Online — Join link shared after check-in"
      : mode === "OFFLINE"
        ? (venue ?? "Venue TBD")
        : `Hybrid — ${venue ?? "Details coming soon"}`;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Payment confirmed — ${eventTitle} ticket — ${APP_NAME}`,
    html: baseLayout(`
      <!-- Success header -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:56px;height:56px;border-radius:50%;background:#f0fdf4;border:2px solid #86efac;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;">
          <span style="font-size:24px;">🎟</span>
        </div>
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.4px;">Payment Successful!</h2>
        <p style="font-size:14px;color:#64748b;margin:0;">Hi ${name}, your ticket for</p>
        <p style="font-size:16px;font-weight:700;color:#0f172a;margin:4px 0 0;">${eventTitle}</p>
        <p style="font-size:14px;color:#64748b;margin:4px 0 0;">is confirmed</p>
      </div>

      <!-- Event + payment details -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Event Details</p>
        <table style="width:100%;border-collapse:collapse;">
          ${infoRow("Date", dateStr)}
          ${infoRow("Time", `${timeStr} IST`)}
          ${infoRow("Mode", mode === "ONLINE" ? "Online" : mode === "OFFLINE" ? "In Person" : "Hybrid")}
          ${infoRow("Location", locationInfo)}
        </table>
      </div>

      <!-- Payment summary -->
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Payment Summary</p>
        <table style="width:100%;border-collapse:collapse;">
          ${infoRow("Amount Paid", amountStr)}
          ${infoRow("Payment ID", razorpayPaymentId)}
          ${infoRow("Status", "✓ Confirmed")}
        </table>
      </div>

      <!-- QR Ticket -->
      <div style="background:#fff;border:1.5px solid #bfdbfe;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Your Entry Ticket</p>
        <img src="${qrCodeBase64}" alt="QR Code" width="160" height="160" style="display:block;margin:0 auto 12px;border-radius:8px;" />
        <p style="font-size:11px;color:#94a3b8;margin:0 0 4px;">Ticket Code</p>
        <p style="font-family:monospace;font-size:14px;font-weight:700;color:#0f172a;margin:0;letter-spacing:0.05em;">${ticketCode}</p>
        <p style="font-size:12px;color:#64748b;margin:10px 0 0;">Present this QR at the venue for entry</p>
      </div>

      ${ctaButton("View My Ticket", eventUrl)}

      ${
        refundPolicy
          ? `
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px;margin-top:20px;">
          <p style="font-size:12px;font-weight:700;color:#92400e;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.05em;">Refund Policy</p>
          <p style="font-size:13px;color:#b45309;margin:0;line-height:1.6;">${refundPolicy}</p>
          ${cancellationDeadline ? `<p style="font-size:12px;color:#d97706;margin:8px 0 0;">Cancellation deadline: <strong>${cancellationDeadline.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</strong></p>` : ""}
        </div>
      `
          : ""
      }
    `),
  });
}

// ── V4 — Waitlist spot available notification ─────────────────

export async function sendWaitlistSpotAvailableEmail({
  email,
  name,
  eventTitle,
  eventSlug,
  expiresAt,
}: {
  email: string;
  name: string;
  eventTitle: string;
  eventSlug: string;
  expiresAt: Date; // 24 hours from now
}) {
  const registerUrl = `${APP_URL}/events/${eventSlug}?waitlist=claim`;
  const expiryStr = expiresAt.toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `A spot opened up — ${eventTitle} — ${APP_NAME}`,
    html: baseLayout(
      `
      <!-- Alert header -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:56px;height:56px;border-radius:50%;background:#fffbeb;border:2px solid #fde68a;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;">
          <span style="font-size:24px;">🔔</span>
        </div>
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.4px;">A spot just opened!</h2>
        <p style="font-size:14px;color:#64748b;margin:0;">Hi ${name}, a spot is now available for</p>
        <p style="font-size:16px;font-weight:700;color:#0f172a;margin:4px 0 0;">${eventTitle}</p>
      </div>

      <!-- Urgency box -->
      <div style="background:#fef3c7;border:1.5px solid #fde68a;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
        <p style="font-size:13px;font-weight:600;color:#92400e;margin:0 0 6px;">⏰ This spot is reserved for you until</p>
        <p style="font-size:16px;font-weight:800;color:#0f172a;margin:0;">${expiryStr} IST</p>
        <p style="font-size:12px;color:#b45309;margin:8px 0 0;">After this time, the spot will be offered to the next person on the waitlist.</p>
      </div>

      ${ctaButton("Claim Your Spot Now →", registerUrl, "#16a34a")}

      <p style="font-size:13px;color:#64748b;margin-top:20px;line-height:1.6;">
        If you no longer wish to attend, simply ignore this email and the spot will be passed to the next person on the waitlist.
      </p>
    `,
      "#d97706",
    ),
  });
}

// ── V4 — Event cancelled notification ────────────────────────

export async function sendEventCancelledEmail({
  email,
  name,
  eventTitle,
  startDate,
  isPaid,
  amountPaid,
}: {
  email: string;
  name: string;
  eventTitle: string;
  startDate: Date;
  isPaid: boolean;
  amountPaid: number | null; // paise
}) {
  const dateStr = startDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Event Cancelled: ${eventTitle} — ${APP_NAME}`,
    html: baseLayout(
      `
      <!-- Cancelled header -->
      <div style="text-align:center;margin-bottom:28px;">
        <div style="width:56px;height:56px;border-radius:50%;background:#fef2f2;border:2px solid #fecaca;display:inline-flex;align-items:center;justify-content:center;margin-bottom:14px;">
          <span style="font-size:24px;">❌</span>
        </div>
        <h2 style="font-size:22px;font-weight:800;color:#0f172a;margin:0 0 6px;letter-spacing:-0.4px;">Event Cancelled</h2>
        <p style="font-size:14px;color:#64748b;margin:0;">Hi ${name}, we regret to inform you that</p>
        <p style="font-size:16px;font-weight:700;color:#0f172a;margin:4px 0 0;">${eventTitle}</p>
        <p style="font-size:14px;color:#64748b;margin:4px 0 0;">scheduled for ${dateStr} has been cancelled.</p>
      </div>

      <!-- Apology message -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <p style="font-size:14px;color:#475569;margin:0;line-height:1.7;">
          We sincerely apologize for any inconvenience this may have caused. We understand this may have disrupted your plans and we appreciate your understanding.
        </p>
      </div>

      ${
        isPaid && amountPaid
          ? `
        <!-- Refund info -->
        <div style="background:#f0fdf4;border:1.5px solid #86efac;border-radius:12px;padding:20px;margin-bottom:24px;">
          <p style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Refund Information</p>
          <p style="font-size:14px;color:#16a34a;font-weight:600;margin:0 0 8px;">
            ✓ Your payment of ₹${(amountPaid / 100).toLocaleString("en-IN")} will be refunded.
          </p>
          <p style="font-size:13px;color:#475569;margin:0;line-height:1.6;">
            The refund will be processed to your original payment method within <strong>5-7 business days</strong>. If you have not received your refund after 7 business days, please contact us.
          </p>
        </div>
      `
          : ""
      }

      <!-- Browse events CTA -->
      ${ctaButton("Browse Other Events", `${APP_URL}/events`, "#1d4ed8")}

      <p style="font-size:13px;color:#94a3b8;margin-top:20px;line-height:1.6;">
        If you have any questions, please reply to this email or contact our support team.
      </p>
    `,
      "#dc2626",
    ),
  });
}
