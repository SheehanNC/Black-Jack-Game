let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let aceCount = 0; 

let hiddenCardElement;
let hidden;
let deck;

let canHit = true; //allows the player (you) to draw while yourSum <= 21
let gameStarted = false;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();

    document.getElementById("shuffle").addEventListener("click", function() {
        if (!gameStarted) {
            shuffle();
            resetGame();
            
        }
    });
    
}

function shuffle(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }

    // Remove existing card images from the dealer and player
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";
    
    // Deal new cards after shuffling
}

function resetGame() {
    dealerSum = 0;
    playerSum = 0;
    dealerAceCount = 0;
    aceCount = 0;
    canHit = true;

    // Clear existing messages
    document.getElementById("results").innerText = "";

    hiddenCardElement.src = "./BACK.png";

    // Clear card images
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("player-cards").innerHTML = "";

    // Start a new game
    startGame();
}   

// loading the deck
function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "J","A", "Q", "K", ];
    let types = ["C", "H", "S", "D"];
    deck = [];

    for(let i=0; i<types.length; i++){
        for(let j=0; j<values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

//shuffle
function shuffleDeck(){
    for(let i=0;i<deck.length;i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    console.log(dealerSum);

    hiddenCardElement = document.createElement("img");
    hiddenCardElement.src = "./BACK.png";
    document.getElementById("dealer-cards").innerHTML = "";
    document.getElementById("dealer-cards").append(hiddenCardElement);

    while(dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(hidden);
    console.log(dealerSum);

    for(let i=0;i<2;i++){
        let cardImg= document.createElement("img");
        let card = deck.pop();
        cardImg.src = card + ".png";
        playerSum += getValue(card);
        aceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit) // clicking hit
    document.getElementById("stay").addEventListener("click", stay); //clicking stay
}

    function hit(){
        if(!canHit){
            return;
        }
        gameStarted = true;
        let cardImg= document.createElement("img");
        let card = deck.pop();
        cardImg.src = card + ".png";
        playerSum += getValue(card);
        aceCount += checkAce(card);
        document.getElementById("player-cards").append(cardImg);

       if(reduceAce(playerSum, aceCount)>21){
        canHit= false;
       }
    } 

    function stay(){
        dealerSum = reduceAce(dealerSum, dealerAceCount)
        console.log(dealerSum);
        playerSum = reduceAce(playerSum, aceCount);

        canHit=false;
        gameStarted = false;
        // document.getElementById("hidden").src = "./cards/" + hidden + ".png";
        hiddenCardElement.src = hidden + ".png";

        let message = "";
        if (playerSum > 21) {
            message = "You Lose!";
            document.getElementById("results").style.color = "red";
        }
        else if(dealerSum > 21){
            message = "You Win!";
            document.getElementById("results").style.color = "green";
        }
        else if(dealerSum === playerSum){
            message = "Tie!";
            document.getElementById("results").style.color = "blue";
        }
        else if(playerSum < dealerSum){
            message = "You Lose!";
            document.getElementById("results").style.color = "red";
        }
        else{
            message = "You Win!";
            document.getElementById("results").style.color = "green";
        }
        console.log(dealerSum);
        document.getElementById("dealer-sum").innerText = dealerSum;
        document.getElementById("player-sum").innerText = playerSum;
        document.getElementById("results").innerText = message;
    }

//returing values of cards
        function getValue(card){
            let data = card.split("-");
            let value = data[0];

            if(isNaN(value)){
                if(value ==="A"){
            return 11;
                }
                return 10;
            }
            return(parseInt(value))
        }

//counting Aces
function checkAce(card) {
    if (card[0] === "A") {
        return 1;
    }
    return 0;
}

function reduceAce(Sum, Count){
    while(playerSum > 21 && Count > 0){
        Sum-=10;
        Count-=1;
    }
    return Sum;
}
