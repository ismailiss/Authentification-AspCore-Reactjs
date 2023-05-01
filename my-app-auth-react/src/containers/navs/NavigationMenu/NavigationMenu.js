import React from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { Link } from 'react-router-dom';


import Deconnexion from '../../../Views/Deconnexion/Deconnexion';

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

const NavigationBar = ({ isAuthenticated, msg }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/dashboard" color="inherit">dashboard</Button>
            <Button component={Link} to="/preferences" color="inherit">Preferences</Button>
          </Typography> 


          {!isAuthenticated && (
              <div ><Button component={Link} to="/login" color="inherit">Login</Button>
              <Button component={Link} to="/Signin" color="inherit">Signin</Button>
              </div>
            )
          }

          {isAuthenticated && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile">Profile</MenuItem>
                <Deconnexion className="ml-auto" ></Deconnexion>
              </Menu>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  msg: state.auth.msg

});


export default connect(mapStateToProps)(NavigationBar);
