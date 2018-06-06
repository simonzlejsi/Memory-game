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
		case 20: 
			document.querySelector('.stars').firstElementChild.remove();
			break;
		default:
	}
}

// WINNING THE GAME FUNCTION 

function openModal() {
	const popUp = document.querySelector('#modal');
	popUp.style.display = 'flex';
	myTimer.measureStop('label1');
	// TIME

	var elapsed = myTimer.measureStop('label1');
	document.querySelector('.time').textContent = 'your time  '+ elapsed/1000 + 'seconds';
	// ADD STARS
	const stars = document.getElementsByClassName('fa-star');
	const starsCon = document.querySelector('.stars');

	const arStars = Array.from(stars);
	document.querySelector('.stars-count').textContent = 'number of stars -->  ' + arStars.length;
	// BUTTONS
	const close = document.querySelector('.exit');
	const again = document.querySelector('.restart');

	close.addEventListener('click',function () {
		popUp.style.display = 'none';
	});

	again.addEventListener('click',function () {
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

		deck.addEventListener('click', timerF);
		starReset();

		popUp.style.display = 'none';
	});
}




var theList = [];
let counter = 0 ;
let win = 0 ;

// MATCH VALIDATION FUNCTION

function validation() {
	if (theList[0].parentElement === theList[1].parentElement) {
		let firstE = theList[0];
		let secondE = theList[1];

		function ifFalse() {
			firstE.parentElement.classList.remove('show','open');
			secondE.parentElement.classList.remove('show','open');
		}

		 setTimeout(ifFalse, 1000);
	} else if (theList[0].className == theList[1].className){
		theList[0].parentElement.classList.add('match');
		theList[1].parentElement.classList.add('match');
		win += 2 ;
		// WINNING THE GAME 
			if (win == 16) {
				openModal();
			}


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

// EVENT LISTENER ON CLICK

function listener(event) {
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
}

function timerF() {
	myTimer.measureStart('label1');
	deck.removeEventListener('click', timerF);
}

deck.addEventListener('click', listener);
deck.addEventListener('click', timerF);

// EVENT LISTENER ON CLICK
// RESET BUTTON FUNCTIONS

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

	deck.addEventListener('click', timerF);
	starReset();
});


// JS TIMER FUNCTION BY HUSA - https://github.com/husa/timer.js/blob/master/README.md

!function(a,b){"use strict";"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.Timer=b()}(this,function(){"use strict";function a(){c.call(this),this._.status="stopped",b.call(this,"onend")}function b(a){var b=this._.options[a],c=[].slice.call(arguments,1);"function"==typeof b&&b.apply(this,c)}function c(a){clearTimeout(this._.timeout),clearInterval(this._.interval),a===!0&&(this._.duration=0)}var d={tick:1,onstart:null,ontick:null,onpause:null,onstop:null,onend:null},e=function(a){if(!(this instanceof e))return new e(a);this._={id:+new Date,options:{},duration:0,status:"initialized",start:0,measures:[]};for(var b in d)this._.options[b]=d[b];this.options(a)};return e.prototype.start=function(c){return+c||this._.duration?(c&&(c*=1e3),this._.timeout&&"started"===this._.status?this:(this._.duration=c||this._.duration,this._.timeout=setTimeout(a.bind(this),this._.duration),"function"==typeof this._.options.ontick&&(this._.interval=setInterval(function(){b.call(this,"ontick",this.getDuration())}.bind(this),1e3*+this._.options.tick)),this._.start=+new Date,this._.status="started",b.call(this,"onstart",this.getDuration()),this)):this},e.prototype.pause=function(){return"started"!==this._.status?this:(this._.duration-=+new Date-this._.start,c.call(this,!1),this._.status="paused",b.call(this,"onpause"),this)},e.prototype.stop=function(){return/started|paused/.test(this._.status)?(c.call(this,!0),this._.status="stopped",b.call(this,"onstop"),this):this},e.prototype.getDuration=function(){return"started"===this._.status?this._.duration-(+new Date-this._.start):"paused"===this._.status?this._.duration:0},e.prototype.getStatus=function(){return this._.status},e.prototype.options=function(a,b){if(a&&b&&(this._.options[a]=b),!b&&"object"==typeof a)for(var c in a)this._.options.hasOwnProperty(c)&&(this._.options[c]=a[c]);return this},e.prototype.on=function(a,b){return"string"!=typeof a||"function"!=typeof b?this:(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=b),this)},e.prototype.off=function(a){return"string"!=typeof a?this:(a=a.toLowerCase(),"all"===a?(this._.options=d,this):(/^on/.test(a)||(a="on"+a),this._.options.hasOwnProperty(a)&&(this._.options[a]=d[a]),this))},e.prototype.measureStart=function(a){return this._.measures[a||""]=+new Date,this},e.prototype.measureStop=function(a){return+new Date-this._.measures[a||""]},e});	

// TIMER INITIALIZATION

var myTimer = new Timer();
