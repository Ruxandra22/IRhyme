import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import img1 from '../images/EmptyCard280x420.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import 'bootstrap/dist/css/bootstrap.css' ;
import EditCard from "../EditCard/EditCard";

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">
        <div className="Row">
          <h2 className="HeaderTxt">Välkommen! Create personalised cards with AI generated poems</h2> 
          <p className="BodyTxt">Here you can create customised cards for different occassions to gift your family and friends. What is more interesting? you can add poems to your cards using our AI poem builder to make it truely special and meaningful gift.</p>
        </div>
        {/* <div className="Row" style={{width:360, height:420, backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')'}}> */}
        <div className="Row">
            {/* <div className="Column Card">
              <figure>
                      <img src={img3}/>
              </figure>  
            </div>   */}
            <div className="Column">
              <div className="Parent-div">
                <img className="img1" src={img1}/>
                <img className="img3" src={img3}/>
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
          <button className="CreateBtn">Get my Greeting Card!</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
