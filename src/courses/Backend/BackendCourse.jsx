import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { SiZoom } from "react-icons/si";
import { FaVideo, FaYoutube } from "react-icons/fa";

// Course Details
const BackendCourse = {
  title: "Backend Development with NestJS",
  description:
    "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and handle data management with ease.",
  price: "MWK 10,000 per week",
  duration: "18 weeks",
  level: [
    {
      name: "Introduction Node and NestJs (1-4 weeks)",
      topics: [
        "What is Node.js? – Understanding the runtime environment",
        "What is NestJS? – Overview of the NestJS framework and why it is used",
        "Setting up your development environment – Installing Node.js, NestJS CLI, and PostgreSQL",
        "Creating your first NestJS project – Using NestJS CLI to generate a project structure",
        "Modules – Understanding how NestJS organizes code into modules",
        "Controllers – How controllers handle incoming HTTP requests",
        "Services – How services contain business logic and are injected into controllers",
      ],
    },
    {
      name: "Introduction to TypeORM and MySQL (5-8 weeks)",
      topics: [
        "Setting up TypeORM with PostgreSQL in NestJS",
        "Entities – Mapping database tables to TypeScript classes using decorators",
        "Basic CRUD Operations – Using TypeORM repository pattern to interact with the database",
        "Database Migrations – Using NestJS CLI for creating and running migrations",
        "Swagger – Automatically generating API documentation",
      ],
    },
    {
      name: "Advanced NestJS Concepts (9-12 weeks)",
      topics: [
        "Providers – Understanding providers and how services are managed by the NestJS Dependency Injection system",
        "Exception Filters – Handling and customizing error responses",
        "Guards – Implementing authorization logic (e.g., JWT authentication)",
        "Asynchronous Programming with NestJS",
        "Async/Await in NestJS – Handling asynchronous operations in services and controllers",
      ],
    },
    {
      name: "Project (12-15 weeks)",
      topics: [
        "Building a RESTful API – Developing a backend API for a full application (e.g., e-commerce, blog)",
        "Deploying NestJS Application – Deploying to cloud platforms like Heroku, AWS, or DigitalOcean",
      ],
    },
  ],
  trainingModes: ["Online Classes", "Recorded Videos", "Hands-on Activities", "Projects"],
};

const learningPrerequisites = [
  "Basic understanding of using a computer",
  "Interest in mobile app development",
  "No prior programming experience needed",
];

const weeklySchedule = [
  { day: "Monday", hours: "2 Hours - Online Class" },
  { day: "Wednesday", hours: "1 Hour - Hands-on Practice" },
  { day: "Friday", hours: "1 Hour - Project Work" },
];

const CourseDetailCard = ({ title, description, price, duration, level, trainingModes }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 0.75)}
      className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto"
    >
      {/* Icons Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {[
          { src: "https://i.pinimg.com/736x/88/fb/18/88fb185858c7aaebbfbe9a74056c34e0.jpg", alt: "HTML" },
          { src: "https://i.pinimg.com/736x/1f/15/d8/1f15d89430d0d80c32f90998b5793433.jpg", alt: "CSS" },
          { src: "https://i.pinimg.com/736x/16/d8/00/16d800f679a58bdf728a8684a1dbf301.jpg", alt: "JavaScript" },
          { src: "https://i.pinimg.com/736x/d5/1d/8b/d51d8b2ff28db324ed1be2766f793c43.jpg", alt: "React" },
        ].map((icon, index) => (
          <div key={index} className="p-3 bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform">
            <img src={icon.src} alt={icon.alt} className="w-14 h-14 rounded-full" />
          </div>
        ))}
      </div>

      <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-lg text-green-400 font-semibold">{price} | {duration}</p>

      {/* Course Level Section */}
      {level.map((level, index) => (
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
        onClick={() => navigate("/shop/backend")}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Enroll in Course
      </button>
    </motion.div>
  );
};

const BackendCoursePage = () => {
  return (
    <motion.div variants={textVariant()} className="p-6">
      <h1 className="mt-20 text-center text-3xl text-white font-bold">Backend Development Course</h1>
      <CourseDetailCard {...BackendCourse} />
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
    </motion.div>
  );
};

export default BackendCoursePage;
