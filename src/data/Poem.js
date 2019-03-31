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

    generatePharagraph(){
        //structure of the poem:
        // p1 :- write('the '),fadj,fPN,fV,fpre,fdet,fN,write(', ').
        // p2 :- fV,fpre,fN, write('; ').
        // p3 :- fpre,fdet,fN,fN,fAdv,fV.
        // p4 :- fdet,fN,fpre,fdet,fN, write('!').
        var p1 = new String();
        var p2 = new String();
        var p3 = new String();
        var p4 = new String();

        var pharagraph = new String();

        p1 = p1.concat(this.verbs[this.random(this.verbs.length)], this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)], "\n"
        );

        p2 = p2.concat(this.verbs[this.random(this.verbs.length)], this.prepositions[this.random(this.prepositions.length)],
        this.nouns[this.random(this.nouns.length)], "; " , "\n"
        );

        p3 = p3.concat(this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
        this.nouns[this.random(this.nouns.length)], this.nouns[this.random(this.nouns.length)], this.adverbs[this.random(this.adverbs.length)],
        this.verbs[this.random(this.adverbs.length)], "\n"
        );

        p4 = p4.concat(this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
        this.nouns[this.random(this.nouns.length)],  "! ", "\n"
        );

        return pharagraph.concat(p1, p2, p3, p4);
    }

    generatePoem(){
        //fPron, fV, fdet,fN,fpre,fdet,fN,fN, write(','). 
        var par1 = new String();
        var par2 = new String();
        var par3 = new String();
        var par4 = new String();
        var poem = new String();

        par1 = this.generatePharagraph();
        par2 = this.generatePharagraph();
        par3 = this.generatePharagraph();
        par4 = this.generatePharagraph();

        poem = poem.concat(par1, par2, par3, par4);
        return poem;
    }

    printPoem(){
        return this.poemText;
    }
    
}


export const poemGenerator = new Poem();
export default poemGenerator;