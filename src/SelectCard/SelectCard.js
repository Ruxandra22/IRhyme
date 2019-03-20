import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SelectCard.css";

import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';
import { modelInstance } from '../data/PoetryModel';

  
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
  
  
   /* componentDidUpdate = (prevProps, prevState) => {
      // when data is retrieved we update the state
      // this will cause the component to re-render
     
      modelInstance.getSelectCards().then(cards => {
        {console.log('calling update model',this.props)}
        this.setState({
          status: 'LOADED',
          cards: cards.photos
        })
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
      
    }*/
  
    // componentWillUnmount() {
    // }
  
    render() {
      let cardsList = null;
  
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
            <div id="card.id"  key={card.id} className="card">
              <Link to={{pathname: '/EditCard' }}>
                    {/* store the selected card in the model */}
                    {modelInstance.setCardImage(card)}
                    <figure>
                        <img className="img" src={card.src.portrait} />
                        <div align="center" className="caption"> <p>Select to edit picture</p> </div>
                    </figure>
              </Link>
            </div>
          )
          break;
        default:
          cardsList = <b>Failed to load data, please try again</b>
          break;
      }
  
      return (
        <div className="Cards">
            <h1> {this.state.theme} </h1> 
            <Row>
                 {cardsList}
            </Row>
        </div>
      );
    }
  }
  
  export default Cards;
  
  


