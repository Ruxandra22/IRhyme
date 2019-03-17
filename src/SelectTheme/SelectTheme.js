import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SelectTheme.css";

class SelectTheme extends Component {
  render() {
    return (
      <div className="SelectTheme">
        <h2>Select Theme here</h2>
        <Link to="/SelectCard">
          <button>Select Theme</button>
        </Link>
        {/* We pass the model as property to the Sidebar component */}
      </div>
    );
  }
}

export default SelectTheme;
