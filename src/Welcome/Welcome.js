import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <Link to="/SelectTheme">
          <button>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
