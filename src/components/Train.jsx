import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { motion } from "framer-motion";

const trainCourses = [
  {
    title: "Frontend Development with Next.js, React, and Tailwind",
    description:
      "Learn the fundamentals of frontend development using modern technologies like Next.js, React.js, and Tailwind CSS.",
    price: "MWK 6,000 per week",
    duration: "4 hours per week",
    path: "/courses/frontend",
    icons:  <div className="flex justify-center space-x-6 mb-6">
    {[
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEc9A_S6BPxCDRp5WjMFEfXrpCu1ya2OO-Lw&s", alt: "HTML" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeB0Kf8bAgxekAzMETw0PwdbibAGCa2FrfDQ&s", alt: "CSS" },
      { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ4qe-TiNdb7kONl0a1C3a1R3H9TPWKSJeGg&s", alt: "JavaScript" },
      { src: "https://miro.medium.com/v2/resize:fit:1400/1*aF1u1vDDft_pzrZ0SlLRuw.png", alt: "React" },
    ].map((icon, index) => (
      <div 
        key={index} 
        className="p-3 bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <img src={icon.src} alt={icon.alt} className="w-14 h-14 rounded-full" />
      </div>
    ))}
  </div>
  

  },
  {
    title: "Backend Development with NestJS",
    description:
      "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and manage data effectively.",
    price: "MWK 10,000 per week",
    duration: "4 hours per week",
    path: "/courses/Backend",
  },
  {
    title: "Full Stack Development with Next.js, React, Tailwind, NestJS",
    description:
      "Master full-stack development by integrating frontend and backend technologies. Build complete web applications from scratch.",
    price: "MWK 12,000 per week",
    duration: "4 hours per week",
    path: "/courses/fullstack",
  },
  {
    title: "Mobile Application Development with Flutter",
    description:
      "Learn how to build cross-platform mobile applications using Flutter. Gain hands-on experience in UI design and state management.",
    price: "MWK 15,000 per week",
    duration: "4 hours per week",
    path: "/courses/flutter",
  },
  {
    title: "Introduction to Java Programming",
    description:
      "Get started with Java programming. Learn the basics of object-oriented programming, data structures, and algorithm design.",
    price: "MWK 5,000 per week",
    duration: "4 hours per week",
    path: "/courses/java",
  },
];

const CourseCard = ({ title, description, price, duration, path }) => {
    return (
      <div className="bg-gray-200 p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <p className="text-green-600 font-bold mt-3">{price}</p>
        <p className="text-gray-500">{duration}</p>
        <Link to={path}>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Shop Course
          </button>
        </Link>
      </div>
    );
  };

const Train = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className={`${styles.sectionHeadText}`}>Online Website Training Courses</h2>
      
      <p className="className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
        Our tech training school is dedicated to equipping learners with the latest
        industry-relevant skills in software development. We provide hands-on experience
        and mentorship to help you succeed in the tech industry.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {trainCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Train;

