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

import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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
                  <h2>Export in PDF and print your card!</h2> 
                </div>

          {/*
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
                              <p></p> */}
                              {/* <p> {poemGenerator.generatePharagraph()} </p>
                              <p> {poemGenerator.generatePharagraph()} </p> */}
                              {/* <p> {poemGenerator.generatePharagraph()} </p> */}
                              {/* <p>
                                 {this.state.poemText}
                              </p> */}
                              {/* <p>{poemGenerator.p1()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p3()}</p>
                              <p>{poemGenerator.p4()}</p>
                              
                              <p>{poemGenerator.p1()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p2()}</p>
                              <p>{poemGenerator.p4()}</p> */}

                              {/* <p className="mx-auto align-self-center">{this.state.cardTxt}</p> */}
                              {/* <strong className="mb-2 text-primary">Best Wishes</strong>
                          </div>
                      </div>
                  </div>
                </Col>
             </Row>    */}
             {/* <Row>
               <p> {poemGenerator.printPoem()}</p>
               <p> {poemGenerator.generatePoem()}</p>
             </Row>   */}

              <div>
                  <div className="mb5">
                    <Button className="CreateBtn" variant="outline-info" onClick={this.printDocumentFront}>Print Front</Button>
                  </div>
                  <div className="saveCard">
                      <Button onClick={this.addCard} variant="outline-info">Save to Inspiration Board!</Button>
                  </div>
                  <div id="divToPrint1" className="" style={{
                    backgroundColor: '#f5f5f5',
                    width: '210mm',
                    minHeight: '148mm',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <div>
                        <img className="figureImg1"   src={this.state.cardImage}/>
                    </div>
                </div>

              </div>

              <div>
                  <div className="mb5">
                    <Button className="CreateBtn" variant="outline-info" onClick={this.printDocumentInside}>Print Inside</Button>
                  </div>
                  <div id="divToPrint2" className="" style={{
                    backgroundColor: '#f5f5f5',
                    width: '210mm',
                    minHeight: '148mm',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <div className = "row">
                          <div className = "col-xl-6 col-md-12">
                            <img className="figureImg2" src={img3} />
                          </div>
                          <div className="col-xl-6 col-md-12 mt-3 text">
                                <strong className="mb-2 text-primary">Dear Friend</strong>

                                <p>{poemGenerator.p1()}</p>
                                <p>{poemGenerator.p2()}</p>
                                <p>{poemGenerator.p3()}</p>
                                <p>{poemGenerator.p4()}</p>

                                <p>{poemGenerator.p1()}</p>
                                <p>{poemGenerator.p2()}</p>
                                <p>{poemGenerator.p2()}</p>
                                <p>{poemGenerator.p4()}</p>

                                <strong className="mb-2 text-primary">Best Wishes</strong>
                            </div>
                      </div>
                </div>

              </div>
            {/*<Button onClick={this.addCard} variant="outline-info">Save Card</Button>*/}
           </div>

        );
    }

}


export default PrintCard;