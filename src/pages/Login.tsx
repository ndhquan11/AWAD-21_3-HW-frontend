import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from '../config/axiosConfig';
import { AxiosError } from 'axios';
import { loginSchema, LoginFormData } from '../schemas/auth.schema';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);

      if (response.data) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success(response.data.message || 'Login successful!');
        navigate('/');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Login failed';
        toast.error(message);
      } else {
        toast.error('An error occurred, please try again later');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Button
          variant="text"
          color="primary"
          fullWidth
          onClick={() => navigate('/register')}
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
