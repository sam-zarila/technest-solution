
import React, { useState } from "react";
import { Tilt } from "react-tilt"

import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { title } from "framer-motion/client";


const Forsale= ({slide, index}) => {
    return(
        <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)} >
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
                <div className="mt-4">
                    <button className="bg-primary py-2 px-4 rounded-md text-white">{slide.buttonText}</button>
                </div>
                
      </Tilt>
    
        </motion.div>
    )
}

const Buy =()=>{
    const slides =[
        {
            title: "ChatGPT Plus",
            description:
              "Unlock the full potential of ChatGPT with advanced models and unlimited reasoning power.",
            image: "https://i.pinimg.com/736x/cd/06/3b/cd063b24ea3e1f8d65d870cb810ab8a0.jpg", 
            price:"Mwk 15000",
            buttonText: "Buy Now",
          },
          {
            title:"Spotify Premium",
            description:"discover more ways of music listening with spotify Premium, unlock advanced features of spotify with premium",
            image: "https://i.pinimg.com/736x/8a/0b/65/8a0b65c7273111a166d86965494d959c.jpg",
            price:"Mwk 1500",
            buttonText: "Buy Now",
          },
          {
            title:'Apple Music',
            description:"Unlock the full potential of Apple Music with unlimited songs and albums.",
            image: "https://i.pinimg.com/736x/d8/54/0e/d8540e8b565073c36d9926358970689f.jpg",
            price:"Mwk 2000",
            buttonText: "Buy Now",
          },
          {
            title:"Netflix Premium",
            description:"Unlock the full potential of Netflix with unlimited movies, TV shows, and movies.",
            image: "https://i.pinimg.com/736x/71/d9/49/71d949f1a48781198248939897d29741.jpg",
            price:"Mwk 2500",
            buttonText: "Buy Now",
            
          }
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

      return(
        <section className="py-10">
            <motion.div variants={textVariant()}>
            <p className={`${styles.sectionSubText}`}>Our Product</p>
            <h2 className={`${styles.sectionHeadText}`}>ChatGPT Plus</h2>
            </motion.div>

           <div className="mt-10 relative">
            {slides.length > 1 && (
                <>
                <button onClick={prevSlide}
                 className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
                >
                      prev
                </button>
                <button onClick={nextSlide}
                 className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-secondary p-2 rounded-full z-10"
                >
                     next
                </button>
                </>
            )}
          <div className="overflow-hidden">
                <motion.div
                    animate={{ x: `-${currentSlide * (100 / 3)}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex"
                >
                    {slides.map((slide, index) => (
                    <div key={index} className="w-1/3 flex-shrink-0">
                        <Forsale slide={slide} index={index} />
                    </div>
                    ))}
                </motion.div>
                </div>

            
            </div> 

        </section>
      )
}

export default SectionWrapper(Buy, "buy");