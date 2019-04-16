import ObservableModel from "./ObservableModel";

class Poem extends ObservableModel {

    constructor() {
        super();
        //vocabulary of the poem generator
        this.verbs = ["feel ", "love ", "embrace " , "wish ", "swim ", "jump ", "smile " , "live " , "be " , "being " , "wishing " , "hoping " , "caring "];
        this.adverbs = ["softly ", "gently ", "joyfully " , "happily ", "gracefully "];
        this.determinants = ["the ","a "];
        this.nouns = ["ocean " , "eternity " ,"purity ", "rose ", "sunshine " , "little bird ", "family " , "angel " , 
        "cherry wine ", "travel ", "lady ", "lily ", "foreign land " , "adventure " , "life " ,"year " , "spring " , "atmosphere "] ;
        this.pluralnouns = ["lillies ", "stars ", "flowers ", "winds " , "roads " , "memories " , "moments " , "little rays of sun ", "tulips "];
        this.prepositions = ["of ", "with ", "to " , "on " , "in " , "for " , "within"];
        this.adjectives = ["aromatic ","happy ", "peaceful " ,"wonderful ","soft ", "calm " , "beautiful " , "fragile ", "powerful ", "sensitive ","bright " , "great " , "cozy ", "amazing " , "most geniune ", "less travelled "];
        this.punctuations = [". " ,", " , "! "];
        this.newline = ["\n"];
        this.randomWords = [];
        this.poemText = 'I wandered lonely as a cloud. That floats on high o’er vales and hills. When all at once I saw a crowd. A host, of golden daffodils. Beside the lake, beneath the trees,Fluttering and dancing in the breeze.';
     }

    random(arraySize){
        var min=0; 
        var max=arraySize-1;  
        var random =Math.floor(Math.random() * (+max - +min)) + +min;   
        return random;
    }

    p1(){
      var p1 = new String();
      p1 = this.verbs[this.random(this.verbs.length)];
      p1 = p1.charAt(0).toUpperCase() + p1.slice(1);
      p1 = p1.concat( this.determinants[this.random(this.determinants.length)], this.pluralnouns[this.random(this.pluralnouns.length)], 
      this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)], this.adjectives[this.random(this.adjectives.length)], 
      this.nouns[this.random(this.nouns.length)] 
      );
      return p1;
    }
    p2(){
      var p2 = new String();
      p2 = this.verbs[this.random(this.verbs.length)];
      p2 = p2.charAt(0).toUpperCase() + p2.slice(1);
      p2 = p2.concat( this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)], this.punctuations[this.random(this.punctuations.length)]//this.newline[0]
      );
      return p2;
    }
    p3(){
      var p3 = new String();
      p3 = this.prepositions[this.random(this.prepositions.length)];
      p3 = p3.charAt(0).toUpperCase() + p3.slice(1);
      p3 = p3.concat(this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)], this.adverbs[this.random(this.adverbs.length)],
      this.verbs[this.random(this.adverbs.length)] 
      );
      return p3;
    }
    p4(){
      var p4 = new String();
      p4 = this.determinants[this.random(this.determinants.length)];
      p4 = p4.charAt(0).toUpperCase() + p4.slice(1);
      p4 = p4.concat(this.nouns[this.random(this.nouns.length)], 
      this.prepositions[this.random(this.prepositions.length)], this.determinants[this.random(this.determinants.length)],
      this.nouns[this.random(this.nouns.length)],  "! " 
      );
      return p4;
    }

    setPoemGreeting(htmlString){
     this.poemGreeting = htmlString;
    }

    setPoemBody(htmlString){
      this.poemBody = htmlString;
    }

     setPoemSignature(htmlString){
       this.poemSignature = htmlString;
     }

     setPoemColor(string) {
       this.poemColor = string;
     }

    getPoemGreeting(htmlString){
        return this.poemGreeting ;
     }
 
     getPoemBody(htmlString){
       return this.poemBody ;
     }
 
    getPoemSignature(htmlString){
      return this.poemSignature;
    }

    getPoemColor(string) {
      return this.poemColor;
    }   
}

export const poemGenerator = new Poem();
export default poemGenerator;