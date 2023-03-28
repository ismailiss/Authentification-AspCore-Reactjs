import React, { useState, useEffect } from 'react';
import './Signin.css'
import PropTypes from 'prop-types';
import { Button, TextField, CssBaseline, Avatar, FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/common/Copyright/Copyright';

import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function Signin() {
    const history = useHistory();
    const [emailExistsError, setEmailExistsError] = useState(false);

    const toLogin = () => {
        history.push('/Login');
    };
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        username: yup
            .string('Enter your username')
            .required('Username is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),


    });

    const formik = useFormik({
        initialValues: {
            email: 'ismailelaissaoui@gmail.com',
            username: 'ismailelaissaoui',
            password: 'asx@6798I',
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            actions.setStatus(undefined);

            postData('https://localhost:5001/api/Auth/Inscription',
                { "Email": values.email, "Username": values.username, "Password": values.password })
                .then(data => {
                    console.log(data); // Success! Data is returned in JSON format.
                    if (data.status === 200) {
                        history.push('/Login');

                        setEmailExistsError(false);

                    }
                    else setEmailExistsError(true);



                })
                .catch(error => {
                    console.error('Error:', error);
                });

        },
    });

    /*Get data from api*/
    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response;
    }

    const theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <div>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}

                            />
                            {emailExistsError && (
                                <div style={{ color: 'red' }}>
                                    This email address is already in use.
                                </div>
                            )}
                        </div>
                        <div>

                            <TextField
                                fullWidth
                                id="username"
                                name="username"
                                label="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
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


                        </div>

                        <div>
                            <Button type="submit">OK</Button>

                            <Button color="primary" onClick={toLogin}>Login</Button>

                        </div>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

