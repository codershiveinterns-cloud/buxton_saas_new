import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Hammer,
  Folder,
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const isManager = user?.role !== 'member';

  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  const managerItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: FileText, label: 'Private Notes', path: '/notes' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const memberItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: Settings, label: 'Profile', path: '/settings' },
  ];

  const menuItems = isManager ? managerItems : memberItems;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-[#E5DED6] bg-[#EFE9E1] transition-transform duration-300 md:z-30 ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="p-4 border-b border-[#E5DED6]">
        <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Hammer className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-[#1F2937]">BUXTON</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/dashboard' && location.pathname.startsWith(`${item.path}/`));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white text-[#2563EB] shadow-sm'
                  : 'text-[#6B7280] hover:bg-[#F6F3EE] hover:text-[#1F2937]'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[#E5DED6]">
        <Link
          to="/login"
          onClick={onClose}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-[#6B7280] hover:bg-[#F6F3EE] hover:text-[#1F2937] transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log out</span>
        </Link>
      </div>
    </aside>
  );
}
