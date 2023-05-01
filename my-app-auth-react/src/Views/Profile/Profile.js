import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Avatar,Grid } from '@material-ui/core';
import { profileUserRequest } from '../../store/actionCreators/profile';

function Profile({ firstName, lastName, email, username, profileUserRequest,id }) {

  useEffect(() => {
    profileUserRequest(id); // Fetch the user's information when the component mounts
    console.log(id);
    console.log(firstName);

  }, []);

  return (
    <div >
      <div>Profile</div>
      <div container spacing={3}>
        <Grid item>
          <Avatar />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item>
            <div variant="h4">{id}</div>

              <div variant="h4">{firstName}</div>
              <div variant="h4">{lastName}</div>
              <div variant="body1">{username}</div>
              <div variant="body1">{email}</div>

            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.profile.FirstName,
  lastName: state.profile.LastName,
  email: state.profile.Email,
  FirstName: state.profile.FirstName,
  Username: state.profile.Username,
  id: state.auth.id

});

const mapDispatchToProps = {
  profileUserRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);