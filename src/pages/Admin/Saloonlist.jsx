

import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Saloonlist = () => {
  const { doctors, changeAvailability, aToken, getAllD } = useContext(AdminContext)

  const [selectedDoctor, setSelectedDoctor] = useState(null)

  useEffect(() => {
    if (aToken) {
      getAllD()
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll relative'>
      <h1 className='text-lg font-medium'>Manage Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
            key={index}
            onClick={() => setSelectedDoctor(item)}
          >
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input
                  onClick={(e) => e.stopPropagation()}
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

      {/* MODAL */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ×
            </button>
            {/* <img src={selectedDoctor.image} alt="" className="w-full h-48 object-cover rounded-lg mb-4" /> */}
            <h2 className="text-2xl font-semibold mb-2">{selectedDoctor.name}</h2>
            <p><strong>Email:</strong> {selectedDoctor.email}</p>
            <p><strong>Location:</strong> {selectedDoctor.speciality?.label || selectedDoctor.speciality}</p>
            {/* <p><strong>Degree:</strong> {selectedDoctor.degree}</p> */}
            {/* <p><strong>Experience:</strong> {selectedDoctor.experience.join(', ')}</p> */}
            <p><strong>About:</strong> {selectedDoctor.about}</p>
            <p><strong>Fees:</strong> RS. {selectedDoctor.fees}</p>
            <div className="mt-2">
  <strong>Payment:</strong>
  <ul className="list-disc list-inside ml-2">
    {selectedDoctor.services.map((s, i) => (
      <li key={i}>
        {s.service} — {s.fee}
      </li>
    ))}
  </ul>
</div>
<p><strong>Address: </strong>
  <a
    href={selectedDoctor.address?.line1}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    View on Google Maps
  </a>
</p>

            {/* <p><strong>Workers:</strong> {selectedDoctor.workers.length}</p> */}
            <p><strong>Available:</strong> {selectedDoctor.available ? 'Yes' : 'No'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Saloonlist
