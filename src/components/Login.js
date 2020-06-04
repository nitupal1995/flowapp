import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {AuthContext} from '../App';
import {setStorageData} from '../Utils/storage';

const useStyles = makeStyles((theme) => ({
  textField: {
    display: 'block',
  },
  width50p: {
    width : '50%',
  }
}));

export default function InputAdornments() {
    const {setLoggedIn} = React.useContext(AuthContext);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    email : ''
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleLoginClicked = (e) => {
    setStorageData({ key : 'loggedIn', val : '1'});
    setLoggedIn(true);
  };
  return (
    <Container maxWidth="sm">
    <div className={classes.root}>
        <h3>Login</h3>
        <FormControl className={clsx(classes.textField)}>
          <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
          <Input
            className={clsx(classes.width50p)}
            id="standard-adornment-email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            className={clsx(classes.width50p)}
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <div style={{margin : '20px 0px'}}>
            <input type="checkbox" id="rem_me" name="rem_me" value={false} />
            <label htmlFor="rem_me">Remember me</label>
        </div>
        <Button variant="contained" color="primary" onClick={handleLoginClicked}>
        Login
      </Button>
    </div>
    </Container>
  );
}
