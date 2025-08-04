import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerEdit = () => {
  const [banner, setBanner] = useState({ image: '', title: '', subtext: '' });
  const [banners, setBanners] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editBanner, setEditBanner] = useState({ image: '', title: '', subtext: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('https://cyborgweb-backend-1.onrender.com/api/banners')
      .then(res => setBanners(res.data))
      .catch(console.error);
  }, []);

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleChange = async e => {
    const { name, files, value } = e.target;
    if (files) {
      const base = await toBase64(files[0]);
      setBanner(prev => ({ ...prev, image: base }));
    } else {
      setBanner(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('https://cyborgweb-backend-1.onrender.com/api/banners', banner);
      setBanners(prev => [...prev, data]);
      setBanner({ image: '', title: '', subtext: '' });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = idx => {
    setEditIdx(idx);
    setEditBanner({ ...banners[idx] });
  };

  const handleEditChange = async e => {
    const { name, files, value } = e.target;
    if (files) {
      const base = await toBase64(files[0]);
      setEditBanner(prev => ({ ...prev, image: base }));
    } else {
      setEditBanner(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = async () => {
    setLoading(true);
    try {
      const id = editBanner._id;
      const { data } = await axios.put(`https://cyborgweb-backend-1.onrender.com/api/banners/${id}`, editBanner);
      setBanners(prev => prev.map((b, i) => i === editIdx ? data : b));
      setEditIdx(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async idx => {
    if (!window.confirm('Delete this banner?')) return;
    try {
      await axios.delete(`https://cyborgweb-backend-1.onrender.com/api/banners/${banners[idx]._id}`);
      setBanners(prev => prev.filter((_, i) => i !== idx));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-indigo-100 max-w-4xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold text-slate-800">🎯 Banner Control Panel</h2>
      {loading && <div className="text-blue-600 font-medium">Saving...</div>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="file" name="image" accept="image/*"
          onChange={handleChange}
          className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0 file:bg-indigo-50
            file:text-indigo-700 file:text-sm file:font-semibold
            hover:file:bg-indigo-100"
          required
        />

        <input
          name="title" value={banner.title} onChange={handleChange}
          placeholder="Banner Title" className="px-3 py-2 border rounded" required
        />

        <input
          name="subtext" value={banner.subtext} onChange={handleChange}
          placeholder="Subtext"
          className="md:col-span-2 px-3 py-2 border rounded" required
        />

        <button type="submit"
          className="col-span-1 md:col-span-2 bg-indigo-600 hover:bg-indigo-700
            text-white py-2 rounded font-semibold transition">
          Save Banner
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-700">Image</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Title</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Subtext</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b, idx) => (
              <tr key={idx} className="border-b hover:bg-indigo-50">
                {editIdx === idx ? (
                  <>
                    <td className="px-4 py-2"><input type="file" name="image" onChange={handleEditChange} className="w-24" /></td>
                    <td className="px-4 py-2"><input name="title" value={editBanner.title} onChange={handleEditChange} className="w-40 px-2 py-1 border rounded" /></td>
                    <td className="px-4 py-2"><input name="subtext" value={editBanner.subtext} onChange={handleEditChange} className="w-56 px-2 py-1 border rounded" /></td>
                    <td className="px-4 py-2">
                      <button className="text-green-600 hover:underline mr-2" onClick={handleEditSave}>Save</button>
                      <button className="text-gray-600 hover:underline" onClick={() => setEditIdx(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">
                      {b.image && <img src={b.image} alt="" className="w-24 h-auto rounded" />}
                    </td>
                    <td className="px-4 py-2 font-semibold text-slate-800">{b.title}</td>
                    <td className="px-4 py-2 text-slate-600 max-w-xs truncate">{b.subtext}</td>
                    <td className="px-4 py-2">
                      <button className="text-indigo-600 hover:underline mr-2" onClick={() => handleEditClick(idx)}>Edit</button>
                      <button className="text-red-500 hover:underline" onClick={() => handleDelete(idx)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerEdit;
