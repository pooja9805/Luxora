const Newsletter = () => {
  return (
    <div className="relative z-10 w-full bg-gradient-to-b from-[#888888] via-[#bcbcbc] to-[#dcdcdc] py-24 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#1f1f1f] mb-4">Stay Updated</h2>
        <p className="text-gray-700 text-lg mb-10">
          Subscribe to receive the latest luxury car deals, offers, and insights from Luxora.
        </p>

        <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full sm:w-[400px] px-5 py-3 rounded-full bg-white/80 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-[#1c1c1c] text-[#f5d547] hover:bg-[#2a2a2a] transition-all duration-300 shadow-md"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
