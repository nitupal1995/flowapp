import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../App';
import {removefromStorage} from '../Utils/storage';

const useStyles = makeStyles((theme) => ({
  flexGrow1 : {
    flexGrow: 1,
  },
}));

export default function Appbar() {
  const classes = useStyles();
    const {loggedIn,setLoggedIn} = React.useContext(AuthContext);
    const handleLogoutClick = () => {
        removefromStorage('loggedIn');
        setLoggedIn(false);
    }
  return (
    <div className={classes.flexGrow1}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.flexGrow1}>
            FLOWAPP
          </Typography>
          {loggedIn ? <Button color="inherit" onClick={handleLogoutClick}>LOGOUT</Button> : ''}
        </Toolbar>
      </AppBar>
    </div>
  );
}
