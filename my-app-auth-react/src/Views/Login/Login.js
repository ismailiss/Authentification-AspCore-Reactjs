import React, { useEffect } from 'react';

import { Button, TextField, CssBaseline, Avatar, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Copyright from '../../components/common/Copyright/Copyright';
import Spinner from '../../components/common/spinner/spinner';

import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { loginUserRequest } from '../../store/actionCreators/auth';
import { connect } from 'react-redux';


function Login({ loginUserRequest, msg, isLoading, error, isAuthenticated }) {

  const history = useHistory();

  const toSignIn = () => {
    history.push('/Signin');
  };
  useEffect(() => {
    if (isAuthenticated)
      history.push('/Profile');
  }, [isAuthenticated]);


  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      loginUserRequest(values.email, values.password);
    },
  });
  /*Get data from api*/


  return (

    <Container component="main" maxWidth="xs">

      <Spinner isLoading={isLoading} />

      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In {msg}

        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Button href="#" variant="body2" onClick={toSignIn}>
                {"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
const mapStateToProps = state => ({
  error: state.auth.error,
  msg: state.auth.msg,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {
  loginUserRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);


