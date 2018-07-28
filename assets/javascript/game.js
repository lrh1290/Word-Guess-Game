var currentword = document.getElementById("currentword");
var previousword = document.getElementById("previousword");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var guessCounter = document.getElementById("guess-counter");
var guessed = document.getElementById("guessed");
var gunslinger = document.getElementById("gunslinger");

var game = {
    wordlist: ["BillytheKid","BuffaloBill","ButchCassidy","JohnWesleyHardin","NatLove","WilliamBrocius","TexasJack","TomKetchum","TomHorn","HarveyLogan","SamBass"],
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
        this.giveLives();
        this.secretWord = this.wordlist[Math.floor(Math.random() * Math.floor(this.wordlist.length))];
    },
    setGunSlinger: function() {
        gunslinger.removeAttribute("class");
    },
    setPrevSecretWord: function() {
        this.previousword = this.secretWord;
    },
    giveLives: function() {
        var player = this;
        this.lives.forEach(function(letter, index) {
            delete player.lives[index];
        });
    },
    rendergame: function(str) {
        currentword.textContent = this.guessed.join("");
        guessCounter.textContent = this.guessCounter;
        lives.textContent = this.lives.join(" ");
        wins.textContent = this.wins;
        losses.textContent = this.losses;
        previousword.textContent = this.previousword;
        gunslinger.innerHTML = '<img src="assets/images/'+ this.secretWord + '.jpg" class="img-fluid">';
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
            game.setGunSlinger();
        } else if (game.guessCounter > 0 && guessed !== game.secretWord) {          
            var match = game.evaluateGuess(userGuess);
            if (!match) {
                game.guessCounter--;
                if (game.guessCounter === 0) {
                    game.losses++;
                    game.setPrevSecretWord();
                    game.guessCounter = 10;
                    game.guessed = [];
                    game.secretWord = "";
                    game.setNewSecretWord();
                    game.setGuessed();
                    game.setGunSlinger();
                }
            }
        } 
    }
    game.rendergame();
};
