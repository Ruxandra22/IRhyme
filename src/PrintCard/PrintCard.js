import React, { Component } from "react";
import "./PrintCard.css";
import { Link } from "react-router-dom";
import { modelInstance } from '../data/PoetryModel';
import { poemGenerator } from '../data/Poem';
import 'bootstrap/dist/css/bootstrap.css' ;
import Button from "react-bootstrap/Button";
import firebase from "../config/dbConfig";
import ReactToPrint from "react-to-print";
import Row from "react-bootstrap/Row";


class PrintFront extends Component {

    render() {

      return(
          <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12" style={{ backgroundImage: 'url(' + require('../images/A4.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center', backgroundSize: 'contain'}}>
                              <img className="figureImg11" src={this.props.url}/>
                  </div> 
          </div>

        );
    }

}

class PrintInside extends Component {

    render() {

    return(
        <div className="row">
                  <div className="row" style={{ backgroundImage: 'url(' + require('../images/A4.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                      <div className="col-4">       
                              <img className="figureImg12" src={this.props.url}/>
                      </div>
                      <div className="col-3"></div>
                      <div className="col-4 mt-5 ml-5 p-5">  
 
                              <div style={{color: poemGenerator.getPoemColor(),textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemGreeting}}></div>
                              <div style={{color: poemGenerator.getPoemColor(), textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemBody}}></div>
                              <div style={{color: poemGenerator.getPoemColor(),textAlign: "left"}} dangerouslySetInnerHTML={{__html: this.props.poemSign}}></div>     
                      </div>   
                      <div className="col-2"></div>    
                </div>
        </div>

    );
}
}


class PrintCard extends Component {


    constructor(props) {
        super(props);

        this.state = {
          status: 'INITIAL',
          cardId : this.props.match.params.id.split("&")[1],
          cardTheme : this.props.match.params.id.split("&")[0],
          htmlString: poemGenerator.getPoemGreeting(),
          htmlString2: poemGenerator.getPoemBody(),
          htmlString3: poemGenerator.getPoemSignature(),
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
      }


    addCard = e => {
        e.preventDefault();
        const db = firebase.firestore();
        let poemText = poemGenerator.poemGreeting + poemGenerator.poemBody + poemGenerator.poemSignature;
        db.collection("cards").add({
            picture: this.state.cardImage,
            cardText: poemText,
            textColor: poemGenerator.getPoemColor()
        });
        document.getElementById("success").style.display = "block";
        document.getElementById("success").innerHTML = "Saved successfully! You can see it in the Inspiration Board" +
            " if you create another card!";
    };


    render() {

     let printCard = null;

      switch (this.state.status) {
        case 'INITIAL':
          printCard = <em>Loading...</em>
          break;
        case 'LOADED':
            printCard = <div>

                <div className="row mb-3 align-items-end justify-content-end">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <ReactToPrint
                          trigger={() => <Button className="p-3" variant="outline-info">Print card front!</Button>}
                          content={() => this.componentRef1}
                        />
                    </div>   
                    <div className="saveCard">
                        <Button className="save_card p-3" onClick={this.addCard} variant="outline-info">Save to Inspiration Board!</Button>
                        <Link to="/SelectTheme">
                            <Button className="new_card p-3" variant="outline-info">Create a new card!</Button>
                        </Link>
                    </div>
                </div>
                <p id="success"></p>
                <div className="row justify-content-center align-items-center">
                  <PrintFront url={this.state.cardImage}  ref={el1 => (this.componentRef1 = el1)} />
                </div> 
                <div className="row justify-content-center align-items-center">
                    <ReactToPrint
                        trigger={() => <Button className="mt-5 mb-3 p-3" variant="outline-info">Print card inside!</Button>}
                        content={() => this.componentRef2}
                    />
                </div>
                <div className="row justify-content-center align-items-center">
                  <PrintInside url={this.state.cardImage}  poemGreeting={this.state.htmlString}  poemBody={this.state.htmlString2} poemSign={this.state.htmlString3} ref={el2 => (this.componentRef2 = el2)} />
                </div> 

            </div>
          break;
        default:
          printCard = <b>Failed to load data, please try again</b>
          break;
      }
        return(

            <div class="container">
                <div className="PrintCard">
                    <div className="row justify-content-center align-items-center mb-3">
                        <Row>
                            <Link to={{pathname: '/EditCard/' + this.state.cardTheme + "&" + this.state.cardId}}>
                                <Button className="go_back_editor" variant="outline-info">Go back to the editor</Button>
                            </Link>
                        </Row>
                        <h2>Print your card on A4 paper!</h2>
                    </div>
                    {printCard}
                </div>
            </div>
        );
    }
}

export default PrintCard;