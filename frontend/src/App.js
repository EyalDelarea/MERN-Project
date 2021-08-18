
import './App.css';
import React from 'react';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import WelcomePage from './components/WelcomePage/WelcomePage';


const AppWrapper = styled.div`
    display: flex;
    background: linear-gradient(#6CAE75 30%, #8BBD8B 90%);
  min-height: 100vh;
  flex-direction: column;
`;





function App() {
  return (
 <Router>
     <AppWrapper>
     <Navbar/>
     <Switch>
       <Route exact path={"/"} component={WelcomePage}/>
       <Route exact path={"/login"} component={Footer}/>
       <Route exact path={"/register"} component={Footer}/>
       <Route exact path={"/dashboard"} component={Footer}/>
     </Switch>
     <Footer/>
   </AppWrapper>
 </Router>
  );
}

export default App;
