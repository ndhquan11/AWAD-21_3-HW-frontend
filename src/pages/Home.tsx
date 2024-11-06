import { useAuthStore } from '../stores/authStore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { token, logout } = useAuthStore.getState();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <p>home</p>
      {token ? (
        <>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
          <Button variant="contained" color="secondary" onClick={handleProfile}>
            Profile
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Home;
