import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
  const {setShowLogin, axios, setToken, navigate} = useAppContext() 

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 👉 Handle Form Submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault(); // prevent page reload
      const {data} = await axios.post(`/api/user/${mode}`, {name, email, password})

      if (data.success){
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

    if (mode === 'login') {
      console.log('Logging in with:', { email, password });
      // TODO: add your login API call here
    } else {
      console.log('Registering with:', { name, email, password });
      // TODO: add your signup API call here
    }

    // Optionally close modal
    setShowLogin(false);
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-gradient-to-b from-[#eeeeee] via-[#f5f5f5] to-white w-[90%] max-w-sm p-8 rounded-2xl border border-gray-300 shadow-xl text-gray-800"
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center">
          <span className="text-[#1c1c1c]">User</span>{' '}
          <span className="text-black font-bold">{mode === 'login' ? 'Login' : 'Sign Up'}</span>
        </h2>

        {/* Name Field (only for signup) */}
        {mode === 'register' && (
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="type here"
              className="w-full p-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="type here"
            className="w-full p-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="type here"
            className="w-full p-2 rounded-md border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Switch login/register */}
        <p className="text-sm text-gray-600 text-center">
          {mode === 'register' ? (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode('login')}
              >
                click here
              </span>
            </>
          ) : (
            <>
              Create an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setMode('register')}
              >
                click here
              </span>
            </>
          )}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-[#1c1c1c] text-white rounded-full font-semibold transition-all duration-300 hover:bg-black hover:scale-[1.03] hover:shadow-lg shadow-gray-700"
        >
          {mode === 'register' ? 'Create Account' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
