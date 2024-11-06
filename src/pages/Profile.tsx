import { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Button } from '@mui/material';
import axiosInstance from '../config/axiosConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  id: string;
  email: string;
  createdAt: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        setProfileData(response.data.user);
      } catch (error) {
        console.log(error);
        toast.error('Unable to load user information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom align="center">
          Personal Information
        </Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {profileData && (
            <>
              <Box mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">
                  {profileData.email}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="subtitle1" color="text.secondary">
                  ID
                </Typography>
                <Typography variant="body1">
                  {profileData.id}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Account Creation Date
                </Typography>
                <Typography variant="body1">
                  {new Date(profileData.createdAt).toLocaleString('en-US')}
                </Typography>
              </Box>
            </>
          )}
        </Paper>
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
