import { useState, useEffect } from 'react';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Placeholder components for tabs
import ProjectTasks from './workspace/ProjectTasks';
import ProjectDocuments from './workspace/ProjectDocuments';
import ProjectTeam from './workspace/ProjectTeam';
import ProjectTimeline from './workspace/ProjectTimeline';

export default function ProjectWorkspace() {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setProject(response.data.project);
      }
    } catch (error) {
      toast.error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { name: 'Tasks', path: `/projects/${id}/tasks`, replace: 'tasks' },
    { name: 'Documents', path: `/projects/${id}/documents`, replace: 'documents' },
    { name: 'Team', path: `/projects/${id}/team`, replace: 'team' },
    { name: 'Timeline', path: `/projects/${id}/timeline`, replace: 'timeline' },
  ];

  const currentTab = location.pathname.split('/').pop();
  const isActiveTab = (tabPath: string) => {
    return location.pathname.includes(tabPath.split('/').pop() || '');
  };

  if (loading) return <div className="flex justify-center items-center h-screen bg-[#F6F3EE]">Loading Project...</div>;
  if (!project) return <div className="flex justify-center items-center h-screen bg-[#F6F3EE]">Project Not Found</div>;

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto">
          {/* Project Header */}
          <div className="bg-white border-b border-[#E5DED6] px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-[#1F2937]">{project.name}</h1>
                <p className="text-[#6B7280]">{project.clientName} - {project.location}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {project.status}
              </span>
            </div>
            
            {/* Tabs Navigation */}
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    isActiveTab(tab.path) || (currentTab === id && tab.name === 'Tasks') // Default to tasks
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-[#E5DED6]'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Tab Content Area */}
          <div className="p-6">
            <Routes>
              <Route path="/" element={<ProjectTasks projectId={id || ''} />} />
              <Route path="tasks" element={<ProjectTasks projectId={id || ''} />} />
              <Route path="documents" element={<ProjectDocuments projectId={id || ''} />} />
              <Route path="team" element={<ProjectTeam projectId={id || ''} />} />
              <Route path="timeline" element={<ProjectTimeline projectId={id || ''} />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
