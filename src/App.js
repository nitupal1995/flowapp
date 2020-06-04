import React from 'react';
import { 
  BrowserRouter as Router,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import {getfromStorage} from './Utils/storage';
import Appbar from './components/Appbar';
import './App.css';

export const AuthContext = React.createContext();

function App() {
  return <Router>
    <Authprovider>
      <Appbar/>
      <Dashboard />
      </Authprovider>
    </Router>;
}

function Authprovider({children}) {
  const [loggedIn,setLoggedIn] = React.useState(getfromStorage('loggedIn'));
  const value = {
    loggedIn,
    setLoggedIn
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default App;
