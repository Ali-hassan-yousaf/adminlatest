import React, { useContext } from 'react';
import { PawPrint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DContext } from '../context/DContext';
import { AdminContext } from '../context/AdminContext';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <div className="flex items-center space-x-2 ml-4">
          <PawPrint size={32} className="text-pet-blue animate-paw-bounce" />
          <span className="text-xl md:text-2xl font-bold text-pet-dark">
            Pet<span className="text-pet-blue">Well</span>
          </span>
        </div>
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      <div className="flex gap-3">
        {aToken && (
          <button
            onClick={() => navigate('/community')}
            className='bg-primary text-white text-sm px-10 py-2 rounded-full'
          >
            Community
          </button>
        )}
        {(aToken || dToken) && (
          <button
            onClick={logout}
            className='bg-primary text-white text-sm px-10 py-2 rounded-full'
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
