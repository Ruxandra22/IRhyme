import ObservableModel from "./ObservableModel";
import API_KEY_PHOTOS from "./ApiKey";

const SELECTTHEME_BASE_URL= "https://api.pexels.com/v1";
const SELECTCARD_BASE_URL = "https://api.pexels.com/v1/search?per_page=2&page=1";
const httpOptions = {
    headers: { "Authorization": API_KEY_PHOTOS}
};

class Poem extends ObservableModel {
   
    

    constructor() {
        super();
        this.verbs = ["feel ", "love ", "embrace " , "wish "];
        this.adverbs = ["softly ", "gently "];
        this.determinants = ["the ","a "];
        this.nouns = ["cherry wine ", "desire ", "lady ", "lily "];
        this.pluralnouns = ["lillies ", "stars ", "flowers ", "winds "];
        this.prepositions = ["of ", "with ", "about ", "to "];
        this.adjectives = ["aromatic ","happy ","wonderful ","soft ","sensuel ","bright "];
        this.punctuations = [". " ,": " ,", " ,"? " , "! "];
        this.poemText = 'I wandered lonely as a cloud. That floats on high o’er vales and hills. When all at once I saw a crowd. A host, of golden daffodils. Beside the lake, beneath the trees,Fluttering and dancing in the breeze.';

    }


    random(arraySize){
        var min=0; 
        var max=arraySize-1;  
        var random =Math.floor(Math.random() * (+max - +min)) + +min;   
        return random;
    }

    generatePoem(){
        //fPron, fV, fdet,fN,fpre,fdet,fN,fN, write(','). 
      
        var poem = new String();
        poem = poem.concat(this.verbs[this.random(this.verbs.length)], this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)]);

        return poem;
    }

    printPoem(){
        return this.poemText;
    }
    
}


export const poemGenerator = new Poem();
export default poemGenerator;