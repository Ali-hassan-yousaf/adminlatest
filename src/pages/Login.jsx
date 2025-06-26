// // import axios from 'axios'
// // import React, { useContext, useState } from 'react'
// // import { DContext } from '../context/DContext'
// // import { AdminContext } from '../context/AdminContext'
// // import { toast } from 'react-toastify'

// // const Login = () => {

// //   const [state, setState] = useState('Admin')

// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')

// //   const backendUrl = import.meta.env.VITE_BACKEND_URL

// //   const { setDToken } = useContext(DContext)
// //   const { setAToken } = useContext(AdminContext)

// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();

// //     if (state === 'Admin') {

// //       const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
// //       if (data.success) {
// //         setAToken(data.token)
// //         localStorage.setItem('aToken', data.token)
// //       } else {
// //         toast.error(data.message)
// //       }

// //     } else {

// //       const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
// //       if (data.success) {
// //         setDToken(data.token)
// //         localStorage.setItem('dToken', data.token)
// //       } else {
// //         toast.error(data.message)
// //       }

// //     }

// //   }

// //   return (
// //     <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
// //       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
// //         <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
// //         <div className='w-full '>
// //           <p>Email</p>
// //           <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
// //         </div>

// //         <div className='w-full '>
// //           <p>Password</p>
// //           <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
// //         </div>
// //         <button className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
// //         {
// //           state === 'Admin'
// //             ? <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-primary underline cursor-pointer'>Click here</span></p>
// //             : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-primary underline cursor-pointer'>Click here</span></p>
// //         }
// //       </div>
// //     </form>
// //   )
// // }

// // export default Login


// // import axios from 'axios'
// // import React, { useContext, useState } from 'react'
// // import { DContext } from '../context/DContext'
// // import { AdminContext } from '../context/AdminContext'
// // import { AppContext } from '../context/AppContext'
// // import { toast } from 'react-toastify'
// // import { assets } from '../assets/assets'

// // const Login = () => {
// //   const [state, setState] = useState('Admin')
// //   const [showSignUp, setShowSignUp] = useState(false)
  
// //   // Add Doctor State (from AddD component)
// //   const [docImg, setDocImg] = useState(null)
// //   const [email, setEmail] = useState("")
// //   const [password, setPassword] = useState("")
// //   const [fees, setFees] = useState("")
// //   const [about, setAbout] = useState("")
// //   const [name, setName] = useState("")
// //   const [address1, setAddress1] = useState("")
// //   const [services, setServices] = useState([])
// //   const [workers, setWorkers] = useState([""])
  
// //   // Context values
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL
// //   const { setDToken } = useContext(DContext)
// //   const { setAToken, aToken } = useContext(AdminContext)
// //   const { backendUrl: appBackendUrl } = useContext(AppContext)

// //   // Hardcoded values (from AddD)
// //   const speciality = "NAN"
// //   const degree = "nab"
// //   const experience = "NAN"

// //   // Login Handler (unchanged)
// //   const onSubmitHandler = async (event) => {
// //     event.preventDefault();
// //     try {
// //       const endpoint = state === 'Admin' 
// //         ? '/api/admin/login' 
// //         : '/api/doctor/login'
      
// //       const { data } = await axios.post(backendUrl + endpoint, { email, password })

// //       if (data.success) {
// //         const tokenKey = state === 'Admin' ? 'aToken' : 'dToken'
// //         localStorage.setItem(tokenKey, data.token)
// //         state === 'Admin' ? setAToken(data.token) : setDToken(data.token)
// //         toast.success(`${state} login successful`)
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Login failed')
// //     }
// //   }

// //   // Add Doctor Handler (from AddD unchanged)
// //   const handleAddDoctor = async (event) => {
// //     event.preventDefault()
// //     try {
// //       if (!docImg) return toast.error("Image Not Selected")

// //       const formData = new FormData()
// //       formData.append("image", docImg)
// //       formData.append("name", name)
// //       formData.append("email", email)
// //       formData.append("password", password)
// //       formData.append("experience", experience)
// //       formData.append("fees", Number(fees))
// //       formData.append("about", about)
// //       formData.append("speciality", speciality)
// //       formData.append("degree", degree)
// //       formData.append("address", JSON.stringify({ line1: address1 }))
// //       formData.append("services", JSON.stringify(services))
// //       formData.append("workers", JSON.stringify(workers))

// //       const { data } = await axios.post(appBackendUrl + "/api/admin/add-Saloon", formData, {
// //         headers: { aToken },
// //       })

