import React, { useState, useEffect } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
            alt={slide.title}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{slide.title}</h3>
          <p className="mt-2 text-secondary text-[14px]">{slide.description}</p>
          <p className="text-lg text-green-400 font-semibold">{slide.price}</p>
        </div>
        {slide.path && (
          <div className="mt-6">
            <Link to={slide.path}>
              <button className="w-full bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
                {slide.buttonText}
              </button>
            </Link>
          </div>
        )}
      </Tilt>
    </motion.div>
  );
};

const Buy = () => {
  const slides = [
    {
      title: "Adderall",
      description:
        "Stay focus🧘🏻 and stay active ,study 📖 overnight and  save the semester,No side effects, addy instock.",
      image:
        "https://www.sobanewjersey.com/wp-content/uploads/2023/09/adderall-pills-laid-out-on-a-table.webp",
      price: "Mwk 3,000 /tablet",
      buttonText: "Buy Now",
      path: "/virtuals/adderall",   
    },
    {
      title: "ChatGPT Plus",
      description:
        "Unlock the full potential of ChatGPT with advanced models and unlimited reasoning power.",
      image:
        "https://i.pinimg.com/736x/cd/06/3b/cd063b24ea3e1f8d65d870cb810ab8a0.jpg",
      price: "Mwk 15,000 /month",
      buttonText: "Buy Now",
      path: "/virtuals/chatgpt",
    },
    {
      title: "Spotify Premium",
      description: "Discover more ways of music listening with Spotify Premium",
      image:
        "https://i.pinimg.com/736x/6c/ba/74/6cba747f7bd375dc945fcf3219bca5c8.jpg",
      price: "Mwk 3,500 /month",
      buttonText: "Buy Now",
      path: "/virtuals/spotify",
    },

    {
      title: "Apple Music",
      description:
        "Unlock the full potential of Apple Music with unlimited songs and albums.",
      image:
        "https://i.pinimg.com/736x/18/bb/eb/18bbebfc20a413408b4301c5d61b8752.jpg",
      price: "Mwk 3,500 /month",
      buttonText: "Buy Now",
      path: "/virtuals/applemusic",
    },
    {
      title: "Netflix Premium",
      description:
        "Unlock the full potential of Netflix with unlimited movies, TV shows, and series.",
      image:
        "https://i.pinimg.com/736x/14/07/10/14071047f28bcb31ddf9f3209100382c.jpg",
      price: "Mwk 5,000 /month",
      buttonText: "Buy Now",
      path: "/virtuals/netflix",
    },

    {
      title: "Exchange Yuan",
      description:
        "Looking for Chinese Yuan? You have Malawi Kwacha. We are here to help you exchange.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1QQxA8lnmfigxiImuwNqJVe7eH_DEfdOhDA&s",
      price: "Mwk 1 = 580 yuan",
      buttonText: "Contact us Now",
      path: "/virtuals/netflix",
    },
   
    {
      title: "Bundle of Air Shipping",
      description:
        "Send us your parcels, let us weigh them and ship them to Malawi by air.",
      image:
        "https://static.vecteezy.com/system/resources/previews/038/043/646/non_2x/airplane-icon-in-color-aviation-transportation-travel-vector.jpg",
      price: "Mwk 60,000 per 1kg",
      buttonText: "Ship Now",
      path: "/virtuals/shipping",
    },

    {
      title: "Exchange USD",
      description:
        "Looking for USD? You have Malawi Kwacha. We are here to help you exchange.",
      image:
        "https://png.pngtree.com/png-vector/20190621/ourlarge/pngtree-usd-currency-icon-design-template-vector-illustration-isolated-png-image_1502457.jpg",
      price: "$1 = 3800 Mwk",
      buttonText: "Contact us Now",
      path: "/virtuals/netflix",
    },
    {
      title: "Buy USDT",
      description:
        "Looking for USDT? You have Malawi Kwacha. We are here to help you exchange.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-RTxmJSZCDiJHXSARXwIm2AJ95AyHpvz0nQ&s",
      price: "USDT 1 = 4000 mwk",
      buttonText: "Contact us Now",
      path: "/virtuals/netflix",
    },
    {
      title: "Apply Loan",
      description:
        "Looking for Loan? we are here for you to provide loans for you collateral is a must.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7rJOZmDW5PobKNIpXCHORoKlmFs6DQyEG5Q&s",
      price: "Mwk50,000 - 1,000,000 mwk",
      buttonText: "Apply Now",
      path: "/virtuals/netflix",
    },

  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const slideInterval = 8000;

  // Updating the number of cards based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth < 768 ? 1 : 3);
    };
    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      // If there are more than enough cards, reset to the first one
      setCurrentSlide((prev) =>
        prev === slides.length - cardsToShow ? 0 : prev + 1
      );
    }, slideInterval);
    return () => clearInterval(autoSlide);
  }, [slides.length, cardsToShow]);

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
        <p className={`${styles.sectionSubText}`}>on resale virtual products</p>
        <p className={`${styles.sectionHeadText}`}>Spotify,Addy,Chatgpt only Available now</p>
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
