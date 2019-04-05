import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SelectCard.css";

import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';
import { modelInstance } from '../data/PoetryModel';
import '../App.css';
  
class Cards extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        status: 'INITIAL',
        theme: this.props.match.params.id
      }
    }
  
  
    // this methods is called by React lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount(){
      // when data is retrieved we update the state
      // this will cause the component to re-render
      modelInstance.getSelectCards(this.state.theme).then(cards => {
        this.setState({
          status: 'LOADED',
          cards: cards.photos,
          theme: this.props.match.params.id
        })
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
    }


    render() {
      let cardsList = null;
      let imageUrl = null;
  
      // depending on the state we either generate
      // useful message to the user or show the list
      // of returned cards
      switch (this.state.status) {
        case 'INITIAL':
          cardsList = <em>Loading...</em>
          break;
        case 'LOADED':
            console.log(this.state.cards);
            cardsList = this.state.cards.map((card) =>
                <div key = {card.id} className="p-3">
                    <div className="background_card" style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')',
                        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                        <Link to={{pathname: '/EditCard/' + card.id}}>
                            <img className="photo" src={card.src.portrait}/>
                        </Link>
                    </div>
                </div>
            )
          break;
        default:
          cardsList = <b>Failed to load data, please try again</b>
          break;
      }
  
      return (
        <div className="Cards">
            <h1 className={"title_select_card"}> {this.state.theme} </h1>
            {/*<div className="container">*/}
                <Row className="cards_row">
                     {cardsList}
                </Row>
            {/*</div>*/}
        </div>
      );
    }
  }
  
  export default Cards;
  
  


