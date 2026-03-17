import { useEffect, useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import AppShell from '../components/AppShell';
import { authService } from '../services/authService';
import api from '../lib/api';

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
    <AppShell>
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-[#1F2937] sm:text-3xl">Team Directory</h1>
          <p className="text-sm text-[#6B7280] sm:text-base">Manage members and their roles across the company.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#1D4ED8] sm:w-auto"
        >
          <Plus className="w-5 h-5" /> Add Member
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E5DED6] bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-[#6B7280]">Loading...</div>
        ) : teamMembers.length === 0 ? (
          <div className="p-12 text-center text-[#6B7280]">
            <Users className="mx-auto mb-4 h-12 w-12 text-[#E5DED6]" />
            No team members found.
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="border-b border-[#E5DED6] bg-[#EFE9E1]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Name</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Role</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Contact</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Joined</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#6B7280]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED6]">
                  {teamMembers.map((member) => (
                    <tr key={member._id} className="transition-colors hover:bg-[#F6F3EE]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[#1F2937]">{member.name}</p>
                            <p className="text-xs text-[#6B7280]">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full border border-[#E5DED6] bg-[#EFE9E1] px-2.5 py-0.5 text-xs font-medium text-[#1F2937]">
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
                          className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 p-4 md:hidden">
              {teamMembers.map((member) => (
                <div key={member._id} className="rounded-xl border border-[#E5DED6] p-4">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1F2937]">{member.name}</p>
                        <p className="text-xs text-[#6B7280]">{member.email}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-[#E5DED6] bg-[#EFE9E1] px-2.5 py-0.5 text-xs font-medium text-[#1F2937]">
                      {member.role || 'Member'}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-[#6B7280]">
                    <p>Phone: {member.phone || 'N/A'}</p>
                    <p>Joined: {new Date(member.createdAt).toLocaleDateString()}</p>
                  </div>

                  <button
                    onClick={() => handleDelete(member._id)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold text-[#1F2937]">Add Team Member</h2>
            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1F2937]">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full rounded-lg border border-[#E5DED6] px-4 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="e.g. Rachel Adams"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[#1F2937]">Email Address</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#E5DED6] px-4 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]"
                  placeholder="rachel@example.com"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#1F2937]">Phone Number</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full rounded-lg border border-[#E5DED6] px-4 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#1F2937]">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-lg border border-[#E5DED6] px-4 py-2 outline-none focus:ring-2 focus:ring-[#2563EB]"
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-[#6B7280] transition-colors hover:bg-[#EFE9E1]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#2563EB] px-4 py-2 text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
