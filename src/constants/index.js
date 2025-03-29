import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
  {
    id: "school",
    title: "school",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Mobile Apps Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "web  and mobile trainings ",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "NextJs",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];


const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "Liwonde Private Hospital",
    icon: 'https://i.pinimg.com/736x/c8/a1/d1/c8a1d1aae359c5b988039bd92d622a9f.jpg', // Replace with actual icon
    iconBg: "#383E56",
    date: "2022 - 2024",
    points: [
      "Developed and maintained the hospital management system to streamline patient records and appointments.",
      "Integrated secure authentication and data management solutions.",
      "Ensured a responsive and user-friendly interface for healthcare professionals and patients.",
    ],
  },
  {
    title: "Lead Developer",
    company_name: "University Connect SuperApp",
    icon: 'https://i.pinimg.com/736x/ed/a8/e5/eda8e59591f4bba7ec610248e458c813.jpg', // Replace with actual icon
    iconBg: "#E6DEDD",
    date: "2023 - Present",
    points: [
      "Designed and developed a multi-functional super app for university students.",
      "Implemented features for academic collaboration, networking, and resource sharing.",
      "Optimized backend architecture for scalability and real-time updates.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "HomeHub Malawi",
    icon: 'https://i.pinimg.com/736x/ae/c4/9b/aec49b28e40706e7f5cb4ec92aefe961.jpg', // Replace with actual icon
    iconBg: "#383E56",
    date: "2023 - Present",
    points: [
      "Developed a real estate and home services platform connecting users with service providers.",
      "Implemented a seamless search and booking system for property listings.",
      "Integrated payment gateways and geolocation services for enhanced user experience.",
    ],
  },
];



const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Technest proved me wrong.",
    name: "Duncan Phiri",
    designation: "IT Technician",
    company: "Liwonde private Hospita",
    image: "https://i.pinimg.com/736x/f9/fd/d4/f9fdd40fcee714678724a977777fd221.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Technest does.",
    name: "Mary Chirwa",
    designation: "COO",
    company: "DEF Corp",
    image: "https://i.pinimg.com/736x/e8/16/83/e816838a82b22cc82c2a03ca8dd47655.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Chimwemwe Malunga",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://i.pinimg.com/736x/8d/0e/68/8d0e6806bc39326670fc41f9c0879ada.jpg",
  },
];

const projects = [
  {
    name: "Liwonde Private Hospital",
    description:
      "A healthcare service platform for Liwonde Private Hospital, providing online consultation booking, appointment management, and patient information access.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "pink-text-gradient",
      },
    ],
    image: "https://www.liwondeprivatehospital.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fliwonde.9a9f1e58.jpeg&w=1080&q=75", // Replace with the actual URL of your image
    source_code_link: "https://github.com/your-repository/LiwondePrivateHospital",
    live_link: "https://www.liwondeprivatehospital.com/", // Replace with the live project URL
  },
  {
    name: "HomeHub Malawi",
    description:
      "A platform for finding homes to rent or buy in Malawi, connecting home seekers with landlords and providing detailed property listings.",
    tags: [
      {
        name: "Nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "Nestjs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.pinimg.com/736x/5a/ee/42/5aee4269e6d739468d8596fb610b18b7.jpg", // Replace with the actual URL of your image
    source_code_link: "https://github.com/your-repository/HomeHubMalawi",
    live_link: "https://homehubmw.netlify.app/", // Replace with the live project URL
  },
  {
    name: "PaySmart Malawi",
    description:
      "A mobile application that enables efficient and secure financial transactions in Malawi, offering users various payment and money transfer options.",
    tags: [
      {
        name: "flutter",
        color: "blue-text-gradient",
      },
      {
        name: "api",
        color: "green-text-gradient",
      },
      {
        name: "paymentgateway",
        color: "pink-text-gradient",
      },
    ],
    image: "https://i.pinimg.com/736x/93/a5/8b/93a58b720f360ca801614c2b4860830a.jpg", // Replace with the actual URL of your image
    source_code_link: "https://github.com/your-repository/PaySmartMalawi",
    live_link: "https://your-live-link.com/paysmart-malawi", // Replace with the live project URL
  },
];
const courses = [
  {
    title: "Frontend Development with Next.js, React, and Tailwind",
    description:
      "Learn the fundamentals of frontend development using modern technologies like Next.js, React.js, and Tailwind CSS. Build fast, responsive websites with state-of-the-art tools.",
    icon: web,
    price: "MWK 10,000 per week",
    buttonText: "Shop Course",
  },
  {
    title: "Backend Development with NestJS, Python, and Firebase",
    description:
      "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and handle data management with ease.",
    icon: backend,
    price: "MWK 15,000 per week",
    buttonText: "Shop Course",
  },
  {
    title: "Full Stack Development with Next.js, React, Tailwind, NestJS, and Firebase",
    description:
      "Master full-stack development by integrating frontend and backend technologies like Next.js, React.js, NestJS, and Firebase. Build complete web applications from scratch.",
    icon: creator,
    price: "MWK 20,000 per week",
    buttonText: "Shop Course",
  },
  {
    title: "Mobile App Development with Flutter, Kotlin, and Superbase",
    description:
      "Learn to build cross-platform mobile applications with Flutter and Kotlin. Integrate Superbase for real-time data synchronization and user authentication.",
    icon: mobile,
    price: "MWK 18,000 per week",
    buttonText: "Shop Course",
  },
];


export { services, technologies, experiences, testimonials, projects,courses };
