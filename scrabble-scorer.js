// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   return word;
};

const simpleScorer = (word) => {
   word = word.toUpperCase();
   let score = 0;

   for (let i=0; i<word.length; i++)
      score += 1;

   return score;
}

// let wordTest = "pineapple"
// console.log(`simple scorer for ${wordTest}: ${simpleScorer(wordTest)}`)

const vowelBonusScorer = (word) => {
   word = word.toUpperCase();
   let vowels = "AEIOU"
   let score = 0;

   for (let i = 0; i<word.length; i++) {
      // Set a condition that for each iteration in word, when the iteration matches "AEIOU", it scores a 3. All other letters just get 1.
      if (vowels.includes(word[i])) {
       score += 3;
   } else {
      score += 1;
   }

}
return score;
}

// let wordTest = "pineapple"
// console.log(`vowel scorer for the word, ${wordTest}: ${vowelBonusScorer(wordTest)}`);

const transform = (oldPointStructure) => {
   
   let freshStructure = {};
  
   for(let newPoint in oldPointStructure) {
     // Gets the value from each array of oldPointStructure and storing them in letters
     let letters = oldPointStructure[newPoint];   
 
     // Inner loop loops through the array of values and matches with the letter
     for (let i=0; i<letters.length; i++) {
       let toLowerCaseLetter = letters[i].toLowerCase();
       // this sets the value for the object freshStructure so output is for example - a:1, e:1, ...
       freshStructure[toLowerCaseLetter] = Number(newPoint);
     }
 
   }
   return freshStructure;
 };



const newPointStructure = transform(oldPointStructure)

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let score = 0;
   // iterate each letter in the word and plug the value to the newPointStructure to get score
   for (let i=0; i<word.length; i++) {
      // accesses property in the object which correspond to the letter and its point
      score += newPointStructure[word[i]];
   }
   return score;
}

const scoringAlgorithms = 
   [ { name: "Simple Scorer",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer
},
   {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt",
   scorerFunction: vowelBonusScorer

},
   {
   name: "New Scrabble",
   description: "New point structure scrabble scorer",
   scorerFunction: scrabbleScorer
}
   ];



 function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");
   console.log("0 - Simple: One point per character");
   console.log("1 - Vowel Bonus: Vowels are worth 3 points");
   console.log("2 - Scrabble: Uses scrabble point system");

   let theirChoice = input.question("Enter 0, 1, or 2: ")
   theirChoice = Number(theirChoice);

   if (theirChoice === 0) {
      // Grabs the key value pair function from object scoringAlgorithms
      return scoringAlgorithms[0].scorerFunction;
   } else if (theirChoice === 1) {
      return scoringAlgorithms[1].scorerFunction;
   } else if (theirChoice === 2) {
      return scoringAlgorithms[2].scorerFunction;
   }

};

function runProgram() {
   let word = initialPrompt();
   let selectedScorer = scorerPrompt();
   let score = selectedScorer(word);
   console.log(`Score for ${word}: ${score}`);
   
};

// runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
