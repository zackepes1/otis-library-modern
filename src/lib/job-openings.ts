// Job Openings — content sourced from the real
// otislibrarynorwich.org/job-openings/ page (fetched via the site's own
// WordPress REST API). As of this writing the library has no vacant
// positions, so `openings` is intentionally empty; the table component
// renders a proper empty state rather than fabricating fake listings.
// When a real opening is posted, add an entry here and it will appear
// in the table automatically.
export type JobOpening = {
  title: string;
  department: string;
  type: "Full-time" | "Part-time" | "Seasonal" | "Per Diem";
  posted: string;
  applyHref: string;
};

export const openings: JobOpening[] = [];

export const jobOpeningsInfo = {
  intro:
    "Thank you for your interest in employment with Otis Library! We currently do not have any vacant positions.",
  note:
    "Openings are posted here as soon as they become available. Check back periodically, or reach out to Human Resources to ask about future opportunities.",
  contactEmail: "ref@otislibrarynorwich.org",
  sourceUrl: "https://otislibrarynorwich.org/job-openings/",
};
