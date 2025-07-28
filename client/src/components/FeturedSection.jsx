import { assets, dummyCarData } from '../assets/assets';
import Title from './Title';
import CarCard from './CarCard';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const FeturedSection = () => {
  const navigate = useNavigate();
  const {cars} = useAppContext()

  return (
    <div className="relative w-full z-10 overflow-hidden">
      {/* Same gradient as Hero section */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc]" />

      <div className="relative z-10 flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32">
        <Title
          title="Featured Vehicles"
          subtitle="Explore our finest cars handpicked for your journey"
          subtitleClass="text-gray-700"
        />

        {/* Display 3 Car Cards */}
        <div classsName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 w-full">
          {cars?.slice(0, 6).map((car) => (
            <div key={car._id} className="animate-fade-in-up transition duration-700 ease-in-out">
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <button
          onClick={() => {
            navigate('/cars');
            scrollTo(0, 0);
          }}
          className="mt-16 flex items-center justify-center gap-2 px-6 py-3 
          border border-gray-700 text-black bg-white hover:bg-gray-100 rounded-full 
          shadow-md transition-all duration-300"
        >
          Explore all cars
          <img src={assets.arrow_icon} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default FeturedSection;
