export type ResourceEntry = {
  name: string;
  description: string;
  href?: string;
};

export type ResourceCategory = {
  slug: string;
  heading: string;
  subheading?: string;
  entries: ResourceEntry[];
};

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "ada",
    heading: "ADA & Accessibility",
    entries: [
      {
        name: "American School for the Deaf",
        description: "Dedicated to serving deaf and hard-of-hearing infants and youth through bilingual instruction.",
        href: "https://www.asd1817.org/",
      },
      {
        name: "Birth to Three",
        description: "Supports families with children under 3 with developmental delays or disabilities.",
        href: "https://www.birth23.org/",
      },
      {
        name: "InBloom",
        description: "Offers autism therapies for young children.",
      },
      {
        name: "CT Library for Accessible Books (CLAB)",
        description: "Free audio and braille books for Connecticut residents unable to read print.",
        href: "https://ct.gov/clab",
      },
      {
        name: "South East CT Community Center of the Blind",
        description: "Serves social, recreational, and advocacy needs of visually impaired residents.",
      },
    ],
  },
  {
    slug: "arts-events",
    heading: "Arts & Events",
    entries: [
      {
        name: "Art Reach",
        description: "Mental health support through creative and performing arts since 1985.",
        href: "https://www.artreachct.org/",
      },
      {
        name: "Chestnut Street Playhouse",
        description: "67-seat downtown theater offering live performances.",
      },
      {
        name: "Norwich Arts Center",
        description: "Historic building with galleries and a 100-seat theater.",
        href: "https://www.norwicharts.org/",
      },
      {
        name: "Norwich Events Organization",
        description: "Organizes community events including First Friday arts events.",
      },
      {
        name: "Rose Arts Festival",
        description: "Annual celebration of community and music.",
      },
      {
        name: "Sikh Art Gallery",
        description: "Features Sikh history exhibits with free guided tours.",
      },
      {
        name: "Slater Memorial Museum",
        description: "Art and history museum on the Norwich Free Academy campus.",
        href: "https://www.nfaschool.org/slater",
      },
    ],
  },
  {
    slug: "citizenship",
    heading: "Citizenship & Immigration",
    entries: [
      {
        name: "Immigration Advocacy and Support Center (IASC)",
        description: "Low-cost immigration legal services for Connecticut residents.",
      },
      {
        name: "Jewish Family Services",
        description: "Norwich office offering immigration legal services and case management.",
        href: "https://www.jfsnh.org/",
      },
      {
        name: "Jewish Federation of Eastern CT",
        description: "Assists immigrants and asylum seekers in the region.",
      },
      {
        name: "Norwich Adult Education",
        description: "Civics and citizenship courses with remote and hybrid options.",
        href: "https://www.norwichadulted.org/",
      },
      {
        name: "Otis Library",
        description: "Curated resources, free N-400 forms, and citizenship study materials.",
        href: "/services/citizenship-and-immigration",
      },
    ],
  },
  {
    slug: "education-youth",
    heading: "Education — Youth",
    entries: [
      { name: "Birth to Three", description: "Early intervention for children under 3." },
      { name: "InBloom", description: "Autism therapies for young children." },
      { name: "Integrated Day Charter School", description: "" },
      { name: "Montessori Discovery School", description: "" },
      { name: "Norwich Free Academy", description: "Independent secondary school serving Norwich.", href: "https://www.nfaschool.org/" },
      { name: "Norwich Public Schools", description: "Norwich's public K–8 district.", href: "https://www.norwichpublicschools.org/" },
      { name: "Norwich Technical High School", description: "Vocational and technical high school." },
      { name: "Sacred Heart School", description: "Catholic elementary school." },
      { name: "School Readiness Council", description: "Preschool readiness programs." },
      { name: "St. Patrick Cathedral School", description: "Catholic elementary school." },
      { name: "Three Rivers Middle College Magnet High School", description: "College-prep high school on the Three Rivers campus." },
      { name: "TVCCA", description: "Head Start and child care services.", href: "https://www.tvcca.org/" },
      { name: "Wildwood Christian School", description: "Christian elementary school." },
    ],
  },
  {
    slug: "education-adult",
    heading: "Education — Adult",
    entries: [
      {
        name: "Norwich Regional Adult Education",
        description: "Academic programs, job training, GED, and language classes.",
        href: "https://www.norwichadulted.org/",
      },
      {
        name: "CT State Community College — Three Rivers Campus",
        description: "Affordable higher education and career training in Norwich.",
        href: "https://www.threerivers.commnet.edu/",
      },
    ],
  },
  {
    slug: "employment",
    heading: "Employment",
    entries: [
      {
        name: "Norwich Tech Adult Apprenticeship",
        description: "State-approved formal apprenticeship training programs.",
      },
      {
        name: "Norwich Works",
        description: "Career goal support with limited training funding for Norwich residents.",
        href: "https://www.norwichct.org/855/Norwich-Works",
      },
      {
        name: "Opportunities Industrialization Center",
        description: "Certification programs in CNA, Culinary, Construction/OSHA-10, and more.",
      },
      {
        name: "TVCCA",
        description: "Career counseling and job placement support.",
        href: "https://www.tvcca.org/",
      },
      {
        name: "American Job Center",
        description: "Free job search assistance, career services, and training resources.",
      },
      {
        name: "City of Norwich Employment Opportunities",
        description: "Municipal job portal for city positions.",
        href: "https://www.norwichct.org/",
      },
      {
        name: "EasterSeals Veterans Rally Point",
        description: "Military reintegration and employment support for veterans.",
      },
      {
        name: "Greater Norwich Area Chamber of Commerce",
        description: "Job bank with local employer listings.",
        href: "https://www.norwichchamber.com/",
      },
      {
        name: "Seniors Helping Seniors",
        description: "Senior caregiver matching program.",
      },
    ],
  },
  {
    slug: "energy",
    heading: "Energy Assistance",
    entries: [
      { name: "211 Connecticut", description: "Information on the Connecticut Energy Assistance Program (CEAP).", href: "https://www.211ct.org/" },
      { name: "Norwich Human Services", description: "Support for low-income households.", href: "https://www.norwichct.org/" },
      { name: "Norwich Public Utilities", description: "Energy efficiency programs and resources.", href: "https://www.norwichpublicutilities.com/" },
      { name: "Operation Fuel", description: "Emergency energy and utility assistance for Connecticut residents.", href: "https://www.operationfuel.org/" },
      { name: "TVCCA", description: "Federally funded energy assistance programs.", href: "https://www.tvcca.org/" },
    ],
  },
  {
    slug: "english",
    heading: "English Classes",
    entries: [
      {
        name: "Literacy Volunteers of Eastern CT",
        description: "Drop-in conversation groups at Otis Library and one-on-one tutoring.",
        href: "https://www.englishhelpect.com/",
      },
      { name: "Haitian Community Center", description: "Beginner English courses plus translation services." },
      {
        name: "Norwich Adult Education",
        description: "19 classes for English language learners at various levels.",
        href: "https://www.norwichadulted.org/",
      },
      { name: "Rose City Learning Center", description: "Personalized programs for 75+ adult learners." },
      { name: "Three Rivers Community College", description: "Intermediate to advanced ESOL courses.", href: "https://www.threerivers.commnet.edu/" },
    ],
  },
  {
    slug: "food",
    heading: "Food",
    entries: [
      { name: "Bette's Bounty", description: "Food pantry serving people with disabilities." },
      { name: "Catholic Charities", description: "Food assistance and social services.", href: "https://www.ccfsct.org/" },
      { name: "Salvation Army", description: "Emergency food and social services.", href: "https://www.salvationarmyusa.org/" },
      { name: "St. Vincent de Paul", description: "Food pantry and emergency assistance." },
      { name: "TVCCA / Meals on Wheels", description: "Senior nutrition delivery program.", href: "https://www.tvcca.org/" },
      { name: "United Way Mobile Food Pantry", description: "Mobile pantry at Three Rivers Community College." },
      { name: "Rosalyn Allen Food Pantry", description: "Weekly food access for everyone, with no restrictions." },
    ],
  },
  {
    slug: "health",
    heading: "Health",
    entries: [
      { name: "Alcoholics Anonymous (AA)", description: "Peer support for alcohol recovery.", href: "https://www.aa.org/" },
      { name: "Narcotics Anonymous (NA)", description: "Peer support for drug recovery.", href: "https://www.na.org/" },
      { name: "Norwich Prevention Council", description: "Substance abuse prevention programs." },
      { name: "SCADD", description: "Substance abuse and addiction treatment." },
      { name: "UCFS", description: "Health, behavioral health, and social services.", href: "https://www.ucfsct.org/" },
      { name: "Hispanic Health Council", description: "Health equity programs for Latino communities." },
      { name: "NAMI Connecticut", description: "Mental health support and advocacy.", href: "https://www.namict.org/" },
      { name: "SMHA", description: "Mental health services with a 24-hour crisis line: (860) 886-9302." },
      { name: "Reliance Health", description: "Mental health and psychiatric services." },
      { name: "Art Reach", description: "Mental health support through creative and performing arts.", href: "https://www.artreachct.org/" },
    ],
  },
  {
    slug: "legal",
    heading: "Legal",
    entries: [
      {
        name: "Connecticut Bar Association",
        description: "Connects individuals to lawyers and legal resources statewide.",
        href: "https://www.ctbar.org/",
      },
      {
        name: "Connecticut Legal Services",
        description: "Free civil legal representation for low-income individuals.",
        href: "https://www.ctlegal.org/",
      },
      {
        name: "Immigration Advocacy and Support Center",
        description: "Low-cost immigration legal services.",
      },
    ],
  },
  {
    slug: "shelter",
    heading: "Shelter & Housing",
    entries: [
      { name: "211 Connecticut", description: "24/7 housing crisis hotline.", href: "https://www.211ct.org/" },
      { name: "Always Home", description: "Eastern Coordinated Access Network shelter partner." },
      { name: "Martin House", description: "SRO housing with support services for adults 18+." },
      { name: "New London Homeless Hospitality Center", description: "Emergency shelter for individuals experiencing homelessness." },
      { name: "Norwich Housing Authority", description: "Low-income family housing assistance." },
      { name: "Safe Futures", description: "Domestic violence support and safe housing.", href: "https://www.safefutures.org/" },
      { name: "Thames River Community Services", description: "Housing and social support services." },
      { name: "TVCCA", description: "Four housing programs addressing homelessness in Eastern CT.", href: "https://www.tvcca.org/" },
    ],
  },
  {
    slug: "transportation",
    heading: "Transportation",
    entries: [
      { name: "ECTC", description: "Medical, mobility, and job-related transportation services." },
      { name: "SEAT Bus", description: "New London County public bus transit.", href: "https://www.seatbus.com/" },
      { name: "DAV Vans", description: "Free transportation to VA facilities for veterans." },
      { name: "Rose City Senior Center", description: "Senior transportation services.", href: "https://www.norwichct.org/" },
    ],
  },
  {
    slug: "veterans",
    heading: "Veterans",
    entries: [
      { name: "DAV Vans", description: "Free transportation to VA facilities." },
      { name: "EasterSeals Veterans Rally Point", description: "Military reintegration and employment support." },
      { name: "Norwich Veterans Center", description: "VA-affiliated center offering readjustment counseling." },
      {
        name: "Veterans of Foreign Wars Post-594",
        description: "Non-profit veterans service organization serving Norwich.",
      },
    ],
  },
];
