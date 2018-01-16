!function() {

//----------------------------GLOBAL VARIABLES---------------------------------

const $player1 = $('#player1');
const $player2 = $('#player2');
const $board = $('.boxes li');
let $boxes = [];
	for(let i = 0; i < $board.length; i++) {
		$boxes.push($board[i]);
	}
let oWinScenarios = {
		row1: 0,
		row2: 0,
		row3: 0,
		column1: 0,
		column2: 0,
		column3: 0,
		diagonal1: 0,
		diagonal2: 0
	};

let xWinScenarios = {
		row1: 0,
		row2: 0,
		row3: 0,
		column1: 0,
		column2: 0,
		column3: 0,
		diagonal1: 0,
		diagonal2: 0
	};

//------------------------------ASSIGN CLASSES TO ROWS/COLUMNS/DIAGONALS---------------

//rows
for(let i = 0; i < $board.length; i++) {
	if(i < 3) {
		$($board[i]).addClass("topRow");
	} else if(i > 2 && i < 6) {
		$($board[i]).addClass("midRow");
	} else if(i > 5) {
		$($board[i]).addClass("botRow");
	}
};

//columns

for(let i = 0; i < $board.length; i++) {
	if(i === 0 || i === 3 || i === 6) {
		$($board[i]).addClass("leftCol");
	} else if(i === 1 || i === 4 || i === 7) {
		$($board[i]).addClass("midCol");
	} else if(i === 2 || i === 5 || i === 8) {
		$($board[i]).addClass("rightCol");
	}
};

//diagonals

for(let i = 0; i < $board.length; i++) {
	if(i === 0 || i === 4 || i === 8) {
		$($board[i]).addClass("diagonal1");
	};
	if(i === 2 || i === 4 || i === 6) {
		$($board[i]).addClass("diagonal2");
	};
};

//-------------------------------HOVER FUNCTION-----------------------------------------

const hover = function() {
	if($($player1).hasClass("active")) {
		$($boxes).hover(
			function() {
				let hoverBox = this;
				$(hoverBox).css("backgroundImage", "url(img/o.svg)")},
			function() {
				let hoverBox = this;
				$(hoverBox).removeProp("backgroundImage");
			}
		);

	} else if($($player2).hasClass("active")) {
		$($boxes).hover(
			function() {
				let hoverBox = this;
				$(hoverBox).css("backgroundImage", "url(img/x.svg)");},
			function() {
			$(hoverBox).removeProp("backgroundImage");
		})
	};
};
//-----------------------------WIN AND TIE FUNCTIONS-----------------------------------

const oWin = function() {
	
	$($board).click(function() {
		if($(this).hasClass("topRow") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.row1 += 1;
		}
		if($(this).hasClass("midRow") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.row2 += 1;
		}
		if($(this).hasClass("botRow") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.row3 += 1;
		}
		if($(this).hasClass("leftCol") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.column1 += 1;
		}
		if($(this).hasClass("midCol") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.column2 += 1;
		}
		if($(this).hasClass("rightCol") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.column3 += 1;
		}
		if($(this).hasClass("diagonal1") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.diagonal1 += 1;
		}
		if($(this).hasClass("diagonal2") && $(this).hasClass("box-filled-1")) {
			oWinScenarios.diagonal2 += 1;
		}

		for( const boxes in oWinScenarios) {
			if(oWinScenarios[boxes] === 3) {
				$('#board').hide();
				$('#finish').show();
				$('#finish').addClass("screen-win-one");
				$('.message').text("Winner");
			}
		}
	})
};

const xWin = function() {
	
	$($board).click(function() {
		if($(this).hasClass("topRow") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row1 += 1;
		}
		if($(this).hasClass("midRow") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row2 += 1;
		}
		if($(this).hasClass("botRow") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row3 += 1;
		}
		if($(this).hasClass("leftCol") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.column1 += 1;
		}
		if($(this).hasClass("midCol") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.column2 += 1;
		}
		if($(this).hasClass("rightCol") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.column3 += 1;
		}
		if($(this).hasClass("diagonal1") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.diagonal1 += 1;
		}
		if($(this).hasClass("diagonal2") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.diagonal2 += 1;
		}

		for( const boxes in xWinScenarios) {
			if(xWinScenarios[boxes] === 3) {
				$('#board').hide();
				$('#finish').show();
				$('#finish').addClass("screen-win-two");
				$('.message').text("Winner");
			}
		}
	})		
};

const tieGame = function() {
	let boxCount = oWinScenarios.row1 + oWinScenarios.row2 + oWinScenarios.row3 + xWinScenarios.row1 + xWinScenarios.row2 + xWinScenarios.row3; 
	if(boxCount === 8) {
		$('#board').hide();
		$('#finish').show();
		$('#finish').addClass("screen-win-tie");
		$('.message').text("Tie Game");
	}
};

//----------------------------------START NEW GAME----------------------------------

//-----------------------------BUILD THE GAME----------------------------------------
const ticTacToe = function() {
//Set up the start screen
	$('#board').hide();
	$('#finish').hide();
	$('#start').show();
	$('#nameInput').hide();
	$('#radioBtns').change(function() {
		if($('#1player').is(":checked")) {
			$('#nameInput').show().animate({height: 200}, 1000).fadeTo(500, 1);
			$('.textLabel[for="player2Name"]').hide();
		} else if($('#2player').is(":checked")) {
			$('#nameInput').show();
			$('#nameInput').show().animate({height: 270}, 1000).fadeTo(500, 1);
			$('.textLabel[for="player2Name"]').show();
		}
	}); //End radio change listener and start screen activity

//Set up the game screen

	//Insert names
	$('#startBtn').click(function() {
		let $player1 = $('#player1Name').val(); 
		let $player2 = $('#player2Name').val();
		if($('#1player').is(":checked") && $player1.length > 0) {
			$('#start').hide();
			$('#board').show();
			$('#player1').append(`<p>${$player1}</p>`);
			$('#player2').append(`<p>Mr. Roboto</p>`);
		} else if($('#2player').is(":checked") && $player2.length > 0) {
			$('#start').hide();
			$('#board').show();
			$('#player1').append(`<p>${$player1}</p>`);
			$('#player2').append(`<p>${$player2}</p>`);
		}
		$('#player1').addClass("active");
	});//End game setup

	

	//Game play
	$('.boxes li').click(function() {
		let boxChoice = this;
		if($($player1).hasClass("active") && $(this).hasClass("box-filled-2") === false && $(this).hasClass("box-filled-1") === false) {
			$(boxChoice).addClass("box-filled-1");
			$($player1).removeClass("active");
			$($player2).addClass("active");
		} else if($($player2).hasClass("active") && $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false) {
			$(boxChoice).addClass("box-filled-2");
			$($player2).removeClass("active");
			$($player1).addClass("active");
		} 
		tieGame();
	});//End box selection
	oWin();
	xWin();
};

//-----------------------------PLAY THE GAME!---------------------------------------

ticTacToe();
$('#finish header .button').click(function() {
	$('#player1Name').val("");
	$('#player2Name').val("");
	$('input[type="radio"]').prop('checked', false);
	ticTacToe();	
	})
} ();








