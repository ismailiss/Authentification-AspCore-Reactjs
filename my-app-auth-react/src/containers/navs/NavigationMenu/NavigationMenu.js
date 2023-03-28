import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Deconnexion from '../../../Views/Deconnexion/Deconnexion';
import useToken from '../../../helpers/useToken';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavigationBar = ({token,setToken}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button component={Link} to="/" color="inherit">Home</Button>
          <Button component={Link} to="/dashboard" color="inherit">dashboard</Button>
          <Button component={Link} to="/preferences" color="inherit">Preferences</Button>

          {token && (
            <>
              <Button component={Link} to="/profile" color="inherit">Profile</Button>
              <Deconnexion setToken={setToken}  ></Deconnexion>
            </>
          )}
          {!token && (
            <>
              <Button component={Link} to="/login" color="inherit">Login</Button>
                <Button component={Link} to="/Signin" color="inherit">Signin</Button>
              </>
          )}
            </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
