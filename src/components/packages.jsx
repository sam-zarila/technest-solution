import React from "react";
import { motion } from "framer-motion";
import { FaGlobe, FaCode, FaMobileAlt,FaWhatsapp,FaFacebook, FaTwitter,FaMobile } from "react-icons/fa";


const packages = [
  {
    title: "Simple Website",
    price: "MWK 250,000",
    description:
      "Best for advertisement and online presence. Ideal for small businesses, portfolios, and blogs.",
    icon: <FaGlobe size={50} className="text-blue-500" />, 
    image: "/images/simple-website.jpg",
  },
  {
    title: "Full Stack Website",
    price: "MWK 500,000",
    description:
      "Complete management systems for hotels, hospitals, e-commerce, and more with backend integration.",
    icon: <FaCode size={50} className="text-green-500" />,
    image: "/images/fullstack.jpg",
  },
  {
    title: "Mobile Applications",
    price: "MWK 400,000",
    description:
      "Custom mobile apps for Android & iOS, designed for seamless user experience and high performance.",
    icon: <FaMobileAlt size={50} className="text-purple-500" />,
    image: "/images/mobile-app.jpg",
  },
];

const PackagesPage = () => {
  ;
  return (
    <div className="p-10 bg-gray-900 text-white">
      <h1 className="text-center text-4xl font-bold mb-10">Website & App Packages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
           
            <div className="flex justify-center mb-4">{pkg.icon}</div>
            <h2 className="text-2xl font-semibold text-center mb-2">{pkg.title}</h2>
            <p className="text-center text-gray-300 mb-4">{pkg.description}</p>
            <p className="text-center text-xl font-bold text-yellow-400">{pkg.price}</p>
             <div className="flex justify-center mt-2 text-green-400 font-semibold text-lg">
                Quick contacts
             </div>
             <div className="flex justify-center space-x-6">
              <a href="https://wa.me/265899622111" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp size={30} className="text-green-500 cursor-pointer hover:text-green-700" />
              </a>
             <a href="https://www.facebook.com/profile.php?id=61574426800189" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </a>
             <a href="https://x.com/badboy_trox99" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </a>
             <a href="tel:+265899622111" target="_blank" rel="noopener noreferrer">
              <FaMobile size={30} className="text-purple-500 cursor-pointer hover:text-green-700" />
             </a>
             
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PackagesPage;
