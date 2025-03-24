import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";

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
  trainingModes: [
    "Online Classes",
    "Recorded Videos",
    "Hands-on Activities",
    "Projects",
  ],
};

const CourseDetailCard = ({ title, description, price, duration, levels, trainingModes }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeIn("up", "spring", 0.3, 0.75)} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto">
      {/* Icons Section */}
      <div className="flex justify-center space-x-6 mb-6">
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

      
      <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-lg text-green-400 font-semibold">{price} | {duration}</p>
      
     
      
      {/* Course Levels Section */}
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
       {/* Training Modes Section */}
       <div className="mt-6">
        <h4 className="text-xl text-white font-semibold">Training Modes</h4>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          {trainingModes.map((mode, index) => (
            <li key={index}>{mode}</li>
          ))}
        </ul>
      </div>
      
      {/* Enroll Button */}
      <button
        onClick={() => navigate("/shop")}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Enroll in Course
      </button>
    </motion.div>
  );
};

const FrontEndCoursePage = () => {
  return (
    <motion.div variants={textVariant()} className="p-6">
      <h1 className="mt-20 text-center text-3xl text-white font-bold">Frontend Development Course</h1>
      <CourseDetailCard {...frontEndCourse} />
    </motion.div>
  );
};

export default FrontEndCoursePage;
