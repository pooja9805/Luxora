import { FaFacebookF, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#bcbcbc] via-[#dcdcdc] to-[#ffffff] text-gray-800 py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-400 pb-10">
        {/* BRAND INFO */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#1f1f1f] tracking-wide">Luxora</h2>
          <p className="mt-3 max-w-xs text-sm">
            Premium car rental service with a curated fleet of luxury and everyday vehicles for your ultimate experience.
          </p>
          <div className="flex items-center gap-4 mt-5">
            <FaFacebookF className="hover:text-[#1f1f1f] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#1f1f1f] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#1f1f1f] cursor-pointer transition" />
            <FaEnvelope className="hover:text-[#1f1f1f] cursor-pointer transition" />
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Browse Cars</a></li>
            <li><a href="#" className="hover:underline">List Your Car</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Insurance</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm">1234 Luxora Lane<br />Mumbai, MH 400001</p>
          <p className="text-sm mt-2">+91 98765 43210</p>
          <p className="text-sm mt-1">info@luxora.com</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 px-4 py-4 border-t border-gray-300 text-sm text-gray-500 text-center">
  <p>© 2025 Luxora. All rights reserved.</p>
  <div className="flex gap-3">
    <a href="#" className="hover:underline">Terms</a>
    <a href="#" className="hover:underline">Privacy</a>
    <a href="#" className="hover:underline">Cookies</a>
  </div>
</div>


    </footer>
  );
};

export default Footer;
