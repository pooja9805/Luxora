import { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const Navbar = () => {

  const {setShowLogin, user, logout, isOwner, axios, setIsOwner} = useAppContext()

  const location = useLocation();
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const changeRole = async ()=> {
    try {
      const {data} = await axios.post('/api/owner/change-role')
      if(data.success){
        setIsOwner(true)
        toast.success(data.message)
        // navigate('/owner')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className={`flex items-center justify-between px-6 py-4 text-white 
      bg-[#0f0f0f]/70 backdrop-blur-lg border-b border-gray-800 
      transition-all relative z-50`}>

      {/* Brand Name */}
      <div className="text-2xl font-bold tracking-widest text-gold drop-shadow-md">
        LUXORA
      </div>

      {/* Desktop: Menu Links + Search */}
      <div className="hidden lg:flex items-center gap-8">
        {/* Menu Links */}
        <div className="flex gap-6 text-lg font-medium">
          {menuLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path} 
              className="hover:text-gold transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar */}
        <div className='flex items-center border border-gray-700 
          px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md ml-6'>
          <input 
            type="text" 
            className='w-40 bg-transparent outline-none placeholder-gray-300 text-sm text-white' 
            placeholder='Search cars'
          />
          <img src={assets.search_icon} alt="search" className='w-4 h-4 opacity-80 ml-2' />
        </div>
      </div>

      {/* Desktop: Buttons */}
      <div className='hidden lg:flex items-center gap-6 pr-4'>
        <button onClick={() => isOwner ? navigate('/owner') : changeRole()} className='text-base font-medium hover:text-gold transition-colors'>
          {isOwner ? 'Dashboard' : 'List Cars'}
        </button>
        <button onClick={() => {user ? logout() : setShowLogin(true)}} className='px-6 py-2 bg-gradient-to-br from-yellow-300 to-gold text-black 
          rounded-full font-semibold text-base hover:brightness-110 transition-all shadow-lg'>
          {user ? 'Logout' :  'Login'}
        </button>
      </div>

      {/* Mobile: Search + Toggle */}
      <div className="flex items-center gap-4 lg:hidden">
        <img src={assets.search_icon} alt="search" className="w-5 h-5 opacity-80 cursor-pointer" />
        <img 
          src={open ? assets.close_icon : assets.menu_icon} 
          alt="menu" 
          className="w-6 h-6 cursor-pointer" 
          onClick={() => setOpen(!open)} 
        />
      </div>

      {/* Mobile Slide Menu */}
      <div className={`lg:hidden fixed top-16 right-0 w-full h-[calc(100vh-64px)] bg-[#0f0f0f]/95 backdrop-blur-md z-40 
        flex flex-col items-center gap-8 py-10 transition-transform duration-300 
        ${open ? 'translate-x-0' : 'translate-x-full'}`}>

        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className="text-lg font-semibold hover:text-gold transition-all"
          >
            {link.name}
          </Link>
        ))}

        <button 
          onClick={() => { navigate('/owner'); setOpen(false); }} 
          className='text-base font-medium hover:text-gold transition-colors'
        >
          Dashboard
        </button>
        <button 
          onClick={() => { setShowLogin(true); setOpen(false); }} 
          className='px-6 py-2 bg-gradient-to-br from-yellow-300 to-gold text-black 
            rounded-full font-semibold text-base hover:brightness-110 transition-all shadow-lg'
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default Navbar;
