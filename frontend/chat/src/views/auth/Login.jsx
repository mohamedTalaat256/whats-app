import { Helmet } from 'react-helmet-async';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {  useState } from 'react';
import { LoadingButton } from '@mui/lab';
import {  Container, Typography, Stack, IconButton, InputAdornment, TextField, Collapse, Alert, Card } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStateContext } from '../../context/ContextProvider';
import LoginValidationSchema from '../../validation/LoginValidationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/services/auth.service';
// ----------------------------------------------------------------------


export default function LoginPage() {
  const { setUser, setToken, setRefreshToken,setCartTotal, setCartCount } = useStateContext();

  const [openResponseAlert, setOpenResponseAlert] = useState(false);


  const data = useSelector((state) => state.login.data);
  const signingIn = useSelector(state => state.login.loading);
  const error = useSelector(state => state.login.error);
  const dispatch = useDispatch();

  const onSubmit = formData => {

    dispatch(login(formData));
    
    if(data.success){
      setUser(data.data.userData);
      setToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      setCartTotal(0);
      setCartCount(Number(data.data.CartCount));
    }else{
      setOpenResponseAlert(true);
    }
  };


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(LoginValidationSchema)
  });
  const [showPassword, setShowPassword] = useState(false);


  return (
    <>
      <Helmet>
        <title> Login | User </title>
      </Helmet>

      <Container maxWidth="sm" sx={{ marginTop: 20 }}>
        <Card sx={{ padding: 5 }}>
          <Stack spacing={3}>
            <Collapse in={openResponseAlert}>
              <Alert
                color="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="error"
                    size="small"
                    onClick={() => {
                      setOpenResponseAlert(false);
                    }}
                  >
                    x
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {error}
              </Alert>
            </Collapse>



            <Typography variant="h4" gutterBottom >
              Sign in
            </Typography>

            <TextField
              id="username"
              name="username"
              label="username"
              margin="dense"
              {...register('username')}
              error={errors.username}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.username?.message}
            </Typography>

            <TextField
              id="password"
              name="password"
              label="password"
              margin="dense"
              {...register('password')}
              error={errors.password}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography variant="inherit" color="textSecondary">
              {errors.password?.message}
            </Typography>
          </Stack>

          {
            signingIn ?
             
              <LoadingButton sx={{ marginTop: 2 }} fullWidth size="large" variant="contained" >
              Siningin...
            </LoadingButton>
              :
              <LoadingButton sx={{ marginTop: 2 }} fullWidth size="large" variant="contained" onClick={handleSubmit(onSubmit)}>
                Login
              </LoadingButton>
          }

        </Card>
      </Container>
    </>
  );
}
