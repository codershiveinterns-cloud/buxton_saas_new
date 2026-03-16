import { useState, useEffect } from 'react';
import { Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../lib/api';

export default function ProjectTeam({ projectId }: { projectId: string }) {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now we get all team members, or eventually filter who has access to project
    // Currently, any team member mapped to the manager can see projects if assigned or permitted
    fetchTeamInfo();
  }, [projectId]);

  const fetchTeamInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // In a real app we might have a specific API: /projects/:id/team
      // For this spec, we will fetch standard team members that belong to manager's org and have roles
      const res = await api.get('/team/members', config);
      setTeam(res.data);
    } catch (error) {
      toast.error('Failed to load team data');
    } finally {
      setLoading(false);
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

  return (
    <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm overflow-hidden h-full">
      <div className="p-6 border-b border-[#E5DED6]">
        <h2 className="text-xl font-bold text-[#1F2937]">Project Team</h2>
        <p className="text-[#6B7280] text-sm mt-1">People who have access to this project.</p>
      </div>
      <div className="p-6">
        {loading ? (
          <div className="text-center py-8">Loading team...</div>
        ) : team.length === 0 ? (
          <div className="text-center py-12 text-[#6B7280]">No team members found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="flex items-start space-x-4 p-4 rounded-xl border border-[#E5DED6] hover:bg-[#F6F3EE] transition-colors">
                <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {member.name?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-semibold text-[#1F2937] truncate">{member.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getRoleBadgeColor(member.role)}`}>
                      {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-[#6B7280] mb-1">
                    <Mail className="w-3 h-3 mr-1.5" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center text-xs text-[#6B7280]">
                      <Phone className="w-3 h-3 mr-1.5" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
