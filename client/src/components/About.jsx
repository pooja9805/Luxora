import { motion } from 'framer-motion';
import CarModel from './CarModel';

const About = () => {
  return (
    <section className="min-h-screen w-full relative bg-gradient-to-b from-[#d1d8e0] to-[#f2f2f2] text-black">
      {/* Sticky Car Container */}
      <div className="sticky top-0 z-0 w-full h-[80vh]">
        <CarModel />
      </div>

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-gray-800 text-center mb-6"
        >
          Experience True Luxury
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-gray-700 text-center leading-relaxed"
        >
          At Luxora, we redefine car rentals. From exclusive sports sedans to executive SUVs,
          our fleet ensures your journey is as grand as your destination.
          Experience 24/7 concierge support, on-time delivery, and a selection of premium vehicles curated just for you.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
