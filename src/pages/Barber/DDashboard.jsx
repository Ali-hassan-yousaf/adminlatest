



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
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-semibold text-gray-800 mb-6"></h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Request</p>
        </div>

        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-800">{message.sender}</span>
                  <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                  <p className="text-gray-600 mt-2">
                    <strong className="font-medium">To: {message.receiver}</strong>
                  </p>
                  <p className="text-gray-700">{message.content}</p>
                </div>

                <div className="ml-4">
                  {!message.isAccepted && (
                    <button
                      onClick={() => handleAcceptMessage(message._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                    >
                      Accept
                    </button>
                  )}
                  {message.isAccepted && (
                    <p className="text-green-500 text-xs mt-2">Requested Accepted</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional Section for Sending Message */}
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-6">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700">Sender</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700">Receiver</label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium text-gray-700">Message Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded mt-4 hover:bg-blue-600">
            Send Message
          </button>
        </form>
        {messageStatus && <p className="mt-4 text-sm text-gray-600">{messageStatus}</p>}
      </div>
    </div>
  );
};

export default DDashboard;
