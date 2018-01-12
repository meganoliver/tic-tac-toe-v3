//----------------------------GLOBAL VARIABLES---------------------------------
const startScreen = 
	`<div class="screen screen-start" id="start">
			<header>
			<h1>Tic Tac Toe</h1>
			<p>How many players are there?</p>
			<div id="radioBtns">
				<input type="radio" name="playerChoice" id="1player"><label class="radioLabel" for="1player">1 player</label>
				<input type="radio" name="playerChoice" id="2player"><label class="radioLabel" for="2player">2 players</label>
			</div>
			<div id="nameInput">
				<label class="textLabel" for="player1Name">Player 1 Name:
					<input class ="nameInput" id="player1Name" type="text" autofocus required>
				</label>
				<label class="textLabel" for="player2Name">Player 2 Name:
					<input class ="nameInput" id="player2Name" type="text">
				</label>
			</div>
			<a href="#" id="startBtn" class="button">Start game</a>
			</header>
	</div>`;

const $player1 = $('#player1');
const $player2 = $('#player2');


//-----------------------------WIN/LOSE PARAMETERS-----------------------------------

let win = function() {
	const $boxes = $('.boxes li');
	let topRowO = $boxes.filter(box => box[1, 2, 3]).filter(box => $(box).hasClass("box-filled-1"));
	console.log(topRowO);
	let middleRowO = $boxes.filter(box => box[1, 2, 3]).filter(box => $(box).hasClass("box-filled-1"));
	let bottomRowO = $boxes.filter(box => box[1, 2, 3]).filter(box => $(box).hasClass("box-filled-1"));
};


//-----------------------------BUILD THE GAME----------------------------------------
const ticTacToe = function() {

//Set up the start screen

	$('body').append(startScreen);
	const $startBtn = $('#startBtn');
	$('#nameInput').hide();
	$('#radioBtns').change(function() {
		if($('#1player').is(":checked")) {
			$('#nameInput').show().animate({height: 200}, 1000).fadeTo(500, 1);
			$('.textLabel[for="player2Name"]').hide();
		} else if($('#2player').is(":checked")) {
			$('#nameInput').show();
			$('#nameInput').show().animate({height: 270}, 1000).fadeTo(500, 1);;
			$('.textLabel[for="player2Name"]').show();
		}
	}); //End radio change listener

//Set up the game screen

	$($startBtn).click(function() {
		let $player1 = $('#player1Name').val(); 
		let $player2 = $('#player2Name').val();
		$('#start').hide();
		$('#player1').append(`<p>${$player1}</p>`);
		if($player2.length > 0) {
			$('#player2').append(`<p>${$player2}</p>`);
		} else {
			$('#player2').append(`<p>Mr. Roboto</p>`);
		}
		$('#player1').addClass("active");
	});//End game setup

//Game play

	$('.boxes li').click(function() {
		let boxChoice = this;
		if($($player1).hasClass("active")) {
			$(boxChoice).addClass("box-filled-1");
			$($player1).removeClass("active");
			$($player2).addClass("active");
		} else if($($player2).hasClass("active")) {
			$(boxChoice).addClass("box-filled-2");
			$($player2).removeClass("active");
			$($player1).addClass("active");
		} 
	});//End box selection
};

//-----------------------------PLAY THE GAME!---------------------------------------
ticTacToe();

win();










