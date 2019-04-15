import React, { Component } from "react";
import "./SelectTheme.css";
import modelInstance from "../data/PoetryModel"
import 'bootstrap/dist/css/bootstrap.css';
import{Row} from 'reactstrap';
import Link from "react-router-dom/es/Link";
import '../App.css';
import firebase from "../config/dbConfig";
import Button from "react-bootstrap/Button";

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
                    <div key = {themeKey} className="p-3 theme_details">
                        <div>
                            <Link to={{pathname: '/SelectCard/' + themeKey}}>
                                <img className="themePhoto" src={valuePhoto.src.portrait}/>
                                <Button className="button_theme" variant="outline-info"><strong>{themeKey}</strong></Button>
                                {/*<div className="caption">*/}
                                {/*    <p>{themeKey}</p>*/}
                                {/*</div>*/}
                            </Link>
                        </div>
                    </div>
            )
        }

        return (
            <div className="SelectTheme">
                <Row className="row_theme">
                    {images}
                </Row>
            </div>
        );
    }
}

export default SelectTheme;
