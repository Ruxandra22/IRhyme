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

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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

    return(
        <div className="row">
                  <div className="row" style={{ backgroundImage: 'url(' + require('../images/A4.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                      <div className="col-6">       
                              <img className="figureImg12" src={this.props.url}/>
                      </div>  
                      <div className="col-6 mt-5">      
                          <strong className="text-primary">Dear Friend</strong>
                              <p className="pr-5">{this.props.cardTxt}</p>
                          <strong className="text-primary">Best Wishes</strong>
                      </div>       
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
          cardTxt:this.props.model.getPoetryTxt()
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
        db.collection("cards").add({
            picture: this.state.cardImage,
            cardText: poemGenerator.poemSignature
        });
    };


      printDocumentFront() {
        const input1 = document.getElementById('divToPrint1');
        html2canvas(input1)
          .then((canvas) => {
            const imgData1 = canvas.toDataURL('image/png');
            const pdf1 = new jsPDF({
              orientation: 'landscape',
              unit: 'mm',
              format: 'a5'
            });
            pdf1.addImage(imgData1, 'JPEG', 0, 0, 210, 148);
            // pdf.output('dataurlnewwindow');
            pdf1.save("download.pdf");
          })
        ;
      }

      printDocumentInside() {
        const input2 = document.getElementById('divToPrint2');
        html2canvas(input2)
          .then((canvas) => {
            const imgData2 = canvas.toDataURL('image/png');
            const pdf2 = new jsPDF({
              orientation: 'landscape',
              unit: 'mm',
              format: 'a5'
            });
            pdf2.addImage(imgData2, 'JPEG', 0, 0, 210, 148);
            // pdf.output('dataurlnewwindow');
            pdf2.save("download.pdf");
          })
        ;
      }


    render() {

          console.log("Text: " + this.state.cardTxt);
        return(
            <div className="PrintCard">
                <div className="PrintCardText">
                  <h2>Print your card on A4 paper!</h2> 
                </div>

            <div class="container">

                <div className="row justify-content-center align-items-center">
                  <PrintFront url={this.state.cardImage} cardTxt={this.state.cardTxt} ref={el1 => (this.componentRef1 = el1)} />
                </div>
                <div className="row justify-content-center align-items-center">   
                  <ReactToPrint
                    trigger={() => <Button className="CreateBtn" variant="outline-info">Print card front!</Button>}
                    content={() => this.componentRef1}
                  />
                </div>

                <div className="row justify-content-center align-items-center">
                  <PrintInside url={this.state.cardImage} cardTxt={this.state.cardTxt} ref={el2 => (this.componentRef2 = el2)} />
                </div>
                <div className="row justify-content-center align-items-center">  
                  <ReactToPrint
                    trigger={() => <Button className="CreateBtn" variant="outline-info">Print card inside!</Button>}
                    content={() => this.componentRef2}
                  />
                </div>

            </div>  

            <div className="saveCard">
                      <Button onClick={this.addCard} variant="outline-info">Save Card</Button>
            </div> 
                    
           </div>

        );
    }

}


export default PrintCard;