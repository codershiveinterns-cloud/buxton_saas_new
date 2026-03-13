import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { authService } from '../services/authService';
import { Plus, Trash2, Users } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('member');
  const [newPhone, setNewPhone] = useState('');
  const [errorShown, setErrorShown] = useState(false);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get('/team/members', config);
      setTeamMembers(res.data);
    } catch (err) {
      console.error(err);
      if (!errorShown) {
        toast.error('Failed to load team members');
        setErrorShown(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token') || '';
      await authService.inviteTeamMember(
        newEmail,
        newName,
        newRole,
        newPhone,
        token
      );
      toast.success('Team member added successfully');
      setIsModalOpen(false);
      
      // Reset form
      setNewName('');
      setNewEmail('');
      setNewRole('member');
      setNewPhone('');

      fetchMembers();
    } catch (err: any) {
      let errorMessage = err.response?.data?.message || err.message || 'Failed to add member';
      
      if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (err.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this team member? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/team/member/${id}`, config);
      toast.success('Member removed');
      fetchMembers();
    } catch (err) {
      toast.error('Failed to remove member');
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">Team Directory</h1>
              <p className="text-[#6B7280]">Manage members and their roles across the company.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm"
            >
              <Plus className="w-5 h-5" /> Add Member
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-[#6B7280]">Loading...</div>
            ) : teamMembers.length === 0 ? (
              <div className="p-12 text-center text-[#6B7280]">
                <Users className="w-12 h-12 mx-auto text-[#E5DED6] mb-4" />
                No team members found.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#EFE9E1] border-b border-[#E5DED6]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Role</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Contact</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Joined</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED6]">
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="hover:bg-[#F6F3EE] transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937]">{member.name}</p>
                          <p className="text-xs text-[#6B7280]">{member.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFE9E1] text-[#1F2937] border border-[#E5DED6]">
                          {member.role || 'Member'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#1F2937]">
                        {member.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Add Team Member</h2>
            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="e.g. Rachel Adams"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="rachel@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280] hover:bg-[#EFE9E1] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
