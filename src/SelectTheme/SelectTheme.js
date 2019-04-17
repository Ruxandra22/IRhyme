import React, { Component } from "react";
import "./SelectTheme.css";
import modelInstance from "../data/PoetryModel"
import 'bootstrap/dist/css/bootstrap.css';
import{Row, Col} from 'reactstrap';
import Link from "react-router-dom/es/Link";
import '../App.css';
import Button from "react-bootstrap/Button";

class SelectTheme extends Component {

    constructor(props) {
        super(props);

        this.state = {
            urlPhotos: [],
            themeWordsList: modelInstance.themes,
            filtered: [],
            foundSearchElements: true
        }
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {

        this.setState({
            filtered: this.state.themeWordsList
        });
        // when data is retrieved we update the state, the component re-renders
        // map which has the theme card as key and the image as value
        this.urlThemePhotosMap = new Map();
        let themes = this.state.themeWordsList;
        for(let i = 0; i < themes.length; i++) {
            let theme = themes[i];
            modelInstance.getThemePhoto(theme)
                .then(themePhoto => {
                    this.urlThemePhotosMap.set(theme.charAt(0).toUpperCase() +
                        theme.substr(1, theme.length - 1), themePhoto.photos[0]);
                    this.setState({
                        photo: themePhoto.photos[0],
                        photosMap: this.urlThemePhotosMap,
                        copyPhotosMap: this.urlThemePhotosMap
                    });

            }).catch(error => {
                console.error(error);
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
        filtered: nextProps.items
        });
    }

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
                // Assign the original list to currentList
                currentList = this.state.themeWordsList;

                // Use .filter() to determine which items should be displayed
                // based on the search terms
                newList = currentList.filter(item => {
                        // change current item to lowercase
                        const lc = item.toLowerCase();
                        // change search term to lowercase
                        const filter = e.target.value.toLowerCase();
                        return lc.includes(filter);
                });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = this.state.themeWordsList;
        }
        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        });

        this.urlThemePhotosMap = new Map();
        let themes = newList;
        this.state.photosMap = this.state.copyPhotosMap;

        // if there were no matching themes with the initial list of themes
        if(themes.length == 0) {
            this.setState({
                photosMap: "",
                foundSearchElements: false
            })
        }

        // look in the map for the theme that is searched
        for(let i = 0; i < themes.length; i++) {
            let theme = themes[i];
            let themeFound = false;
            for (const [themeKey, value] of this.state.photosMap) {
                if (theme === themeKey.toLowerCase()) {
                    this.urlThemePhotosMap.set(themeKey.charAt(0).toUpperCase() +
                        themeKey.substr(1, themeKey.length - 1), value);
                    this.setState({
                        photo: value,
                        photosMap: this.urlThemePhotosMap,
                        foundSearchElements: true
                    });
                    themeFound = true;
                    break;
                }
            }
        }
    }

    render() {

        let images;
        if(this.state.foundSearchElements) {
            if (this.state.photosMap != null) {
                images = Array.from(this.state.photosMap).map(([themeKey, valuePhoto]) =>
                    <div key={themeKey} className="p-3 theme_details">
                        <div>
                            <Link to={{pathname: '/SelectCard/' + themeKey}}>
                                <img className="themePhoto" src={valuePhoto.src.portrait}/>
                                <Button className="button_theme"
                                        variant="outline-info"><strong>{themeKey}</strong></Button>
                            </Link>
                        </div>
                    </div>
                )
            }
        }
        else {
            images = <h2 className="no_themes_found">No themes found!</h2>;
        }

        return (
            <div>
                <div className="searchBar">
                    <Col md="5">
                        <div className="input-group md-form form-sm form-1 pl-0">
                            <div className="input-group-prepend">
                                <span className="input-group-text red lighten-3" id="basic-text1">
                                    <i className="fas fa-search indigo-text"></i>
                                </span>
                            </div>
                            <input className="form-control my-0 py-1" onChange={this.handleChange} type="text" placeholder="Search theme" aria-label="Search" />
                        </div>
                    </Col>
                </div>

                <div className="SelectTheme">
                    <Row className="row_theme">
                        {images}
                    </Row>
                </div>
            </div>
        );
    }
}

export default SelectTheme;
