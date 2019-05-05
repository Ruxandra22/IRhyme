import React, { Component } from "react";
import "./InspirationBoard.css";
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../config/dbConfig";
import {Row} from "reactstrap";
import Popup from 'reactjs-popup'
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/es/Link";


class InspirationBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardsList: [],
        }
    }

    componentWillMount() {

        this.setState({
            cardId: this.props.match.params.id.split("&")[1],
            cardTheme: this.props.match.params.id.split("&")[0]
        });

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
                            trigger={<Button className="button" variant="info"><strong>See Details</strong></Button>}
                            modal
                            closeOnDocumentClick>
                            <span>
                                <div className = "row">
                                    <div className = "col-xl-6 col-md-6">
                                        <img className="figureImg2" src={card.picture} />
                                    </div>
                                    <div className="col-xl-6 col-md-9 mt-3 text">
                                        <div style={{color: card.textColor,textAlign: "left"}}
                                             dangerouslySetInnerHTML={{__html: card.cardText}}></div>
                                    </div>
                                </div>
                            </span>
                        </Popup>
                    </div>
            )
        }

        return (
            <div className="HistoryCards">
                <Row>
                    <Link to={{pathname: '/EditCard/' + this.state.cardTheme + "&" + this.state.cardId}}>
                        <Button className="back_button" variant="outline-info">Go back to edit the card</Button>
                    </Link>
                </Row>
                <h2 className="historyText"> Inspiration Board</h2>
                <h3 className="history_title"> Here you can see what others have created!</h3>
                <Row className="cards_row">
                    {pictures}
                </Row>
            </div>
        );
    }
}

export default InspirationBoard;
