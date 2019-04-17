import API_KEY_PHOTOS from "./ApiKey";

const SELECTTHEME_BASE_URL= "https://api.pexels.com/v1";
const SELECTCARD_BASE_URL = "https://api.pexels.com/v1/search?per_page=30&page=1";
const WORD_BASE_URL = "https://api.datamuse.com/words?";
const httpOptions = {
    headers: { "Authorization": API_KEY_PHOTOS}
};
const httpOptions2 = {
    headers: { "Authorization": null}
};

class PoetryModel {
    //, "new home", "friendship", "easter"
    themes = ["birthday", "wedding", "love", "travel", "easter", "christmas", "new home", "newborn"];
    
    constructor() {
        this.cardImage;
        this.urlThemePhotosList = [];
        this.poemText = 'I wandered lonely as a cloud. That floats on high o’er vales and hills. When all at once I saw a crowd. A host, of golden daffodils. Beside the lake, beneath the trees,Fluttering and dancing in the breeze.';
    }

    //method to get cards according to the selected theme
    getSelectCards(query){
        const url = `${SELECTCARD_BASE_URL}&query=${query}`;
        return fetch(url, httpOptions).then(this.processResponse);
    }

    //method to set the card image what the user wants to use
    //called when the user clicks on the card image in SelectCard view
    setCardImage(id){
        const url = `${SELECTTHEME_BASE_URL}/photos/`+ id;
        this.cardImage = fetch(url, httpOptions).then(this.processResponse);
    }

    //method to get the card image what the user wants to use
    //called from EditCard and PrintCard
    getCardImage(){
        return  this.cardImage;
    }

    getPoetryTxt(){
        return this.poemText;
    }

    getUrlThemePhotosList() {
        return this.urlThemePhotosList;
    }

    getThemePhoto(theme) {
        console.log("call");
        const url = `${SELECTTHEME_BASE_URL}/search?query=` + theme + `&per_page=1&page=1`;
        return fetch(url, httpOptions).then(this.processResponse);
    }

    processResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw response;
    }

    processResponse2(response) {
            return response.json();
    }
}


export const modelInstance = new PoetryModel();
export default modelInstance;