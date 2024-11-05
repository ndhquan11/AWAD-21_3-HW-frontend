import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  else {
    return <Navigate to="/" replace />; // Redirect to home page if user is already logged in
  }

  return <Outlet />;
};

export default PrivateRoute; 