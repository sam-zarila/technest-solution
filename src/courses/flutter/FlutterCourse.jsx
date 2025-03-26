import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaYoutube } from "react-icons/fa";
import { SiZoom } from "react-icons/si";

const frontEndCourse = {
  title: "Mobile App Development With Flutter",
  description:
    "Learn to build high-performance mobile applications using Flutter. Master Dart programming and create beautiful, responsive UI components.",
  price: "MWK 8,000 per week",
  duration: "12 Weeks",
  levels: [
    {
      name: "Introduction to Flutter & Dart (1-4 weeks)",
      topics: [
        "Understanding mobile development",
        "Setting up Flutter and Dart environment",
        "Flutter widgets and UI basics",
        "Stateful vs Stateless widgets",
      ],
    },
    {
      name: "Building UI & Navigation (4-8 weeks)",
      topics: [
        "Layouts and responsive design",
        "Navigation and Routing",
        "Handling user input and forms",
        "Using themes and styles",
      ],
    },
    {
      name: "Advanced Flutter Concepts (8-12 weeks)",
      topics: [
        "State management techniques (Provider, Riverpod, Bloc)",
        "Fetching and handling API data",
        "Database integration (Hive, SQLite, Firebase)",
        "Animations and Performance Optimization",
      ],
    },
    {
      name: "Final Project (1 week)",
      topics: [
        "Building a full-featured mobile app",
        "Testing and debugging",
        "Deployment to Play Store and App Store",
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


const CourseDetailCard = ({ title, description, price, duration, levels, trainingModes }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeIn("left", "spring", 0.3, 0.75)} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl">
      {/* Icons Section */}
      <div className="flex justify-center space-x-6 mb-6">
        {[
          { src: "https://i.pinimg.com/736x/44/51/b1/4451b16f14d94961bbc5a1a29c2d3459.jpg", alt: "HTML" },
          { src: "https://i.pinimg.com/736x/7e/9f/82/7e9f82f94f7f24667e19193a90bb3be1.jpg", alt: "CSS" },
          { src: "https://i.pinimg.com/736x/5a/81/46/5a814660c6e142c48f5d7241c45e4597.jpg", alt: "JavaScript" },
          { src: "https://i.pinimg.com/736x/3d/6f/22/3d6f22dcf37c9aa5544a79a8ec343b85.jpg", alt: "React" },
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
        onClick={() => navigate("/shop/flutter")}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Enroll in Course
      </button>
    </motion.div>
  );
};

const FlutterCourse = () => {
  return (
    <motion.div variants={textVariant()} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side - Course Card */}
      <div>
        <h1 className="mt-16 text-center text-3xl text-white font-bold">Frontend Development Course</h1>
        <CourseDetailCard {...frontEndCourse} />
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

export default FlutterCourse;
