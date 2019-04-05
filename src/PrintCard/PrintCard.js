import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import { modelInstance } from '../data/PoetryModel';
import 'bootstrap/dist/css/bootstrap.css' ;
import ReactToPrint from "react-to-print";

class PrintFront extends Component {  

    render() {

        return(
            <div className="PrintCard">
                <div className="p-3" >
                    <div style={{ backgroundImage: 'url(' + require('../images/EmptyCard.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                                <img className="figureImg1" src={this.props.url}/>
                    </div>
                </div>  

                <div className="p-3" >
                    <div className="row" style={{ backgroundImage: 'url(' + require('../images/EmptyCard.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                        <div className="col-3"></div> 
                        <div className="col-3">       
                                <img className="figureImg2" src={this.props.url}/>
                        </div>  
                        <div className="col-3 mt-5">      
                            <strong className="text-primary">Dear Friend</strong>
                                <p className="mr-3">{this.props.cardTxt}</p>
                            <strong className="text-primary">Best Wishes</strong>
                        </div>  
                        <div className="col-3"></div>       
                    </div>
                </div> 
            </div>

        );
    }

}

class PrintInside extends Component {  

  render() {

      return(
          <div className="PrintCard">
                <div className="p-3" >
                    <div className="row" style={{ backgroundImage: 'url(' + require('../images/EmptyCard.jpg') + ')', backgroundRepeat: 'no-repeat',  backgroundPosition: 'center'}}>
                        <div className="col-3"></div> 
                        <div className="col-3">       
                                <img className="figureImg2" src={this.props.url}/>
                        </div>  
                        <div className="col-3 mt-5">      
                            <strong className="text-primary">Dear Friend</strong>
                                <p className="mr-3">{this.props.cardTxt}</p>
                            <strong className="text-primary">Best Wishes</strong>
                        </div>  
                        <div className="col-3"></div>       
                    </div>
                </div> 

              {/* <div className="row">
                <div className="col-xl-3"></div>
              <div className="col-xl-6 col-md-6 pb-3">
                          <div className="card">
                              <div className="row no-gutters centered">
                                  <div className="col-xl-6 col-md-12 p-1">
                                    <figure className="figure">
                                      <img className="card-img-right " src={this.props.url}/>
                                    </figure>
                                  </div>
                                  <div className="col-xl-6 col-md-12 mt-4">
                                      <strong className="mb-2 text-primary">Dear Friend</strong>
                                      <p className="mx-auto align-self-center">{this.props.cardTxt}</p>
                                      <strong className="mb-2 text-primary">Best Wishes</strong>
                                  </div>
                              </div>
                          </div>
              </div> 
              <div className="col-xl-3"></div>
              </div>     */}
          </div>

      );
  }

}

class PrintCard extends React.Component {

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
    return (
      <div className="PrintCard">
          <div>
            <h2 >Print Card</h2> 
                <p>Use A5 size photo paper to print this card.</p>
          </div>

        <PrintFront url={this.state.url} cardTxt={this.state.cardTxt} ref={el1 => (this.componentRef1 = el1)} />
        <ReactToPrint
          trigger={() => <button className="PrintBtn">Print card!</button>}
          content={() => this.componentRef1}
          copyStyles={() => true}
        />
{/* 
        <PrintInside url={this.state.url} cardTxt={this.state.cardTxt} ref={el2 => (this.componentRef2 = el2)} />
        <ReactToPrint
          trigger={() => <button className="PrintBtn">Print Inside!</button>}
          content={() => this.componentRef2}
          copyStyles={() => true}
        /> */}

      </div>
    );
  }
}

export default PrintCard;