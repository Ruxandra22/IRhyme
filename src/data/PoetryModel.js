import ObservableModel from "./ObservableModel";
import API_KEY_PHOTOS from "./ApiKey";

const BASE_URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com";
const SELECTCARD_BASE_URL = "https://api.pexels.com/v1/search?per_page=2&page=1";
const httpOptionsSelectCard = {
  headers: { "Authorization": API_KEY_PHOTOS}
};
const httpOptions = {
  headers: { "Authorization": API_KEY_PHOTOS}
};

class PoetryModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 4;
    this.getNumberOfGuests();
    this.cardImage; 
  }

//method to get cards according to the selected theme
getSelectCards(query){
  const url = `${SELECTCARD_BASE_URL}&query=${query}`;
  return fetch(url, httpOptionsSelectCard).then(this.processResponse);
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

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes() {
    const url = `${BASE_URL}/recipes/search`;
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