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
    title: "Basic Computer Training (Microsoft Word, Typing, Excel)",
    description:
      "Learn essential computer skills, including Microsoft Word, typing techniques, and Excel basics for office productivity.",
    price: "MWK 4,000 per week",
    duration: "3 hours per week",
    path: "/courses/basic-computer",
    icons: [
      { src: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Microsoft_Office_Word_%282013%E2%80%932019%29.svg", alt: "Microsoft Word" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/4/43/Microsoft_Office_Excel_%282013-2019%29.svg", alt: "Excel" },
      { src: "https://upload.wikimedia.org/wikipedia/commons/8/8c/Keyboard-icon.svg", alt: "Typing" },
    ],
  },
];

const CourseCard = ({ title, description, price, duration, path, icons }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all relative">
      {/* Icons on Top */}
      <div className="flex justify-center space-x-4 mb-4">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="p-2 bg-gray-800 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <img src={icon.src} alt={icon.alt} className="w-12 h-12 rounded-full" />
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
      <p className="text-green-600 font-bold mt-3">{price}</p>
      <p className="text-gray-500">{duration}</p>
      <Link to={path}>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
          Enroll Now
        </button>
      </Link>
    </div>
  );
};

const Train = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className={`${styles.sectionHeadText}`}>Online Website Training Courses</h2>

      <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
        Our tech training school is dedicated to equipping learners with the latest
        industry-relevant skills in software development and basic computer literacy.
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
