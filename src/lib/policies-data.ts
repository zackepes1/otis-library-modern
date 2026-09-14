// Real content adapted from otislibrarynorwich.org/policies/, restructured
// into topic categories for the tabbed layout instead of one long scrolling
// page. Loan periods/fees are modeled as structured tables so they can be
// rendered with the project's table styling instead of scraped markup.
import type { ReactNode } from "react";

export type PolicyCategory = {
  label: string;
  items: { question: string; answer: ReactNode }[];
};

export const loanPeriods = [
  { item: "New Adult books, New YA books, and Magazines", period: "14 days" },
  { item: "All other books", period: "21 days" },
  { item: "Audiobooks, CDs, Playaways", period: "21 days" },
  { item: "DVDs", period: "7 days" },
  { item: "TV Series", period: "14 days" },
  { item: "Museum Passes", period: "3 days" },
];

export const fees = [
  { item: "Museum Passes", cost: "$25.00 / day" },
  { item: "Lost card replacement", cost: "$1.00" },
  { item: "Lost / damaged item", cost: "Replacement cost + $2 processing fee" },
  { item: "Photocopies / printing (B&W)", cost: "$0.25 / page" },
  { item: "Photocopies / printing (color)", cost: "$0.75 / page" },
  { item: "Double-sided B&W", cost: "$0.40 / page" },
  { item: "Double-sided color", cost: "$1.00 / page" },
  { item: "Envelopes", cost: "$0.50" },
  { item: "Laminating (8.5 × 11 sheet)", cost: "$1.00" },
  { item: "Laminating (11 × 17 sheet)", cost: "$2.00" },
];

export const policyDocuments = [
  { label: "Bulletin Board Policy", href: "/documents/policies/bulletin-board-policy.pdf" },
  { label: "Circulation Policy in Full", href: "/documents/policies/circulation-policy.pdf" },
  { label: "Collection Development and Maintenance Policy", href: "/documents/policies/collection-development-policy.pdf" },
  { label: "Confidentiality of Patron Records", href: "/documents/policies/confidentiality-patron-records.pdf" },
  { label: "Displays Policy", href: "/documents/policies/displays-policy.pdf" },
  { label: "Donation Policy", href: "/documents/policies/donation-policy.pdf" },
  { label: "Early Human Skull Replicas Policy", href: "/documents/policies/skull-replicas-policy.pdf" },
  { label: "Exhibit Policy", href: "/documents/policies/exhibit-policy.pdf" },
  { label: "Internet and Computer Use Policy", href: "/documents/policies/internet-computer-use-policy.pdf" },
  { label: "Public Access to Computers Policy", href: "/documents/policies/public-access-computers-policy.pdf" },
  { label: "Program Policy", href: "/documents/policies/program-policy.pdf" },
  { label: "Safety Policy", href: "/documents/policies/safety-policy.pdf" },
  {
    label: "Request for Reconsideration of Materials, Display, or Program Policy",
    href: "/documents/policies/reconsideration-policy.pdf",
  },
  { label: "Rules of Conduct", href: "/documents/policies/rules-of-conduct.pdf" },
];

export const libraryCardText = [
  "You may have a free library card if you are a resident of Norwich. Apply at the Front Desk; you will need some form of identification (driver's license, state ID, utility bill, lease, etc.) showing your current address. If you have a current library card from another Connecticut town, you may use it to borrow items at Otis.",
  "Your library card gives you more than borrowing privileges. You also have access to a rich array of online information databases as well as the researchIT CT statewide library catalog.",
  "Otis Library expects you to return all materials on or before the due date, to pay promptly the fines or damages for which you are responsible, and to give immediate notice of change in your address. You are responsible for any item that anyone checks out on your card. If your card is lost or stolen, report the loss at once by phone (860-889-2365) or in person.",
];

export const fineFreeNote =
  "Otis Library is fine free — items receive one automatic renewal (unless reserved by another patron), and you'll never be charged a late fee for an overdue return.";
