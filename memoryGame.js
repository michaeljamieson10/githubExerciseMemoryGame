let cards = document.querySelectorAll(".card");
let counterNumber = document.querySelector("#counterNumber");
let newGameButton = document.querySelector("#newGameButton");
let bestScoreLabel = document.querySelector("#bestScoreLabel");
let counterOfClicks = 0;
let cardListFlip = 0;
let lowestGameScore = localStorage.getItem('lowestGameScore');
let firstCard;
let secondCard;
let indexOfFirstCard;
let indexOfSecondCard;

newGameButton.addEventListener("click", function(){    
    reset();
    init();
});
init();
function init(){
    counterOfClicks = 0;
    counterNumber.innerText = counterOfClicks;
    if(lowestGameScore){
        bestScoreLabel.innerText = localStorage.getItem('lowestGameScore');
    }
    
    
    for(i = 0; i < cards.length; i++){
        let card = cards[i];
        card.setAttribute("data-index", i);
        card.addEventListener("click", function(){
        
            if(cardListFlip == 1){
                indexOfSecondCard = Number(card.dataset.index)
                secondCard = card.dataset.imgsrc;
                addAFlip(card);
                checkCorrect(firstCard, secondCard);


            }else if(cardListFlip == 0){
                indexOfFirstCard = Number(card.dataset.index);
                firstCard = card.dataset.imgsrc;
                addAFlip(card);
            }

        });
    }
};


function addAFlip(card){
    if(!(card.classList.contains('flip'))){
    card.classList.add("flip");
    card.style.background = "red";
    card.style.background = "url(\"" + card.dataset.imgsrc + "\")"; 
    cardListFlip++;
    counterOfClicks++;
    counterNumber.innerText = counterOfClicks;
}
}
function checkCorrect(firstCard, secondCard){
    if(firstCard == secondCard && indexOfFirstCard != indexOfSecondCard){
        cardListFlip = 0;
        isGameOver();
    }else{
        setTimeout(removeLastFlip, 1250);
    }
}
function removeLastFlip(){
    for(let j = 0; j < cards.length; j++){
        let card = cards[j];
        if(card.classList.contains('flip') && indexOfFirstCard != indexOfSecondCard){
            // console.log(indexOfSecondCard, card.dataset.index)
            if(indexOfFirstCard == Number(card.dataset.index) || indexOfSecondCard == Number(card.dataset.index)){
            
            card.classList.remove('flip');
            card.style.background = "#A6193C"; 
            cardListFlip = 0;

        }

        }
    }
}
function reset(){
    for(let j = 0; j < cards.length; j++){
        let card = cards[j];
        if(card.classList.contains('flip')){
            card.classList.remove('flip');
            card.style.background = "#A6193C"; 

            cardListFlip = 0;
        }
    }
}

function isGameOver(){
    let c = 1;
    for(let i = 0; i < cards.length; i++){
        let card = cards[i];
        if(card.classList.contains('flip')){
            c++;
            if (c == cards.length){
                addtoDatabase()
            }
        }
    }
}

//counter to be added to local storage function if hit new game 
// or if all are flipped
function addtoDatabase (){
    // if it is less than counter of clicks update
    if(!lowestGameScore){
        localStorage.setItem('lowestGameScore', counterOfClicks);
        bestScoreLabel.innerText = localStorage.getItem('lowestGameScore')
    }else if (counterOfClicks < lowestGameScore){
        lowestGameScore = counterOfClicks;
        localStorage.removeItem("lowestGameScore")
        localStorage.setItem('lowestGameScore', lowestGameScore)
        bestScoreLabel.innerText = localStorage.getItem('lowestGameScore')
        // bestScoreLabel.innerText = localStorage.getItem('lowestGameScore');
        console.log(lowestGameScore);
    }
}