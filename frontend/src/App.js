
import './App.css';
import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import WelcomePage from './components/WelcomePage/WelcomePage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';



const AppWrapper = styled.div`
    display: flex;
  flex-direction: column;
  background: linear-gradient(#6cae75 30%, #79bf79 90%);
  min-height: 100vh;
  
  
`;





function App() {
  return (
   
 <Router>
  
      <AppWrapper>
      <Navbar/>
     <Switch>
       <Route exact path={"/"} component={WelcomePage}/>
       <Route exact path={"/login"} component={Login}/>
       <Route exact path={"/register"} component={Register}/>
       <Route exact path={"/dashboard"} component={Footer}/>
     </Switch>
     <Footer/>
     </AppWrapper>
     
 </Router>

  
  );
}

export default App;
