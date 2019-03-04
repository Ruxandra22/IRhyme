import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/PoetryModel";
import SelectTheme from "./SelectTheme/SelectTheme";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/search"
            render={() => <SelectTheme model={modelInstance} />}
          />
        </header>
      </div>
    );
  }
}

export default App;
