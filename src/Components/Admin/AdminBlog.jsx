import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/GlobalAPI';

const emptyBlog = {
  heading: '',
  subtext: '',
  content: '',
  image: '',
  type: 'Normal',
};

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(emptyBlog);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState(emptyBlog);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  useEffect(() => {
    axios
      .get(API_ENDPOINTS.BLOGS)
      .then((res) => setBlogs(res.data))
      .catch((err) => setError(err.message));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      toBase64(files[0]).then((base) =>
        setForm((prev) => ({ ...prev, image: base }))
      );
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(API_ENDPOINTS.BLOGS, form);
      setBlogs((prev) => [res.data, ...prev]);
      setForm(emptyBlog);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditForm(blogs[idx]);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      toBase64(files[0]).then((base) =>
        setEditForm((prev) => ({ ...prev, image: base }))
      );
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.put(
        `${API_ENDPOINTS.BLOGS}/${editForm._id}`,
        editForm
      );
      setBlogs((prev) =>
        prev.map((b, i) => (i === editIdx ? res.data : b))
      );
      setEditIdx(null);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (idx) => {
    if (!window.confirm('Delete this blog entry?')) return;
    try {
      await axios.delete(
        `${API_ENDPOINTS.BLOGS}/${blogs[idx]._id}`
      );
      setBlogs((prev) => prev.filter((_, i) => i !== idx));
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-indigo-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Blog Admin Control Panel</h2>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {loading && <div className="mb-4 text-blue-600">Processing...</div>}

      <form className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAdd}>
        <input name="heading" value={form.heading} onChange={handleChange} placeholder="Heading" required className="px-3 py-2 border rounded"/>
        <input name="subtext" value={form.subtext} onChange={handleChange} placeholder="Subtext" required className="px-3 py-2 border rounded"/>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="px-3 py-2 border rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-semibold hover:file:bg-indigo-100"
          required
        />
        <select name="type" value={form.type} onChange={handleChange} className="px-3 py-2 border rounded bg-white">
          <option value="Normal">Normal</option>
          <option value="Featured">Featured</option>
        </select>
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" rows={4} required className="md:col-span-2 px-3 py-2 border rounded resize-none" />
        <button type="submit" className="col-span-1 md:col-span-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded transition">Add Blog</button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-700">Image</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Heading</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Subtext</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Type</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Content</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, idx) => (
              <tr key={blog._id} className="border-b hover:bg-indigo-50">
                {editIdx === idx ? (
                  <>
                    <td className="px-4 py-2"><input type="file" name="image" onChange={handleEditChange} className="w-20 px-2 py-1 border rounded"/></td>
                    <td className="px-4 py-2"><input name="heading" value={editForm.heading} onChange={handleEditChange} className="w-32 px-2 py-1 border rounded"/></td>
                    <td className="px-4 py-2"><input name="subtext" value={editForm.subtext} onChange={handleEditChange} className="w-40 px-2 py-1 border rounded"/></td>
                    <td className="px-4 py-2">
                      <select name="type" value={editForm.type} onChange={handleEditChange} className="px-2 py-1 border rounded bg-white">
                        <option value="Normal">Normal</option>
                        <option value="Featured">Featured</option>
                      </select>
                    </td>
                    <td className="px-4 py-2"><textarea name="content" value={editForm.content} onChange={handleEditChange} rows={2} className="w-56 px-2 py-1 border rounded resize-none"/></td>
                    <td className="px-4 py-2">
                      <button className="text-green-600 hover:underline mr-2" onClick={handleEditSave}>Save</button>
                      <button className="text-gray-600 hover:underline" onClick={() => setEditIdx(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2"><img src={blog.image} alt="Blog" className="w-16 h-10 object-cover rounded" /></td>
                    <td className="px-4 py-2 font-semibold text-slate-800">{blog.heading}</td>
                    <td className="px-4 py-2 text-slate-600 max-w-xs truncate">{blog.subtext}</td>
                    <td className="px-4 py-2">{blog.type}</td>
                    <td className="px-4 py-2 max-w-xs truncate">{blog.content}</td>
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

export default AdminBlog;
