import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';

const SpinnerOverlay = ({ isLoading }) => (
  <Backdrop open={isLoading} style={{ zIndex: 1,}} >
    <CircularProgress color="inherit"  />
  </Backdrop>
);

export default SpinnerOverlay;