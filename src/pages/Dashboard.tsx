import Sidebar from '../components/Sidebar';
import {
  FileText,
  CheckSquare,
  TrendingUp,
  Clock,
  Plus,
  MoreVertical,
} from 'lucide-react';

export default function Dashboard() {
  const recentDocuments = [
    {
      name: 'Safety Inspection Report - Site A',
      date: 'March 5, 2026',
      status: 'Draft',
    },
    {
      name: 'Project Timeline Q1 2026',
      date: 'March 4, 2026',
      status: 'Published',
    },
    {
      name: 'Equipment Maintenance Log',
      date: 'March 3, 2026',
      status: 'Published',
    },
    {
      name: 'Team Training Materials',
      date: 'March 2, 2026',
      status: 'Draft',
    },
  ];

  const tasks = [
    { name: 'Complete safety audit for Building C', priority: 'High' },
    { name: 'Review scaffolding plans for new project', priority: 'Medium' },
    { name: 'Update team certifications', priority: 'High' },
    { name: 'Schedule equipment maintenance', priority: 'Low' },
  ];

  const activities = [
    { user: 'Sarah Thompson', action: 'completed task "Safety Training"', time: '2 hours ago' },
    { user: 'James Mitchell', action: 'uploaded document "Site Plan B"', time: '4 hours ago' },
    { user: 'Michael Chen', action: 'created new project "Tower Block"', time: '6 hours ago' },
    { user: 'Emily Davis', action: 'commented on "Q1 Report"', time: '1 day ago' },
  ];

  const stats = [
    { label: 'Active Projects', value: '24', icon: FileText, trend: '+12%' },
    { label: 'Tasks Completed', value: '156', icon: CheckSquare, trend: '+8%' },
    { label: 'Team Members', value: '18', icon: TrendingUp, trend: '+2' },
    { label: 'Hours Logged', value: '1,240', icon: Clock, trend: '+15%' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, John
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your projects today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Documents
                </h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Tasks
                </h2>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-900">{task.name}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-700'
                          : task.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-semibold text-sm">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