// //       if (data.success) {
// //         toast.success(data.message)
// //         // Reset all fields (from AddD)
// //         setDocImg(null)
// //         setEmail("")
// //         setName("")
// //         setPassword("")
// //         setAddress1("")
// //         setAbout("")
// //         setFees("")
// //         setServices([])
// //         setWorkers([""])
// //         setShowSignUp(false)
// //       }
// //     } catch (error) {
// //       toast.error(error.message)
// //     }
// //   }

// //   // Location Handler (from AddD)
// //   const getLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
// //           setAddress1(link)
// //         },
// //         () => alert("Error: Unable to fetch your location.")
// //       )
// //     } else {
// //       alert("Error: Geolocation is not supported by your browser.")
// //     }
// //   }

// //   // Service/Worker Handlers (from AddD)
// //   const handleAddService = () => setServices([...services, { service: "", fee: "" }])
// //   const handleServiceChange = (e, index) => {
// //     const updated = [...services]
// //     updated[index].fee = e.target.value
// //     setServices(updated)
// //   }
// //   const handleServiceNameChange = (e, index) => {
// //     const updated = [...services]
// //     updated[index].service = e.target.value
// //     setServices(updated)
// //   }
// //   const handleAddWorker = () => setWorkers([...workers, ""])
// //   const handleWorkerChange = (e, index) => {
// //     const updated = [...workers]
// //     updated[index] = e.target.value
// //     setWorkers(updated)
// //   }
// //   const handleDeleteService = (index) => setServices(services.filter((_, i) => i !== index))
// //   const handleDeleteWorker = (index) => setWorkers(workers.filter((_, i) => i !== index))

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
// //       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 space-y-6">
// //         {!showSignUp ? (
// //           <>
// //             <div className="flex gap-4 mb-8">
// //               <button
// //                 type="button"
// //                 onClick={() => setState('Admin')}
// //                 className={`flex-1 py-3 rounded-xl font-semibold ${
// //                   state === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
// //                 }`}
// //               >
// //                 Admin Login
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => setState('Doctor')}
// //                 className={`flex-1 py-3 rounded-xl font-semibold ${
// //                   state === 'Doctor' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'
// //                 }`}
// //               >
// //                 Doctor Login
// //               </button>
// //             </div>

// //             <form onSubmit={onSubmitHandler} className="space-y-4">
// //               <h2 className="text-2xl font-bold text-center">{state} Login</h2>
              
// //               <input
// //                 type="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
              
// //               <input
// //                 type="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="w-full p-2 border rounded"
// //                 required
// //               />
              
// //               <button
// //                 type="submit"
// //                 className="w-full p-2 bg-indigo-600 text-white rounded"
// //               >
// //                 Login
// //               </button>

// //               {state === 'Doctor' && (
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowSignUp(true)}
// //                   className="w-full p-2 text-blue-600 underline"
// //                 >
// //                   Create New Account
// //                 </button>
// //               )}
// //             </form>
// //           </>
// //         ) : (
// //           // Start of AddD component JSX
// //           <form onSubmit={handleAddDoctor} className="m-5 w-full">
// //             <p className="mb-3 text-2xl font-semibold text-gray-700">Add Doctor</p>
// //             <div className="bg-white px-8 py-8 border rounded-xl w-full shadow-lg">
// //               <div className="flex items-center gap-4 mb-8 text-gray-500">
// //                 <label htmlFor="doc-img">
// //                   <img
// //                     className="w-24 h-24 bg-gray-100 rounded-full cursor-pointer object-cover"
// //                     src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
// //                     alt="Doctor"
// //                   />
// //                 </label>
// //                 <input
// //                   onChange={(e) => setDocImg(e.target.files[0])}
// //                   type="file"
// //                   id="doc-img"
// //                   hidden
// //                 />
// //                 <p className="text-sm">Upload Doctor Picture</p>
// //               </div>
// //               <div className="space-y-6">
// //                 <input
// //                   type="text"
// //                   placeholder="Doctor Name"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                   className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 <input
// //                   type="email"
// //                   placeholder="Email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 <input
// //                   type="password"
// //                   placeholder="Password"
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />
// //                 <textarea
// //                   placeholder="About Doctor"
// //                   value={about}
// //                   onChange={(e) => setAbout(e.target.value)}
// //                   className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   rows={4}
// //                 />
// //                 <div>
// //                   <button
// //                     type="button"
// //                     onClick={getLocation}
// //                     className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   >
// //                     Get Current Location
// //                   </button>
// //                   <input
// //                     type="text"
// //                     placeholder="Address"
// //                     value={address1}
// //                     onChange={(e) => setAddress1(e.target.value)}
// //                     className="w-full mt-3 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   />
// //                 </div>


