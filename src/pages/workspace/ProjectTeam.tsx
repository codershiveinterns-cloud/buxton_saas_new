import { useState, useEffect } from 'react';
import { Mail, Phone, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ProjectTeam({ projectId }: { projectId: string }) {
  const [team, setTeam] = useState<any[]>([]);
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isManager = user?.role === 'Manager' || user?.role === 'Admin';

  useEffect(() => {
    fetchProjectTeam();
    if (isManager) fetchAllMembers();
  }, [projectId]);

  const fetchProjectTeam = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get(`/projects/${projectId}/team`, config);
      setTeam(res.data);
    } catch (error) {
      toast.error('Failed to load project team data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMembers = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get('/team/members', config);
      setAllMembers(res.data);
    } catch (err) {
      console.error('Failed to load organization members');
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post(`/projects/${projectId}/team`, { userId: selectedUserId }, config);
      toast.success('Team member added to project');
      setIsAddModalOpen(false);
      setSelectedUserId('');
      fetchProjectTeam();
    } catch (err) {
      toast.error('Failed to add team member');
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!window.confirm('Remove this member from the project?')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/projects/${projectId}/team/${userId}`, config);
      toast.success('Team member removed');
      fetchProjectTeam();
    } catch (err) {
      toast.error('Failed to remove team member');
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'Admin': return 'bg-purple-100 text-purple-700 ring-1 ring-purple-600/20';
      case 'Manager': 
      case 'manager': return 'bg-blue-100 text-blue-700 ring-1 ring-blue-600/20';
      case 'Supervisor': return 'bg-green-100 text-green-700 ring-1 ring-green-600/20';
      default: return 'bg-gray-100 text-gray-700 ring-1 ring-gray-600/20';
    }
  };

  // Filter out members that are already in the project team for the dropdown
  const availableMembers = allMembers.filter(m => !team.some(t => t._id === m._id));

  return (
    <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-[#E5DED6] flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#1F2937]">Project Team</h2>
          <p className="text-[#6B7280] text-sm mt-1">People who have access to this project.</p>
        </div>
        {isManager && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="text-center py-8">Loading team...</div>
        ) : team.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280]">No team members assigned to this project yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="flex items-start justify-between space-x-4 p-4 rounded-xl border border-[#E5DED6] hover:bg-[#F6F3EE] transition-colors">
                <div className="flex items-start space-x-4 min-w-0">
                  <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                    {member.name?.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-semibold text-[#1F2937] truncate mr-2">{member.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${getRoleBadgeColor(member.role)}`}>
                        {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-[#6B7280] mb-1">
                      <Mail className="w-3 h-3 mr-1.5 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center text-xs text-[#6B7280]">
                        <Phone className="w-3 h-3 mr-1.5 shrink-0" />
                        <span className="truncate">{member.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                {isManager && (
                  <button onClick={() => handleRemoveMember(member._id)} className="text-[#6B7280] hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-4 p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Add to Project</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Select Member</label>
                <select 
                  required 
                  value={selectedUserId} 
                  onChange={e => setSelectedUserId(e.target.value)} 
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg outline-none focus:border-[#2563EB]"
                >
                  <option value="" disabled>Select a team member</option>
                  {availableMembers.map(m => (
                    <option key={m._id} value={m._id}>{m.name} ({m.role})</option>
                  ))}
                </select>
                {availableMembers.length === 0 && (
                  <p className="text-xs text-amber-600 mt-2">All available members are already in the project.</p>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#E5DED6]">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setSelectedUserId(''); }} className="px-4 py-2 text-[#6B7280]">Cancel</button>
                <button type="submit" disabled={!selectedUserId} className="px-4 py-2 bg-[#2563EB] text-white rounded-lg disabled:opacity-50">Add Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
