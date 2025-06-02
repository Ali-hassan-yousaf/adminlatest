

// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const Saloonlist = () => {

//   const { doctors, changeAvailability , aToken , getAllD} = useContext(AdminContext)

//   useEffect(() => {
//     if (aToken) {
//         getAllD()
//     }
// }, [aToken])

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>Manage Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {doctors.map((item, index) => (
//           <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
//             <div className='p-4'>
//               <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//              <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Saloonlist



import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Saloonlist = () => {
  const { doctors, changeAvailability, aToken, getAllD } = useContext(AdminContext);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllD();
    }
  }, [aToken]);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
  };

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">Manage Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            onClick={() => handleDoctorClick(item)}
          >
            <img className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500" src={item.image} alt="" />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <div
                className="mt-2 flex items-center gap-1 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-3 text-gray-600 text-xl"
            >
              &times;
            </button>
            <img src={selectedDoctor.image} alt="doctor" className="w-full rounded-lg mb-4" />
            <h2 className="text-xl font-semibold mb-2">{selectedDoctor.name}</h2>
            <p><strong>Email:</strong> {selectedDoctor.email}</p>
            <p><strong>Degree:</strong> {selectedDoctor.degree}</p>
            <p><strong>Speciality:</strong> {selectedDoctor.speciality?.label || 'N/A'}</p>
            <p><strong>About:</strong> {selectedDoctor.about}</p>
            <p><strong>Experience:</strong> {selectedDoctor.experience?.join(', ')}</p>
            <p><strong>Fees:</strong> ₹{selectedDoctor.fees}</p>
            <p><strong>Services:</strong> {selectedDoctor.services?.join(', ')}</p>
            <p><strong>Address:</strong> {selectedDoctor.address?.line1}, {selectedDoctor.address?.city}</p>
            <p><strong>Available:</strong> {selectedDoctor.available ? 'Yes' : 'No'}</p>
            <p><strong>Date Joined:</strong> {new Date(selectedDoctor.date).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Saloonlist;
