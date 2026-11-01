export interface ContactDetails {
  phone: string;
  phoneTel: string;
  whatsappUrl: string;
  email: string;
  emailMailto: string;
  socialName: string;
  location: string;
}

export const contactDetails: ContactDetails = {
  phone: "059 177 5955",
  phoneTel: "tel:0591775955",
  whatsappUrl: "https://wa.me/233591775955",
  email: "info@goodgeneralgh.com",
  emailMailto: "mailto:info@goodgeneralgh.com",
  socialName: "Good General GH",
  location: "Greater Accra, Ghana",
};

export const brandContent = {
  name: "Good General Publications & Stationery",
  shortName: "Good General",
  mission: "Building generations through knowledge.",
  promise: "Dependable quality. Thoughtful design. Reliable delivery. Every time.",
  tagline: "Made for Africa. Made to last.",
  ctaLabel: "Enquire about a school project",
};

export const heroContent = {
  headline: "Custom school books and stationery, organised from start to finish.",
  subheadline:
    "Helping private schools in Greater Accra coordinate custom exercise books, bulk stationery supply, and campus bookshops without the administrative strain.",
};

export const challengeContent = {
  heading: "Organising school books and stationery should not take over your time.",
  subheading:
    "Protecting leadership hours for school heads and bursars in Greater Accra.",
  paragraphs: [
    "Every reopening season, school heads and bursars face the burden of sourcing exercise books, stationery packs, and planners. Coordinating disparate print shops, haggling with market suppliers, chasing late deliveries, and inspecting misprinted covers consumes weeks of valuable administrative time.",
    "Good General replaces vendor fragmentation with one accountable project partner. We bring together verified book production, institutional design, and compound logistics so your learning materials arrive inspected, sorted, and ready before day one.",
  ],
  points: [
    {
      title: "One accountable partner",
      description:
        "Replace three to five separate suppliers with a single coordinated channel covering production, branding, and campus delivery.",
    },
    {
      title: "Zero administrative strain",
      description:
        "Free school heads and bursars to focus on admissions, staff preparation, and curriculum instead of chasing printers.",
    },
    {
      title: "Faithful institutional branding",
      description:
        "Exact school crests, approved colour palettes, and tailored internal rulings matched to each grade's requirements.",
    },
    {
      title: "Punctual compound delivery",
      description:
        "Every batch inspected against signed physical samples, boxed by class, and delivered directly to your gate ahead of reopening.",
    },
  ],
};

export const offerContent = [
  {
    title: "Customised school books",
    description:
      "Exercise books, notebooks, diaries, report booklets, and related educational publications featuring your school’s name, crest, and colours, produced to an agreed specification.",
    details: [
      "Exercise books and subject notebooks",
      "School diaries and academic planners",
      "Report booklets and administrative records",
      "Coordinated grade-level cover colours",
    ],
    image: "/images/gallery/educational-publications-full.jpg",
    alt: "Custom educational publications and notebooks",
  },
  {
    title: "Stationery supply",
    description:
      "Ready-made stationery sets and bulk supplies tailored for school bookshops and classroom readiness, eliminating off-campus shopping friction for parents.",
    details: [
      "Writing essentials: pens, pencils, and erasers",
      "Classroom tools: rulers, geometry sets, and markers",
      "Desk accessories and teacher supplies",
      "Pre-assembled student stationery packs",
    ],
    image: "/images/gallery/stationery-essentials-full.jpg",
    alt: "Selection of quality stationery and classroom supplies",
  },
  {
    title: "In-school bookshop support",
    description:
      "For schools without an existing bookshop or looking to streamline on-campus distribution, we discuss setting up and stocking a dedicated campus bookshop.",
    details: [
      "On-campus bookshop setup and inventory planning",
      "Curated book and stationery stocking",
      "Structured to discuss based on school suitability",
      "Convenient one-stop access for parents and students",
    ],
    image: "/images/mis-flatlay.jpg",
    alt: "Organised school publications and notebook sets",
  },
];

export const processSteps = [
  {
    number: "01",
    name: "Discover",
    summary: "Understand the school's needs, quantities, audience, and budget.",
    description:
      "We begin by discussing your student numbers, preferred formats, specific book and stationery needs, and reopening timeline.",
  },
  {
    number: "02",
    name: "Specify",
    summary: "Agree on suitable products, materials, finishes, and requirements.",
    description:
      "We recommend paper stock, page counts, cover finishes, and stationery items suited to classroom demands and your budget.",
  },
  {
    number: "03",
    name: "Design",
    summary: "Coordinate school branding and layouts with the design partner.",
    description:
      "Your school's name, crest, colour scheme, and student attribution details are applied precisely across all selected publications.",
  },
  {
    number: "04",
    name: "Produce",
    summary: "A production partner makes the order to approved specifications.",
    description:
      "Our trusted production partner manufactures your order to spec, and every batch is checked against the approved sample before dispatch.",
  },
  {
    number: "05",
    name: "Deliver",
    summary: "Products are packed and labelled by class, then delivered on schedule.",
    description:
      "All items are organized, boxed, and labelled by class or grade level, arriving directly at your school ahead of reopening.",
  },
];

export const proofContent = {
  heading: "Mission International School: notebook programme",
  context:
    "A practical demonstration of our customised book coordination for Mission International School in Greater Accra.",
  features: [
    {
      title: "School-branded notebooks",
      description: "Custom notebooks bearing the school's official crest, typography, and identity.",
    },
    {
      title: "Coordinated cover colours",
      description: "Distinct, uniform cover colourways aligned with school colours and grade requirements.",
    },
    {
      title: "Name and class labelling",
      description: "Standardised attribution panels for learner name, class, and subject on every cover.",
    },
  ],
  images: [
    {
      src: "/images/mis-books-shelf.jpg",
      alt: "Mission International School branded notebooks neatly arranged on school shelving",
      caption: "Organised shelf distribution",
    },
    {
      src: "/images/mis-books-stacked.jpg",
      alt: "Stacked customised notebooks showing Mission International School crest and cover finishes",
      caption: "Uniform binding and finish",
    },
    {
      src: "/images/mis-books-fanned.jpg",
      alt: "Mission International School notebooks showing colour-coded covers and cover branding",
      caption: "Grade-coded colourways",
    },
  ],
};

export const faqList = [
  {
    question: "What kinds of books can be customised?",
    answer:
      "We coordinate custom exercise books, subject notebooks, school diaries, report booklets, and related educational publications. Each item can feature your school’s name, crest, and chosen colours according to the agreed project specification.",
  },
  {
    question: "Can a school ask about stationery supply?",
    answer:
      "Yes. We supply ready-made stationery sets and bulk items for school bookshops and classroom use, including pens, pencils, markers, rulers, geometry sets, erasers, and desk essentials.",
  },
  {
    question: "How does the process begin?",
    answer:
      "The process begins with an initial enquiry. We discuss your school’s learner numbers, the types of books or stationery needed, your academic calendar, and your budget parameters.",
  },
  {
    question: "When does production begin?",
    answer:
      "Each project’s quantities, schedule, specification, and commercial terms are agreed directly with the school. Production begins after the approved sample is signed off and the agreed deposit is received.",
  },
  {
    question: "Does Good General provide prices online?",
    answer:
      "No. Project quantities, material specifications, and terms are tailored for each school. All details and commercial terms are discussed directly with school heads and bursars.",
  },
];
