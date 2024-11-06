import { useAuthStore } from '../stores/authStore';
import { Button } from '@mui/material';

const Profile = () => {
  const { logout, token } = useAuthStore.getState();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <div>
      <p>profile</p>
      {token ? (
        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      )}
    </div>
  );
};

export default Profile
