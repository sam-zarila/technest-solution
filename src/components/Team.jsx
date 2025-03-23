import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion"; // Assuming motion effects

const teamMembers = [
  {
    name: "Samson Zarila",
    role: "Full Stack Developer & Technical Lead",
    description: `
      Samson Zarila is a highly skilled full-stack developer, technical lead, and passionate educator at TechNest. With a diverse skill set and deep understanding of both frontend and backend technologies, Samson specializes in crafting robust web applications, mobile platforms, and integrated systems. He has worked on a wide range of projects, specializing in React, Node.js, NestJS, and mobile development with Flutter. As a tutor, he empowers students to build strong foundations and advance their skills in modern development technologies.
    `,
    skills: [
      "React, Next.js, Tailwind CSS, JavaScript, Three Js, Typescript,",
      "Node.js, Express.js, NestJS, PostgreSQL,",
      "Flutter, Dart",
      "Firebase, "
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/samsonzarila",
      github: "https://github.com/samsonzarila",
      twitter: "https://twitter.com/samsonzarila"
    },
    image: "https://www.instagram.com/p/C0W5hyEIWg9/?img_index=1" // Replace with actual image path
  },
  {
    name: "Connex Chabwera",
    role: "Tutor & Full Stack Developer",
    description: `
      Connex Chabwera is an accomplished tutor and full-stack developer. With a passion for teaching and software development, Connex has helped numerous learners master the skills of modern web development. He is proficient in React, Node.js, and has experience in building full-stack applications that scale.
    `,
    skills: [
      "React, JavaScript, Nestjs, PostgreSQL,Mysql",
      "Express.js, Firebase, API Integration"
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/connexchabwera",
      github: "https://github.com/connexchabwera",
      twitter: "https://twitter.com/connexchabwera"
    },
    image: "path/to/connex-image.jpg" // Replace with actual image path
  },
  {
    name: "Crossby Chilikuntima",
    role: "Backend Master (NestJS, Firebase, Python)",
    description: `
      Crossby Chilikuntima is a backend specialist with expertise in NestJS, Firebase, and Python. His deep knowledge of building scalable backend systems has helped several organizations build robust applications. He is dedicated to enhancing the efficiency and performance of applications through optimal backend solutions.
    `,
    skills: [
      "NestJS, Firebase, Python",
      "Backend Architecture, API Development"
    ],
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/crossbychilikuntima",
      github: "https://github.com/crossbychilikuntima",
      twitter: "https://twitter.com/crossbychilikuntima"
    },
    image: "path/to/crossby-image.jpg" // Replace with actual image path
  }
];

const TeamPage = () => {
  return (
    <motion.div variants={fadeIn("up", "spring", 0.3, 0.75)} className="p-6 bg-gray-900">
      <h1 className="text-center text-4xl text-white font-bold mb-8">Meet The Team</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl text-white font-semibold">{member.name}</h3>
            <p className="text-gray-400 mb-4">{member.role}</p>
            <p className="text-gray-300 mb-4">{member.description}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-400 font-semibold">Skills:</p>
              <ul className="text-gray-400 text-sm list-disc list-inside">
                {member.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-2xl text-white-200"></i>
              </a>
              <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github text-2xl text-gray-600"></i>
              </a>
              <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-2xl text-blue-400"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TeamPage;
