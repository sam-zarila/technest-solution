import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";  // Keep these as they are
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const frontEndCourse = {
  title: "Frontend Development with Next.js, React, and Tailwind",
  description:
    "Learn the fundamentals of frontend development using modern technologies. Build fast, responsive websites with state-of-the-art tools.",
  price: "MWK 10,000 per week",
  duration: "12 Weeks",
  levels: [
    {
      name: "Beginner Level (Weeks 1-4)",
      topics: [
        "Introduction to Web Development",
        "HTML & CSS Essentials",
        "JavaScript Fundamentals",
        "Version Control & Deployment Basics",
      ],
    },
    {
      name: "Intermediate Level (Weeks 5-8)",
      topics: [
        "Advanced JavaScript & ES6 Features",
        "React.js Essentials",
        "Next.js Basics & API Integration",
        "Tailwind CSS for Styling",
      ],
    },
    {
      name: "Expert Level (Weeks 9-12)",
      topics: [
        "State Management & Advanced Hooks",
        "Authentication & Security",
        "Building a Real-world Project",
      ],
    },
  ],
};

const CourseDetailCard = ({ title, description, price, duration, levels }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleShopCourse = () => {
    // Navigate to the shopping page (e.g., /shop)
    navigate("/shop");
  };

  return (
    <motion.div variants={fadeIn("up", "spring", 0.3, 0.75)} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
      <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-lg text-green-400 font-semibold">{price} | {duration}</p>
      
      {levels.map((level, index) => (
        <div key={index} className="mt-4">
          <h4 className="text-xl text-white font-semibold">{level.name}</h4>
          <ul className="list-disc list-inside text-gray-400 mt-2">
            {level.topics.map((topic, idx) => (
              <li key={idx}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
      
      <button
        onClick={handleShopCourse} // Trigger navigate when button is clicked
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Shop Course Now
      </button>
    </motion.div>
  );
};

const FrontEndCoursePage = () => {
  return (
    <motion.div variants={textVariant()} className="p-6">
      <h1 className="text-center text-3xl text-white font-bold">Frontend Development Course</h1>
      <CourseDetailCard {...frontEndCourse} />
    </motion.div>
  );
};

export default FrontEndCoursePage;  // Export directly without SectionWrapper
