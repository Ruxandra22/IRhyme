import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";
import img1 from '../images/EmptyCard280x420.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Row, Col} from 'reactstrap';

class Welcome extends Component {

  render() {
    return (
      <div className="Welcome">
        <div>
          <h2>Create personalised cards with AI generated poems</h2> 
          <p>Here you can create customised cards for different occassions to gift your family and friends.
             What is even more interesting? You can add poems to your cards using our AI poem generator. 
             Every poem is unique. This makes our gift cards truly special.</p>
        </div>
        <Row>
            <Col>
              <div style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')', 
                backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                <img className="figureImg" src={img3}/>
              </div>
            </Col>
            <Col>
                <img className="OpenCard" src={img2}></img>
            </Col>
        </Row>
        <Link to="/SelectTheme">
          <button className="CreateBtn">Make Card</button>
        </Link>
      </div>
    );
  }
}

export default Welcome;
