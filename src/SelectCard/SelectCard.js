import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./SelectCard.css";

import 'bootstrap/dist/css/bootstrap.css' ;
import{Container, Row, Col} from 'reactstrap';
import { modelInstance } from '../data/PoetryModel';



class DishHeader extends React.Component {
    render() {
      const { image } = this.props;
      var style = {
        backgroundImage: 'url(' + image + ')',
      };
      return (
        <header style={style} id={image} className="card-header" />
      )
    }
  }
  
  class DishBody extends React.Component {
    render() {
      return (
        <div className="card-body">
  
          <h2>{this.props.title}</h2>
  
          <p className="body-content">{this.props.text}</p>
  
        </div>
      )
    }
  }
  
  class Dishes extends Component {
    constructor(props) {
      super(props);
      // We create the state to store the various statuses
      // e.g. API data loading or error 
      this.state = {
        status: 'INITIAL'
      }
    }
  
  
    // this methods is called by React lifecycle when the 
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount = () => {
      // when data is retrieved we update the state
      // this will cause the component to re-render
      modelInstance.getSelectCards().then(dishes => {
        {console.log('calling model',this.props)}
        this.setState({
          status: 'LOADED',
          dishes: dishes.photos
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
     
      modelInstance.getSelectCards().then(dishes => {
        {console.log('calling update model',this.props)}
        this.setState({
          status: 'LOADED',
          dishes: dishes.photos
        })
      }).catch(() => {
        this.setState({
          status: 'ERROR'
        })
      })
      
    }*/
  
    componentWillUnmount() {
    }
  
    render() {
      let dishesList = null;
  
      // depending on the state we either generate
      // useful message to the user or show the list
      // of returned dishes
      switch (this.state.status) {
        case 'INITIAL':
          dishesList = <em>Loading...</em>
          break;
        case 'LOADED':
          dishesList = this.state.dishes.map((dish) =>
            <div id="dish.id"  key={dish.id} className="card">
              {console.log('looping',dish, this.props)}
              <Link to={{pathname: '/DishDetails/'+dish.id }}>
                    <div className="col-md-9">
                        <img className="img-thumbnail" src={dish.src.tiny} />
                    </div>
              </Link>
            </div>
          )
          break;
        default:
          dishesList = <b>Failed to load data, please try again</b>
          break;
      }
  
      return (
        <div className="Dishes">
          <h1> Theme name here e.g. Birthday </h1>
          <Row>
            {dishesList}
          </Row>
        </div>
      );
    }
  }
  
  export default Dishes;
  
  /*
    return (
      <div className="SelectCard">
        <h1> Theme name here e.g. Birthday </h1>
       
        <Row>
          {dishesList}
        </Row>
       
        <Link to="/EditCard">
          <button>Select Card</button>
        </Link>
      </div>
    );
  }
}
*/


