var cards = [
    {
    	rank : "queen",
    	suit : "hearts",
    	cardImage : "images/queen-of-hearts.png"
    },
    {
    	rank : "queen",
    	suit : "diamonds",
    	cardImage : "images/queen-of-diamonds.png"
    },
    {
    	rank : "king",
    	suit : "hearts",
    	cardImage : "images/king-of-hearts.png"
    },
    {
    	rank : "king",
    	suit : "diamonds",
    	cardImage : "images/king-of-diamonds.png"
    }
];
var cardsInPlay = [];

if (localStorage.highScore == undefined || localStorage.highScore == null) {
    localStorage.highScore = 0;
} else {
    document.getElementById("highScore").innerHTML = localStorage.highScore;
}

function checkForMatch() {
    if (cardsInPlay.length === 2) {
    	if (cardsInPlay[0] === cardsInPlay[1]) {
    		document.getElementById("result").innerHTML = "Congratulations, you found a match! &nbsp;<button onclick='resetBoard()'>Play again</button>";
            var scoreTag = document.getElementById("score")
            var score = Number(scoreTag.innerHTML) + 1;
            scoreTag.innerHTML = score;
            if (score > localStorage.highScore) {
                localStorage.highScore = score;
                document.getElementById("highScore").innerHTML = localStorage.highScore;
            }
    	} else {
    		document.getElementById("result").innerHTML = "Better luck next time! &nbsp;<button onclick='resetBoard()'>Try again</button>";
    	    document.getElementById("score").innerHTML = 0;
        }
    }
}

function flipCard() {
    var cardId = this.getAttribute("data-id");
    console.log("User flipped " + cards[cardId].rank);
    console.log(cards[cardId].cardImage);
    console.log(cards[cardId].suit);
    cardsInPlay.push(cards[cardId].rank);
    this.setAttribute("src", cards[cardId].cardImage);
    checkForMatch();
}

function shuffle() {
	var newDeck = [];
	for (var i = 0; i < 4; i++) {
	    var ranIndex = Math.round(Math.random() * (cards.length - 1));
	    newDeck.push(cards[ranIndex]);
	    cards.splice(ranIndex, 1);
	}
	console.log(newDeck);
	cards = newDeck;
}

function createBoard() {
	shuffle();
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-id", i);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
}

function resetBoard() {
    document.getElementById("game-board").innerHTML = "";
    document.getElementById("result").innerHTML = "&nbsp;";
    cardsInPlay = [];
    createBoard();
}

createBoard();

