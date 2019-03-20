import React, { Component } from "react";
import "./SelectTheme.css";
import modelInstance from "../data/PoetryModel"
import 'bootstrap/dist/css/bootstrap.css';
import{Row} from 'reactstrap';
import Link from "react-router-dom/es/Link";


class SelectTheme extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // status: "LOADING",
            urlPhotos: [],
        }
    }

    componentDidMount() {
        // when data is retrieved we update the state, the component re-renders

        // map which has the theme card as key and the image as value
        this.urlThemePhotosMap = new Map();
        for(let i = 0; i < modelInstance.themes.length; i++) {
            let theme = modelInstance.themes[i];
            modelInstance.getThemePhoto(theme)
                .then(themePhoto => {
                    this.urlThemePhotosMap.set(theme.charAt(0).toUpperCase() +
                        theme.substr(1, theme.length - 1), themePhoto.photos[0]);
                    this.setState({
                       photo: themePhoto.photos[0],
                       photosMap: this.urlThemePhotosMap,
                    });

            }).catch(error => {
                console.error(error);
            });
        }
    }

    render() {

        let images;
        if(this.state.photosMap != null) {
            images = Array.from(this.state.photosMap).map(([themeKey, valuePhoto]) =>
                <div key={themeKey} className="displayPhotos">
                    <Link to={{pathname: '/SelectCard/' + themeKey}}>
                        <div alogn="center" className="col-sm-9">
                            <figure className="change-ratio">
                                <img className="themePhoto" src={valuePhoto.src.portrait}/>
                                <div align="center" className="caption">
                                    <p>{themeKey}</p>
                                </div>
                            </figure>
                        </div>
                    </Link>
                </div>
            )
        }


        return (
            <div className="SelectTheme">
                {/*<div className="col-sm-9"></div>*/}
                <div className="container">
                    <Row>
                        {images}
                    </Row>
                </div>
            </div>
        );
    }
}

export default SelectTheme;
