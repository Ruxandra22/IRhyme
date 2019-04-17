import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import "../App.css"
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import 'bootstrap/dist/css/bootstrap.css' ;
import 'bootstrap/dist/css/bootstrap.css';
import Button from "react-bootstrap/Button";

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">
        <div className="row">
            <div className="col-xl-3 col-md-12 col-sm-12"></div>
            <div className="col-xl-6 col-md-12 col-sm-12">
              <h2>Create personalised cards with AI generated poems</h2> 
              <p>Here you can create customised cards for different occassions to gift your family and friends.
             What is even more interesting? You can add poems to your cards using our AI poem generator. 
             Every poem is unique. This makes our gift cards truly special.</p>
            </div>
            <div className="col-xl-3 col-md-12 col-sm-12"></div>
        </div>
        
        <div className="row">
            <div className="col-xl-2 col-md-12 col-sm-12">
            </div>
            <div className="col-xl-3 col-md-12 col-sm-12 p-3 mt-5" >
                    <div style={{ marginTop: '-50px' , backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                          <img className="figureImg" src={img3}/>
                    </div>
            </div>  
            <div className="col-xl-5 col-md-12 col-sm-12">
                <img className="img-fluid OpenCardWelcome" src={img2}></img> 
            </div>
            <div className="col-xl-2 col-md-12 col-sm-12">
            </div>
        </div>   
        <Link to="/SelectTheme">
            <Button className="pt-2 pb-2 pr-5 pl-5 mt-4" variant="outline-info">Make Card</Button>
        </Link>
        <div>
            <div>
                <rect width="100" height="200" x="50" y="20" />
            </div>
            <div>
            </div>
        </div>

      </div>
    );
  }
}

export default Welcome;
