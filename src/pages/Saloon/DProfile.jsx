import React, { useContext, useEffect, useState } from 'react';
import { DContext } from '../../context/DContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.name?.trim()) newErrors.name = 'Name is required';
    if (!profileData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileData.email)) newErrors.email = 'Invalid email format';
    if (!profileData.address?.line1?.trim()) newErrors.addressLine1 = 'Address Line 1 is required';
    if (!profileData.fees || profileData.fees <= 0) newErrors.fees = 'Valid fees amount is required';
    if (!profileData.about?.trim()) newErrors.about = 'About section is required';
    if (profileData.about?.length > 1000) newErrors.about = 'About section cannot exceed 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateProfile = async () => {
    try {
      if (!validateForm()) {
        toast.error('Please fix the form errors');
        return;
      }

      const formData = {
        docId: profileData._id,
        name: profileData.name.trim(),
        email: profileData.email.trim(),
        address: profileData.address,
        fees: parseFloat(profileData.fees),
        about: profileData.about.trim(),
        available: profileData.available,
        speciality: profileData.speciality,
        degree: profileData.degree,
        experience: profileData.experience,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        formData,
        {
          headers: {
            dToken,
            'Content-Type': 'application/json',
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      console.error('Update profile error:', error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center p-4 text-gray-600 text-lg animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-5xl">
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Image Section */}
          <div className="lg:w-1/3">
            <div className="relative">
              <img
                className="w-full h-64 object-cover rounded-xl shadow-md"
                src={profileData.image}
                alt={`${profileData.name}'s profile`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="lg:w-2/3 space-y-6">
            {/* Name */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Name</h3>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Full Name"
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-900">{profileData.name}</h2>
              )}
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
              {isEdit ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Email"
                />
              ) : (
                <p className="text-gray-600 text-lg">{profileData.email}</p>
              )}
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Speciality */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Speciality</h3>
              {isEdit ? (
                <input
                  type="text"
                  value={profileData.speciality}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, speciality: e.target.value }))}
                  className="w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors border-gray-300"
                  placeholder="Speciality"
                />
              ) : (
                <p className="text-gray-600 text-lg">{profileData.speciality}</p>
              )}
            </div>

            {/* About */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">About</h3>
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                  className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${errors.about ? 'border-red-500' : 'border-gray-300'}`}
                  rows="5"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed">{profileData.about}</p>
              )}
              {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
            </div>

            {/* Appointment Fee */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Appointment Fee</h3>
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, fees: e.target.value }))}
                  className={`w-32 p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${errors.fees ? 'border-red-500' : 'border-gray-300'}`}
                  min="0"
                  step="0.01"
                />
              ) : (
                <p className="text-gray-600 text-lg">{currency} {profileData.fees}</p>
              )}
              {errors.fees && <p className="text-red-500 text-sm mt-1">{errors.fees}</p>}
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
              {isEdit ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={profileData.address?.line1 || ''}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition-colors ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Address Line 1"
                  />
                  {errors.addressLine1 && <p className="text-red-500 text-sm">{errors.addressLine1}</p>}
                </div>
              ) : (
                <p className="text-gray-600 text-lg">
                  {profileData.address?.line1}
                  {profileData.address?.line2 && <><br />{profileData.address.line2}</>}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={isEdit ? updateProfile : () => setIsEdit(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {isEdit ? 'Save Changes' : 'Edit Profile'}
              </button>
              {isEdit && (
                <button
                  onClick={() => {
                    setIsEdit(false);
                    getProfileData();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DProfile;
