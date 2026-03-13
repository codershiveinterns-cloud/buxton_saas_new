import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
  FileText,
  CheckSquare,
  TrendingUp,
  Clock,
  Plus,
  MoreVertical,
} from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: 'Active Projects', value: '0', icon: FileText, trend: '' },
    { label: 'Tasks Completed', value: '0', icon: CheckSquare, trend: '' },
    { label: 'Team Members', value: '0', icon: TrendingUp, trend: '' },
    { label: 'Hours Logged', value: '0', icon: Clock, trend: '' },
  ]);

  const [recentDocuments, setRecentDocuments] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  
  const [user, setUser] = useState<any>(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [loading, setLoading] = useState(true);
  const [errorShown, setErrorShown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        // Fetch Stats
        const statsRes = await api.get('/dashboard/stats', config);
        const data = statsRes.data;
        const fetchedStats = [
          { label: 'Active Projects', value: data.activeProjects.toString(), icon: FileText, trend: '' },
          { label: 'Tasks Completed', value: data.tasksCompleted.toString(), icon: CheckSquare, trend: '' },
          { label: 'Team Members', value: data.teamMembers.toString(), icon: TrendingUp, trend: '' },
          { label: 'Hours Logged', value: data.hoursLogged.toLocaleString(), icon: Clock, trend: '' }
        ];
        setStats(fetchedStats);

        // Fetch Documents
        const docsRes = await api.get('/documents', config);
        setRecentDocuments(docsRes.data);

        // Fetch Tasks
        const taskEndpoint = user?.role !== 'member' ? '/tasks' : '/tasks/my-tasks';
        const tasksRes = await api.get(taskEndpoint, config);
        const activeTasks = tasksRes.data.filter((t: any) => t.status !== 'completed');
        setTasks(activeTasks);

        // Fetch Activities
        const activitiesRes = await api.get('/activities', config);
        const recentActivities = activitiesRes.data.map((a: any) => ({
          user: a.userId?.name || 'Unknown',
          action: a.message.replace(` – by ${a.userId?.name.split(' ')[0]}`, ''), // Strip standard suffix if needed, or just display message directly
          message: a.message,
          time: new Date(a.createdAt).toLocaleString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        }));
        setActivities(recentActivities);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        if (!errorShown) {
          toast.error('Failed to load dashboard data');
          setErrorShown(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskAssignedTo, setTaskAssignedTo] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Document Modal State
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docStatus, setDocStatus] = useState('Draft');
  const [docFile, setDocFile] = useState<File | null>(null);

  // Fetch team members when task modal opens to populate assignment dropdown
  useEffect(() => {
    if (isTaskModalOpen && teamMembers.length === 0) {
      const fetchMembers = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
          const res = await api.get('/team/members', config);
          setTeamMembers(res.data);
          if (res.data.length > 0) setTaskAssignedTo(res.data[0]._id);
        } catch (err) {
          console.error(err);
        }
      };
      fetchMembers();
    }
  }, [isTaskModalOpen, teamMembers.length]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await api.post('/tasks', {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        assignedTo: taskAssignedTo,
        dueDate: taskDueDate
      }, config);
      toast.success('Task created successfully');
      setIsTaskModalOpen(false);
      setTaskTitle('');
      setTaskDescription('');
      
      // Fast refresh
      const taskEndpoint = user?.role !== 'member' ? '/tasks' : '/tasks/my-tasks';
      const tasksRes = await api.get(taskEndpoint, config);
      const activeTasks = tasksRes.data.filter((t: any) => t.status !== 'completed');
      setTasks(activeTasks);
      
      const statsRes = await api.get('/dashboard/stats', config);
      const data = statsRes.data;
      setStats([
        { label: 'Active Projects', value: data.activeProjects.toString(), icon: FileText, trend: '' },
        { label: 'Tasks Completed', value: data.tasksCompleted.toString(), icon: CheckSquare, trend: '' },
        { label: 'Team Members', value: data.teamMembers.toString(), icon: TrendingUp, trend: '' },
        { label: 'Hours Logged', value: data.hoursLogged.toLocaleString(), icon: Clock, trend: '' }
      ]);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleTaskCompletion = async (taskId: string) => {
    try {
      const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      await api.patch(`/tasks/update-status/${taskId}`, { status: 'completed' }, config);
      toast.success('Task marked as completed');
      
      // Fast refresh dashboard data
      const taskEndpoint = user?.role !== 'member' ? '/tasks' : '/tasks/my-tasks';
      const tasksRes = await api.get(taskEndpoint, config);
      setTasks(tasksRes.data.filter((t: any) => t.status !== 'completed'));
      
      const activitiesRes = await api.get('/activities', config);
      setActivities(activitiesRes.data.map((a: any) => ({
        user: a.userId?.name || 'Unknown',
        message: a.message,
        time: new Date(a.createdAt).toLocaleString(undefined, {
          month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      })));
      
      const statsRes = await api.get('/dashboard/stats', config);
      const data = statsRes.data;
      setStats([
        { label: 'Active Projects', value: data.activeProjects.toString(), icon: FileText, trend: '' },
        { label: 'Tasks Completed', value: data.tasksCompleted.toString(), icon: CheckSquare, trend: '' },
        { label: 'Team Members', value: data.teamMembers.toString(), icon: TrendingUp, trend: '' },
        { label: 'Hours Logged', value: data.hoursLogged.toLocaleString(), icon: Clock, trend: '' }
      ]);
    } catch (err: any) {
      toast.error('Failed to update task');
    }
  };

  const handleUploadDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFile) {
      toast.error('Please select a file');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('title', docTitle);
      formData.append('status', docStatus);
      formData.append('file', docFile);

      const config = { 
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        } 
      };
      await api.post('/documents', formData, config);
      toast.success('Document uploaded successfully');
      setIsDocModalOpen(false);
      setDocTitle('');
      setDocFile(null);
      setDocStatus('Draft');

      // Fast refresh
      const configJson = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } };
      const docsRes = await api.get('/documents', configJson);
      setRecentDocuments(docsRes.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload document');
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500 font-medium">
            Loading dashboard...
          </div>
        ) : (
          <div className="p-8">
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1F2937] mb-2">
              Welcome back, {user?.name ? user.name.split(' ')[0] : 'User'}
            </h1>
            <p className="text-[#6B7280]">
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E5DED6] p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-[#EFE9E1] rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1F2937]" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-[#1F2937] mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#6B7280]">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <Link to="/documents" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-lg font-semibold text-[#1F2937] cursor-pointer">
                    Recent Documents
                  </h2>
                </Link>
                <button
                  onClick={() => setIsDocModalOpen(true)} 
                  className="p-2 hover:bg-[#EFE9E1] rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
              <div className="space-y-4">
                {recentDocuments.length === 0 ? (
                  <p className="text-sm text-[#6B7280]">No documents found.</p>
                ) : (
                  recentDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-3 hover:bg-[#EFE9E1] rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#EFE9E1] rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-[#6B7280]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1F2937] text-sm">
                            {doc.title}
                          </p>
                          <p className="text-xs text-[#6B7280]">{new Date(doc.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          doc.status === 'Published'
                            ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                            : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <Link to="/tasks" className="hover:opacity-70 transition-opacity">
                  <h2 className="text-lg font-semibold text-[#1F2937] cursor-pointer">
                    Active Tasks
                  </h2>
                </Link>
                <button 
                  onClick={() => setIsTaskModalOpen(true)}
                  className="p-2 hover:bg-[#EFE9E1] rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>
              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <p className="text-sm text-[#6B7280]">No tasks found.</p>
                ) : (
                  tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-[#EFE9E1] rounded-lg transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={false}
                          onChange={() => handleTaskCompletion(task._id)}
                          className="w-4 h-4 rounded border-[#E5DED6] cursor-pointer text-[#1F2937] focus:ring-[#2563EB]"
                        />
                        <span className="text-sm text-[#1F2937]">{task.title}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          task.priority === 'High'
                            ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
                            : 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[#1F2937]">
                Recent Team Activity
              </h2>
              <button className="p-2 hover:bg-[#EFE9E1] rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-sm text-[#6B7280]">No recent activity.</p>
              ) : (
                activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-[#EFE9E1] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#6B7280] font-semibold text-sm">
                        {activity.user && typeof activity.user === 'string' ? activity.user.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#1F2937]">
                        {activity.message}
                      </p>
                      <p className="text-xs text-[#6B7280]">{activity.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Task Title</label>
                <input type="text" required value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Description</label>
                <textarea value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Priority</label>
                  <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Assign To</label>
                  <select value={taskAssignedTo} onChange={(e) => setTaskAssignedTo(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" required>
                    {teamMembers.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Due Date</label>
                <input type="date" required value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="px-4 py-2 text-[#6B7280] hover:bg-[#EFE9E1] rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-lg">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Upload Document</h2>
            <form onSubmit={handleUploadDocument} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Document Title</label>
                <input type="text" required value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Upload File</label>
                <input type="file" required onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Status</label>
                <select value={docStatus} onChange={(e) => setDocStatus(e.target.value)} className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none">
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" onClick={() => setIsDocModalOpen(false)} className="px-4 py-2 text-[#6B7280] hover:bg-[#EFE9E1] rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#2563EB] text-white hover:bg-[#1D4ED8] rounded-lg">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
