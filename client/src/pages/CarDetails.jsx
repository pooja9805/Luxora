import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const CarDetails = () => {
  const { id } = useParams();
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const currency = import.meta.env.VITE_CURRENCY;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!pickupDate || !returnDate) {
      toast.error('Please select both pickup and return dates');
      setLoading(false);
      return;
    }
    
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    if (pickup >= returnD) {
      toast.error('Return date must be after pickup date');
      setLoading(false);
      return;
    }

    const now = new Date();
    if (pickup < now || returnD < now) {
      toast.error('Dates must be in the future');
      setLoading(false);
      return;
    }
    
    try {
      const totalPrice = calculateTotalPrice();
      const formattedPickupDate = pickup.toISOString();
      const formattedReturnDate = returnD.toISOString();

      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate: formattedPickupDate, 
        returnDate: formattedReturnDate,
        totalPrice
      });
      
      if (data.success) {
        toast.success(data.message);
        setPickupDate('');
        setReturnDate('');
        navigate('/my-bookings');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || error.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    if (!car || !pickupDate || !returnDate) return 0;
    const days = Math.ceil(
      (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
    ) + 1;
    return days * car.pricePerDay;
  };

  useEffect(() => {
    const fetchCar = async () => {
      try {
        if (cars && Array.isArray(cars)) {
          const foundCar = cars.find(c => c._id === id);
          if (foundCar) {
            setCar(foundCar);
            setFetching(false);
            return;
          }
        }
        
        const { data } = await axios.get(`/api/cars/${id}`);
        if (data.success && data.car) {
          setCar(data.car);
        } else {
          throw new Error('Car not found');
        }
      } catch (error) {
        console.error('Error fetching car:', error);
        toast.error('Failed to load car details');
        navigate('/cars');
      } finally {
        setFetching(false);
      }
    };

    fetchCar();
  }, [id, cars, axios, navigate]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!car || !pickupDate || !returnDate || new Date(pickupDate) > new Date(returnDate)) {
        return;
      }

      setAvailabilityLoading(true);
      try {
        const pickup = new Date(pickupDate);
        const returnD = new Date(returnDate);
        const now = new Date();

        if (pickup < now || returnD < now) {
          toast.error('Dates must be in the future');
          setIsAvailable(false);
          return;
        }

        const formattedPickupDate = pickup.toISOString();
        const formattedReturnDate = returnD.toISOString();

        const { data } = await axios.post('/api/bookings/check-availability', {
          carId: id,
          pickupDate: formattedPickupDate,
          returnDate: formattedReturnDate
        }, {
          validateStatus: (status) => status < 500
        });

        setIsAvailable(data.available);
      } catch (error) {
        console.error('Availability check failed:', error);
        if (error.response?.status === 400) {
          toast.error(error.response.data?.message || 'Invalid date selection');
        } else {
          toast.error('Failed to check availability');
        }
        setIsAvailable(false);
      } finally {
        setAvailabilityLoading(false);
      }
    };

    const timer = setTimeout(() => {
      checkAvailability();
    }, 500);

    return () => clearTimeout(timer);
  }, [pickupDate, returnDate, id, car, axios]);

  if (fetching) {
    return <Loader />;
  }

  if (!car) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Car not found</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc] px-6 md:px-12 lg:px-24 xl:px-32 pt-24 pb-32">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-black mb-10"
      >
        <img src={assets.arrow_icon} alt="back" className="rotate-180 w-4 opacity-70" />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2">
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-[500px] object-cover rounded-xl shadow-xl"
          />

          <div className="mt-10 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{car.brand} {car.model}</h1>
              <p className="text-lg text-gray-700 mt-1">{car.category} • {car.year}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Seats`, key: 'seats' },
                { icon: assets.fuel_icon, text: car.fuel_type, key: 'fuel' },
                { icon: assets.car_icon, text: car.transmission, key: 'transmission' },
                { icon: assets.location_icon, text: car.location, key: 'location' },
              ].map(({ icon, text, key }) => (
                <div
                  key={key}
                  className="flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md"
                >
                  <img src={icon} alt="" className="h-5 mb-2" />
                  <p className="text-sm text-gray-800">{text}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Description</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                {car.features?.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <img src={assets.check_icon} alt="" className="h-4 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section (Booking Form) */}
        <form onSubmit={handleSubmit}
          className="sticky top-12 h-max bg-white/30 backdrop-blur-md border border-white/40 ring-1 ring-gray-300 rounded-xl p-6 space-y-6 shadow-xl w-full"
        >
          {/* Price Info */}
          <p className="flex items-center justify-between text-2xl font-semibold text-gray-900">
            {currency}
            {car.pricePerDay}
            <span className="text-base font-normal text-gray-600">/ day</span>
          </p>

          <hr className="border-gray-300" />

          {/* Pickup Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="pickup-date" className="text-sm font-medium text-gray-800">
              Pickup Date
            </label>
            <input
              value={pickupDate} 
              onChange={(e) => setPickupDate(e.target.value)}
              type="date"
              id="pickup-date"
              required
              min={new Date().toISOString().split('T')[0]}
              className="px-4 py-2 rounded-md bg-white/80 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="return-date" className="text-sm font-medium text-gray-800">
              Return Date
            </label>
            <input
              value={returnDate} 
              onChange={(e) => setReturnDate(e.target.value)}
              type="date"
              id="return-date"
              required
              min={pickupDate || new Date().toISOString().split('T')[0]}
              className="px-4 py-2 rounded-md bg-white/80 border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
            />
          </div>

          {/* Availability Status */}
          {pickupDate && returnDate && (
            <div className={`text-sm font-medium ${
              isAvailable ? 'text-green-600' : 'text-red-600'
            }`}>
              {availabilityLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking availability...
                </span>
              ) : isAvailable ? (
                'Car is available for these dates'
              ) : (
                'Car is not available for these dates'
              )}
            </div>
          )}

          {/* Price Calculation */}
          {pickupDate && returnDate && !availabilityLoading && (
            <div className="bg-white/50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Price per day:</span>
                <span>{currency}{car.pricePerDay}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Number of days:</span>
                <span>{Math.ceil(
                  (new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
                ) + 1}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total price:</span>
                <span>{currency}{calculateTotalPrice()}</span>
              </div>
            </div>
          )}

          {/* Book Button */}
          <button
            type="submit"
            disabled={!isAvailable || loading || availabilityLoading}
            className={`w-full py-3 ${
              isAvailable && !loading && !availabilityLoading
                ? 'bg-[#1c1c1c] hover:bg-[#2a2a2a] text-[#f5d547]'
                : 'bg-gray-400 cursor-not-allowed text-gray-700'
            } rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-md flex items-center justify-center gap-2`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Book Now'
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            No credit card required to reserve
          </p>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;