import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Plus, Trash2, Calendar, MessageSquare, Send, X, CheckCircle, ChevronRight } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Completed'>('Active');
  const [loading, setLoading] = useState(true);
  const [errorShown, setErrorShown] = useState(false);
  
  // Create Task Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newAssignedTo, setNewAssignedTo] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  // View/Chat Task Modal
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // User info
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isManager = user?.role !== 'member';

  // Team dropdown for managers assigning tasks
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint = isManager ? '/tasks' : '/tasks/my-tasks';
      const res = await api.get(endpoint, config);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      if (!errorShown) {
        toast.error('Failed to load tasks');
        setErrorShown(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTeamMembers = async () => {
    if (!isManager) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get('/team/members', config);
      setTeamMembers(res.data);
    } catch (err) {
      console.error('Failed to load team members for dropdown');
    }
  };

  useEffect(() => {
    fetchTasks();
    if (isManager) fetchTeamMembers();
  }, [isManager]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post(
        '/tasks',
        {
          title: newTitle,
          description: newDescription,
          priority: newPriority,
          assignedTo: newAssignedTo, // this is ObjectId now
          dueDate: newDueDate,
          status: 'pending',
        },
        config
      );
      toast.success('Task created');
      setIsCreateModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewPriority('Medium');
      setNewAssignedTo('');
      setNewDueDate('');
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.patch(`/tasks/update-status/${taskId}`, { status: newStatus }, config);
      toast.success(`Task marked as ${newStatus}`);
      if (selectedTask && selectedTask._id === taskId) {
        setSelectedTask({ ...selectedTask, status: newStatus });
      }
      fetchTasks();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Delete this task?')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/tasks/${id}`, config);
      toast.success('Task deleted');
      if (selectedTask?._id === id) setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  const openTaskDiscussion = async (task: any) => {
    setSelectedTask(task);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get(`/tasks/messages/${task._id}`, config);
      setMessages(res.data);
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTask) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.post('/tasks/message', { taskId: selectedTask._id, message: newMessage }, config);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20',
      'in-progress': 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20',
      'completed': 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
    };
    const labels: Record<string, string> = {
      'pending': 'Pending',
      'in-progress': 'In Progress',
      'completed': 'Completed',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors['pending']}`}>
        {labels[status] || 'Pending'}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-[#F6F3EE]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Main Breadcrumb */}
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link to="/dashboard" className="hover:text-gray-800 transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-[#1F2937] font-medium">Tasks</span>
          </div>

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#1F2937] mb-2">{isManager ? 'Tasks' : 'My Tasks'}</h1>
              <p className="text-[#6B7280]">
                {isManager ? 'Track and assign work to your team members.' : 'View your assigned work and discuss details.'}
              </p>
            </div>
            {isManager && (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-5 h-5" /> New Task
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 border-b border-[#E5DED6] mb-6">
            {(['All', 'Active', 'Completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors ${
                  filter === f
                    ? 'border-[#2563EB] text-[#1F2937]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1F2937] hover:border-[#E5DED6]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-[#E5DED6] shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-8 text-center text-[#6B7280]">Loading...</div>
            ) : tasks.length === 0 ? (
              <div className="p-12 text-center text-[#6B7280]">
                <CheckCircle className="w-12 h-12 mx-auto text-[#E5DED6] mb-4" />
                No tasks found.
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-[#EFE9E1] border-b border-[#E5DED6]">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280] w-32">Status</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Task</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Priority</th>
                    <th className="px-6 py-4 text-sm font-semibold text-[#6B7280]">Due Date</th>
                    {isManager && <th className="px-6 py-4 text-sm font-semibold text-[#6B7280] text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5DED6]">
                  {tasks
                    .filter((task) => {
                      if (filter === 'Active') return task.status !== 'completed';
                      if (filter === 'Completed') return task.status === 'completed';
                      return true; // 'All'
                    })
                    .map((task) => (
                    <tr 
                      key={task._id} 
                      onClick={() => openTaskDiscussion(task)}
                      className="hover:bg-[#F6F3EE] transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        {getStatusBadge(task.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {task.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                          <p className={`font-medium text-[#1F2937] ${task.status === 'completed' ? 'line-through text-[#6B7280]' : ''}`}>{task.title}</p>
                        </div>
                        {task.description && <p className="text-xs text-[#6B7280] mt-1 truncate max-w-xs ml-6">{task.description}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            task.priority === 'High' ? 'bg-red-50 text-red-700 ring-1 ring-red-600/20' : task.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' : 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#6B7280]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#A1A1AA]" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      </td>
                      {isManager && (
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={(e) => handleDelete(task._id, e)}
                            className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Task Discussion Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl flex flex-col h-[80vh]">
            <div className="p-6 border-b border-[#E5DED6] flex justify-between items-start">
              <div>
                {/* Modal Breadcrumb */}
                <div className="flex items-center text-sm text-[#6B7280] mb-3">
                  <Link to="/dashboard" className="hover:text-[#1F2937] transition-colors">Dashboard</Link>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <button onClick={() => setSelectedTask(null)} className="hover:text-[#1F2937] transition-colors">Tasks</button>
                  <ChevronRight className="w-4 h-4 mx-2" />
                  <span className="text-[#1F2937] font-medium truncate max-w-[200px]">Task Details</span>
                </div>

                <h2 className="text-2xl font-bold text-[#1F2937]">{selectedTask.title}</h2>
                <p className="text-[#6B7280] mt-1">{selectedTask.description}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div>
                    <span className="text-xs font-semibold text-[#6B7280] uppercase">Update Status:</span>
                    <select
                      value={selectedTask.status}
                      onChange={(e) => handleStatusUpdate(selectedTask._id, e.target.value)}
                      className="ml-2 text-sm border-[#E5DED6] rounded-md shadow-sm focus:border-[#2563EB] focus:ring-[#2563EB] bg-[#F6F3EE] px-2 py-1 text-[#1F2937]"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                className="p-2 text-[#6B7280] hover:text-[#1F2937] rounded-lg hover:bg-[#EFE9E1] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-[#F6F3EE] space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-[#6B7280] py-8">
                  <MessageSquare className="w-12 h-12 mx-auto text-[#E5DED6] mb-4" />
                  No messages yet. Start the discussion!
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.senderId?._id === user?.id ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-[#1F2937]">{msg.senderId?.name || 'Unknown'}</span>
                      <span className="text-[10px] text-[#6B7280]">{new Date(msg.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-2xl max-w-md ${msg.senderId?._id === user?.id ? 'bg-[#2563EB] text-white rounded-tr-none' : 'bg-white border text-[#1F2937] rounded-tl-none border-[#E5DED6]'}`}>
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 border-t border-[#E5DED6] bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && isManager && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-[#1F2937] mb-4">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                  placeholder="e.g. Audit scaffold base"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Description (Optional)</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                  placeholder="Additional details..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Assign To</label>
                  <select
                    required
                    value={newAssignedTo}
                    onChange={(e) => setNewAssignedTo(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                  >
                    <option value="" disabled>Select Member</option>
                    {teamMembers.map(m => (
                      <option key={m._id} value={m._id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-1">Due Date</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-[#E5DED6] rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-[#6B7280] hover:bg-[#EFE9E1] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition-colors"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
