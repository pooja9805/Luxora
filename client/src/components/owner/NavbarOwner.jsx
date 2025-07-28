import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
  const { user } = useAppContext();

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-800 border-b border-borderColor bg-white/30 backdrop-blur-md shadow-md">
      <Link to="/">
        <p className="text-2xl font-bold text-[#1c1c1c] tracking-wide">LUXORA</p>
      </Link>
      <p className="text-gray-700 font-medium">Welcome, {user?.name || 'Owner'}</p>
    </div>
  );
};

export default NavbarOwner;
