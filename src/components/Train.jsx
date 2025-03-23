import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const trainCourses = [
  {
    title: "Frontend Development with Next.js, React, and Tailwind",
    description:
      "Learn the fundamentals of frontend development using modern technologies like Next.js, React.js, and Tailwind CSS.",
    price: "MWK 10,000 per week",
    duration: "4 hours per week",
    path: "/courses/frontend",
  },
  {
    title: "Backend Development with NestJS, Python, and Firebase",
    description:
      "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and manage data effectively.",
    price: "MWK 15,000 per week",
    duration: "4 hours per week",
    path: "/courses/backend",
  },
  {
    title: "Full Stack Development with Next.js, React, Tailwind, NestJS, and Firebase",
    description:
      "Master full-stack development by integrating frontend and backend technologies. Build complete web applications from scratch.",
    price: "MWK 20,000 per week",
    duration: "4 hours per week",
    path: "/courses/fullstack",
  },
];

const CourseCard = ({ title, description, price, duration, path }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-all">
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
      <h2 className="text-3xl font-bold text-center text-gray-200">Tech Training Courses</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {trainCourses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Train;
