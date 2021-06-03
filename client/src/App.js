import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Donor from './components/Donor';
import Patient from './components/Patient';
import Stats from './components/Stats';
// import Team from './components/Team';
import AboutUs from "./components/AboutUs";
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from "react-router-dom"

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/patient"component={Patient} />
        <Route path="/donor" component={Donor} />
        <Route path="/stats" component={Stats} />
        {/* <Route path="/team" component={Team} /> */}
        <Route path="/aboutus" component={AboutUs} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  )
};

export default App;
