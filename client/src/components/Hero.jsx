import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import CarModel from './CarModel';
import { useState } from 'react';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');

  const {pickupDate, setPickupDate, returnDate, setReturnDate, navigate} = useAppContext() 
  const handleSearch = (e)=>{
    e.preventDefault()
    navigate('/cars?pickupLocation=' + pickupLocation + '&pickupDate=' + pickupDate + '&returnDate=' + returnDate)

  }
  return (
    <div className="min-h-[100vh] max-h-[100vh] w-full flex flex-col justify-start items-center relative overflow-hidden">
      {/* ✨ Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc]" />

      {/* 🚘 Hero Text */}
      <div className="pt-20 px-6 md:px-12 text-center z-10">
        <h1
          className="text-5xl md:text-6xl font-extrabold uppercase tracking-wider"
          style={{
            color: '#1f1f1f',
            textShadow: '0 1px 6px rgba(255, 255, 255, 0.2)',
          }}
        >
          Luxury Cars on Rent
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mt-4 max-w-2xl mx-auto">
          Drive in elegance. Book your premium car now.
        </p>
      </div>

      {/* 🌟 Glow Behind Car */}
      <div className="absolute bottom-0 w-full h-[200px] z-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-t from-yellow-400/10 via-transparent to-transparent blur-3xl opacity-90" />
      </div>

      {/* ✨ Form Section */}
      <div className="w-full max-w-6xl px-6 z-20 mt-20 flex justify-center">
        <form onSubmit={handleSearch}
          className="flex flex-wrap justify-between items-center gap-6
          p-6 rounded-3xl backdrop-blur-md bg-white/30 shadow-xl border border-white/40 w-full max-w-5xl
          ring-2 ring-[#4e4e4e]/50 hover:ring-[#6f6f6f]/80 transition-all duration-300"
        >
          {/* Pickup Location */}
          <div className="flex flex-col w-[200px]">
            <label className="text-sm text-gray-800 mb-1 font-semibold">
              Pickup Location
            </label>
            <select
              required
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="flex flex-col w-[180px]">
            <label className="text-sm text-gray-800 mb-1 font-semibold">
              Pickup Date
            </label>
            <input value={pickupDate} onChange={e=>setPickupDate(e.target.value)}
              type="date"
              id='pickup-date'
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Return Date */}
          <div className="flex flex-col w-[180px]">
            <label className="text-sm text-gray-800 mb-1 font-semibold">
              Return Date
            </label>
            <input value={returnDate} onChange={e=>setReturnDate(e.target.value)}
              id='return-date'
              type="date"
              required
              className="w-full p-2 rounded-md border border-gray-300 bg-white/80 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Search Button */}
          <div className="flex w-[180px]">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1c1c1c] hover:bg-[#2a2a2a] text-white rounded-full transition-all duration-300 shadow-md w-full"
            >
              <img src={assets.search_icon} alt="search" className="w-5 h-5 brightness-200" />
              <span className="text-sm font-semibold tracking-wide">Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* 🏎️ Car Model (Shrunk height to avoid overflowing) */}
      <div className="w-full z-10 mt-5 h-[280px] md:h-[340px]">
        <CarModel />
      </div>
    </div>
  );
};

export default Hero;
