import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaYoutube } from "react-icons/fa";
import { SiZoom } from "react-icons/si";

const computerBasicsCourse = {
  title: "Basics of Computer Training",
  description:
    "Learn fundamental computer skills, including Microsoft Word, PowerPoint, CMD, Windows installation, and activation.",
  price: "MWK 5,000 per week",
  duration: "8 Weeks",
  levels: [
    {
      name: "Introduction to Computers (1-2 weeks)",
      topics: [
        "Understanding computer hardware and software",
        "Basic computer operations and file management",
        "Using the internet and email effectively",
      ],
    },
    {
      name: "Microsoft Office Essentials (3-5 weeks)",
      topics: [
        "Microsoft Word: Document formatting and editing",
        "Microsoft PowerPoint: Creating professional presentations",
        "Microsoft Excel basics",
      ],
    },
    {
      name: "Advanced System Operations (6-8 weeks)",
      topics: [
        "Command Prompt (CMD) basics",
        "Windows installation and troubleshooting",
        "Windows activation and licensing",
      ],
    },
  ],
  trainingModes: [
    "Online Classes",
    "Recorded Videos",
    "Hands-on Activities",
    "Practical Assignments",
  ],
};

const learningPrerequisites = [
  "Basic ability to use a computer",
  "Interest in learning computer skills",
  "No prior technical knowledge required",
];

const weeklySchedule = [
  { day: "Monday", hours: "2 Hours - Online Class" },
  { day: "Wednesday", hours: "1 Hour - Hands-on Practice" },
  { day: "Friday", hours: "1 Hour - Practical Assignment" },
];

const CourseDetailCard = ({ title, description, price, duration, levels, trainingModes }) => {
  const navigate = useNavigate();

  return (
    <motion.div variants={fadeIn("left", "spring", 0.3, 0.75)} className="bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-3xl">
      <div className="flex justify-center space-x-6 mb-6">
        {[
          { src: "https://i.pinimg.com/736x/3d/d4/57/3dd4570a291ac8aea3bba7aad8ae4f0e.jpg", alt: "HTML" },
          { src: "https://i.pinimg.com/736x/24/a9/55/24a9551afc9fd2855a7fda5a9a11e511.jpg", alt: "CSS" },
          { src: "https://i.pinimg.com/736x/cc/bc/7f/ccbc7fd36b31d4aa88a0a2c6df6c0de7.jpg", alt: "JavaScript" },
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

      <div className="mt-6">
        <h4 className="text-xl text-white font-semibold">Training Modes</h4>
        <ul className="list-disc list-inside text-gray-400 mt-2">
          {trainingModes.map((mode, index) => (
            <li key={index}>{mode}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
      >
        Enroll in Course
      </button>
    </motion.div>
  );
};

const TrainingCourse = () => {
  return (
    <motion.div variants={textVariant()} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="mt-16 text-center text-3xl text-white font-bold">Computer Basics Course</h1>
        <CourseDetailCard {...computerBasicsCourse} />
      </div>

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
          <a href="https://meet.google.com/" target="_blank" rel="noopener noreferrer">
            <FaVideo className="text-green-500 text-3xl hover:text-green-700" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-red-500 text-3xl hover:text-red-700" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default TrainingCourse;
