
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, updateAppointmentStatus } = useContext(AdminContext);
  const { currency } = useContext(AppContext);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // Get today's date in the same format as slotDate (e.g., "31_1_2025")
  const getTodayDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}_${month}_${year}`;
  };

  // Filter today's appointments
  const todayAppointments = appointments.filter((item) => {
    const appointmentDate = item.slotDate.split(' | ')[0]; // Extract date part
    return appointmentDate === getTodayDate();
  });

  // Calculate today's metrics
  const todayTotalAppointments = todayAppointments.length;
  const todayCancelledAppointments = todayAppointments.filter(
    (item) => item.cancelled === true
  ).length;
  const todayCompletedAppointments = todayAppointments.filter(
    (item) => item.isCompleted === true
  ).length;
  const todayPaidAppointments = todayAppointments.filter(
    (item) => item.payment === true
  ).length;
  const todayTotalFees = todayAppointments
    .filter((item) => item.payment === true)
    .reduce((sum, item) => sum + item.amount, 0);

  // Group today's appointments by employee
  const employees = Array.from(
    new Set(todayAppointments.map((item) => item.docData.name)) // Assuming employee name is inside docData
  );

  // Calculate the details of an employee's appointments for today
  const getEmployeeDetails = (employee) => {
    const employeeAppointments = todayAppointments.filter(
      (item) => item.docData.name === employee
    );

    const paidAppointments = employeeAppointments.filter(
      (item) => item.payment === true
    );

    const totalFees = paidAppointments.reduce((sum, item) => sum + item.amount, 0);

    return {
      totalAppointments: employeeAppointments.length,
      paidAppointments: paidAppointments.length,
      totalFees,
    };
  };

  // Open the employee's appointment details in a modal
  const openEmployeeModal = (employee) => {
    const details = getEmployeeDetails(employee);
    setSelectedEmployee({ name: employee, ...details });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-6 text-2xl font-semibold text-gray-800">Admin Panel - Today's Appointments</p>

      {/* Today's Summary */}
      <div className="mb-8 p-6 bg-gray-100 border border-gray-400 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Today's Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-lg font-medium">Total Appointments</p>
            <p className="text-2xl text-blue-700">{todayTotalAppointments}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Cancelled</p>
            <p className="text-2xl text-red-700">{todayCancelledAppointments}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Completed</p>
            <p className="text-2xl text-green-700">{todayCompletedAppointments}</p>
          </div>
          <div>
            <p className="text-lg font-medium">Paid</p>
            <p className="text-2xl text-purple-700">{todayPaidAppointments}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium">Total Fees Collected</p>
          <p className="text-2xl text-purple-700">{currency} {todayTotalFees}</p>
        </div>
      </div>

      {/* Employee-Specific Containers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {employees.map((employee, index) => {
          const details = getEmployeeDetails(employee);
          return (
            <div
              key={index}
              className="p-6 bg-gray-100 border border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 shadow-md"
              onClick={() => openEmployeeModal(employee)}
            >
              <p className="text-xl font-medium text-gray-800">{employee}</p>
              <p className="text-lg">Total Appointments: {details.totalAppointments}</p>
              <p className="text-lg text-green-700">
                Paid Appointments: {details.paidAppointments}
              </p>
              <p className="text-lg text-purple-700">
                Total Fees: {currency} {details.totalFees}
              </p>
            </div>
          );
        })}
      </div>

      {/* Employee Summary Modal */}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {selectedEmployee.name} - Today's Summary
            </h2>
            <div className="space-y-4">
              <p className="text-lg">Total Appointments: {selectedEmployee.totalAppointments}</p>
              <p className="text-lg text-green-700">
                Paid Appointments: {selectedEmployee.paidAppointments}
              </p>
              <p className="text-lg text-purple-700">
                Total Fees: {currency} {selectedEmployee.totalFees}
              </p>

              {/* List of Today's Appointments */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Appointments:</h3>
                {todayAppointments
                  .filter((item) => item.docData.name === selectedEmployee.name)
                  .map((appointment) => (
                    <div
                      key={appointment._id}
                      className="p-2 border-b"
                    >
                      <p>
                        <span className="font-medium">Time:</span> {appointment.slotTime}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>{' '}
                        {appointment.payment ? (
                          <span className="text-green-700">Paid</span>
                        ) : (
                          <span className="text-red-700">Unpaid</span>
                        )}
                      </p>
                      <p>
                        <span className="font-medium">Amount:</span> {currency} {appointment.amount}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAppointments;
