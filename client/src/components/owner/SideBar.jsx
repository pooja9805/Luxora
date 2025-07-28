import { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const SideBar = () => {
  const {user, axios, fetchUser} = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState();

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const {data} = await axios.post('/api/owner/update-image', formData)
      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage(null)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 w-full max-w-[230px] border-r border-borderColor bg-white/30 backdrop-blur-md shadow-lg text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="h-20 w-20 rounded-full mx-auto object-cover"
            src={image ? URL.createObjectURL(image) : user?.image || 'https://i.pravatar.cc/150?img=10'}
            alt=""
          />
          <input type="file" id="image" accept="image/*" hidden onChange={(e) => setImage(e.target.files[0])} />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>

      {image && (
        <button className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer" onClick={updateImage}>
          Save <img src={assets.check_icon} alt="" width={13}/>
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden text-gray-800 font-semibold">{user?.name}</p>

      <div className="w-full mt-4">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 hover:bg-white/40 rounded-r-full ${
              link.path === location.pathname ? 'bg-white/50 text-primary font-medium' : 'text-gray-700'
            }`}
          >
            <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="icon" className="h-4 w-4" />
            <span>{link.name}</span>
            {link.path === location.pathname && (
              <div className="bg-primary w-1.5 h-8 rounded-l right-0 absolute" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
