export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hours-parking", label: "Hours & Parking" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export type NavNode = {
  label: string;
  href: string;
  external?: boolean;
  children?: NavNode[];
};

// Full site navigation, matching the real Otis Library menu structure.
// Sections we've built as prototype pages link internally; everything
// else links out to the corresponding live page on otislibrarynorwich.org
// so the full site remains navigable during the redesign.
export const navTree: NavNode[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "175 Years of Service", href: "/175-years-of-service" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Hours, Parking, & Bookdrops", href: "/hours-parking" },
      { label: "Job Openings", href: "/job-openings" },
      { label: "Library Board", href: "/library-board" },
      { label: "Policies", href: "/policies" },
      { label: "Strategic Plan", href: "/strategic-plan" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Call Ahead Pickup", href: "/services/call-ahead-pickup" },
      { label: "Citizenship and Immigration", href: "/services/citizenship-and-immigration" },
      { label: "English Classes", href: "/services/english-classes" },
      { label: "Home Delivery", href: "/services/home-delivery" },
      { label: "Job Support Appointments", href: "/services/employment-resources" },
      { label: "Meeting Spaces", href: "/services/meeting-spaces" },
      { label: "Notary", href: "/services/notary" },
      { label: "One-on-One Technology Help", href: "/services/one-on-one-technology-help" },
      { label: "Passports", href: "/services/passports" },
      { label: "Print From Anywhere", href: "https://print.princh.com/?pid=107474", external: true },
      { label: "Text Notifications", href: "/services/text-notifications" },
    ],
  },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "Changing Minds Book Club", href: "/events/changing-minds" },
      {
        label: "Event Calendar",
        href: "https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=19576&t=g&d=0000-00-00&cal=19576&inc=0",
        external: true,
      },
      { label: "Evening with an Author", href: "/events/evening-with-an-author" },
      { label: "Harris Sisters Month (April)", href: "/events/harris-sisters" },
      { label: "Jim Lafayette Memorial Series", href: "/events/jim-lafayette" },
      { label: "O'tis a Festival", href: "/events/otis-festival" },
      { label: "Passport to Connecticut Libraries", href: "/events/passport-ct-libraries" },
    ],
  },
  {
    label: "Books & More",
    href: "#",
    children: [
      { label: "Catalog", href: "/catalog" },
      { label: "CT Library for Accessible Books", href: "/digital-collection" },
      { label: "Digital Collection", href: "/digital-collection" },
      { label: "Education & Learning Resources", href: "/education-learning" },
      { label: "Employment Resources", href: "/services/employment-resources" },
      { label: "Foreign Language Collections", href: "/digital-collection" },
      { label: "Learn a Language", href: "/digital-collection" },
      { label: "Library of Things", href: "/library-of-things" },
      { label: "Media Literacy Monthly", href: "/media-literacy" },
      { label: "On Exhibit", href: "/on-exhibit" },
      { label: "Passes to Local Attractions", href: "/passes" },
    ],
  },
  {
    label: "Local History",
    href: "/local-history",
    children: [
      { label: "Ancestry Databases and Resources", href: "/local-history#ancestry-databases-and-resources" },
      { label: "Local History Policies", href: "/local-history" },
      { label: "Genealogy Collections", href: "/local-history#genealogy-collections" },
      { label: "Historical Photographs", href: "/local-history#historical-photographs" },
      { label: "Microfilm Collection", href: "/local-history#microfilm-collection" },
      { label: "Norwich Bulletin Digitized", href: "/local-history#norwich-bulletin-digitized" },
      { label: "Research Services", href: "/local-history#research-services" },
      { label: "Snippets from Norwich History", href: "/local-history#snippets" },
    ],
  },
  {
    label: "Youth",
    href: "#",
    children: [
      { label: "Children", href: "/childrens" },
      { label: "Tweens & Teens", href: "/young-adult" },
    ],
  },
  {
    label: "How Can I Help?",
    href: "#",
    children: [
      { label: "Support Otis Library", href: "/support" },
      { label: "Donor Spotlight", href: "/support#donor-spotlight" },
      { label: "Volunteer", href: "/volunteer" },
      { label: "Friends of Otis Library", href: "/friends" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  { label: "Community Resources", href: "/community-resources" },
];

export const siteInfo = {
  address: "261 Main Street, Norwich, CT 06360",
  phone: "(860) 889-2365",
  email: "ref@otislibrarynorwich.org",
  catalogUrl: "/catalog",
  eventCalendarUrl:
    "https://otislibrarynorwich.libcal.com/calendar/otislibrary?cid=19576&t=g&d=0000-00-00&cal=19576&inc=0",
  digitalCollectionUrl: "/digital-collection",
  supportUrl: "/support",
  communityResourcesUrl: "/community-resources",
  onExhibitUrl: "/on-exhibit",
  meetingSpacesUrl: "/services/meeting-spaces",
  localHistoryUrl: "/local-history",
};

export const quickLinks = [
  {
    title: "Digital Collection",
    description: "Borrow eBooks, audiobooks, movies, and more — free, 24/7.",
    href: "/digital-collection",
    external: false,
    featured: true,
  },
  {
    title: "Parking & Bookdrops",
    description: "Free, accessible parking and 24/7 bookdrop locations.",
    href: "/hours-parking",
    external: false,
  },
  {
    title: "Meeting Spaces",
    description: "Reserve a free meeting room for your group, study session, or community gathering.",
    href: "/services/meeting-spaces",
    external: false,
  },
];

// Digital Collection — content adapted from otislibrarynorwich.org/ebooksmore/,
// rendered as a proper subpage instead of the original page's scattered
// image/text blocks.
export const digitalServices = [
  {
    name: "Libby",
    tagline: "Borrow eBooks & audiobooks with ease",
    description:
      "Explore Otis Library's digital collection with Libby by OverDrive. Borrow bestsellers, audiobooks, and more — free with your library card. Download Libby and start reading in minutes!",
    logo: "/images/logos/libby.svg",
    href: "https://lion.overdrive.com/",
    appStoreHref: "https://apps.apple.com/us/app/libby-the-library-app/id1076402606",
    playStoreHref: "https://play.google.com/store/search?q=Libby&c=apps&hl=en_US",
  },
  {
    name: "Hoopla",
    tagline: "Instant access to movies, music, books & more",
    description:
      "With your Otis Library card, stream or download movies, TV shows, audiobooks, comics, and eBooks — free with Hoopla Digital. No holds, no waiting, limited to 4 items a month.",
    logo: "/images/logos/hoopla.png",
    href: "https://www.hoopladigital.com/",
    appStoreHref: "https://apps.apple.com/us/app/hoopla-digital/id580643740",
    playStoreHref: "https://play.google.com/store/search?q=hoopla&c=apps&hl=en_US",
  },
  {
    name: "The Palace Project",
    tagline: "Free eBooks & audiobooks from Otis Library",
    description:
      "Access thousands of titles anytime, anywhere — all with your Otis Library card. Download The Palace Project app, find Otis Library, and start reading or listening today!",
    logo: "/images/logos/palace-project.png",
    href: "https://egoct.org/getting-started-with-palace/",
    appStoreHref: "https://apps.apple.com/us/app/the-palace-project/id1574359693",
    playStoreHref: "https://play.google.com/store/search?q=palace%20project&c=apps&hl=en_US",
  },
  {
    name: "Libraries Online (LEO)",
    tagline: "Take the library with you, everywhere you go",
    description:
      "Download the Libraries Online app and select Otis Library as your preferred library to access our books, media, programs, and services — all at your fingertips.",
    logo: "/images/logos/leo.jpg",
    href: null,
    appStoreHref: "https://apps.apple.com/us/app/libraries-online/id6739070221",
    playStoreHref: "https://play.google.com/store/apps/details?id=com.capiratech.leo&hl=en_US",
  },
];

// Audience-based quick links (inspired by loc.gov's "Especially For..."
// pattern) — surfaces the library's real programs by who they serve,
// as a complement to the topic-based Quick Links above.
export const audiences = [
  {
    title: "Kids & Families",
    description: "Storytimes, the Children's Department, and hands-on programs for every age.",
    href: "/childrens",
  },
  {
    title: "Job Seekers",
    description: "One-on-one job support appointments and employment resources.",
    href: "/services/employment-resources",
  },
  {
    title: "New Americans",
    description: "Free English classes, citizenship & immigration help, and multicultural services.",
    href: "/services/citizenship-and-immigration",
  },
  {
    title: "Genealogists & Historians",
    description: "Local history collections, microfilm archives, and one-on-one research help.",
    href: siteInfo.localHistoryUrl,
  },
];

// Recent posts from the library's real "Snippets from Norwich History"
// series (otislibrarynorwich.org/snippets-from-norwich-history/) — a new
// monthly local-history post. Pulled from the site's own "Recent Posts"
// listing so the homepage card can show a handful of real, clickable
// entries instead of a single teaser with a lot of empty space beneath it.
export const historySpotlight = {
  eyebrow: "From the Local History Collection",
  title: "Snippets from Norwich History",
  description:
    "Every month, Otis Library highlights a snippet from the history of Norwich, CT — from mills and mariners to the people who shaped the city.",
  href: "/local-history#snippets",
  recent: [
    { title: "The Norwich Lock Manufacturing Company", date: "December 2025", href: "/local-history/snippets/the-norwich-lock-manufacturing-company" },
    { title: "Colonial Libraries: Crucible of the American Revolution", date: "November 2025", href: "/local-history/snippets/colonial-libraries-crucible-of-the-american-revolution" },
    { title: "19th Century Whaling Industry and C.C. Brand's Bomb-lance", date: "October 2025", href: "/local-history/snippets/19th-century-whaling-industry-and-c-c-brands-bomb-lance" },
    { title: "The Norwich & Worcester Railroad", date: "August 2025", href: "/local-history/snippets/norwich-worcester-railroad" },
  ],
};
