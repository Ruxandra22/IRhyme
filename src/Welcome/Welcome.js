import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import "../App.css"
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import Button from "react-bootstrap/Button";

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">
        <div>
          <h2>Välkommen! Create personalised cards with AI generated poems</h2>
          <p>Here you can create customised cards for different occassions to gift your family and friends. What is more interesting? you can add poems to your cards using our AI poem builder to make it truely special and meaningful gift.</p>
        </div>
        <div>
            <div className="p-3" >
                    <div style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')',
                        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                          <img className="figureImg" src={img3}/>
                    </div>
            </div>

            <div className="Column">
              <div className="Column">
                <img className="OpenCard" src={img2}></img>
              </div>
            </div>
        </div>
        <div>
            <div>
                <rect width="100" height="200" x="50" y="20" />
            </div>
            <div>

            </div>
        </div>
        <Link to="/SelectTheme">
            <Button variant="outline-info">
                Get my Greeting Card!
            </Button>
          {/*<button className="CreateBtn">Get my Greeting Card!</button>*/}
        </Link>
      </div>
    );
  }
}

export default Welcome;
