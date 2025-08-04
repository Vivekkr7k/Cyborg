import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { motion } from 'framer-motion'
import Footer from '../Components/Foooter';
import { API_ENDPOINTS } from '../utils/GlobalAPI';

const Contactus = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit form');
      }
      setSuccess('Thank you! Your form has been submitted.');
      setForm({ name: '', phone: '', email: '', service: '' });
    } catch (err) {
      setError(err.message || 'Error submitting form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="contactus-spa-bg" style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ef 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        margin: 0
      }}>
        <div className="contactus-spa-container" style={{
          display: 'flex',
          width: '100%',
          maxWidth: '980px',
          minHeight: '600px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '32px',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Left Image/Visual Section */}
          <div className="contactus-spa-left" style={{
            flex: 1,
            background: `url('https://wallpaperaccess.com/full/2115213.jpg') center/cover no-repeat`,
            minHeight: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.45)',
              borderRadius: '0 32px 32px 0',
              padding: '2.5rem 2.5rem',
              color: '#2d3748',
              textAlign: 'center',
              maxWidth: '80%',
              boxShadow: '0 4px 30px rgba(0,0,0,0.05)',
              backdropFilter: 'blur(6px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <h1 style={{ fontSize: '2.3rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.2rem', color: '#2d3748' }}>Contact Us</h1>
              <p style={{ fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.5, color: '#4a5568' }}>Fill the form to make your dream come true!<br/>We are here to help you grow your business with the best digital solutions.</p>
            </div>
          </div>
          {/* Right Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="contactus-spa-right"
            style={{
              flex: 1,
              minHeight: '600px',
              background: 'rgba(255,255,255,0.98)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem 2rem',
              position: 'relative',
            }}
          >
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '370px', zIndex: 2 }}>
              {success && <div style={{ color: '#059669', fontWeight: 500, marginBottom: '1rem', textAlign: 'center' }}>{success}</div>}
              {error && <div style={{ color: '#dc2626', fontWeight: 500, marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: '0.3rem', display: 'block' }}>Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f4f7fa', fontSize: '1rem', outline: 'none', marginTop: '0.2rem', transition: 'border 0.2s' }} />
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: '0.3rem', display: 'block' }}>Phone Number</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f4f7fa', fontSize: '1rem', outline: 'none', marginTop: '0.2rem', transition: 'border 0.2s' }} />
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: '0.3rem', display: 'block' }}>Email ID</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f4f7fa', fontSize: '1rem', outline: 'none', marginTop: '0.2rem', transition: 'border 0.2s' }} />
              </div>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ fontWeight: 500, color: '#222', marginBottom: '0.3rem', display: 'block' }}>Service</label>
                <select name="service" value={form.service} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f4f7fa', fontSize: '1rem', outline: 'none', marginTop: '0.2rem', transition: 'border 0.2s' }}>
                  <option value="">Select a service</option>
                  <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Facebook Ads">Facebook Ads</option>
                  <option value="YouTube Ads">YouTube Ads</option>
                  <option value="SMS Marketing">SMS Marketing</option>
                  <option value="Email Marketing">Email Marketing</option>
                  <option value="Content Marketing">Content Marketing</option>
                  <option value="WhatsApp Marketing">WhatsApp Marketing</option>
                  <option value="E-commerce Marketing">E-commerce Marketing</option>
                  <option value="UI/UX & Graphic Design">UI/UX & Graphic Design</option>
                  <option value="Social Media Development">Social Media Development</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Software Development">Other</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.04, backgroundColor: '#1741a6' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                style={{ width: '100%', padding: '0.9rem', background: loading ? '#a5b4fc' : '#2563eb', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '1.1rem', boxShadow: '0 2px 8px #2563eb22', letterSpacing: '1px', transition: 'background 0.2s', cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1100px) {
          .contactus-spa-container {
            max-width: 98vw;
          }
        }
        @media (max-width: 900px) {
          .contactus-spa-container {
            flex-direction: column;
            min-height: unset;
            border-radius: 24px !important;
          }
          .contactus-spa-left, .contactus-spa-right {
            min-height: 320px !important;
            border-radius: 0 !important;
            border-top-left-radius: 24px !important;
            border-top-right-radius: 24px !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .contactus-spa-container {
            flex-direction: column;
            padding: 0.5rem !important;
            min-width: unset !important;
          }
          .contactus-spa-left, .contactus-spa-right {
            padding: 1.2rem 0.5rem !important;
            min-height: 180px !important;
          }
          .contactus-spa-left h1 {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
       <>
       <Footer/>
    </>
    </>
   
  )
}

export default Contactus

