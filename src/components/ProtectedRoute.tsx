import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';
import { isManagerRole } from '../utils/roleUtils';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const location = useLocation();
  const { planSnapshot, isLoading } = usePlan();
  const user = userStr ? JSON.parse(userStr) : null;
  
  if (!token || !userStr) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F3EE] text-[#6B7280]">
        Loading your workspace...
      </div>
    );
  }

  if (!planSnapshot?.plan && isManagerRole(user?.role)) {
    return <Navigate to={`/pricing?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
