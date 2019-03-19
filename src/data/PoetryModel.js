import ObservableModel from "./ObservableModel";
import API_KEY_PHOTOS from "./ApiKey";

const SELECTTHEME_BASE_URL= "https://api.pexels.com/v1";
const SELECTCARD_BASE_URL = "https://api.pexels.com/v1/search?per_page=2&page=1";
const httpOptions = {
 headers: { "Authorization": API_KEY_PHOTOS}
};

class PoetryModel extends ObservableModel {
  themes = ["Birthday", "Wedding", "Love", "Travel", "Mother's Day", "Christmas"];

  constructor() {
    super();
    this.cardImage; 
    this.urlThemePhotosList = [];
  }

//method to get cards according to the selected theme
getSelectCards(query){
  const url = `${SELECTCARD_BASE_URL}&query=${query}`;
  return fetch(url, httpOptions).then(this.processResponse);
}

//method to set the card image what the user wants to use
//called when the user clicks on the card image in SelectCard view
setCardImage(cardImage){
  this.cardImage = cardImage;
}
//method to get the card image what the user wants to use
//called from EditCard and PrintCard
getCardImage(){
  return this.cardImage;
}

//From Ruxi
  getUrlThemePhotosList() {
      return this.urlThemePhotosList;
  }

  getThemePhoto(theme) {
      const url = `${SELECTTHEME_BASE_URL}/search?query=` + theme + `&per_page=1&page=1`;
      return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of PoetryModel
/*const modelInstance = new PoetryModel();
export default modelInstance;*/

export const modelInstance = new PoetryModel();
export default modelInstance;