// //                 <input
// //                   type="text"
// //                   placeholder="location Name"
// //                   value={speciality}
// //                   onChange={(e) => setsp(e.target.value)}
// //                   className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                 />

// //                 <div className="space-y-4">
// //                   <button
// //                     type="button"
// //                     onClick={handleAddService}
// //                     className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
// //                   >
// //                     Add Payment Method
// //                   </button>
// //                   {services.map((service, index) => (
// //                     <div key={index} className="flex gap-4">
// //                       <input
// //                         type="text"
// //                         placeholder="JazzCash (0300456789)"
// //                         value={service.service}
// //                         onChange={(e) => handleServiceNameChange(e, index)}
// //                         className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       />
// //                       <input
// //                         type="number"
// //                         placeholder="Service Fee"
// //                         value={service.fee}
// //                         onChange={(e) => handleServiceChange(e, index)}
// //                         className="w-1/2 py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => handleDeleteService(index)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>

// //                 <div className="space-y-4">
// //                   <button
// //                     type="button"
// //                     onClick={handleAddWorker}
// //                     className="py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                   >
// //                     Add Doctor Phone Number 
// //                   </button>
// //                   {workers.map((worker, index) => (
// //                     <div key={index} className="flex gap-4">
// //                       <input
// //                         type="text"
// //                         placeholder="0333456789"
// //                         value={worker}
// //                         onChange={(e) => handleWorkerChange(e, index)}
// //                         className="w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => handleDeleteWorker(index)}
// //                         className="text-red-500 hover:text-red-700"
// //                       >
// //                         Delete
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <button
// //                 type="submit"
// //                 className="mt-6 py-3 px-6 bg-blue-600 text-white text-xl font-semibold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               >
// //                 Add Doctor
// //               </button>
// //             </div>
// //           </form>
// //           // End of AddD component JSX
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Login

