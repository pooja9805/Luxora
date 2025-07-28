import React, { useEffect, useState } from 'react';
import { dummyMyBookingsData } from '../assets/assets';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import Loader from '../components/Loader';
import { toast } from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;

  const fetchMyBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
        setBookings(dummyMyBookingsData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Failed to load bookings');
      setBookings(dummyMyBookingsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#a7a7a7] via-[#cfcfcf] to-[#eaeaea]">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 text-sm max-w-7xl mx-auto pb-24">
        <Title
          title="My Bookings"
          subtitle="View and manage your all car bookings"
          align="left"
          className="mt-8"
        />

        <div>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => (
              <div
                key={booking._id || index}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-white/30 bg-white/60 backdrop-blur-sm rounded-xl mt-5 first:mt-12 shadow-xl transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Car Image + Info */}
                <div className="md:col-span-1">
                  <div className="rounded-md overflow-hidden mb-3 shadow-md">
                    <img
                      src={booking.car?.image || assets.car_placeholder}
                      alt=""
                      className="w-full h-auto aspect-video object-cover"
                    />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {booking.car?.brand || 'Unknown'} {booking.car?.model || 'Car'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {booking.car?.year || 'N/A'} ● {booking.car?.category || 'N/A'} ● {booking.car?.location || 'N/A'}
                  </p>
                </div>

                {/* Booking Info */}
                <div className="md:col-span-2">
                  {/* Booking ID + Status */}
                  <div className="flex items-center gap-2">
                    <p className="px-3 py-1.5 bg-white/70 rounded text-sm font-medium text-gray-700">
                      Booking #{index + 1}
                    </p>
                    <p
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        booking.status === 'confirmed'
                          ? 'bg-green-500/10 text-green-700'
                          : booking.status === 'cancelled'
                          ? 'bg-red-500/10 text-red-600'
                          : 'bg-yellow-500/10 text-yellow-700'
                      }`}
                    >
                      {booking.status || 'pending'}
                    </p>
                  </div>

                  {/* Rental Period */}
                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Rental Period</p>
                      <p className="text-gray-800 font-medium">
                        {new Date(booking.pickupDate).toLocaleDateString() || 'N/A'} To{' '}
                        {new Date(booking.returnDate).toLocaleDateString() || 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* Pick-up Location */}
                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.location_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500 text-sm">Pick-up Location</p>
                      <p className="text-gray-800 font-medium">{booking.car?.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6 text-right">
                  <div>
                    <p className="text-sm text-gray-500">Total Price</p>
                    <h1 className="text-2xl font-bold text-[#1f1f1f] tracking-wide">
                      {currency}{booking.price || 'N/A'}
                    </h1>
                  </div>
                  <p className="text-sm text-gray-500">
                    Booked on {new Date(booking.createdAt).toLocaleDateString() || 'N/A'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <img src={assets.empty_icon} alt="Empty" className="w-24 mx-auto mb-4 opacity-70" />
              <h3 className="text-xl font-medium text-gray-700">No bookings found</h3>
              <p className="text-gray-500 mt-1">You haven't made any bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;