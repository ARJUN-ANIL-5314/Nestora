import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "./contact.jsx";

export default function AboutUs() {
  const [showForm, setShowForm] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);

  return (
    <div className="w-full py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24">
        
        {/* Image Animation */}
        <motion.div
          className="md:w-[40%] mb-6 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src="https://goartelegis.com/en/wp-content/uploads/2020/11/real-estate-handover-1.jpg"
            alt="About Us"
            className="w-full p-10 rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Text/Content Animation */}
        <motion.div
          className="md:w-[50%] text-center md:text-left md:ml-[8%]"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {!showForm ? (
            <>
              <h2 className="text-2xl py-5 md:py-0 md:text-3xl font-semibold mb-6 text-dark-b">
                Your Trust Our Mission
              </h2>
              <p className="text-base text-left md:text-lg text-gray-500 mb-4 max-w-3xl">
                Welcome to our real estate platform, where we connect buyers, sellers, and renters with their perfect property. With years of
                experience, we provide expert guidance, seamless transactions, and dedicated support to make your real estate journey smooth and
                successful.
              </p>

              {showMoreText && (
                <p className="text-base text-left md:text-lg text-gray-500 mb-6 max-w-3xl">
                  Our expert team ensures that you get the best deals with transparency and trust.  
                  Let us help you find your dream home with ease and confidence.
                </p>
              )}

              <div className="flex md:justify-start gap-4">
                <button
                  className="bg-dark-b text-white px-3 md:px-6 py-2 md:py-3 rounded-lg hover:bg-dark-b"
                  onClick={() => setShowMoreText(!showMoreText)}
                >
                  {showMoreText ? "Show Less" : "Learn More"}
                </button>
                <button
                  className="border border-blue-600 text-dark-b px-3 md:px-6 py-2 md:py-3 rounded-lg hover:bg-dark-b hover:text-white"
                  onClick={() => setShowForm(true)}
                >
                  Contact Us
                </button>
              </div>
            </>
          ) : (
            <ContactForm />
          )}
        </motion.div>
      </div>
    </div>
  );
}
