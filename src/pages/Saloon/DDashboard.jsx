



import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DContext } from '../../context/DContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DDashboard = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [content, setContent] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/messages')
      .then((response) => {
        setMessages(response.data.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the messages:', error);
      });
  }, []);

  // Handle sending a new message
  const handleSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      sender,
      receiver,
      content,
    };

    axios
      .post('http://localhost:4000/api/messages', messageData)
      .then((response) => {
        setMessageStatus('Message sent successfully!');
        setSender('');
        setReceiver('');
        setContent('');
        setMessages([...messages, response.data.data]);
      })
      .catch((error) => {
        setMessageStatus('Failed to send message');
        console.error('Error sending message:', error);
      });
  };

  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  // Accept Message function
  const handleAcceptMessage = (messageId) => {
    axios
      .post(`http://localhost:4000/api/message/${messageId}`)
      .then((response) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === messageId ? { ...message, isAccepted: true } : message
          )
        );
        console.log('Message accepted:', response.data.message);
      })
      .catch((error) => {
        console.error('Error accepting message:', error);
      });
  };

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p className='text-gray-400'>Users</p></div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
              <img className='rounded-full w-10' src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <div className='flex'>
                    <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DDashboard;

