import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import { modelInstance } from '../data/PoetryModel';
import { poemGenerator } from '../data/Poem';
import 'bootstrap/dist/css/bootstrap.css' ;
import{Row, Col} from 'reactstrap';
import Button from "react-bootstrap/Button";
import firebase from "../config/dbConfig";
import img3 from '../images/Overlay.jpg';
import ReactToPrint from "react-to-print";


class PrintFront extends Component {

    render() {

        return(
            <div className="row">
                <div className="col-12" style={{ backgroundImage: 'url(' + require('../images/A4.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                    <img className="figureImg11" src={this.props.url}/>
                </div>
            </div>

        );
    }

}

class PrintInside extends Component {

    render() {

        let cardBodyText = poemGenerator.getPoemBody();
        return(
            <div className="row">
                  <div className="row" style={{ backgroundImage: 'url(' + require('../images/A4.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                      <div className="col-4">
                              <img className="figureImg12" src={this.props.url}/>
                      </div>
                      <div className="col-3"></div>
                      <div className="col-4 mt-5 ml-5">
                          <div className="col-2">
                          </div>
                          <div className="col-10 pl-5 pr-5 mr-5">
                              <div style={{color: poemGenerator.getPoemColor(),textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemGreeting}}></div>
                              <div style={{color: poemGenerator.getPoemColor(), textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemBody}}></div>
                              <div style={{color: poemGenerator.getPoemColor(),textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemSign}}></div>
                          </div>
                      </div>
                      <div className="col-2 pl-3 pr-3"></div>
                  </div>
            </div>
        );
    }
}


class PrintCard extends Component {


    constructor(props) {
        super(props);

        this.state = {
            cardId : this.props.match.params.id,
            url: null,
            cardImage:"",
            poemGreeting: poemGenerator.getPoemGreeting(),
            poemBody: poemGenerator.getPoemBody(),
            poemSignature: poemGenerator.getPoemSignature(),
        };
    }

    componentDidMount = () => {

        modelInstance.setCardImage(this.state.cardId)

        modelInstance.getCardImage().then(card => {
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


    addCard = e => {
        e.preventDefault();
        const db = firebase.firestore();
        let poemText = poemGenerator.poemGreeting + poemGenerator.poemBody + poemGenerator.poemSignature;
        db.collection("cards").add({
            picture: this.state.cardImage,
            cardText: poemText
        });
    };


    render() {

        console.log("Text: " + this.state.cardTxt);
        return(

            <div class="container">
                <div className="PrintCard">
                    <div className="row justify-content-center align-items-center mb-3">
                        <h2>Print your card on A4 paper!</h2>
                    </div>
                    <div className="row mb-3 align-items-end justify-content-end">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <ReactToPrint
                              trigger={() => <Button className="p-3" variant="outline-info">Print card front!</Button>}
                              content={() => this.componentRef1}
                            />
                        </div>
                        <div className="saveCard">
                            <Button className="p-3" onClick={this.addCard} variant="outline-info">Save to Inspiration Board!</Button>
                        </div>
                    </div>
                    {console.log("Print View", poemGenerator.getPoemColor())}
                    <div className="row justify-content-center align-items-center">
                      <PrintFront url={this.state.cardImage} ref={el1 => (this.componentRef1 = el1)} />
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <PrintInside url={this.state.cardImage}  poemGreeting={this.state.htmlString}  poemBody={this.state.htmlString2} poemSign={this.state.htmlString3} ref={el2 => (this.componentRef2 = el2)} />
                </div>
           </div>
        );
    }

}


export default PrintCard;