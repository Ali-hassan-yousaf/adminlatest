// import React, { useContext } from 'react'
// import { assets } from '../assets/assets'
// import { DContext } from '../context/DContext'
// import { AdminContext } from '../context/AdminContext'
// import { useNavigate } from 'react-router-dom'
// import { PawPrint } from 'lucide-react';

// const Navbar = () => {

//   const { dToken, setDToken } = useContext(DContext)
//   const { aToken, setAToken } = useContext(AdminContext)

//   const navigate = useNavigate()

//   const logout = () => {
//     navigate('/')
//     dToken && setDToken('')
//     dToken && localStorage.removeItem('dToken')
//     aToken && setAToken('')
//     aToken && localStorage.removeItem('aToken')
//   }

//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//       <div className='flex items-center gap-2 text-xs'>
//         {/* <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" /> */}
 
//         <div className="flex items-center space-x-2 ml-4">
//   <PawPrint size={32} className="text-pet-blue animate-paw-bounce" />
//   <span className="text-xl md:text-2xl font-bold text-pet-dark">
//     Pet<span className="text-pet-blue">Well</span>
//   </span>
// </div>
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
//       </div>
//       <button onClick={} className='bg-primary text-white text-sm px-10 py-2 rounded-full'> Community </button>

//       <button onClick={() => logout()} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default Navbar



import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DContext } from '../context/DContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DContext);
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  return (
    <>
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
          <button
            onClick={() => navigate('/community')}
            className='bg-primary text-white text-sm px-10 py-2 rounded-full'
          >
            Community
          </button>
          <button
            onClick={() => logout()}
            className='bg-primary text-white text-sm px-10 py-2 rounded-full'
          >
            Logout
          </button>
        </div>
      </div>

 
    </>
  );
};

export default Navbar;
