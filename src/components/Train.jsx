import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";

const trainCourses = [
  {
    title: "Frontend Development with Next.js, React, and Tailwind",
    description:
      "Learn the fundamentals of frontend development using modern technologies like Next.js, React.js, and Tailwind CSS.",
    price: "MWK 6,000 per week",
    duration: "4 hours per week",
    path: "/courses/frontend",
    icons: [
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s", alt: "HTML" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB0Kf8bAgxekAzMETw0PwdbibAGCa2FrfDQ&s", alt: "CSS" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4qe-TiNdb7kONl0a1C3a1R3H9TPWKSJeGg&s", alt: "JavaScript" },
      { src: "https://miro.medium.com/v2/resize:fit:1400/1*aF1u1vDDft_pzrZ0SlLRuw.png", alt: "React" },
    ],
  },
  {
    title: "Backend Development with NestJS",
    description:
      "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and manage data effectively.",
    price: "MWK 10,000 per week",
    duration: "4 hours per week",
    path: "/courses/backend",
    icons: [
      { src: "https://nestjs.com/img/logo_text.svg", alt: "NestJS" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg", alt: "Python" },
      { src: "https://firebase.google.com/static/downloads/brand-guidelines/SVG/logo-logomark.svg", alt: "Firebase" },
    ],
  },
  {
    title: "Full Stack Development with Next.js, React, Tailwind, NestJS",
    description:
      "Master full-stack development by integrating frontend and backend technologies. Build complete web applications from scratch.",
    price: "MWK 12,000 per week",
    duration: "4 hours per week",
    path: "/courses/fullstack",
    icons: [
      { src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", alt: "Next.js" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "React" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS" },
      { src: "https://nestjs.com/img/logo_text.svg", alt: "NestJS" },
    ],
  },
  {
    title: "Mobile Application Development with Flutter",
    description:
      "Learn how to build cross-platform mobile applications using Flutter. Gain hands-on experience in UI design and state management.",
    price: "MWK 15,000 per week",
    duration: "4 hours per week",
    path: "/courses/flutter",
    icons: [
      { src: "https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png", alt: "Flutter" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png", alt: "Dart" },
    ],
  },
  {
    title: "Introduction to Java Programming",
    description:
      "Get started with Java programming. Learn the basics of object-oriented programming, data structures, and algorithm design.",
    price: "MWK 5,000 per week",
    duration: "4 hours per week",
    path: "/courses/java",
    icons: [
      { src: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg", alt: "Java" },
    ],
    
  },
  {
    title: "Basic Computer Training (Microsoft Word, Typing, Excel)",
    description:
      "Learn essential computer skills, including Microsoft Word, typing techniques, and Excel basics for office productivity.",
    price: "MWK 4,000 per week",
    duration: "3 hours per week",
    path: "/courses/training",
    icons: [
      { src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Microsoft_Office_Word_%282013%E2%80%932019%29.svg", alt: "Microsoft Word" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Office_Excel_%282013-2019%29.svg", alt: "Excel" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Keyboard-icon.svg", alt: "Typing" },
    ],
  },
];

const Train = () => {
  return (
    <section className="py-10 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Explore Our Training Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex justify-center mb-4">
                {course.icons.map((icon, i) => (
                  <img
                    key={i}
                    src={icon.src}
                    alt={icon.alt}
                    className="h-10 w-10 mx-2 hover:scale-110 transition-transform"
                  />
                ))}
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
              <p className="text-gray-800 font-bold mt-2">{course.price}</p>
              <p className="text-gray-500">{course.duration}</p>
              <Link to={course.path} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Train;
