import React from 'react';

const HireMeForm = ({ onClose, influencerId }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      influencerId, // include the ID
    };

    try {
      const res = await fetch('http://localhost:5000/api/hire-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      
      if (res.ok) {
        alert('Request submitted successfully');
        onClose?.(); // Close the modal on success
      } else {
        const errorData = await res.json();
        alert('Error: ' + errorData.error);
      }
    } catch (err) {
      alert('Something went wrong: ' + err.message);
    }
  };

  return (
    
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Hire Me</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default HireMeForm;
