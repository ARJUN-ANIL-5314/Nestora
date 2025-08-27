import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/images/hand-shake.png';
import home from '../assets/images/home.png';
import sell from '../assets/images/loan.png';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.5,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

function useScrollDown() {
  const [scrollDown, setScrollDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        setScrollDown(true);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollDown;
}

function Example() {
  const scrollDown = useScrollDown();

  return (
    <div className="mb-5 " id='service'>
      <h1 className="text-center text-dark-b p-5 mt-7 font-semibold text-2xl md:text-3xl pb-7 lg:pb-0">
        Our Services
      </h1>

      <div className="h-auto gap-11 lg:h-[380px] w-full grid grid-cols-1 lg:grid-cols-3 place-items-center p-8 lg:p-10 1100px:p-5 py-5 pt-0 text-center">
        {[
          {
            icon: home,
            title: 'Buying & Renting Services',
            desc:
              'Find your perfect home with ease! Browse listings, take virtual tours, and filter properties by location, price, and type. Our experts are here to guide you every step of the way.',
          },
          {
            icon: sell,
            title: 'Selling & Listing Services',
            desc:
              'Easily list your property, attract buyers, and track engagement with real-time analytics. Boost visibility with premium listings and sell faster with expert support.',
          },
          {
            icon: logo,
            title: 'Consultation & Support',
            desc:
              "Get expert real estate advice, market insights and 24/7 support. Whether buying, selling, or investing, we're here to guide you every step of the way.",
          },
        ].map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-100 w-64 lg:w-72 1100px:w-80 h-auto lg:h-[240px] shadow-custom-shadow rounded-xl p-4"
            initial="hidden"
            animate={scrollDown ? 'visible' : 'hidden'}
            custom={index}
            variants={cardVariants}
          >
            <img
              src={service.icon}
              className="h-10 w-16 mx-auto my-3"
              alt="Service Icon"
            />
            <h1 className="font-medium md:font-bold text-lg p-2">{service.title}</h1>
            <p className="text-sm text-gray-500">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Example;