import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DContext } from '../context/DContext'
import { AdminContext } from '../context/AdminContext'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [showSignUp, setShowSignUp] = useState(false)
  // Password reset states
  const [resetStep, setResetStep] = useState(0) // 0: email, 1: otp+newpass
  const [resetEmail, setResetEmail] = useState('')
  const [resetOtp, setResetOtp] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')

  // Add Doctor State
  const [docImg, setDocImg] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [name, setName] = useState('')
  const [address1, setAddress1] = useState('')
  const [services, setServices] = useState([])
  const [workers, setWorkers] = useState([''])
  const [speciality, setSpeciality] = useState('')

  // Context values
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const { setDToken } = useContext(DContext)
  const { setAToken, aToken } = useContext(AdminContext)
  const { backendUrl: appBackendUrl } = useContext(AppContext)

  // Hardcoded values
  const degree = 'nab'
  const experience = 'NAN'

  // Login Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      const endpoint = state === 'Admin' ? '/api/admin/login' : '/api/doctor/login'
      const { data } = await axios.post(backendUrl + endpoint, { email, password })
      if (data.success) {
        const tokenKey = state === 'Admin' ? 'aToken' : 'dToken'
        localStorage.setItem(tokenKey, data.token)
        state === 'Admin' ? setAToken(data.token) : setDToken(data.token)
        toast.success(`${state} login successful`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  // Doctor Password Reset Handlers
  const handleSendOtp = async (e) => {
    e.preventDefault()
    try {
      if (!resetEmail) return toast.error('Please enter your email')
      const { data } = await axios.post(backendUrl + '/api/doctor/get-otp', { email: resetEmail })
      if (data.success) {
        toast.success('OTP sent to your email')
        setResetStep(1)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      if (!resetEmail || !resetOtp || !resetNewPassword) return toast.error('Please fill all fields')
      const { data } = await axios.post(backendUrl + '/api/doctor/reset-password', {
        email: resetEmail,
        otp: resetOtp,
        newPassword: resetNewPassword,
      })
      if (data.success) {
        toast.success('Password reset successful')
        setState('Doctor')
        setResetStep(0)
        setResetEmail('')
        setResetOtp('')
        setResetNewPassword('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password')
    }
  }

  // Add Doctor Handler
  const handleAddDoctor = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) return toast.error('Image Not Selected')

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1 }))
      formData.append('services', JSON.stringify(services))
      formData.append('workers', JSON.stringify(workers))

      const { data } = await axios.post(appBackendUrl + '/api/admin/add-Saloon', formData, {
        headers: { aToken },
      })

      if (data.success) {
        toast.success(data.message)
        setDocImg(null)
        setEmail('')
        setName('')
        setPassword('')
        setAddress1('')
        setAbout('')
        setFees('')
        setServices([])
        setWorkers([''])
        setSpeciality('')
        setShowSignUp(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add doctor')
    }
  }

  // Location Handler
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const link = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`
          setAddress1(link)
        },
        () => alert('Error: Unable to fetch your location.')
      )
    } else {
      alert('Error: Geolocation is not supported by your browser.')
    }
  }

  // Service/Worker Handlers
  const handleAddService = () => setServices([...services, { service: '', fee: '' }])
  const handleServiceChange = (e, index) => {
    const updated = [...services]
    updated[index].fee = e.target.value
    setServices(updated)
  }
  const handleServiceNameChange = (e, index) => {
    const updated = [...services]
    updated[index].service = e.target.value
    setServices(updated)
  }
  const handleAddWorker = () => setWorkers([...workers, ''])
  const handleWorkerChange = (e, index) => {
    const updated = [...workers]
    updated[index] = e.target.value
    setWorkers(updated)
  }
  const handleDeleteService = (index) => setServices(services.filter((_, i) => i !== index))
  const handleDeleteWorker = (index) => setWorkers(workers.filter((_, i) => i !== index))

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-teal-50 flex items-center justify-center p-4">
      {!showSignUp ? (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {state !== 'Reset Password' ? (
            <>
              <h2 className="text-3xl font-bold text-center text-gray-800">{state} Login</h2>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setState('Admin')}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    state === 'Admin'
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setState('Doctor')}
                  className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    state === 'Doctor'
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Doctor
                </button>
              </div>
              <form onSubmit={onSubmitHandler} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Login
                </button>
                {state === 'Doctor' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowSignUp(true)}
                      className="w-full text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors duration-200"
                    >
                      Create New Account
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setState('Reset Password')
                        setResetStep(0)
                        setResetEmail('')
                        setResetOtp('')
                        setResetNewPassword('')
                      }}
                      className="w-full text-blue-600 hover:text-blue-800 font-medium underline transition-colors duration-200 mt-2"
                    >
                      Forgot Password?
                    </button>
                  </>
                )}
              </form>
            </>
          ) : (
            // Reset Password UI
            <form onSubmit={resetStep === 0 ? handleSendOtp : handleResetPassword} className="space-y-5">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Reset Password</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={resetStep === 1}
                />
              </div>
              {resetStep === 1 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={resetOtp}
                      onChange={(e) => setResetOtp(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      value={resetNewPassword}
                      onChange={(e) => setResetNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                {resetStep === 0 ? 'Send OTP' : 'Reset Password'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setState('Doctor')
                  setResetStep(0)
                  setResetEmail('')
                  setResetOtp('')
                  setResetNewPassword('')
                }}
                className="w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 mt-2"
              >
                Go Back to Login
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Doctor</h2>
          <form onSubmit={handleAddDoctor} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <label htmlFor="doc-img" className="relative cursor-pointer">
                    <img
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                      src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                      alt="Doctor"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200">
                      <svg
                        className="w-6 h-6 text-white opacity-0 hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  </label>
                  <input
                    onChange={(e) => setDocImg(e.target.files[0])}
                    type="file"
                    id="doc-img"
                    accept="image/*"
                    hidden
                  />
                  <p className="text-sm text-gray-600">Upload Doctor Picture</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name</label>
                  <input
                    type="text"
                    placeholder="Enter doctor name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                  <input
                    type="text"
                    placeholder="Enter Location Name"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About Doctor</label>
                  <textarea
                    placeholder="Enter about doctor"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                  <input
                    type="number"
                    placeholder="Enter fees"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={getLocation}
                      className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Get Location
                    </button>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Payment Methods</h3>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Method
                  </button>
                </div>
                {services.map((service, index) => (
                  <div key={index} className="flex gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="JazzCash (0300456789)"
                      value={service.service}
                      onChange={(e) => handleServiceNameChange(e, index)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <input
                      type="number"
                      placeholder="Service Fee"
                      value={service.fee}
                      onChange={(e) => handleServiceChange(e, index)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteService(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Doctor Phone Numbers</h3>
                  <button
                    type="button"
                    onClick={handleAddWorker}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Number
                  </button>
                </div>
                {workers.map((worker, index) => (
                  <div key={index} className="flex gap-4 mb-3">
                    <input
                      type="text"
                      placeholder="0333456789"
                      value={worker}
                      onChange={(e) => handleWorkerChange(e, index)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteWorker(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 focus:ring-2 focus:ring-red-500 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Add Doctor
              </button>
              <button
                type="button"
                onClick={() => setShowSignUp(false)}
                className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                Go Back to Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default Login