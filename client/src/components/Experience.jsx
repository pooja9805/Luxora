import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 🎥 Fullscreen Background Video */}
      <video
        src="lam.mp4" // ✅ Rename your video to this exact name and place in /public
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-95"
      />

      {/* 🕶️ Optional Overlay to improve text visibility */}
      <div className="absolute inset-0 bg-black/20 z-[1]" />

      {/* 🧾 Top Text Content */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-16 left-0 right-0 flex flex-col items-center text-center z-10 px-4"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          Experience the Thrill of Speed
        </h1>
        <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          Your dream drive is just a booking away — indulge in luxury with Luxora.
        </p>
      </motion.div>
    </div>
  );
};

export default Experience;
