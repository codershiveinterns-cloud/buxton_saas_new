import { useState, useEffect } from 'react';
import AppShell from '../components/AppShell';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  
  // Profile state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Company state (Static / local only for now if no DB field)
  const [companyName, setCompanyName] = useState('ZENTIVORA TECHNOLOGIES LTD');
  const [companyAddress, setCompanyAddress] = useState('28, City Road, London, EC1V 2NX, United Kingdom');

  const isManager = user?.role !== 'member';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setName(parsed.name || '');
      setPhone(parsed.phone || '');
      setEmail(parsed.email || ''); // Read only conceptually
    }
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.put('/users/profile', { name, phone }, config);
      toast.success('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords don't match");
    }
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.put('/users/password', { currentPassword, newPassword }, config);
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  const handleUpdateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Company settings saved globally');
  };

  return (
    <AppShell contentClassName="p-4 sm:p-6">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-[#1F2937] sm:text-3xl">Settings</h1>
            <p className="text-sm text-[#6B7280] sm:text-base">Manage your profile, security, and preferences.</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="rounded-xl border border-[#E5DED6] bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-[#1F2937] mb-4">Profile Information</h2>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Email Address (Cannot change)</label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-4 py-2 border border-[#E5DED6] bg-[#EFE9E1] rounded-lg outline-none text-[#6B7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm">
                  Save Changes
                </button>
              </form>
            </div>

            {/* Password Settings */}
            <div className="rounded-xl border border-[#E5DED6] bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-[#1F2937] mb-4">Security</h2>
              <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm">
                  Update Password
                </button>
              </form>
            </div>

            {/* Company Options - Managers Only */}
            {isManager && (
              <div className="rounded-xl border border-[#E5DED6] bg-white p-4 shadow-sm sm:p-6">
                <h2 className="text-xl font-bold text-[#1F2937] mb-4">Company Details</h2>
                <form onSubmit={handleUpdateCompany} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1F2937] mb-1">HQ Address</label>
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors shadow-sm">
                    Update Company Info
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
    </AppShell>
  );
}
