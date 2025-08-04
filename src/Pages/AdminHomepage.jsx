import React, { useState } from 'react';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminUpskill from '../Components/Admin/ContentEdit/AdminUpskill';
import AdminInquiry from '../Components/Admin/Inquiry/AdminInquiry';
import AdmnInfluncerReq from '../Components/Admin/AdmnInfluncerReq';
import AdminBlog from '../Components/Admin/AdminBlog';
import BannerEdit from '../Components/Admin/BannerEdit';
import AdminHireMe from '../Components/Admin/AdminHireMe';

const AdminHomepage = () => {
  const [selected, setSelected] = useState('');

  const renderContent = () => {
    if (selected === 'UpSkill') return <AdminUpskill />;
    if (selected === 'Inquiry') return <AdminInquiry />;
    if (selected === 'Influencer Request') return <AdmnInfluncerReq />;
    if (selected === 'HireMeRequest') return <AdminHireMe />;
    if (selected === 'Blog') return <AdminBlog />;
    if (selected === 'Homepage') return <BannerEdit />;
    return (
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome, Admin!</h1>
        <p className="text-slate-600">
          Select an option from the sidebar to manage your website content and settings.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow">
        <AdminSidebar onSelect={setSelected} />
      </aside>

      <main className="ml-64 flex-1 p-8 overflow-y-auto" style={{ maxHeight: '100vh' }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminHomepage;
