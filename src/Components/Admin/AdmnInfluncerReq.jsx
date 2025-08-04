import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS, getImageUrl } from '../../utils/GlobalAPI';

const statusColors = {
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  deleted: 'bg-gray-200 text-gray-700',
};

const statusOptions = ['pending', 'approved', 'rejected', 'deleted'];

const AdmnInfluncerReq = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [updating, setUpdating] = useState({});
  const [deleting, setDeleting] = useState({});
  const [modalImg, setModalImg] = useState(null);

  // Soft delete: set status to 'deleted'
  const handleSoftDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete (deactivate) this influencer request?')) return;
    setDeleting((d) => ({ ...d, [id]: true }));
    try {
      const res = await fetch(`${API_ENDPOINTS.INFLUENCER}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'deleted' }),
      });
      if (!res.ok) throw new Error('Failed to delete');
      await fetchRequests();
    } catch (err) {
      alert('Failed to delete');
    } finally {
      setDeleting((d) => ({ ...d, [id]: false }));
    }
  };

  // Reactivate: set status back to 'pending'
  const handleReactivate = async (id) => {
    setUpdating((u) => ({ ...u, [id]: true }));
    try {
      const res = await fetch(`${API_ENDPOINTS.INFLUENCER}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'pending' }),
      });
      if (!res.ok) throw new Error('Failed to reactivate');
      await fetchRequests();
    } catch (err) {
      alert('Failed to reactivate');
    } finally {
      setUpdating((u) => ({ ...u, [id]: false }));
    }
  };

  const handleStatusChange = async (id, status) => {
    setUpdating((u) => ({ ...u, [id]: true }));
    try {
      const res = await fetch(`${API_ENDPOINTS.INFLUENCER}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      await fetchRequests();
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating((u) => ({ ...u, [id]: false }));
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINTS.INFLUENCER);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRequests(data.reverse());
    } catch (err) {
      setError(err.message || 'Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filtered = requests.filter((r) => {
    const matchesStatus = filter === 'all' || r.status === filter;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.toLowerCase().includes(search.toLowerCase()) ||
      r.instagram.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Dashboard stats
  const total = requests.length;
  const approved = requests.filter(r => r.status === 'approved').length;
  const pending = requests.filter(r => r.status === 'pending').length;
  const rejected = requests.filter(r => r.status === 'rejected').length;
  const deletedCount = requests.filter(r => r.status === 'deleted').length;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Modal for full image */}
      {modalImg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative bg-white rounded shadow-lg p-4 max-w-full max-h-full flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-2xl font-bold"
              onClick={() => setModalImg(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={getImageUrl(modalImg)}
              alt="Screenshot Full"
              className="max-h-[80vh] max-w-[90vw] rounded"
              style={{ objectFit: 'contain' }}
              onError={(e) => {
                console.error('Error loading modal image:', e.target.src);
                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
              }}
            />
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Influencer Requests Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div className="bg-cyan-600 text-white rounded-xl p-4 flex flex-col items-center shadow">
          <div className="text-lg font-bold">Total</div>
          <div className="text-2xl font-extrabold">{total}</div>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-xl p-4 flex flex-col items-center shadow">
          <div className="text-lg font-bold">Pending</div>
          <div className="text-2xl font-extrabold">{pending}</div>
        </div>
        <div className="bg-green-100 text-green-800 rounded-xl p-4 flex flex-col items-center shadow">
          <div className="text-lg font-bold">Approved</div>
          <div className="text-2xl font-extrabold">{approved}</div>
        </div>
        <div className="bg-red-100 text-red-800 rounded-xl p-4 flex flex-col items-center shadow">
          <div className="text-lg font-bold">Rejected</div>
          <div className="text-2xl font-extrabold">{rejected}</div>
        </div>
        <div className="bg-gray-200 text-gray-800 rounded-xl p-4 flex flex-col items-center shadow">
          <div className="text-lg font-bold">Deleted</div>
          <div className="text-2xl font-extrabold">{deletedCount}</div>
        </div>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, phone, or Instagram"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-72"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-40"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>
      {/* Table */}
      {loading ? (
        <div className="text-center py-10 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-600 py-10">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-xl bg-white shadow">
            <thead>
              <tr className="bg-cyan-50">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Instagram</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Screenshot</th>
                <th className="p-2 text-left">Transaction ID</th>
                <th className="p-2 text-left">Influencer ID</th>
                <th className="p-2 text-left">Actions</th>
                <th className="p-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-8 text-slate-500">No requests found.</td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr key={r._id} className="border-b hover:bg-cyan-50 transition">
                    <td className="p-2 font-semibold">{r.name}</td>
                    <td className="p-2">{r.phone}</td>
                    <td className="p-2">{r.email}</td>
                    <td className="p-2">
                      <a 
                        href={r.instagram} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cyan-700 underline"
                      >
                        {r.instagram}
                      </a>
                    </td>
                    <td className="p-2">{r.influencerType}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[r.status] || statusColors['pending']}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="p-2">
                      {r.screenshot ? (
                        <div className="flex flex-col items-start">
                          <a
                            href="#"
                            onClick={e => {
                              e.preventDefault();
                              setModalImg(r.screenshot);
                            }}
                            className="mb-1"
                          >
                            <img 
                              src={getImageUrl(r.screenshot)}
                              alt="Screenshot" 
                              className="w-12 h-12 object-cover rounded border cursor-pointer"
                              onError={(e) => {
                                console.error('Error loading thumbnail:', e.target.src);
                                e.target.src = 'https://via.placeholder.com/48x48?text=Image+Error';
                              }}
                            />
                          </a>
                          <span className="text-xs text-gray-500 truncate max-w-[100px]">
                            {r.screenshot.split('/').pop()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">No Image</span>
                      )}
                    </td>
                    <td className="p-2">{r.transactionId}</td>
                    <td className="p-2">{r.influencerId || <span className="text-slate-400 text-xs">N/A</span>}</td>
                    <td className="p-2">
                      {r.status === 'deleted' ? (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-60"
                          onClick={() => handleReactivate(r._id)}
                          disabled={updating[r._id]}
                        >
                          {updating[r._id] ? 'Reactivating...' : 'Reactivate'}
                        </button>
                      ) : (
                        <select
                          value={r.status}
                          onChange={e => handleStatusChange(r._id, e.target.value)}
                          className="border px-2 py-1 rounded text-xs"
                          disabled={updating[r._id]}
                        >
                          {statusOptions
                            .filter(opt => opt !== 'deleted')
                            .map(opt => (
                              <option key={opt} value={opt}>
                                {opt.charAt(0).toUpperCase() + opt.slice(1)}
                              </option>
                            ))}
                        </select>
                      )}
                    </td>
                    <td className="p-2">
                      {r.status === 'deleted' ? (
                        <span className="text-gray-400 text-xs">Deleted</span>
                      ) : (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold disabled:opacity-60"
                          onClick={() => handleSoftDelete(r._id)}
                          disabled={deleting[r._id]}
                        >
                          {deleting[r._id] ? 'Deleting...' : 'Delete'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdmnInfluncerReq;