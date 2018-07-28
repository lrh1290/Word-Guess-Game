var currentword = document.getElementById("currentword");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var guessCounter = document.getElementById("guess-counter");
var guessed = document.getElementById("guessed");


var game = {
    wordlist: ["BillytheKid","BuffaloBill","ButchCassidy","JohnWesleyHardin","NatLove","WilliamBrocius","TexasJack","TomKetchum","TomHorn","HarveyLogan","SamBass"],
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
        this.secretWord = this.wordlist[Math.floor(Math.random() * Math.floor(this.wordlist.length))];
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
        } else if (game.guessCounter > 0 && guessed !== game.secretWord) {          
            var match = game.evaluateGuess(userGuess);
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
