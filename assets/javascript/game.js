var currentword = document.getElementById("currentword");
var previousword = document.getElementById("previousword");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var guessCounter = document.getElementById("guess-counter");
var guessed = document.getElementById("guessed");
var mugShot = document.getElementById("mugShot");
var highnoon = document.getElementById("highnoon");

var game = {
    wordlist: ["BillytheKid","BuffaloBill","ButchCassidy","JohnHardin","NatLove","TexasJack","TomKetchum","TomHorn","HarveyLogan","SamBass"],
    wins: 0,
    losses: 0,
    lives: [],
    guessed: [],
    secretWord: "",
    previousword: "",
    guessCounter: 10,
    evaluateGuess: function(guess) {
        var match = false;
        var lowercaseGuess = guess.toLowerCase();
        var lowercaseSecretWord = this.secretWord.toLowerCase().split("");
        for (var i = 0; i < lowercaseSecretWord.length; i++) {
            if (lowercaseSecretWord[i] === lowercaseGuess) {
                match = true;
                this.guessed[i] = this.secretWord[i];
            }
        }
        if (!match){
            if (this.lives.indexOf(guess) < 0 ) {
                this.lives.push(guess)
            }
            else {
                match = true;
            }
        }
        return match;
    },
    setGuessed: function() {
        for (var i = 0; i < this.secretWord.length; i++) {
            this.guessed.push("-");
        }
    },
    setNewSecretWord: function() {
        this.lives = [];
        this.secretWord = this.wordlist[Math.floor(Math.random() * Math.floor(this.wordlist.length))];
    },
    setmugShot: function() {
        mugShot.removeAttribute("class");
    },
    setPrevSecretWord: function() {
        this.previousword = this.secretWord;
    },
    rendergame: function() {
        currentword.textContent = this.guessed.join("");
        guessCounter.textContent = this.guessCounter;
        lives.textContent = this.lives.join(" ");
        wins.textContent = this.wins;
        losses.textContent = this.losses;
        previousword.textContent = this.previousword;
        mugShot.innerHTML = '<img src="assets/images/'+ this.secretWord + '.jpg" class="img-fluid">';
    }
};
game.setNewSecretWord();
game.setGuessed();
game.rendergame();
document.onkeyup = function(event) {
    var userGuess = event.key;
    var guessed = game.guessed.join("");
    var correct = guessed.replace("-", userGuess) === game.secretWord;
    var validInput = /^[a-zA-Z]$/.test(userGuess);
    if (validInput) {
        if (correct) {
            game.evaluateGuess(userGuess);
            game.wins++;
            game.setPrevSecretWord();
            game.guessCounter = 10;
            game.guessed = [];
            game.secretWord = "";
            game.setNewSecretWord();
            game.setGuessed();
            game.setmugShot();
        } else if (game.guessCounter > 0 && guessed !== game.secretWord) {          
            var match = game.evaluateGuess(userGuess);
            if (!match) {
                game.guessCounter--;
                if (game.guessCounter === 0) {
                    highnoon.play();
                    game.losses++;
                    game.setPrevSecretWord();
                    game.guessCounter = 10;
                    game.guessed = [];
                    game.secretWord = "";
                    game.setNewSecretWord();
                    game.setGuessed();
                    game.setmugShot();
                }
            }
        } 
    }
    game.rendergame();
};
