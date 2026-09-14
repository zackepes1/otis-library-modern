// Otis Library Board of Trustees — real roster for the July 2026–June 2027
// term, from otislibrarynorwich.org/library-board/. Officers are broken out
// separately so they can be featured at the top of the page; the `orgs`
// field captures the appointing body noted next to a trustee's name on the
// real page (e.g. "Friends of Otis Library", "Norwich Board of Education").
export type BoardMember = {
  name: string;
  role: string;
  org?: string;
};

export const boardTerm = "July 1, 2026 – June 30, 2027";

export const officers: BoardMember[] = [
  { name: "Pamela Kinder", role: "President" },
  { name: "Hon. Thomas Griffin", role: "Vice President" },
  { name: "Michael Gualtieri", role: "Treasurer" },
  { name: "Charles Seeman", role: "Secretary / Assistant Treasurer" },
];

export const trustees: BoardMember[] = [
  { name: "Shayleen Alfieri", role: "Trustee" },
  { name: "Ashon Avent", role: "Trustee" },
  { name: "Kevin Brown", role: "Trustee" },
  { name: "Joshua Davis", role: "Trustee", org: "Friends of Otis Library" },
  { name: "Keith Fontaine", role: "Trustee" },
  { name: "Hon. Thomas Griffin", role: "Trustee" },
  { name: "Michael Gualtieri", role: "Trustee" },
  { name: "John Iovino", role: "Trustee", org: "Norwich Board of Education" },
  { name: "Pamela Kinder", role: "Trustee" },
  { name: "Kristie Kriss", role: "Trustee", org: "Norwich Free Academy" },
  { name: "David Moreno", role: "Trustee" },
  { name: "Atty. Bart Sayet", role: "Trustee" },
  { name: "Charles Seeman", role: "Trustee" },
  { name: "Atty. Gerald M. Smith, Jr.", role: "Trustee" },
  { name: "Pamela Williams", role: "Trustee", org: "CT State Community College / Three Rivers" },
];

export const boardDocuments = [
  {
    label: "Agenda: August 2026",
    href: "/documents/board/agenda-8-24-2026.pdf",
  },
  {
    label: "Board Minutes: June 2026",
    href: "/documents/board/minutes-6-1-2026.pdf",
  },
];

export const boardContact =
  "Any Trustee may be contacted by mail addressed to: c/o Otis Library, 261 Main Street, Norwich, CT 06360.";
