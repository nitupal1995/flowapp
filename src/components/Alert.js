
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import React from "react";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function CustomAlert({message,severity,open,handleClose}) {
     return <Snackbar style={{top: '70px', display: 'block'}} open={open} autoHideDuration={3000} onClose={handleClose}>
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>;
  }