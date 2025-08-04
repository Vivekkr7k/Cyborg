import React, { useState, useEffect } from 'react';

const emptyCourse = {
  title: '',
  desc: '',
  price: '',
  img: '',
  lessons: '',
  duration: '',
  level: '',
};

const AdminUpskill = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(emptyCourse);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch courses from backend on mount
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        if (!res.ok) throw new Error('Failed to fetch courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        setError(err.message || 'Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to add course');
      }
      const data = await res.json();
      setCourses([...courses, data.course]);
      setForm(emptyCourse);
    } catch (err) {
      setError(err.message || 'Error adding course');
    } finally {
      setLoading(false);
    }
  };


  // Edit state
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState(emptyCourse);

  // Start editing a course
  const handleEditClick = (idx) => {
    setEditIdx(idx);
    setEditForm(courses[idx]);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Save edited course
  const handleEditSave = async (id) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to edit course');
      }
      const data = await res.json();
      const updated = courses.map((c, i) => (i === editIdx ? data.course : c));
      setCourses(updated);
      setEditIdx(null);
    } catch (err) {
      setError(err.message || 'Error editing course');
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditIdx(null);
  };

  // Delete a course
  const handleDelete = async (id, idx) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to delete course');
      }
      setCourses(courses.filter((_, i) => i !== idx));
    } catch (err) {
      setError(err.message || 'Error deleting course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md border border-blue-100">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Upskill Courses Control Panel</h2>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}
      {loading && <div className="mb-4 text-blue-600">Loading...</div>}
      <form className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleAdd}>
        <input name="title" value={form.title} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Title" required />
        <input name="desc" value={form.desc} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Description" required />
        <input name="price" value={form.price} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Price" required />
        <input name="img" value={form.img} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Image URL" required />
        <input name="lessons" value={form.lessons} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Lessons" required />
        <input name="duration" value={form.duration} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Duration" required />
        <input name="level" value={form.level} onChange={handleChange} className="px-3 py-2 border rounded" placeholder="Level" required />
        <button type="submit" className="col-span-1 md:col-span-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded transition">Add Course</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 font-semibold text-slate-700">Image</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Title</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Description</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Price</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Lessons</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Duration</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Level</th>
              <th className="px-4 py-2 font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => (
              <tr key={course._id || idx} className="border-b hover:bg-blue-50">
                {editIdx === idx ? (
                  <>
                    <td className="px-4 py-2"><input name="img" value={editForm.img} onChange={handleEditChange} className="px-2 py-1 border rounded w-20" /></td>
                    <td className="px-4 py-2"><input name="title" value={editForm.title} onChange={handleEditChange} className="px-2 py-1 border rounded w-24" /></td>
                    <td className="px-4 py-2"><input name="desc" value={editForm.desc} onChange={handleEditChange} className="px-2 py-1 border rounded w-32" /></td>
                    <td className="px-4 py-2"><input name="price" value={editForm.price} onChange={handleEditChange} className="px-2 py-1 border rounded w-16" /></td>
                    <td className="px-4 py-2"><input name="lessons" value={editForm.lessons} onChange={handleEditChange} className="px-2 py-1 border rounded w-12" /></td>
                    <td className="px-4 py-2"><input name="duration" value={editForm.duration} onChange={handleEditChange} className="px-2 py-1 border rounded w-12" /></td>
                    <td className="px-4 py-2"><input name="level" value={editForm.level} onChange={handleEditChange} className="px-2 py-1 border rounded w-16" /></td>
                    <td className="px-4 py-2">
                      <button className="text-green-600 hover:underline mr-2" onClick={() => handleEditSave(course._id)}>Save</button>
                      <button className="text-gray-500 hover:underline" onClick={handleEditCancel}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2"><img src={course.img} alt={course.title} className="w-16 h-10 object-cover rounded" /></td>
                    <td className="px-4 py-2 font-semibold text-slate-800">{course.title}</td>
                    <td className="px-4 py-2 text-slate-600 max-w-xs truncate">{course.desc}</td>
                    <td className="px-4 py-2 text-cyan-700 font-bold">{course.price}</td>
                    <td className="px-4 py-2">{course.lessons}</td>
                    <td className="px-4 py-2">{course.duration}</td>
                    <td className="px-4 py-2">{course.level}</td>
                    <td className="px-4 py-2">
                      <button className="text-blue-600 hover:underline mr-2" onClick={() => handleEditClick(idx)}>Edit</button>
                      <button className="text-red-500 hover:underline" onClick={() => handleDelete(course._id, idx)}>Delete</button>
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

export default AdminUpskill;
