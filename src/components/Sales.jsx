import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import path from "path"; // If needed. Otherwise, it can be removed.

// Slide component for ChatGPT Plus
const ChatGPTPlusSlide = ({ slide, index }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={slide.image}
            alt="ChatGPT Plus Slide"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{slide.title}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {slide.description}
          </p>
        </div>
        <div className="mt-4">
          {/* Buy Now button linking to the path provided in slide details */}
          <Link to={slide.path}>
            <button className="bg-primary py-2 px-4 rounded-md text-white">
              {slide.buttonText}
            </button>
          </Link>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Sales = () => {
  // Currently only one sale; you can add more items to this array later.
  const slides = [
    {
      title: "ChatGPT Plus",
      description:
        "Unlock the full potential of ChatGPT with advanced models and unlimited reasoning power.",
      image: "/path/to/chatgpt-plus-image1.jpg", // Replace with your actual image path
      buttonText: "Buy Now",
      path: "/virtuals/spotify", // This path is used for the Link
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (slides.length > 1) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  const prevSlide = () => {
    if (slides.length > 1) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  return (
    <section className="py-10">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Our Product</p>
        <h2 className={`${styles.sectionHeadText}`}>ChatGPT Plus</h2>
      </motion.div>

      <div className="mt-10 relative">
        {/* Render navigation buttons only if there is more than one slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
            >
              Next
            </button>
          </>
        )}

        {/* Slider Container */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex"
          >
            {slides.map((slide, index) => (
              <div key={index} className="min-w-full">
                <ChatGPTPlusSlide slide={slide} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Sales, "chatgpt-plus");
