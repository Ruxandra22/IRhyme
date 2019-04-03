import ObservableModel from "./ObservableModel";

const WORDS_BASE_URL= "api.datamuse.com/words?";


class Poem extends ObservableModel {
   
    

    constructor() {
        super();
        this.verbs = ["feel ", "love ", "embrace " , "wish ", "swim ", "jump ", "smile " , "live " , "be " , "being "];
        this.adverbs = ["softly ", "gently ", "joyfully " , "happily ", "gracefully "];
        this.determinants = ["the ","a "];
        this.nouns = ["cherry wine ", "travel ", "lady ", "lily ", "foreign land " , "adventure " , "life " , "ocean " , "eternity " ,"purity ",
      "swan ", "sunshine " , "little bird " , "angel "];
        this.pluralnouns = ["lillies ", "stars ", "flowers ", "winds " , "roads " , "memories " , "moments " , "little rays of sun"];
        this.prepositions = ["of ", "with ", "about ", "to " , "on " , "in " , "for " , "within"];
        this.adjectives = ["aromatic ","happy ","wonderful ","soft ","sensuel ","bright " , "great " , "amazing " , "most geniune ", "less travelled "];
        this.punctuations = [". " ,": " ,", " , "! "];
        this.newline = ["\n"];
        this.randomWords = [];
        this.poemText = 'I wandered lonely as a cloud. That floats on high o’er vales and hills. When all at once I saw a crowd. A host, of golden daffodils. Beside the lake, beneath the trees,Fluttering and dancing in the breeze.';

    }

    getWords(theme) {
        //api.datamuse.com/words?p=v&topics=love&rel_jja=red&md=p
        const url = `${WORDS_BASE_URL}topics` + theme + `&rel_jja=red`;
        return fetch(url).then(this.processResponse);
    }

    //load the fetched words to the random word array
    // loadWords(theme){
    //     var response = this.getWords(theme);
    //    console.log("response test: ", response);

    // }

    processResponse = function (response) {
        if (response.ok) {
          return response.json()
        }
        throw response;
      }

    handleError = function (error) {
        if (error.json) {
          error.json().then(error => {
            console.error('error in fetching words ', error.message || error)
          })
        } else {
          console.error('error in fetching words ', error.message || error)
        }
      }

    random(arraySize){
        var min=0; 
        var max=arraySize-1;  
        var random =Math.floor(Math.random() * (+max - +min)) + +min;   
        return random;
    }

    p1(){
      var p1 = new String();
      p1 = p1.concat(this.verbs[this.random(this.verbs.length)], this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
      this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)], this.adjectives[this.random(this.adjectives.length)], 
      this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)], this.newline[0]
      );
      return p1;
    }
    p2(){
      var p2 = new String();
      p2 = p2.concat(this.verbs[this.random(this.verbs.length)], this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)] , this.newline[0]
      );
      return p2;
    }
    p3(){
      var p3 = new String();
      p3 = p3.concat(this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)], this.adverbs[this.random(this.adverbs.length)],
      this.verbs[this.random(this.adverbs.length)], this.newline[0]
      );
      return p3;
    }
    p4(){
      var p4 = new String();
      p4 = p4.concat(this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
      this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)],  "! ", this.newline[0]
      );
      return p4;
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
        this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)], this.adjectives[this.random(this.adjectives.length)], 
        this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)], this.newline[0]
        );

        p2 = p2.concat(this.verbs[this.random(this.verbs.length)], this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
        this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)] , this.newline[0]
        );

        p3 = p3.concat(this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
        this.nouns[this.random(this.nouns.length)], this.adverbs[this.random(this.adverbs.length)],
        this.verbs[this.random(this.adverbs.length)], this.newline[0]
        );

        p4 = p4.concat(this.determinants[this.random(this.determinants.length)], this.nouns[this.random(this.nouns.length)], 
        this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
        this.nouns[this.random(this.nouns.length)],  this.punctuations[this.random(this.punctuations.length)], this.newline[0]
        );

        return pharagraph.concat(p1, p2, p3, p4);
    }

    generatePoem(theme){
        //fPron, fV, fdet,fN,fpre,fdet,fN,fN, write(','). 
        // var par1 = new String();
        // var par2 = new String();
        // var par3 = new String();
        // var par4 = new String();
        // var poem = new String();

        // par1 = this.generatePharagraph();
        // par2 = this.generatePharagraph();
        // par3 = this.generatePharagraph();
        // par4 = this.generatePharagraph();

        // poem = poem.concat(par1, par2, par3, par4);
        // return poem;
        this.loadWords(theme);
        var poem = new String;
        poem = poem.concat(this.randomWords[this.random(this.randomWords.length)],this.randomWords[this.random(this.randomWords.length)],
        this.randomWords[this.random(this.randomWords.length)], "! \n", 
        this.randomWords[this.random(this.randomWords.length)], this.randomWords[this.random(this.randomWords.length)], 
        this.randomWords[this.random(this.randomWords.length)],  this.randomWords[this.random(this.randomWords.length)], ". \n"
        );
        return poem;
    }

    printPoem(){
        return this.poemText;
    }
    
}


export const poemGenerator = new Poem();
export default poemGenerator;