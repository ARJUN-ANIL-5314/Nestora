import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://nestora-4tme.onrender.com/reviews");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  if (reviews.length === 0) {
    return <p className="text-center p-4">Loading testimonials...</p>;
  }

  return (
    <div className=" bg-gray-100  flex flex-col items-center justify-center pb-8 mb-2 ">
      <h1 className="text-center backdrop-blur-md p-4 pb-0 mt-2 md:p-6 text-2xl md:text-3xl  text-dark-b font-medium md:font-semibold">
        Hear from Our Customers
      </h1>
      <div className="review relative flex items-center justify-center h-80 w-full p-6 pt-0 rounded-3xl shadow-md overflow-hidden ">
        <AnimatePresence >
          <motion.div
            key={reviews[index]._id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute text-center  flex flex-col items-center bg-gray-100 p-6 w-80 md:w-96 rounded-xl  border-[1px] border-dark-b"
          >
            <h2 className="text-xl font-bold text-gray-800">{reviews[index].heading}</h2>
            <img
              src={reviews[index].image}
              alt={reviews[index].author}
              className="w-12 h-12 rounded-full mt-3 shadow-md"
            />
            <p className="text-lg font-semibold mt-2">&ldquo;{reviews[index].text}&rdquo;</p>
            <p className="mt-2 text-sm text-gray-600">- {reviews[index].author}</p>
            <div className="flex mt-2">
              {[...Array(reviews[index].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Testimonials;
