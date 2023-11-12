import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Container, CssBaseline, Box, Typography, TextField } from '@material-ui/core';
import { profileUserRequest } from '../../store/actionCreators/profile';
import Spinner from '../../components/common/spinner/spinner';
import Copyright from '../../components/common/Copyright/Copyright';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';


function Profile({ firstName,
  lastName, email, username, birthDate, profileUserRequest, id, isLoading }) {

  const history = useHistory();

  useEffect(() => {
    profileUserRequest(id); // Fetch the user's information when the component mounts
    console.log(id);
  }, []);


  const ProfilEdit = () => {
    console.log('ccc');

    history.push('/ProfilEdit');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Spinner isLoading={isLoading} />

      <CssBaseline />
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
          Profile
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="first name :"
            value={firstName} disabled />

          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last name :"
            value={lastName} disabled />

          <TextField
            fullWidth
            id="username"
            name="username"
            label="user name:"
            value={username} disabled />

          <TextField
            fullWidth
            id="birthDate"
            name="birthDate"
            label="Birth date:"
            type="date"
            value={birthDate} InputLabelProps={{
              shrink: true,
            }} disabled />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="email :"
            value={email} disabled />


        </Box>

      </Box>
      <Button variant="contained" color="primary" onClick={ProfilEdit}>
        Update
      </Button>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>);
}

const mapStateToProps = (state) => ({
  firstName: state.profile.FirstName,
  lastName: state.profile.LastName,
  email: state.profile.Email,
  username: state.profile.Username,
  birthDate: state.profile.BirthDate,
  isLoading: state.profile.isLoading,
  id: state.auth.id

});

const mapDispatchToProps = {
  profileUserRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);