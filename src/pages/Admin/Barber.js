

// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const barber = () => {
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

    // Prepare the message data
    const messageData = {
      sender,
      receiver,
      content,
    };

    // Send a POST request to the API
    axios
      .post('http://localhost:4000/api/messages', messageData)
      .then((response) => {
        setMessageStatus('Message sent successfully!');
        // Clear the form fields
        setSender('');
        setReceiver('');
        setContent('');
        // Refresh the message list after sending
        setMessages([...messages, response.data.data]);
      })
      .catch((error) => {
        setMessageStatus('Failed to send message');
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-4xl font-semibold text-gray-800 mb-6">Message App</h1>

      {/* Message Form */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">Send a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sender" className="block text-gray-600">Sender</label>
            <input
              type="text"
              id="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="receiver" className="block text-gray-600">Receiver</label>
            <input
              type="text"
              id="receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-gray-600">Message Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Send Message
          </button>
        </form>
        {messageStatus && (
          <p className="mt-4 text-center text-green-600">{messageStatus}</p>
        )}
      </div>

      {/* Message List */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">Messages</h2>
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message._id} className="border-b border-gray-200 pb-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">{message.sender}</span>
                <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-gray-600 mt-2">
                <strong className="font-medium">To: {message.receiver}</strong>
              </p>
              <p className="text-gray-700">{message.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default barber;
