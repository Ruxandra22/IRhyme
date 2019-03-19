import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./PrintCard.css";
import img1 from '../images/ClosedCard.png';
import img2 from '../images/OpenCard.jpg';
import img3 from '../images/Overlay.jpg';
//import { modelInstance } from '../data/PoetryModel';

class Printcard extends Component {


//   componentDidMount = () => {
//     this.props.model.addObserver(this)
  
//     modelInstance.getCardImage(this.state.dishCard).then(img => {
//       {console.log('img :) '+img)}
//       this.setState({
//         status: 'LOADED',
//         img: img,
//       })
//     }).catch(() => {
//       this.setState({
//         status: 'ERROR',
//       })
//     })
//   }

    render() {

        const poemText = 'I wandered lonely as a cloud< br/> That floats on high o’er vales and hills,<br/> When all at once I saw a crowd,<br/>A host, of golden daffodils;<br/>Beside the lake, beneath the trees,<br/>Fluttering and dancing in the breeze.';

        return(
            <div className="PrintCard">
                <div className="Row">
                <h2 className="HeaderTxt">Print Card</h2> 
                <p className="BodyTxt">Use A5 size photo paper to print this card.</p>
                </div>
                <div className="Row">
                    <img className="ClosedCard" src={img1}></img>
                    <img className="OpenCard" src={img2}></img>
                </div>
                <div class="card flex-md-row mb-4 box-shadow h-md-250">
                    <figure>
                    <img class="card-img-right flex-auto d-none d-md-block" src={img3}/>
                    </figure>
                    <div class="card-body d-flex flex-column align-items-start">
                        <strong class="d-inline-block mb-2 text-primary">Dear Friend</strong>
                        <p class="card-text mb-auto">{poemText}</p>
                        <strong class="d-inline-block mb-2 text-primary">Best Wishes</strong>
                    </div>
                </div>
                <Link to="/search">
                    <button className="PrintBtn">Print my Card!</button>
                </Link>
            </div>

        );
    }

}

export default Printcard;