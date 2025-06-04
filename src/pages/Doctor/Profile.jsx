import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [workers, setWorkers] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImageFile, setPostImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('Admin');

  const CLOUDINARY_UPLOAD_PRESET = 'petwell_uploads';
  const CLOUDINARY_CLOUD_NAME = 'dq7z2nlgv';
  const backendUrl = 'https://pet-well-zuxu.vercel.app';

  // Fetch community posts
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/worker`);
        const data = await response.json();
        const uniqueWorkers = Object.values(
          (data || []).reduce((acc, worker) => {
            acc[worker.title] = worker;
            return acc;
          }, {})
        );
        setWorkers(uniqueWorkers);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setErrorMessage('Failed to fetch posts.');
      }
    };
    fetchWorkers();
  }, []);

  // Toggle post visibility
  const handleToggleVisibility = async (workerId) => {
    setWorkers(prev => prev.map(worker => {
      if (worker._id === workerId) {
        const newSlot = worker.slot === '1' ? '0' : '1';
        return { ...worker, slot: newSlot };
      }
      return worker;
    }));

    // Find the worker to update
    const workerToUpdate = workers.find(w => w._id === workerId);
    if (workerToUpdate) {
      const newSlot = workerToUpdate.slot === '1' ? '0' : '1';
      const updatedWorker = { ...workerToUpdate, slot: newSlot };
      
      try {
        const response = await fetch(`${backendUrl}/api/worker/`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedWorker),
        });

        if (!response.ok) {
          console.error('Failed to update visibility on server');
          // Revert if failed
          setWorkers(prev => prev.map(worker => {
            if (worker._id === workerId) {
              return workerToUpdate;
            }
            return worker;
          }));
        } else {
          toast.success(`Post ${newSlot === '1' ? 'published' : 'hidden'}!`);
        }
      } catch (error) {
        console.error('Error updating visibility:', error);
        // Revert if failed
        setWorkers(prev => prev.map(worker => {
          if (worker._id === workerId) {
            return workerToUpdate;
          }
          return worker;
        }));
      }
    }
  };

  // Handle image upload for posts
  const handlePostImageUpload = async () => {
    if (!postImageFile) return null;

    const formData = new FormData();
    formData.append('file', postImageFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };

  // Create a new post
  const handleAddWorker = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setErrorMessage('');

    const imageUrl = await handlePostImageUpload();
    if (!imageUrl) {
      setErrorMessage('Image upload failed. Please try again.');
      setLoading(false);
      return;
    }

    const postDate = new Date().toISOString();

    const newWorker = {
      shopname: 'Hardcoded Shop',
      name: 'Comm',
      title: postTitle,
      description: postDescription,
      image: imageUrl,
      postDate,
      slot: '0', // Default to hidden
    };

    try {
      const response = await fetch(`${backendUrl}/api/worker/`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorker),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || 'Failed to create post.');
        setLoading(false);
        return;
      }

      setWorkers((prev) => {
        const filtered = prev.filter((w) => w.title !== data.title);
        return [...filtered, data];
      });
      setPostTitle('');
      setPostDescription('');
      setPostImageFile(null);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error adding post:', error);
      setErrorMessage('An unexpected error occurred.');
    }

    setLoading(false);
  };

  // Parse slot for comments and likes
  const parseSlot = (slot) => {
    if (!slot || slot === '0' || slot === '1') return { comments: [], likes: [] };
    const entries = slot.split('||').filter(Boolean);
    const comments = [];
    const likes = [];
    entries.forEach((entry) => {
      const [type, content] = entry.split('|');
      if (type === 'C') {
        const [userText, timestamp] = content.split('::');
        const [user, ...textParts] = userText.split(':');
        const text = textParts.join(':');
        comments.push({ user, text, createdAt: timestamp, id: `${user}-${timestamp}` });
      } else if (type === 'L') {
        const [user, timestamp] = content.split('::');
        likes.push({ user, createdAt: timestamp });
      }
    });
    return { comments, likes };
  };

  // Add a comment
  const handleAddComment = async (workerId) => {
    if (!commentText.trim()) {
      setErrorMessage('Comment cannot be empty.');
      return;
    }

    const worker = workers.find((w) => w._id === workerId);
    if (!worker) {
      setErrorMessage('Post not found.');
      return;
    }

    const newComment = `C|${userName}:${commentText}::${new Date().toISOString()}`;
    const updatedSlot = worker.slot.startsWith('1') || worker.slot.startsWith('0') 
      ? `${worker.slot}||${newComment}`
      : worker.slot 
        ? `${worker.slot}||${newComment}`
        : newComment;
    
    const updatedWorker = { ...worker, slot: updatedSlot };

    // Optimistic update
    setWorkers(workers.map((w) => (w._id === workerId ? updatedWorker : w)));
    setSelectedWorker(updatedWorker);
    setCommentText('');
    setErrorMessage('');
  };

  // Delete a comment
  const handleDeleteComment = (workerId, commentId) => {
    setWorkers(prev => prev.map(worker => {
      if (worker._id === workerId) {
        const { comments, likes } = parseSlot(worker.slot);
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        
        // Rebuild slot with remaining comments and likes
        const newCommentsStr = updatedComments.map(c => 
          `C|${c.user}:${c.text}::${c.createdAt}`
        ).join('||');
        
        const newLikesStr = likes.map(l => 
          `L|${l.user}::${l.createdAt}`
        ).join('||');
        
        const newSlot = [newCommentsStr, newLikesStr].filter(Boolean).join('||');
        
        // Preserve visibility state
        const visibilityPrefix = worker.slot.startsWith('1') ? '1' : worker.slot.startsWith('0') ? '0' : '';
        return { 
          ...worker, 
          slot: visibilityPrefix ? `${visibilityPrefix}||${newSlot}` : newSlot 
        };
      }
      return worker;
    }));
    
    // Update selected worker if open
    if (selectedWorker?._id === workerId) {
      const { comments, likes } = parseSlot(selectedWorker.slot);
      const updatedComments = comments.filter(comment => comment.id !== commentId);
      
      const newCommentsStr = updatedComments.map(c => 
        `C|${c.user}:${c.text}::${c.createdAt}`
      ).join('||');
      
      const newLikesStr = likes.map(l => 
        `L|${l.user}::${l.createdAt}`
      ).join('||');
      
      const newSlot = [newCommentsStr, newLikesStr].filter(Boolean).join('||');
      
      // Preserve visibility state
      const visibilityPrefix = selectedWorker.slot.startsWith('1') ? '1' : selectedWorker.slot.startsWith('0') ? '0' : '';
      setSelectedWorker(prev => ({ 
        ...prev, 
        slot: visibilityPrefix ? `${visibilityPrefix}||${newSlot}` : newSlot 
      }));
    }
    
    toast.success('Comment deleted!');
  };

  const openCommentPopup = (worker) => {
    setSelectedWorker(worker);
    setCommentText('');
    setErrorMessage('');
  };

  const closeCommentPopup = () => {
    setSelectedWorker(null);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 text-sm pt-5">
      {/* Community Posts Section */}
      <div className="mt-10">
        <header className="mb-10 text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Pet Owner Community</h1>
          <p className="text-lg text-gray-600">
            Connect with other pet owners, share experiences, and get advice from our community.
          </p>
        </header>

        {errorMessage && (
          <div className="mb-8 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 rounded-lg text-center">
            {errorMessage}
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {workers
            .filter((worker) => worker.name === 'Comm')
            .map((worker) => {
              const { likes } = parseSlot(worker.slot);
              const isVisible = worker.slot.startsWith('1');
              
              return (
                <article
                  key={worker._id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    !isVisible ? 'opacity-60' : ''
                  }`}
                >
                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">{worker.title}</h3>
                      <label className="flex items-center cursor-pointer">
                        <span className="mr-2 text-sm text-gray-700">
                          {isVisible ? 'Visible' : 'Hidden'}
                        </span>
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => handleToggleVisibility(worker._id)}
                          className="form-checkbox h-5 w-5 text-green-600 rounded"
                        />
                      </label>
                    </div>
                    
                    {worker.image && (
                      <figure className="relative h-56 my-4">
                        <img
                          src={worker.image}
                          alt={worker.title}
                          className="w-full h-full object-cover rounded-lg"
                          loading="lazy"
                        />
                      </figure>
                    )}
                    
                    <p className="text-gray-600 line-clamp-3">{worker.description}</p>
                    <div className="pt-4 border-t border-gray-100">
                      <dl className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <dt className="w-20 font-medium">Posted:</dt>
                          <dd>
                            {new Date(worker.postDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="w-20 font-medium">Likes:</dt>
                          <dd className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-red-500"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                            {likes.length}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => openCommentPopup(worker)}
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg text-sm font-semibold transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>

        {/* Comment Popup */}
        {selectedWorker && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  Comments for {selectedWorker.title}
                </h3>
                <button
                  onClick={closeCommentPopup}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto mb-4">
                {parseSlot(selectedWorker.slot).comments.length > 0 ? (
                  parseSlot(selectedWorker.slot).comments.map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-100 rounded-lg mb-2 flex justify-between items-start">
                      <div>
                        <p className="text-gray-800">
                          <span className="font-semibold">{comment.user}:</span> {comment.text}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(selectedWorker._id, comment.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No comments yet.</p>
                )}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment as admin..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleAddComment(selectedWorker._id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create Post Form */}
        <section className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
          <form onSubmit={handleAddWorker} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              Create New Post
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={postDescription}
                  onChange={(e) => setPostDescription(e.target.value)}
                  placeholder="Write your post description..."
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPostImageFile(e.target.files[0])}
                      className="hidden"
                      required
                    />
                    <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-indigo-500 transition-colors">
                      <span className="text-indigo-600 font-medium">
                        Click to upload image
                      </span>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG, JPEG up to 5MB
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating Post...
                </div>
              ) : (
                'Publish Post'
              )}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
