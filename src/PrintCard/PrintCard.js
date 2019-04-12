import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import img1 from '../images/EmptyCard280x420.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import { modelInstance } from '../data/PoetryModel';
import { poemGenerator } from '../data/Poem';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Row, Col} from 'reactstrap';

class PrintCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          cardId : this.props.match.params.id,
          url: null,
          cardTxt:this.props.model.getPoetryTxt()
        };
      }
  
      componentDidMount = () => {

        modelInstance.getCardImage(this.props.match.params.id).then(card => {
            this.setState({
              status: 'LOADED',
              url: card.src.portrait,
            })
          }).catch(() => {
            this.setState({
              status: 'ERROR',
            })
          })

      }   

    render() {

        return(
            <div className="PrintCard">
                <div className="PrintCardText">
                  <h2>Export in PDF and print your card!</h2> 
                </div>


            <Row>
                <Col>
                    <div style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                                <img className="figureImg" src={this.state.url}/>
                    </div>
                </Col>
                <Col>
                  <div className="card">
                      <div className="row no-gutters centered">
                          <div className="col-xl-6 col-md-12 p-1">
                            <figure className="figure">
                              <img className="card-img-right" src={this.state.url}/>
                            </figure>
                          </div>
                          <div className="col-xl-5 col-md-11 mt-3 text">
                              <strong className="mb-2 text-primary">Dear Friend</strong>
                              <p></p>
                              <p> {poemGenerator.generatePharagraph()} </p>
                              <p> {poemGenerator.generatePharagraph()} </p>
                              <p> {poemGenerator.generatePharagraph()} </p>
                              <p></p>
                              {/* <p className="mx-auto align-self-center">{this.state.cardTxt}</p> */}
                              <strong className="mb-2 text-primary">Best Wishes</strong>
                          </div>
                      </div>
                  </div>
                </Col>
             </Row>   
             {/* <Row>
               <p> {poemGenerator.printPoem()}</p>
               <p> {poemGenerator.generatePoem()}</p>
             </Row>   */}

                <Link to="/">
                    <button className="PrintBtn">Print my Card!</button>
                </Link>
            </div>

        );
    }

}

export default PrintCard;