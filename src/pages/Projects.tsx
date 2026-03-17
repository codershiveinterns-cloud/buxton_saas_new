import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Plus, Folder } from 'lucide-react';
import api from '../lib/api';
import { toast } from 'react-hot-toast';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    location: '',
    startDate: '',
    endDate: '',
    status: 'Planning'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setProjects(response.data.projects);
      }
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        toast.success('Project created successfully');
        setIsModalOpen(false);
        fetchProjects();
        setFormData({ name: '', clientName: '', location: '', startDate: '', endDate: '', status: 'Planning' });
      }
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1F2937]">Projects</h1>
              <p className="text-[#6B7280]">Manage all construction and scaffolding projects</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Project</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8"><p>Loading...</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any) => (
                <div 
                  key={project._id} 
                  className="bg-white rounded-xl shadow-sm border border-[#E5DED6] p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-[#EFE9E1] p-3 rounded-lg">
                      <Folder className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F2937] mb-1">{project.name}</h3>
                  <p className="text-sm text-[#6B7280] mb-4">{project.clientName} - {project.location}</p>
                  
                  <div className="flex justify-between text-sm text-[#6B7280] pt-4 border-t border-[#E5DED6]">
                    <span>{new Date(project.startDate).toLocaleDateString()}</span>
                    <span>to</span>
                    <span>{new Date(project.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              
              {projects.length === 0 && (
                <div className="col-span-full py-12 text-center text-[#6B7280]">
                  No projects found. Create one to get started!
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="p-6 border-b border-[#E5DED6] flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#1F2937]">Create New Project</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-[#6B7280] hover:text-[#1F2937]"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="e.g. Downtown Scaffold Tower"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="Client or Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  placeholder="Site Location"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 bg-white border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              
              <div className="pt-4 flex justify-end space-x-3 border-t border-[#E5DED6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280] font-medium hover:text-[#1F2937]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white font-medium rounded-lg hover:bg-[#1D4ED8]"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
