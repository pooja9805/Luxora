import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Banner = () => {
  return (
    <div className="relative w-full min-h-screen z-10 overflow-hidden">
      {/* Background same as Hero */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc]" />

      {/* Main Container with Scroll Animation */}
      <div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-10 flex items-center justify-center mt-50 px-6 md:px-12"
      >
        <div className="w-full max-w-6xl h-[550px] relative rounded-2xl overflow-hidden shadow-xl">

          {/* Full background image */}
          <img
            src={assets.banner_car_image}
            alt="Luxury Car"
            className="absolute inset-0 w-full h-full object-cover opacity-90 z-0"
          />

          {/* Overlay Text */}
          <div className="relative z-10 w-full h-full flex items-center px-6 md:px-12">
            <div className="w-full md:w-3/4 text-white">
              <h2 className="text-3xl font-bold">Do You Own a Luxury Car?</h2>
              <p className="mt-2">
                Monetize your vehicle effortlessly by listing it on Luxora.
              </p>
              <p className="mt-2 max-w-xl">
                We take care of insurance, driver verification and secure payments —
                so you can earn passive income, stress-free.
              </p>
              <button
                className="mt-5 px-5 py-2.5 bg-black/80 text-white hover:bg-white hover:text-black 
                border border-white hover:border-black font-medium transition-all rounded-full 
                text-sm shadow-md"
              >
                List your car
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
