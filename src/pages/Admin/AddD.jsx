import React, { useEffect, useState } from "react";

const AddD = () => {
  const [precautions, setPrecautions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [risk, setRisk] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrecaution, setSelectedPrecaution] = useState({});

  useEffect(() => {
    const fetchPrecautions = async () => {
      try {
        const response = await fetch("https://pet-well-zuxu.vercel.app/api/worker");
        const data = await response.json();
        const filteredData = data.filter((item) => item.shopname === "Precautions") || [];
        setPrecautions(filteredData);
      } catch (error) {
        console.error("Error fetching precautions:", error);
      }
    };
    fetchPrecautions();
  }, []);

  const handleAddPrecaution = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Create new precaution object matching your API structure
    const newPrecaution = {
      shopname: "Precautions", // Maintain the shopname field
      title,
      description: `${description}|${risk}`, // Combine with pipe separator
    };

    try {
      const response = await fetch("https://pet-well-zuxu.vercel.app/api/worker/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPrecaution),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Failed to create precaution.");
        setLoading(false);
        return;
      }

      setPrecautions([...precautions, data]);
      setTitle("");
      setDescription("");
      setRisk("");
    } catch (error) {
      console.error("Error adding precaution:", error);
      setErrorMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  const handleDeletePrecaution = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pet-well-zuxu.vercel.app/api/worker/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setErrorMessage("Failed to delete precaution.");
        setLoading(false);
        return;
      }

      setPrecautions(precautions.filter((precaution) => precaution._id !== id));
    } catch (error) {
      console.error("Error deleting precaution:", error);
      setErrorMessage("An unexpected error occurred.");
    }
    setLoading(false);
  };

  const handleViewDetails = (precaution) => {
    // Split combined description back into precaution and risk
    const [description, risk] = precaution.description.split('|');
    setSelectedPrecaution({
      title: precaution.title,
      description,
      risk
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPrecaution({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <header className="mb-8 text-center space-y-3">
        <h1 className="text-3xl font-bold text-gray-900">Pet Precautions & Risks</h1>
        <p className="text-base text-gray-600">Manage important precautions and associated risks for your pets</p>
      </header>

      {errorMessage && (
        <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 rounded-lg text-center">
          {errorMessage}
        </div>
      )}

      {/* Precautions Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {precautions.map((precaution, index) => {
          // Split description into precaution and risk
          const [description, risk] = precaution.description.split('|');
          
          return (
            <article
              key={precaution._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between h-[320px] w-full transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="space-y-4 overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {precaution.title || `Precaution #${index + 1}`}
                </h3>
                
                {/* Precaution container */}
                <div className="bg-blue-50 p-3 rounded-lg h-28 overflow-y-auto">
                  <h4 className="text-xs font-medium text-blue-700 mb-1">PRECAUTION</h4>
                  <p className="text-gray-600 text-sm">{description}</p>
                </div>
                
                {/* Risk container */}
                <div className="bg-red-50 p-3 rounded-lg h-28 overflow-y-auto">
                  <h4 className="text-xs font-medium text-red-700 mb-1">RISK</h4>
                  <p className="text-gray-600 text-sm">{risk}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleViewDetails(precaution)}
                  className="px-3 py-1.5 text-white bg-blue-600 rounded-lg text-sm font-medium transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeletePrecaution(precaution._id)}
                  className="px-3 py-1.5 text-white bg-red-600 rounded-lg text-sm font-medium transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal for Full Details */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedPrecaution.title}</h2>
            
            {/* Precaution details */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-blue-700 mb-2">PRECAUTION</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedPrecaution.description}</p>
              </div>
            </div>
            
            {/* Risk details */}
            <div>
              <h3 className="text-sm font-medium text-red-700 mb-2">RISK</h3>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-gray-700">{selectedPrecaution.risk}</p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-gray-600 rounded-lg text-sm font-medium transition-all hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Precaution Form */}
      <section className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleAddPrecaution} className="space-y-5">
          <h2 className="text-xl font-bold text-gray-900 text-center">Create New Precaution</h2>

          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precaution & Risk Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Chocolate Toxicity"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                required
              />
            </div>
            
            {/* Precaution Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precaution Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Avoid feeding chocolate to dogs"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                rows="3"
                required
              />
            </div>

            {/* Risk Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Associated Risk</label>
              <textarea
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                placeholder="e.g. Chocolate contains theobromine which is toxic to dogs"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                rows="3"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Precaution"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddD;
