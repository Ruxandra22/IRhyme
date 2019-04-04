import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import img1 from '../images/EmptyCard280x420.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import 'bootstrap/dist/css/bootstrap.css' ;

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">

        <div className="row">
            <div className="col-xl-3 col-md-12 col-sm-12"></div>
            <div className="col-xl-6 col-md-12 col-sm-12">
              <h2>Välkommen! Create personalised cards with AI generated poems</h2> 
              <p>Here you can create customised cards for different occassions to gift your family and friends. What is more interesting? you can add poems to your cards using our AI poem builder to make it truely special and meaningful gift.</p>
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
          <button className="CreateBtn">Get my Greeting Card!</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
