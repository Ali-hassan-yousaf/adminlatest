// import React, { useContext } from 'react'
// import { DContext } from './context/DContext';
// import { AdminContext } from './context/AdminContext';
// import { Route, Routes } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
// import Dashboard from './pages/Admin/Dashboard';
// import AllAppointments from './pages/Admin/AllAppointments';
// import AddD from './pages/Admin/AddD';
// import Saloonlist from './pages/Admin/Saloonlist';
// import Login from './pages/Login';
// import DAppointments from './pages/Saloon/DAppointments';
// import DDashboard from './pages/Saloon/DDashboard';
// import DProfile from './pages/Saloon/DProfile';

// const App = () => {

//   const { dToken } = useContext(DContext)
//   const { aToken } = useContext(AdminContext)

//   return dToken || aToken ? (
//     <div className='bg-[#F8F9FD]'>
//       <ToastContainer />
//       <Navbar />
//       <div className='flex items-start'>
//         <Sidebar />
//         <Routes>
//           <Route path='/' element={<></>} />
//           <Route path='/admin-dashboard' element={<Dashboard />} />
//           <Route path='/all-appointments' element={<AllAppointments />} />
//           <Route path='/add-Saloon' element={<AddD />} />
//           <Route path='/saloon-list' element={<Saloonlist />} />
//           <Route path='/saloon-dashboard' element={<DDashboard />} />
//           <Route path='/saloon-appointments' element={<DAppointments />} />
//           <Route path='/saloon-profile' element={<DProfile />} />
//         </Routes>
//       </div>
//     </div>
//   ) : (
//     <>
//       <ToastContainer />
//       <Login />
//     </>
//   )
// }

// export default App


import React, { useContext } from 'react'
import { DContext } from './context/DContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddD from './pages/Admin/AddD';
import Saloonlist from './pages/Admin/Saloonlist';
import Login from './pages/Login';
import DAppointments from './pages/Saloon/DAppointments';
import DDashboard from './pages/Saloon/DDashboard';
import DProfile from './pages/Saloon/DProfile';
import Meal from './pages/Admin/Meal';



const App = () => {

  const { dToken } = useContext(DContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-Saloon' element={<AddD />} />
          <Route path='/saloon-list' element={<Saloonlist />} />
          <Route path='/saloon-dashboard' element={<DDashboard />} />
          <Route path='/saloon-appointments' element={<DAppointments />} />
          <Route path='/saloon-profile' element={<DProfile />} />
          <Route path="/meal" element={<Meal />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App
