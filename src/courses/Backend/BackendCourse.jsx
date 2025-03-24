import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";
import { useNavigate } from "react-router-dom";

const BackendCourse = {
    title:"Backend Development with NestJS, Python, and Firebase",
    description:
      "Dive into backend development with NestJS, Python, and Firebase. Learn how to build robust APIs and handle data management with ease.",
    price : "MWk 20,000 per week",
    duration: "18 weeks",

    level :[
        {
            name:"Introduction Node and NestJs (1-4 weeks)",
            topics : [
                 "What is Node.js? – Understanding the runtime environment",
                 'What is NestJS? – Overview of the NestJS framework and why it is used',
                 'Setting up your development environment – Installing Node.js, NestJS CLI, and PostgreSQL'
            ],
           
        }
    ]
};

export default BackendCourse;