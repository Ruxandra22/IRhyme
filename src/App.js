import React, { Component } from "react";
import {Link, Route} from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/PoetryModel";
import SelectTheme from "./SelectTheme/SelectTheme";
import SelectCard from "./SelectCard/SelectCard";
import EditCard from "./EditCard/EditCard";
import PrintCard from "./PrintCard/PrintCard";
import "./App.css";
import logoImg from "./images/logo.png"
import Nav from "react-bootstrap/Nav";
import HistoryCards from "./History/HistoryCards";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand">
                  <Link to="/">
                    <img src={logoImg} width={110} className="logo d-inline-block align-top" alt=""/>
                  </Link>
              </a>
              <a>
                  <div className="history">
                    <Link to="/history">Get inspired!</Link>
                  </div>
              </a>
          </nav>
          <Route exact path="/" component={Welcome} />
          <Route
            path="/SelectTheme"
            render={() => <SelectTheme model={modelInstance} />}
          />
          <Route path="/SelectCard/:id" render={(props) => <SelectCard {...props} model={modelInstance}/>}/>

          <Route
              path="/EditCard/:id"
              render={(props) => <EditCard {...props} model={modelInstance} />}
          />
          <Route path="/PrintCard/:id" render={(props) => <PrintCard {...props} model={modelInstance}/>}/>

          <Route exact path="/history" component={HistoryCards} />
      </div>
    );
  }
}

export default App;
