import { motion } from "framer-motion";
import LazyLoad from "react-lazy-load";
import bannerImg from "../assets/images/freepik__upload__50264.png";

function Banner() {
  return (
    <LazyLoad offset={300} once>
      <div
        className="relative h-[450px] md:h-[550px] w-full bg-cover bg-center bg-no-repeat bg-light-p bg-opacity-20 backdrop-blur-sm flex items-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className="max-w-screen-xl w-full mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 px-4 md:px-8">

          {/* Left Text - Slide in from left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden lg:block text-left bg-white bg-opacity-20 backdrop-blur-md p-5 rounded-2xl shadow-custom-shadow max-w-[300px]"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-dark-b leading-snug tracking-wide">
              <span className="text-4xl text-light-b font-extrabold">B</span>uilding Dreams<br />
              <span className="text-4xl text-light-b font-extrabold">O</span>ne Home at a Time
            </h2>
            <p className="text-sm text-light-g italic pt-2">
              Your trusted partner in real estate
            </p>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block w-10"></div>

          {/* Right Text - Slide in from right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="hidden lg:block text-right bg-white bg-opacity-20 backdrop-blur-md p-5 rounded-2xl shadow-custom-shadow max-w-[300px]"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-dark-b leading-snug tracking-wide">
              <span className="text-4xl text-light-b font-extrabold">D</span>riven by Value<br />
              <span className="text-4xl text-light-b font-extrabold">G</span>uided by Experience
            </h2>
            <p className="text-sm text-light-g italic pt-2">
              Helping you buy, sell, and invest with confidence
            </p>
          </motion.div>
        </div>
      </div>
    </LazyLoad>
  );
}

export default Banner;
