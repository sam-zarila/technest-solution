import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";

const initialCourses = [
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
    title: "Forex Trading Essentials",
    description:
      "Learn the basics of forex trading including technical analysis, risk management, and trading strategies.",
    price: "MWK 25,000 per week",
    duration: "5 hours per week",
    path: "/courses/forex",
    icons: [
      { src: "https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/54/81/c0/5481c0d7-8613-8e24-95c1-c797025a933d/source/512x512bb.jpg", alt: "Forex" },
    ],
  },
  {
    title: "Crypto Trading 101",
    description:
      "Explore the world of cryptocurrency trading, understand blockchain technology and develop trading strategies.",
    price: "MWK 30,000 per week",
    duration: "5 hours per week",
    path: "/courses/crypto",
    icons: [
      { src: "https://i.pinimg.com/736x/8f/8c/2f/8f8c2fa88523d7a02c0ac25a1b1bfbb1.jpg", alt: "Crypto" },
    ],
  },
];

const extraCourses = [
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
      { src: "https://i.pinimg.com/736x/3d/d4/57/3dd4570a291ac8aea3bba7aad8ae4f0e.jpg", alt: "HTML" },
      { src: "https://i.pinimg.com/736x/24/a9/55/24a9551afc9fd2855a7fda5a9a11e511.jpg", alt: "CSS" },
      { src: "https://i.pinimg.com/736x/cc/bc/7f/ccbc7fd36b31d4aa88a0a2c6df6c0de7.jpg", alt: "JavaScript" },
      { src: "https://i.pinimg.com/736x/3d/6f/22/3d6f22dcf37c9aa5544a79a8ec343b85.jpg", alt: "React" },
    ],
  },
];

const Train = () => {
  // State to determine if extra courses should be shown
  const [showMore, setShowMore] = useState(false);

  // Combine the initial courses with extra courses based on state
  const coursesToDisplay = showMore ? [...initialCourses, ...extraCourses] : initialCourses;

  return (
    <section className="py-10 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Explore Our Training Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesToDisplay.map((course, index) => (
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
        <div className="flex justify-center mt-8">
          {/* Toggle Button */}
          {showMore ? (
            <button
              onClick={() => setShowMore(false)}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              See Fewer Courses
            </button>
          ) : (
            <button
              onClick={() => setShowMore(true)}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              See More Courses
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Train;
