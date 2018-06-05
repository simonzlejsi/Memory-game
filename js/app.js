/*
 * Create a list that holds all of your cards
 */

const  cards = document.getElementsByClassName('card');

var cardsList = [];

function getClasses(){
	for (let i = 0; i < 16; i++) {
		let currentCard = cards[i].firstElementChild;
		let classes = currentCard.className;
		currentCard.setAttribute('class','');

		// console.log(classes);
		cardsList.push(classes);
		// console.log(cardsList);
	}
}
getClasses();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(cardsList);

function setClasses() {
	for (let i = 0; i < 16; i++) {
		let currentCard = cards[i].firstElementChild;
		currentCard.className = cardsList[i];
		// currentCard.setAttribute('class','');

		// console.log(classes);
		// cardsList.push(classes);
		// console.log(cardsList);
	}
}

setClasses();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const deck = document.querySelector('.deck');

let moves = 0 ;

function movesN() {
	moves += 1
	document.querySelector('.moves').innerHTML = moves ;

	switch (moves) {
		case 16:
			document.querySelector('.stars').firstElementChild.remove();
			break;
		case 18: 
			document.querySelector('.stars').firstElementChild.remove();
			break;
		case 20:
			document.querySelector('.stars').firstElementChild.remove();
			break;
		default:
	}
}

var theList = [];
let counter = 0 ;

function validation() {
	if (theList[0].parentElement === theList[1].parentElement/*theList[0].className == theList[1].className*/) {
		// theList[0].parentElement.classList.add('match');
		// theList[1].parentElement.classList.add('match');
		let firstE = theList[0];
		let secondE = theList[1];

		function ifFalse() {
			firstE.parentElement.classList.remove('show','open');
			secondE.parentElement.classList.remove('show','open');
		}

		 setTimeout(ifFalse, 1000);
	} else if (theList[0].className == theList[1].className/*theList[0].parentElement === theList[1].parentElement*/){
		theList[0].parentElement.classList.add('match');
		theList[1].parentElement.classList.add('match');
		}
	else {
		let firstE = theList[0];
		let secondE = theList[1];

		function ifFalse() {
			firstE.parentElement.classList.remove('show','open');
			secondE.parentElement.classList.remove('show','open');
		}

		 setTimeout(ifFalse, 1000);
	}
}

deck.addEventListener('click',function (event) {
	theCard = event.target;
	// targeting card
	
	if (theCard.nodeName === 'LI') {
		theCard.className = 'show card open';

		// opening card 

		theList.push(theCard.firstElementChild);
		// console.log(theList);
	// adding card to the list 
	
	counter = counter + 1 ;

	if (counter == 2) {
		validation();
		counter = 0;
		theList = [];
		movesN();

	}
	}

});

function starReset() {
	const stars = document.getElementsByClassName('fa-star');
	const starsCon = document.querySelector('.stars');

	const arStars = Array.from(stars);

	for (let i = arStars.length; i < 3; i++) {
		const starsContent = document.createElement('li');
		starsContent.innerHTML = '<i class="fa fa-star"></i>';

		starsCon.appendChild(starsContent);
	}
}

const reset = document.querySelector('.restart');

reset.addEventListener('click', function () {
	getClasses();
	shuffle(cardsList);
	setClasses();
	
	counter= 0;
	moves = 0 ;
	document.querySelector('.moves').innerHTML = moves ;
	theList = [];
	for (let i = 0; i < 16; i++) {
		cards[i].classList.remove('show','open','match');
	}


	starReset();
});