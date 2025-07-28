import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CarCard from '../components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get('pickupLocation');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();
  const [input, setInput] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const isSearchData = pickupLocation && pickupDate && returnDate;

  const applyFilter = () => {
    if (input === '') {
      setFilteredCars(cars || []); // Handle null `cars`
    }
    // Add search logic here if needed
    const filtered = cars?.slice().filter((car)=> {
      return car.brand.toLowerCase().includes(input.toLowerCase())
      || car.model.toLowerCase().includes(input.toLowerCase())
      ||  car.category.toLowerCase().includes(input.toLowerCase())
      || car.transmission.toLowerCase().includes(input.toLowerCase())
    })
    setFilteredCars(filtered)

  };

  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post('/api/bookings/check-availability', {
        location: pickupLocation,
        pickupDate,
        returnDate,
      });
      if (data.success) {
        setFilteredCars(data.availableCars || []); // Ensure array
        if (data.availableCars?.length === 0) {
          toast.error('No cars available for the selected dates and location.');
        }
      }
    } catch (error) {
      toast.error('Failed to check car availability');
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    } else {
      applyFilter();
    }
  }, [isSearchData]);

  useEffect(() => {
    applyFilter();
  }, [input, cars]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc]">
      <div className="flex flex-col items-center py-20 max-md:px-4">
        <Title
          title="Available Cars"
          subtitle="Browse our selection of premium vehicles available for your next adventure."
        />
        <div className="flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow">
          <img src={assets.search_icon} alt="Search" className="w-4 h-4.5 mr-2" />
          <input
          onChange={(e)=> setInput(e.target.value)}
          
            // onChange={handleInputChange}
            value={input}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="Filter" className="w-4 h-4.5 ml-2" />
        </div>
      </div>

      <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
        <p className="text-gray-700 text-center mb-6">
          Showing {filteredCars?.length || 0} Cars
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
          {filteredCars?.map((car, index) => (
            <div key={index}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;