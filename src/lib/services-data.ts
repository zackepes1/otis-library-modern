// Content adapted from otislibrarynorwich.org/services — each service maps
// to an internal page at /services/[slug]. "Print From Anywhere" links to
// an external vendor (princh.com) and is intentionally excluded here.

export type ServiceResource = {
  label: string;
  href?: string;
  description?: string;
};

export type ServiceRoom = {
  room: string;
  capacity: string;
  notes?: string;
};

export type ServiceContact = {
  staff?: string;
  phone?: string;
  phoneExt?: string;
  email?: string;
  bookingHref?: string;
  bookingLabel?: string;
  embedBooking?: boolean;
  note?: string;
};

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  intro: string;
  notice?: string;
  steps?: string[];
  requirements?: string[];
  cannotDo?: string[];
  topics?: string[];
  prepTips?: string[];
  limitations?: string[];
  features?: string[];
  resources?: ServiceResource[];
  rooms?: ServiceRoom[];
  contact: ServiceContact;
  alternativeHref?: string;
  alternativeLabel?: string;
};

export const services: Service[] = [
  {
    slug: "call-ahead-pickup",
    title: "Call Ahead Pickup",
    tagline: "Reserve items and pick them up from the back parking lot — no need to come inside.",
    intro:
      "Reserve items through the catalog or by phone, then drive to Spot 20 in the back parking lot. Staff will bring your materials right to your car.",
    steps: [
      "Reserve items via the online catalog or call (860) 889-2365, press 0.",
      "Schedule a pickup time by calling the same number — at least 1 hour in advance.",
      "Drive to Spot 20 in the back parking lot at your scheduled time.",
      "Staff will deliver your items and verify your photo ID.",
    ],
    requirements: [
      "Valid library card with no damaged or overdue materials",
      "Photo ID at time of pickup",
      "Three-item limit per author, subject, or series",
      "Adults may designate up to 3 other people to pick up using a Holds Pickup form",
    ],
    contact: {
      phone: "(860) 889-2365",
      note: "Press 0 when prompted",
      bookingHref: "https://nw.catalog.lionlibraries.org/",
      bookingLabel: "Reserve items in the catalog",
    },
  },
  {
    slug: "citizenship-and-immigration",
    title: "Citizenship & Immigration",
    tagline: "Free resources and support for naturalization, immigration forms, and civic preparation.",
    intro:
      "Otis Library offers free materials, public computers, multilingual study tools, and staff support to help community members with naturalization and immigration needs.",
    resources: [
      {
        label: "Citizenship Corner",
        description:
          "Books and DVDs for N-400 naturalization exam prep — available in the library collection.",
      },
      {
        label: "Free N-400 Application Forms",
        description:
          "One free N-400 citizenship application form per person, available at the Business Center Desk.",
      },
      {
        label: "Free Immigration Forms",
        description:
          "One free immigration form per person, available at the Information Desk.",
      },
      {
        label: "Transparent Language Online",
        description:
          "Language-learning software available free with your library card for citizenship study and ESL practice.",
      },
      {
        label: "Public Computers",
        description:
          "Free computer access for completing forms, research, and USCIS study.",
      },
      {
        label: "Multilingual Practice Tests & Legal Referrals",
        description:
          "USCIS study materials, multilingual practice tests, and referrals to local legal services.",
      },
    ],
    contact: {
      staff: "Bassem Gayed",
      note: "Multicultural Services Coordinator",
      phone: "(860) 889-2365",
      email: "bgayed@otislibrarynorwich.org",
    },
  },
  {
    slug: "english-classes",
    title: "English Classes",
    tagline: "Free English language learning for adult New Americans — inside the library.",
    intro:
      "Otis Library partners with Literacy Volunteers of Eastern Connecticut (LVEC), whose offices are located inside the library. Adult English language learners in Norwich and the surrounding area can access conversation groups, a physical collection of ESL materials, and free online tools.",
    resources: [
      {
        label: "LVEC Conversation Groups",
        description:
          "Conversation practice groups for enrolled learners, held at the LVEC office inside Otis Library.",
        href: "https://www.englishhelpect.com/",
      },
      {
        label: "Learning English Collection",
        description:
          "Physical books covering grammar, vocabulary, dictionaries, reading, writing, and conversation — located near the Business Center Desk.",
      },
      {
        label: "Transparent Language Online",
        description:
          "Free with your library card — access language lessons online from any device.",
      },
      {
        label: "USA Learns",
        description: "Free online English courses at usalearns.com.",
        href: "https://www.usalearns.com/",
      },
    ],
    contact: {
      phone: "(860) 889-2365",
      note: "Ask about enrolling with Literacy Volunteers of Eastern Connecticut",
      bookingHref: "https://www.englishhelpect.com/",
      bookingLabel: "Visit Literacy Volunteers of Eastern Connecticut",
    },
  },
  {
    slug: "home-delivery",
    title: "Home Delivery",
    tagline: "Library materials delivered to your door — for patrons who can't visit in person.",
    intro:
      "If you or a family member are unable to visit the library, our Home Delivery service brings the library to you. Staff can select materials on your behalf or fulfill a list you provide. Available formats include books, audiobooks, DVDs, CDs, graphic novels, and toys. Staff also arrange pickup of returned items.",
    contact: {
      phone: "(860) 889-2365",
      phoneExt: "0",
      note: "Call to get started — we'll set up delivery at a time that works for you.",
    },
  },
  {
    slug: "employment-resources",
    title: "Job Support & Employment Resources",
    tagline: "Free one-on-one career coaching and online job tools — no appointment always required.",
    intro:
      "Our librarians offer free 45-minute one-on-one career coaching appointments and access to a suite of online employment resources. Whether you're starting a job search, updating your resume, or preparing for an interview, we can help.",
    topics: [
      "Job search navigation and strategy",
      "Employment application assistance",
      "Resume creation and review",
      "Cover letter writing",
      "Mock interview practice",
    ],
    resources: [
      {
        label: "LearningExpress Workforce Solutions",
        description:
          "Career guidance, workplace skills, and occupation test prep — available in English and Spanish.",
      },
      {
        label: "Job.CT.Gov",
        description: "Connecticut's state job portal: job searches, training programs, CareerConneCT, CTHires, and American Job Center links.",
        href: "https://www.job.ct.gov/",
      },
      {
        label: "Norwich Works",
        description:
          "Job skills training and assistance with housing, food, clothing, and transportation for eligible Norwich residents.",
        href: "https://www.norwichct.org/855/Norwich-Works",
      },
    ],
    contact: {
      phone: "(860) 889-2365",
      bookingHref: "https://otislibrarynorwich.libcal.com/appointments/Emily",
      bookingLabel: "Book a 45-minute appointment online",
      embedBooking: true,
    },
  },
  {
    slug: "meeting-spaces",
    title: "Meeting Spaces",
    tagline: "Four meeting and study spaces for community groups, nonprofits, and individual use.",
    intro:
      "Otis Library offers four public meeting spaces available to nonprofit organizations, community groups, and individual patrons. The Community Room and Meeting Room are available for cultural, educational, recreational, or civic use. Study Rooms are available on a walk-in or reserved basis.",
    rooms: [
      {
        room: "Community Room (2nd floor)",
        capacity: "Up to 128 (80 assembly-style)",
        notes: "For nonprofits and community groups; cultural, educational, recreational, or civic use",
      },
      {
        room: "Meeting Room",
        capacity: "18 seated",
        notes: "Includes projection equipment; same eligibility as Community Room",
      },
      {
        room: "Study Room A (1st floor)",
        capacity: "Up to 4 people",
        notes: "Walk-in or phone/online reservation",
      },
      {
        room: "Study Room B / Window (1st floor)",
        capacity: "Up to 4 people",
        notes: "Walk-in or phone/online reservation",
      },
    ],
    contact: {
      phone: "(860) 889-2365",
      phoneExt: "124",
      bookingHref: "/services/meeting-spaces",
      bookingLabel: "Submit a room application online",
      note: "Study Rooms can also be reserved by phone.",
    },
  },
  {
    slug: "notary",
    title: "Notary Public Services",
    tagline: "Free notary services for simple non-commercial documents — in library or mobile.",
    intro:
      "Otis Library offers free notary services for simple, non-commercial documents. Appointments are required and should be booked at least two business days in advance. Donations are appreciated. A mobile notary is also available to Norwich-area senior centers, rehab centers, assisted living facilities, and VFW Post 594.",
    requirements: [
      "Two valid photo IDs (at least one must be government-issued with a photo)",
      "Documents must be unsigned at the time of the appointment",
      "Appointment must be scheduled at least 2 business days in advance",
    ],
    cannotDo: [
      "Wills",
      "Powers of attorney",
      "Adoptions",
      "Child custody documents",
      "I-9 forms",
      "Blank or incomplete forms",
    ],
    contact: {
      staff: "Emily Gardiner, Young Adult Librarian / Notary Public",
      phone: "(860) 889-2365",
      phoneExt: "0",
      email: "egardiner@otislibrarynorwich.org",
      note: "Available Mon 9 AM–2 PM · Wed 1–7 PM · Fri 12–5 PM. Book at least 2 business days in advance.",
    },
  },
  {
    slug: "one-on-one-technology-help",
    title: "One-on-One Technology Help",
    tagline: "Personalized tech coaching sessions tailored to your device and skill level.",
    intro:
      "Our technology specialist offers free one-on-one appointments for patrons of all experience levels. Whether you need help with a smartphone, tablet, laptop, or library app, we'll meet you where you are. Library computers are available if you don't have your own device.",
    topics: [
      "Library eBooks and audiobooks (Hoopla, Libby, Palace Project)",
      "Windows and Mac basics",
      "Tablets and e-readers (Kindle, iPad, Android)",
      "Microsoft Office (Word, Excel, PowerPoint)",
      "Email setup and use",
      "File and photo organization",
      "Google tools (Gmail, Drive, Maps, Photos)",
      "Video calls (Zoom, FaceTime)",
      "Music streaming services",
      "Social media (Facebook, Instagram, TikTok, Pinterest, LinkedIn)",
    ],
    prepTips: [
      "Write down your specific goal and at least 3 questions you want answered",
      "Bring your device fully charged, with your charger",
      "Have your login credentials (usernames, passwords) handy",
      "Bring a notebook to take notes during the session",
    ],
    limitations: [
      "Cannot repair devices or replace hardware components",
      "Cannot process credit card transactions",
    ],
    contact: {
      staff: "Geovanni",
      phone: "(860) 889-2365",
      phoneExt: "109",
      bookingHref: "https://otislibrarynorwich.libcal.com/appointment/132004",
      bookingLabel: "Book an appointment online",
      embedBooking: true,
    },
  },
  {
    slug: "passports",
    title: "Passport Photos",
    tagline: "Passport photos available at the library — $15 per person.",
    intro:
      "Otis Library offers passport photo services. Each session includes one sheet with two passport-size photos and four driver's license-size photos.",
    notice:
      "Otis Library no longer accepts or processes passport applications. The U.S. Department of State removed all 501(c)(3) nonprofit organizations from its Passport Acceptance Facility Program. Please visit a nearby passport acceptance facility to submit your application.",
    topics: [
      "$15 per person",
      "Includes 2 passport photos + 4 driver's license photos on one sheet",
      "Payment accepted: check, money order, credit card, or cash",
      "Rejected photos replaced free of charge with a rejection letter",
    ],
    contact: {
      staff: "Emily Gardiner",
      phone: "(860) 889-2365",
      phoneExt: "0",
      email: "egardiner@otislibrarynorwich.org",
      bookingLabel: "Contact Emily to schedule",
    },
    alternativeHref: "https://iafdb.travel.state.gov",
    alternativeLabel: "Find a passport acceptance facility near you",
  },
  {
    slug: "text-notifications",
    title: "Text Notifications",
    tagline: "Get library account alerts and renew items by text — free with any mobile number.",
    intro:
      "Otis Library's text messaging service (powered by Shoutbomb) sends automatic updates about your account directly to your phone. You can also send a text to renew items or check when your card expires.",
    features: [
      "Pickup-ready alerts when your holds are available",
      "Due-soon and overdue notices",
      "Fine notifications",
      "Renewal requests by text",
      "Account expiration inquiries",
      "Multiple library accounts on one phone number",
    ],
    contact: {
      phone: "(860) 889-2365",
      note: "Ask at the front desk or call us to get set up with text notifications.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
