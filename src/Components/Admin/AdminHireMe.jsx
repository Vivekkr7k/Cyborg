import React, { useEffect, useState } from 'react';

const AdminHireMe = () => {
  const [hireRequests, setHireRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch hire requests
        const hireRes = await fetch('http://localhost:5000/api/hire-requests');
        const hireData = await hireRes.json();
        if (Array.isArray(hireData)) {
          setHireRequests(hireData);
          setFiltered(hireData);
        }

        // Fetch influencers
        const infRes = await fetch('http://localhost:5000/api/influencer');
        const infData = await infRes.json();
        if (Array.isArray(infData)) {
          setInfluencers(infData);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (value) => {
    setFilter(value);
    const filteredData = hireRequests.filter(
      (r) =>
        r.name.toLowerCase().includes(value.toLowerCase()) ||
        r.email.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const getInfluencerDetails = (mongoId) => {
    return influencers.find((inf) => inf._id === mongoId);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Hire Requests Dashboard</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={filter}
          onChange={(e) => handleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-sm"
        />
      </div>

      <div className="overflow-auto border border-gray-200 rounded-xl shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-slate-700 text-xs uppercase">
            <tr>
              <th className="px-4 py-3">Requester Name</th>
              <th className="px-4 py-3">Requester Email</th>
              <th className="px-4 py-3">Requester Phone</th>
              <th className="px-4 py-3">Influencer Name</th>
              <th className="px-4 py-3">Influencer Phone</th>
              <th className="px-4 py-3">Influencer Email</th>
              <th className="px-4 py-3">Instagram</th>
              <th className="px-4 py-3">Custom ID</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((req, index) => {
              const inf = getInfluencerDetails(req.influencerId);
              return (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-slate-800">{req.name}</td>
                  <td className="px-4 py-3">{req.email}</td>
                  <td className="px-4 py-3">{req.phone}</td>
                  <td className="px-4 py-3">{inf?.name || 'N/A'}</td>
                  <td className="px-4 py-3">{inf?.phone || 'N/A'}</td>
                  <td className="px-4 py-3">{inf?.email || 'N/A'}</td>
                  <td className="px-4 py-3 text-blue-600">
                    {inf?.instagram ? (
                      <a href={inf.instagram} target="_blank" rel="noreferrer">
                        View
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-green-700">{inf?.influencerId || 'N/A'}</td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(req.createdAt || req.date || Date.now()).toLocaleString()}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-400">
                  No hire requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHireMe;
