const testimonials = [
  {
    name: "Aarav Mehta",
    text: "The luxury car experience was beyond my expectations. Everything was smooth, stylish, and professional.",
    location: "Mumbai, India",
    // avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
  },
  {
    name: "Sarah Kapoor",
    text: "A seamless experience from booking to driving. The car turned heads everywhere I went!",
    location: "Delhi, India",
    // avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
  },
  {
    name: "Kabir Singh",
    text: "Excellent service, pristine vehicles, and a touch of class that makes you feel like royalty.",
    location: "Bangalore, India",
    // avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex gap-1 mt-2">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 text-sm ${i < count ? 'opacity-100' : 'opacity-30'}`}
      >
        ★
      </span>
    ))}
  </div>
);

const TestimonialSection = () => {
  return (
    <div className="relative z-10 w-full bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc] py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1f1f1f] mb-6">
          What Our Clients Say
        </h2>
        <p className="text-gray-700 text-lg mb-12 max-w-2xl mx-auto">
          Real stories from our premium car renters across India.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                
                <div>
                  <h4 className="text-md font-semibold text-gray-900">{t.name}</h4>
                  <p className="text-sm text-gray-600">{t.location}</p>
                </div>
              </div>

              <p className="text-gray-800 text-[15px] italic mb-3">"{t.text}"</p>

              <StarRating count={t.rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
