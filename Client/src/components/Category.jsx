import { useRef, useEffect, useState } from 'react';
import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Navigation Icons

export default function CategorySwiper() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [data, setData] = useState([]); // FIX: Initialize as empty array

  // Attach navigation buttons after component mounts
  useEffect(() => {
    if (swiperInstance && swiperInstance.params) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://nestora-4tme.onrender.com/category");
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  return (
    <div className="w-full  p-0 md:py-10 bg-gray-100">
      <div className="container mx-auto text-center p-6   px-6">
        <h2 className="text-2xl md:text-3xl  text-dark-b font-semibold mb-6">Discover Your Favorites</h2>
        <div className="relative max-w-6xl mx-auto">
          {/* Swiper Component */}
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            loop={false}
            centeredSlides={false}
            watchSlidesProgress={true}
            onSwiper={setSwiperInstance}
            modules={[Navigation]}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="mySwiper px-6 "
          >
            {data.length > 0 ? (
              data.map((category, index) => (
                <SwiperSlide key={index} className="p-0 md:p-4 max-w-[310px]">
                  <div className="overflow-hidden rounded-2xl shadow-lg bg-white transition-transform transform hover:scale-105 ">
                    <img src={category.imageUrl} alt={category.name} className="w-full h-48 object-cover" />
                    <div className="p-4 text-center">
                      <div className="text-lg md:text-xl font-semibold flex items-center justify-center gap-2">
                      {category.name}
                      </div>
                      <button className="mt-4 w-full border bg-dark-b py-2 rounded-lg hover:bg-gray-200 hover:text-blue-500 hover:border-[1px] hover:border-blue-500 text-white">Explore</button>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-dark-b">Loading categories...</p> // FIX: Added loading state
            )}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute top-1/2 -left-4 -translate-y-1/2 z-10 p-3 bg-light-b shadow-lg rounded-full hover:bg-gray-200 text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 -right-4 -translate-y-1/2 z-10 p-3 bg-light-b shadow-lg rounded-full hover:bg-gray-200 text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
