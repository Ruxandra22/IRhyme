import React, { Component } from "react";
import "./InspirationBoard.css";
import 'bootstrap/dist/css/bootstrap.css' ;
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../config/dbConfig";
import Link from "react-router-dom/es/Link";
import {Row} from "reactstrap";
import Popup from 'reactjs-popup'
import img3 from "../images/Overlay.jpg";
import {poemGenerator} from "../data/Poem";
import Button from "react-bootstrap/Button";

class InspirationBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historyData:"",
            cardsList: [],
            open: false
        }
    }

    componentWillMount() {

        const db = firebase.firestore();
        let docRef = db.collection('cards');

        docRef.get()
            .then(snapshot => {
                let auxList = [];
                snapshot.forEach(doc => {
                    let data = doc.data();
                    if(data.picture !== "" && data.cardText !== "") {
                        auxList = this.state.cardsList;
                        auxList.push(data);
                        this.setState({cardsList: auxList});
                    }
                });
                auxList.length = 0;
            })
            .catch(err => {
                this.setState({cardsList: []});
                console.log('Error getting documents', err);
            });
    }

    render() {

        let pictures;
        if(this.state.cardsList != null) {
            pictures = Array.from(this.state.cardsList).map((card) =>
                    <div className="background_card" style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')',
                        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                        <img className="photo" src={card.picture}/>
                        <Popup
                            trigger={<Button className="button" variant="outline-info"><strong>See Details</strong></Button>}
                            modal
                            closeOnDocumentClick>
                            <span>
                                <div className = "row">
                                    <div className = "col-xl-6 col-md-12">
                                        <img className="figureImg2" src={card.picture} />
                                    </div>
                                    <div className="col-xl-6 col-md-12 mt-3 text">
                                        <div dangerouslySetInnerHTML={{__html: card.cardText}}></div>
                                    </div>
                                </div>
                            </span>
                        </Popup>
                    </div>
            )
        }

        return (
            <div className="HistoryCards">
                <h2 className="historyText"> Inspiration Board</h2>
                <h3 className="history_title"> Here you can see what others created!</h3>
                <Row className="cards_row">
                    {pictures}
                </Row>
            </div>
        );
    }
}

export default InspirationBoard;
