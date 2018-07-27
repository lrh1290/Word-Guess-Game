var currentword = document.getElementById("currentword");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var guessCounter = document.getElementById("guess-counter");
var guessed = document.getElementById("guessed");

var game = {
    wordList: ["Africa","NorthAmerica","Europe","SouthAmerica","Antartica","Asia","Australia","India","Portugal","Thailand","Czechoslovakia","Egypt","Iceland","Netherlands","Britain","Scottland","Russia","Moroco","Argentina","Mongolia","NorthKorea","SouthKorea","Spain","Japan","Nigeria","Chad","Peru","Portugal","Indonesia","Taiwan","Phillipines","Congo","Pakistan","Afghanistan","Zimbabwe","Georgia","Turkey"],
    wins: 0,
    losses: 0,
    lives: [],
    guessed: [],
    secretWord: "",
    guessCounter: 10,
    evaluateGuess: function(guess) {
        var lowercaseGuess = guess.toLowerCase();
        var lowercaseSecretWord = this.secretWord.toLowerCase().split("");
        var match = false;
        for (var i = 0; i < lowercaseSecretWord.length; i++) {
            if (lowercaseSecretWord[i] === lowercaseGuess) {
                match = true;
                this.guessed[i] = this.secretWord[i];
            }
        }
        if (!match && !(this.lives.includes(lowercaseGuess))) {
            this.lives.push(guess);
        } 
        return match;
    },
    setGuessed: function() {
        for (var i = 0; i < this.secretWord.length; i++) {
            this.guessed.push("-");
        }
    },
    setNewSecretWord: function() {
        this.resetLives();
        this.secretWord = this.wordList[Math.floor(Math.random() * Math.floor(this.wordList.length))];
    },
    resetLives: function() {
        var player = this;
        this.lives.forEach(function(letter, index) {
            delete player.lives[index];
        });
    },
    render: function(str) {
        currentword.textContent = this.guessed.join("");
        guessCounter.textContent = this.guessCounter;
        lives.textContent = this.lives.join(" ");
        wins.textContent = this.wins;
        losses.textContent = this.losses;
    }
};
game.setNewSecretWord();
game.setGuessed();
game.render();
// When the user presses a key
document.onkeyup = function(event) {
    var userGuess = event.key;
    var guessed = game.guessed.join("");
    var correct = guessed.replace("-", userGuess) === game.secretWord;
    var validInput = /^[a-zA-Z]$/.test(userGuess);
    if (validInput) {
        if (correct) {
            game.evaluateGuess(userGuess);
            game.wins++;
            game.guessCounter = 10;
            game.guessed = [];
            game.secretWord = "";
            game.setNewSecretWord();
            game.setGuessed();
        // check guess counter
        } else if (game.guessCounter > 0 && guessed !== game.secretWord) {          
            // Check letter against word
            var match = game.evaluateGuess(userGuess);
            // remove guess counter on guess
            if (!match) {
                game.guessCounter--;
                if (game.guessCounter === 0) {
                    game.losses++;
                    game.guessCounter = 10;
                    game.guessed = [];
                    game.secretWord = "";
                    game.setNewSecretWord();
                    game.setGuessed();
                }
            }
        } 
    }
    game.render();
};

