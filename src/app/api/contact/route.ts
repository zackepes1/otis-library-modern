import { NextRequest, NextResponse } from "next/server";

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  department: string;
  message: string;
}

export const CONTACT_DEPARTMENTS = [
  "General Inquiry",
  "Reference & Research",
  "Children's Services",
  "Support & Development",
  "Technical Support",
];

/**
 * Handles Contact page submissions. Otis Library's real contact channel is
 * a plain mailto (ref@otislibrarynorwich.org) with no form backend today,
 * so this route validates input server-side and is the integration point
 * for actually delivering the message — swap the TODO below for a real
 * email provider (e.g. Resend, Nodemailer via SMTP, or a forward to
 * ref@otislibrarynorwich.org) when one is available. For now it logs the
 * validated submission so the form is fully wired end-to-end.
 */
export async function POST(request: NextRequest) {
  let body: Partial<ContactFormPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const department = body.department?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please enter your name.";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!department || !CONTACT_DEPARTMENTS.includes(department)) {
    errors.department = "Please choose who you'd like to reach.";
  }
  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < 10) {
    errors.message = "Please provide a bit more detail (at least 10 characters).";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // TODO: forward to a real email provider / ref@otislibrarynorwich.org once one is configured.
  console.log("New contact form submission:", { name, email, phone, department, message });

  return NextResponse.json({ ok: true });
}
