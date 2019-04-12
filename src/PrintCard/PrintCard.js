import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import { modelInstance } from '../data/PoetryModel';
import { poemGenerator } from '../data/Poem';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Row, Col} from 'reactstrap';
import Button from "react-bootstrap/Button";

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
              cardImage: card.src.portrait,
            })
          }).catch(() => {
            this.setState({
              status: 'ERROR',
            })
          })

          // poemGenerator.getWords("love").then(word => {
          //   this.setState({
          //     status: 'LOADED',
          //     poemText: word.word,
          //   })
          // }).catch(() => {
          //   this.setState({
          //     status: 'ERROR',
          //   })
          // })

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
                                <img className="figureImg" src={this.state.cardImage}/>
                    </div>
                </Col>
                <Col>
                  <div className="card">
                      <div className="row no-gutters centered">
                          <div className="col-xl-6 col-md-12 p-1">
                            <figure className="figure">
                              <img className="card-img-right" src={this.state.cardImage}/>
                            </figure>
                          </div>
                          <div className="col-xl-5 col-md-11 mt-3 text">
                              <strong className="mb-2 text-primary">Dear Friend</strong>
                              <p></p>
                              {/* <p> {poemGenerator.generatePharagraph()} </p>
                              <p> {poemGenerator.generatePharagraph()} </p> */}
                              {/* <p> {poemGenerator.generatePharagraph()} </p> */}
                              {/* <p>
                                 {this.state.poemText}
                              </p> */}
                              <p>{poemGenerator.p1()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p3()}</p>
                              <p>{poemGenerator.p4()}</p>
                              
                              <p>{poemGenerator.p1()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p4()}</p>

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
                    <button className="PrintBtn" variant="outline-info">Print Card</button>
                </Link>
            </div>

        );
    }

}


export default PrintCard;