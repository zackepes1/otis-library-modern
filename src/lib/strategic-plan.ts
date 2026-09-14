// Real content from otislibrarynorwich.org/strategic-plan/ (2025–2030 plan),
// via the site's own WordPress API. Six strategic goals, each with the
// library's own supporting bullet points.
export const strategicPlan = {
  years: "2025–2030",
  mission:
    "Otis Library is a trusted informational and cultural hub that provides free resources for personal growth and lifelong learning. We inspire lasting connections and foster community in a safe, welcoming environment.",
  vision:
    "To create a vibrant and inclusive community through library services and programs where individuals are empowered to explore and thrive.",
  letter: [
    "Dear Norwich Community Members and Library Patrons,",
    "We are excited to share our 2025-2030 strategic plan with you! This plan is a direct result of the input received from our staff, board, Friends of Otis Library, and most importantly, our community.",
    "Our key takeaway from this process is that while you enjoy our current programs, services, and resources, the full breadth of in-person and online services we offer is not widely known. We will continue to get out into the community to share these resources and expand the variety and reach of our programs for all ages.",
    "Thank you to everyone who attended a community conversation, completed a survey, or contacted us directly. Your feedback was essential in helping us develop a plan that connects you with the people and resources to help you, your family, and your community thrive.",
    "We are grateful to Ellen Paul of the Connecticut Library Consortium and Maureen Sullivan of Maureen Sullivan & Associates for leading a cohort of five libraries and guiding us through this process. Special thanks to the libraries we worked with for sharing their ideas, enthusiasm, and expertise with us. This was truly a collaborative effort.",
    "Please continue to stay in touch with us and share your thoughts and suggestions. We look forward to learning, connecting, and growing with you!",
  ],
  team: [
    "Cathleen Special, Executive Director",
    "Jessica Franco, Assistant Director",
    "Bassem Gayed, Multicultural Services Coordinator",
    "Melanie Lozada, Assistant Children's Librarian",
    "Michael Gualtieri, Treasurer, Board of Trustees",
    "Carrie Triba, President, Friends of Otis Library",
  ],
  pdfs: [
    { label: "English PDF", href: "/documents/strategic-plan/strategic-plan-english.pdf" },
    { label: "Spanish PDF", href: "/documents/strategic-plan/strategic-plan-spanish.pdf" },
    { label: "Haitian Creole PDF", href: "/documents/strategic-plan/strategic-plan-haitian-creole.pdf" },
  ],
};

export type StrategicGoal = {
  title: string;
  description: string;
  points: string[];
};

export const strategicGoals: StrategicGoal[] = [
  {
    title: "Preserve the Past",
    description: "Ensure the rich history of Norwich will be accessible to everyone by:",
    points: [
      "Preserving and digitizing local historical records, photographs, newspapers, and other artifacts",
      "Providing information and education on how to access the multitude of historical and genealogical resources available",
    ],
  },
  {
    title: "Provide for the Future",
    description:
      "Develop programs, resources, and services for children, teens, and adults that empower them for the future through:",
    points: [
      "Fun and engaging programs to educate, entertain, and inspire",
      "School readiness and early literacy initiatives for children and caregivers",
      "Initiatives that support education in all its forms, such as homeschooling and vocational training",
      "Financial education, digital proficiency, career readiness, retirement planning, and other life skills",
    ],
  },
  {
    title: "Create Space",
    description: "Provide safe and welcoming spaces that allow people and ideas to come together through:",
    points: [
      "Accessible design and services that can be enjoyed by individuals of all abilities",
      "Flexible, comfortable gathering and meeting spaces",
      "Collaborations with local government and businesses to provide ample, well-lit, adjacent parking",
      "A mobile library to increase our presence in the community and address transportation challenges",
    ],
  },
  {
    title: "Expand and Enhance Partnerships",
    description: "Promote awareness and efficient use of community resources by:",
    points: [
      "Working with local schools, organizations, and agencies to identify redundancies and promote collaboration",
      "Initiating programs and services that complement those of our partners and meet community needs",
      "Collaborating with partners to provide programs in different areas of the city",
    ],
  },
  {
    title: "Increase Marketing & Advocacy",
    description:
      "Promote the library as a free and trusted institution while bringing awareness to our resources and space through:",
    points: [
      "Website, print media, social media, local radio, and public access television",
      "Advocacy campaigns that highlight the library's impact on education, social connection, and lifelong learning",
      "Increased visibility by participating in local events, meetings, and community conversations",
    ],
  },
  {
    title: "Ensure Financial Stability",
    description:
      "Otis Library is a 501(c)(3) nonprofit that relies on grants, donations, and fundraising events. To ensure financial stability, we will:",
    points: [
      "Educate our community on the library's organizational structure, operations, and budget",
      "Build a coalition of library supporters to advocate for adequate funding",
      "Establish effective partnerships with local organizations to pool resources and encourage cost savings",
      "Explore alternative sources of revenue",
    ],
  },
];
