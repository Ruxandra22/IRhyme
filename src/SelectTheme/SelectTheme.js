import React, { Component } from "react";
import "./SelectTheme.css";
import modelInstance from "../data/PoetryModel"
import 'bootstrap/dist/css/bootstrap.css';
import{Row} from 'reactstrap';
import Link from "react-router-dom/es/Link";
import '../App.css';
import Container from "react-bootstrap/Container";


class SelectTheme extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // status: "LOADING",
            urlPhotos: [],
            themeWordsList: modelInstance.themes,
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);

    }
 

    componentDidMount() {

        console.log("themeowrdslist: ", this.state.themeWordsList);
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
                            // check to see if the current list item includes the search term
                            // If it does, it will be added to newList. Using lowercase eliminates
                            // issues with capitalization in search terms and search content
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
            for(let i = 0; i < themes.length; i++) {
               let theme = themes[i];
               console.log("theme", theme);
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
                                <div className="caption">
                                    <p>{themeKey}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
            )
        }

        return (
            <Container>
                <div className="searchBar">
                    <Row>
                        <div>
                            <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                            {/* <ul>
                            {this.state.filtered.map(item => (
                                <li key={item}>
                                {item} &nbsp;
                                </li>
                            ))}
                            </ul> */}
                        </div>
                    </Row>
                </div>
                <div className="SelectTheme">
                    <Row className="row_theme">
                        {images}
                    </Row>
                </div>
            </Container>
        );
    }
}

export default SelectTheme;
