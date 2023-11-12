import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
} from "@material-ui/core";
import Spinner from "../../components/common/spinner/spinner";
import Copyright from "../../components/common/Copyright/Copyright";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import * as yup from "yup";

import { useFormik } from "formik";

import {
  profileUserRequest,
  editProfileUserRequest,
} from "../../store/actionCreators/profile";

function Profile({
  firstName,
  lastName,
  email,
  username,
  birthDate,
  profileUserRequest,
  id,
  isLoading,
}) {
  useEffect(() => {
    console.log(id);
    profileUserRequest(id); // Fetch the user's information when the component mounts
  }, []);

  const validationSchema = yup.object({
    firstName: yup
      .string("Enter your firstName")
      .min(4, "firstName should be of minimum 8 characters length")
      .required("firstName is required"),
    lastName: yup
      .string("Enter your lastName")
      .min(4, "lastName should be of minimum 8 characters length")
      .required("lastName is required"),
    username: yup
      .string("Enter your username")
      .min(4, "username should be of minimum 8 characters length")
      .required("username is required"),
    birthDate: yup
      .string("Enter your birthDate")
      .required("birthDate is required"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      birthDate: birthDate,
      username: username,
      email: email,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Spinner isLoading={isLoading} />

      <CssBaseline />
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="first name :"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />

          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last name :"
            value={lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />

          <TextField
            fullWidth
            id="username"
            name="username"
            label="user name:"
            value={username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />

          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth date:"
            type="date"
            value={birthDate}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
            helperText={formik.touched.birthDate && formik.errors.birthDate}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="email :"
            value={email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <div>
            <Button type="submit">OK</Button>

            <Button color="primary">Annuler</Button>
          </div>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.profile.FirstName,
  lastName: state.profile.LastName,
  email: state.profile.Email,
  username: state.profile.Username,
  birthDate: state.profile.BirthDate,
  isLoading: state.profile.isLoading,
  id: state.auth.id,
});

const mapDispatchToProps = {
  profileUserRequest,
  editProfileUserRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
