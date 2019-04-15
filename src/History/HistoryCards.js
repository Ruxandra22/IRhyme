import React, { Component } from "react";
import "./HistoryCards.css";
import 'bootstrap/dist/css/bootstrap.css' ;
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../config/dbConfig";
import Link from "react-router-dom/es/Link";

class HistoryCards extends Component {

    constructor(props) {
        super(props);
        this.state = {
            historyData:""
        }
    }

    componentDidMount() {
        // don't hardcode the doc
        const db = firebase.firestore();
        const docRef = db.collection('cards').doc('U3yBY9QVotRv5mqNBQO5');

        docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data();
                this.setState({historyData: data });
                // console.log("Document data:", this.state.historyData);
            } else {
                // doc.data() will be undefined in this case
                // this.setState({ data: null });
                console.log("No such document!");
            }
        }).catch(function (error) {
            this.setState({historyData: null });
            console.log("Error getting document:", error);
        });
    }

    render() {
        // let dataUI = this.state.historyData == null ? <h1>No Data</h1> : <pre>{JSON.stringify(this.state.historyData)}</pre>

        let imageURL = this.state.historyData.picture;
        let cardContent = this.state.historyData.cardText;
        console.log(imageURL);
        console.log(cardContent);

        return (
            <div className="HistoryCards">
                <p>These are the cards already made:</p>
                {/*<button onClick={this.onLoad}>Load Data</button>*/}

                <div>
                    <div className="background_card" style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')',
                        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                        {/*<Link>*/}
                            <img className="photo" src={imageURL}/>
                        {/*</Link>*/}
                    </div>
                    <p>{cardContent}</p>
                </div>
            </div>
        );
    }
}

export default HistoryCards;
