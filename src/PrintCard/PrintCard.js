import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import img1 from '../images/EmptyCard280x420.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
import { modelInstance } from '../data/PoetryModel';
import 'bootstrap/dist/css/bootstrap.css' ;

class PrintCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          cardId : this.props.match.params.id,
          url: null,
          cardTxt:this.props.model.getPoetryTxt()
        };
      }
  
      componentDidMount = () => {

        modelInstance.getCardImage(this.props.match.params.id).then(card => {
            this.setState({
              status: 'LOADED',
              url: card.src.portrait,
            })
          }).catch(() => {
            this.setState({
              status: 'ERROR',
            })
          })

      }   

    render() {

        return(
            <div className="PrintCard">
                <div>
                  <h2 >Print Card</h2>
                  <p>Use A5 size photo paper to print this card.</p>
                </div>
                <div className="p-3" >
                    <div style={{ backgroundImage: 'url(' + require('../images/EmptyCard280x420.png') + ')',
                        backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                                <img className="figureImg" src={this.state.url}/>
                    </div>
                </div>
                <div className="row">
                  <div className="col-xl-3"></div>
                <div className="col-xl-6 col-md-6 pb-3">
                            <div className="card">
                                <div className="row no-gutters centered">
                                    <div className="col-xl-6 col-md-12 p-1">
                                      <figure className="figure">
                                        <img className="card-img-right" src={this.state.url}/>
                                      </figure>
                                    </div>
                                    <div className="col-xl-6 col-md-12 mt-4">
                                        <strong className="mb-2 text-primary">Dear Friend</strong>
                                        <p className="mx-auto align-self-center">{this.state.cardTxt}</p>
                                        <strong className="mb-2 text-primary">Best Wishes</strong>
                                    </div>
                                </div>
                            </div>
                </div> 
                <div className="col-xl-3"></div>
                </div>      

                <Link to="/search">
                    <button className="PrintBtn">Print my Card!</button>
                </Link>
            </div>

        );
    }

}

export default PrintCard;