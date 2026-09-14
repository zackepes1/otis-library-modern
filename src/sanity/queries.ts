import { client } from "./client";

export type HoursEntry = { day: string; time: string };

export type SiteInfoResult = {
  address: string;
  phone: string;
  email: string;
  hours: HoursEntry[];
  bookdrops: string[];
  donateUrl?: string;
};

export type StaffMemberResult = {
  _id: string;
  name: string;
  role: string;
  order: number;
  email?: string;
};

const opts =
  process.env.NODE_ENV === "production"
    ? ({ next: { revalidate: 3600 } } as const)
    : ({ cache: "no-store" } as const);

export async function getSiteInfo(): Promise<SiteInfoResult> {
  return client.fetch(
    `*[_type == "siteInfo"][0]{
      address, phone, email,
      "hours": hours[]{ day, time },
      bookdrops,
      donateUrl
    }`,
    {},
    opts,
  );
}

export type DigitalServiceResult = {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  href: string | null;
  appStoreHref: string;
  playStoreHref: string;
  order: number;
};

export async function getDigitalServices(): Promise<DigitalServiceResult[]> {
  return client.fetch(
    `*[_type == "digitalService"] | order(order asc) {
      _id, name, tagline, description, logo, href, appStoreHref, playStoreHref, order
    }`,
    {},
    opts,
  );
}

export async function getStaff(): Promise<StaffMemberResult[]> {
  return client.fetch(
    `*[_type == "staffMember"] | order(order asc) { _id, name, role, order, email }`,
    {},
    opts,
  );
}

export type TestimonialResult = { _id: string; quote: string; author: string; order: number };

export async function getTestimonials(): Promise<TestimonialResult[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) { _id, quote, author, order }`,
    {},
    opts,
  );
}

export type RecurringProgramResult = { _id: string; title: string; schedule: string; description: string; order: number };

export async function getPrograms(): Promise<RecurringProgramResult[]> {
  return client.fetch(
    `*[_type == "recurringProgram"] | order(order asc) { _id, title, schedule, description, order }`,
    {},
    opts,
  );
}

export type RecentSnippetResult = { _id: string; title: string; dateLabel: string; slug: string };

export async function getRecentSnippets(limit = 4): Promise<RecentSnippetResult[]> {
  return client.fetch(
    `*[_type == "snippet" && defined(publishedAt)] | order(publishedAt desc) [0...$limit] {
      _id, title, dateLabel, "slug": key.current
    }`,
    { limit },
    opts,
  );
}
