import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import FormBuilder from "./components/FormBuilder/FormBuilder";
import Submissions from "./components/Submissions/Submissions";
import Submit from "./components/Submit/Submit";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadReCaptcha } from 'react-recaptcha-google'

class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }
  render() {
    return (
    
        <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/form-builder" component={FormBuilder} />
                <Route path="/submissions" component={Submissions} />
                <Route path="/submit" component={Submit} />
              </Switch> 
        </Router>
    
    );//return
  }//render
}//component

export default App;
