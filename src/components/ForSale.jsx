import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Forsale = ({ slide, index }) => {
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)}>
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
          <p className="mt-2 text-secondary text-[14px]">{slide.description}</p>
          <p className="text-lg text-green-400 font-semibold">{slide.price}</p>
        </div>
        <div className="mt-4  ">
          <button className="bg-blue-900 py-2 px-4 rounded-md text-white">
            {slide.buttonText}
          </button>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Buy = () => {
  const slides = [
    {
      title: "ChatGPT Plus",
      description:
        "Unlock the full potential of ChatGPT with advanced models and unlimited reasoning power.",
      image:
        "https://i.pinimg.com/736x/cd/06/3b/cd063b24ea3e1f8d65d870cb810ab8a0.jpg",
      price: "Mwk 15,000 /month",
      buttonText: "Buy Now",
    },
    {
      title: "Spotify Premium",
      description:
        "Discover more ways of music listening with Spotify Premium",
      image:
        "https://i.pinimg.com/736x/6c/ba/74/6cba747f7bd375dc945fcf3219bca5c8.jpg",
      price: "Mwk 1,500/ month",
      buttonText: "Buy Now",
    },
    {
      title: "Apple Music",
      description:
        "Unlock the full potential of Apple Music with unlimited songs and albums.",
      image:
        "https://i.pinimg.com/736x/18/bb/eb/18bbebfc20a413408b4301c5d61b8752.jpg",
      price: "Mwk 2,000/ month",
      buttonText: "Buy Now",
    },
    {
      title: "Netflix Premium",
      description:
        "Unlock the full potential of Netflix with unlimited movies, TV shows, and movies.",
      image:
        "https://i.pinimg.com/736x/14/07/10/14071047f28bcb31ddf9f3209100382c.jpg",
      price: "Mwk 2,500/ month",
      buttonText: "Buy Now",
    },
    {
      title: "Binance Gift Card",
      description:
        "Unlock the full potential of Binance with unlimited free gift cards.",
      image:
        "https://i.pinimg.com/736x/94/30/a2/9430a2079e7759532e66cc4b2d6fc00a.jpg",
      price: "Mwk 10,000 / month",
      buttonText: "Buy Now",
    },
  ];

  // Current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Number of cards visible in the viewport (responsive)
  const [cardsToShow, setCardsToShow] = useState(3);
  const slideInterval = 5000; // 5 seconds

  // Update the number of cards to show based on window width
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else {
        setCardsToShow(3);
      }
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // Auto slide effect that respects the number of visible cards
  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - cardsToShow ? 0 : prev + 1
      );
    }, slideInterval);
    return () => clearInterval(autoSlide);
  }, [slides.length, cardsToShow]);

  // Navigation functions (if you want to allow manual slide)
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === slides.length - cardsToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - cardsToShow : prev - 1
    );
  };

  return (
    <section className="py-10">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>on resale</p>
        <h2 className={`${styles.sectionHeadText}`}>Comming Soon...</h2>
      </motion.div>

      <div className="mt-10 relative">
        {slides.length > cardsToShow && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
            >
              prev
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
            >
              next
            </button>
          </>
        )}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${currentSlide * (100 / cardsToShow)}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`${cardsToShow === 1 ? "w-full" : "w-1/3"} flex-shrink-0`}
              >
                <Forsale slide={slide} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Buy, "buy");
