import { useAuthStore } from '../stores/authStore';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
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
      <Container maxWidth="sm">
        <Box mt={8}>
          <Typography variant="h4" gutterBottom align="center">
            Home
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
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
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
