import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div onClick={()=>{navigate(`/car-details/${car._id}`); scrollTo(0,0)}}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative w-full h-[420px] rounded-2xl overflow-hidden 
        shadow-xl bg-white/5 backdrop-blur-lg border border-white/20 ring-1 ring-gray-200 
        transition-transform duration-500 group hover:scale-[1.02] cursor-pointer"
    >
      {/* Car Image with slight dim for better overlay visibility */}
      <img
        src={car.image}
        alt={car.model}
        className="absolute inset-0 w-full h-full object-cover opacity-85 
        group-hover:scale-105 transition-transform duration-700"
      />

      {/* "Available Now" badge */}
      {car.isAvailable && (
        <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow">
          Available Now
        </div>
      )}

      {/* Car Details Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-black/15 text-white px-5 py-5">
        {/* Title and Price */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold drop-shadow">{car.brand} {car.model}</h3>
          <div className="bg-white/10 px-3 py-1 rounded-md text-sm font-medium drop-shadow">
            {currency}{car.pricePerDay}
            <span className="text-xs text-white/70"> / day</span>
          </div>
        </div>

        <p className="text-sm text-white/80 mb-3">{car.category} ● {car.year}</p>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-y-2 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} alt="seats" className="h-4" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} alt="fuel" className="h-4" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.car_icon} alt="gear" className="h-4" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.location_icon} alt="location" className="h-4" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarCard;
