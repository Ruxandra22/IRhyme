import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import EditCard from "../EditCard/EditCard";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <Link to="/search">
          <button>Start planning</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
