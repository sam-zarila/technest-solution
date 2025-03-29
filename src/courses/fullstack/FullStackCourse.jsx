import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaYoutube } from "react-icons/fa";
import { SiZoom } from "react-icons/si";

const fullStackCourse = {
  title: "Full Stack Development with Next.js, React, Tailwind & NestJS",
  description:
    "Master both frontend and backend development by building modern web applications. Learn to create dynamic UIs with React and Tailwind CSS and robust APIs with NestJS.",
  price: "MWK 12,000 per week",
  duration: "16 Weeks",
  levels: [
    {
      name: "Foundations & Environment Setup (Weeks 1-3)",
      topics: [
        "Overview of full stack development",
        "Setting up Node.js, Next.js, and NestJS environments",
        "Introduction to Git and version control",
      ],
    },
    {
      name: "Frontend Fundamentals (Weeks 4-7)",
      topics: [
        "Building UI components with React and Next.js",
        "Styling with Tailwind CSS",
        "Responsive design and performance optimization",
      ],
    },
    {
      name: "Backend Fundamentals (Weeks 8-11)",
      topics: [
        "Introduction to NestJS architecture",
        "Creating RESTful APIs and GraphQL endpoints",
        "Database integration and authentication",
      ],
    },
    {
      name: "Integration & Final Project (Weeks 12-16)",
      topics: [
        "Connecting frontend with backend services",
        "Advanced state management and API consumption",
        "Deployment and scaling full stack applications",
      ],
    },
  ],
  trainingModes: [
    "Live Online Classes",
    "Recorded Sessions",
    "Hands-on Labs",
    "Real-World Projects",
  ],
};

const learningPrerequisites = [
  "Basic understanding of programming concepts",
  "Familiarity with JavaScript",
  "Interest in building complete web applications",
  "No prior experience with full stack development needed",
];

const weeklySchedule = [
  { day: "Monday", hours: "2 Hours - Live Class" },
  { day: "Wednesday", hours: "1 Hour - Hands-on Labs" },
  { day: "Friday", hours: "1 Hour - Project Work" },
];

const CourseDetailCard = ({ title, description, price, duration, levels, trainingModes }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeIn("left", "spring", 0.3, 0.75)} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl">
      {/* Icons Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {[
          { src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg", alt: "Next.js" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", alt: "React" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", alt: "Tailwind CSS" },
          { src: "https://nestjs.com/img/logo_text.svg", alt: "NestJS" },
        ].map((icon, index) => (
          <div key={index} className="p-3 bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
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
        onClick={() => navigate("/shop/fullstack")}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Enroll in Course
      </button>
    </motion.div>
  );
};

const FullstackCourse = () => {
  return (
    <motion.div variants={textVariant()} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Course Card */}
      <div>
        <h1 className="mt-16 text-center text-3xl text-white font-bold">Full Stack Development Course</h1>
        <CourseDetailCard {...fullStackCourse} />
      </div>

      {/* Right Side - Learning Prerequisites and Weekly Schedule */}
      <div className="bg-gray-800 p-4 rounded-xl shadow-lg text-white mt-24 max-h-[400px] overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Learning Roadmap</h2>

        <h2 className="text-xl font-semibold mb-2">Learning Prerequisites</h2>
        <ul className="list-disc list-inside text-gray-300 text-sm mb-4">
          {learningPrerequisites.map((prereq, index) => (
            <li key={index}>{prereq}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold mb-2">4-Hour Weekly Learning Schedule</h2>
        <table className="w-full border border-gray-700 text-sm">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-1 px-2 border border-gray-600">Day</th>
              <th className="py-1 px-2 border border-gray-600">Hours</th>
            </tr>
          </thead>
          <tbody>
            {weeklySchedule.map((item, index) => (
              <tr key={index} className="bg-gray-900 text-center">
                <td className="py-1 px-2 border border-gray-600">{item.day}</td>
                <td className="py-1 px-2 border border-gray-600">{item.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://zoom.us/" target="_blank" rel="noopener noreferrer">
            <SiZoom className="text-blue-500 text-3xl hover:text-blue-700" />
          </a>

          <a href="https://meet.google.com/mbd-iovi-csd" target="_blank" rel="noopener noreferrer">
            <FaVideo className="text-green-500 text-3xl hover:text-green-700" />
          </a>

          <a href="https://www.youtube.com/channel/UCrm1eI4AOp2J33k95oTDReg" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-500 text-3xl hover:text-red-700" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default FullstackCourse;
