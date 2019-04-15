import React, { Component } from "react";
import "./HistoryCards.css";
import 'bootstrap/dist/css/bootstrap.css' ;
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../config/dbConfig";
import Link from "react-router-dom/es/Link";
import {Row} from "reactstrap";
import Popup from 'reactjs-popup'

class HistoryCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historyData:"",
            cardsList: [],
            open: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal (){
        this.setState({ open: true })
    }

    closeModal () {
        this.setState({ open: false })
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
                        <Popup
                            trigger={<img className="photo" src={card.picture}/>}
                            modal
                            closeOnDocumentClick>
                            <span>
                               Text here
                            </span>
                        </Popup>
                        {/*<p>{card.cardText}</p>*/}
                    </div>
            )
        }

        return (
            <div className="HistoryCards">
                <p>These are the last 10 cards made.</p>
                <Row className="cards_row">
                    {pictures}
                </Row>
            </div>
        );
    }
}

export default HistoryCards;
