


import React, { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../../../utils/GlobalAPI';

const statusOptions = ['pending', 'converted', 'not converted', 'contact again'];

const AdminInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({ total: 0, thisMonth: 0 });

  // Delete an inquiry
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_ENDPOINTS.CONTACT}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete inquiry');
      }
      setInquiries(inquiries => inquiries.filter(q => q._id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting inquiry');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(API_ENDPOINTS.CONTACT);
        if (!res.ok) throw new Error('Failed to fetch inquiries');
        const data = await res.json();
        setInquiries(data);
        // Stats
        setStats({
          total: data.length,
          thisMonth: data.filter(q => {
            const d = new Date(q.createdAt);
            const now = new Date();
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
          }).length
        });
      } catch (err) {
        setError(err.message || 'Error fetching inquiries');
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  // Change status of an inquiry
  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_ENDPOINTS.CONTACT}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to update status');
      }
      const data = await res.json();
      setInquiries(inquiries => inquiries.map(q => q._id === id ? { ...q, status: data.contact.status } : q));
    } catch (err) {
      setError(err.message || 'Error updating status');
    } finally {
      setLoading(false);
    }
  };

  // Filtered and searched inquiries
  const filtered = inquiries.filter(q =>
    (statusFilter === 'all' || q.status === statusFilter) &&
    (
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.toLowerCase().includes(search.toLowerCase()) ||
      q.service.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Contact Inquiries Dashboard</h2>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="bg-blue-50 rounded-xl px-6 py-4 text-center">
          <div className="text-3xl font-bold text-cyan-700">{stats.total}</div>
          <div className="text-slate-700">Total Inquiries</div>
        </div>
        <div className="bg-blue-50 rounded-xl px-6 py-4 text-center">
          <div className="text-3xl font-bold text-cyan-700">{stats.thisMonth}</div>
          <div className="text-slate-700">This Month</div>
        </div>
        <div className="bg-blue-50 rounded-xl px-6 py-4 text-center">
          <div className="text-3xl font-bold text-cyan-700">{inquiries.filter(q => q.status === 'pending').length}</div>
          <div className="text-slate-700">Pending</div>
        </div>
        <div className="bg-blue-50 rounded-xl px-6 py-4 text-center">
          <div className="text-3xl font-bold text-cyan-700">{inquiries.filter(q => q.status === 'resolved').length}</div>
          <div className="text-slate-700">Resolved</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search by name, email, phone, or service..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-64"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="all">All Statuses</option>
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Phone</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Email</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Service</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Status</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Date</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-6 text-slate-500">No inquiries found.</td></tr>
            ) : (
              filtered.map(q => {
                let rowBg = '';
                if (q.status === 'pending') rowBg = 'bg-yellow-50';
                else if (q.status === 'converted') rowBg = 'bg-green-50';
                else if (q.status === 'not converted') rowBg = 'bg-red-50';
                else if (q.status === 'contact again') rowBg = 'bg-blue-50';
                return (
                  <tr key={q._id} className={`border-b hover:bg-blue-100 transition ${rowBg}`}>
                  <td className="px-4 py-2 font-semibold text-slate-800">{q.name}</td>
                  <td className="px-4 py-2">{q.phone}</td>
                  <td className="px-4 py-2">{q.email}</td>
                  <td className="px-4 py-2">{q.service}</td>
                  <td className="px-4 py-2">
                    <select
                      value={q.status}
                      onChange={e => handleStatusChange(q._id, e.target.value)}
                      className="px-2 py-1 border rounded"
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">{q.createdAt ? new Date(q.createdAt).toLocaleString() : ''}</td>
                  <td className="px-4 py-2 text-xs">
                    <button
                      className="text-red-600 hover:underline mr-2"
                      onClick={() => handleDelete(q._id)}
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInquiry;

