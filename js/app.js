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

let openBoxes = [];
let boxChoice;
let done = false;
let hoverBox;

//------------------------------ASSIGN CLASSES TO ROWS/COLUMNS/DIAGONALS---------------

//rows
for(let i = 0; i < $board.length; i++) {
	if(i < 3) {
		$($board[i]).addClass("row1");
	} else if(i > 2 && i < 6) {
		$($board[i]).addClass("row2");
	} else if(i > 5) {
		$($board[i]).addClass("row3");
	}
}

//columns

for(let i = 0; i < $board.length; i++) {
	if(i === 0 || i === 3 || i === 6) {
		$($board[i]).addClass("column1");
	} else if(i === 1 || i === 4 || i === 7) {
		$($board[i]).addClass("column2");
	} else if(i === 2 || i === 5 || i === 8) {
		$($board[i]).addClass("column3");
	}
}

//diagonals

for(let i = 0; i < $board.length; i++) {
	if(i === 0 || i === 4 || i === 8) {
		$($board[i]).addClass("diagonal1");
	}
	if(i === 2 || i === 4 || i === 6) {
		$($board[i]).addClass("diagonal2");
	}
}

//-------------------------------START SCREEN------------------------------------------

const startScreen = function() {
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
};

//-------------------------------HOVER FUNCTION-----------------------------------------

$('#board').mouseenter(function(e) {
	hoverBox = e.target;
	console.log("hover!");
	if(!$(hoverBox).hasClass("box-filled-1") && !$(hoverBox).hasClass("box-filled-2") ) {
		console.log("hover");
		if($($player1).hasClass("active")) {
			console.log("player 1");
			$(hoverBox).css({"background-image": "url(img/o.svg)"});
		}
		if($($player2).hasClass("active")) {
			$(hoverBox).css({"background-image": "url(img/x.svg)"});
		}
	}
	}).mouseout(function(e) {
		$(hoverBox).removeAttr("style");
});
	


//------------------------------GAME PLAY------------------------------------------

const onePlayerGame = function() {
	$($board).click(function() {
		done = false;
		let boxChoice = this;
		if($($player1).hasClass("active") && $(this).hasClass("box-filled-2") === false && $(this).hasClass("box-filled-1") === false) {
			$(boxChoice).css("pointerEvents", "none");
			$(boxChoice).addClass("box-filled-1");
			$($player1).removeClass("active");
			$($player2).addClass("active");
			openBoxes = $($boxes).not(document.getElementsByClassName("box-filled-1")).not(document.getElementsByClassName("box-filled-2"));
		}
	});
	oWin();

	$($board).click(function() {
		console.log(done);
		done = false;
		let boxChoice = this;
		let rowColumn;
		let almostWinO = [];
		let almostWinX = [];

		if($($player2).hasClass("active")) {
			$(boxChoice).css("pointerEvents", "none");
			$.each(xWinScenarios, function(key, value) {
				if(value === 2){
					rowColumn = key;
				}
			});
			if(rowColumn !== undefined){
				almostWinX = $(`.${rowColumn}`).toArray();
			}
			if(almostWinX !== []) {
				$.each(almostWinX, function(i, val) {
					if($(almostWinX[i]).hasClass("box-filled-1") === false && $(almostWinX[i]).hasClass("box-filled-2") === false && done === false) {
						$(almostWinX[i]).addClass("box-filled-2");
						done = true;
						$($player2).removeClass("active");
						$($player1).addClass("active");
					}
				});
			}

			$.each(oWinScenarios, function(key, value) {
				if(value === 2){
					rowColumn = key;
				}
			});
			if(rowColumn !== undefined) {
				almostWinO = $(`.${rowColumn}`).toArray();
			}
			if(almostWinO.length === 3) {
				$.each(almostWinO, function(i, val) {
					if($(almostWinO[i]).hasClass("box-filled-1") === false && $(almostWinX[i]).hasClass("box-filled-2") === false && $(done) === false) {
						$(almostWinO[i]).addClass("box-filled-2");
						done = true;
						$($player2).removeClass("active");
						$($player1).addClass("active");
					}
				});
			}
			if(rowColumn === undefined && done === false) {
				$(openBoxes[0]).addClass("box-filled-2");
				done = true;
				$($player2).removeClass("active");
				$($player1).addClass("active");
			}
		}
		tieGame();
	});	
	xWin();	
};
	


const twoPlayerGame = function() {	
	$($board).click(function() {
		let boxChoice = this;
		if($($player1).hasClass("active") && $(this).hasClass("box-filled-2") === false && $(this).hasClass("box-filled-1") === false) {
			$(boxChoice).css("pointerEvents", "none");
			$(boxChoice).addClass("box-filled-1");
			$($player1).removeClass("active");
			$($player2).addClass("active");
		} else if($($player2).hasClass("active") && $(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false) {
			$(boxChoice).css("pointerEvents", "none");
			$(boxChoice).addClass("box-filled-2");
			$($player2).removeClass("active");
			$($player1).addClass("active");
		} 
		tieGame();
	});
	oWin();
	xWin();	
};

//-------------------------------START GAME--------------------------------------------

const startGame = function() {
		let $player1 = $('#player1Name').val(); 
		let $player2 = $('#player2Name').val();
		$('#start').slideUp(700);
		$('#board').fadeIn(900);
		$('#player1').addClass("active");
		if($('#1player').is(":checked") && $player1.length > 0) {
				$('#player1').append(`<p>${$player1}</p>`);
				$('#player2').append(`<p>Mr. Roboto</p>`);
				onePlayerGame();
		} else if($('#2player').is(":checked") && $player1.length > 0 && $player2.length > 0) {
				$('#player1').append(`<p id="nameOne">${$player1}</p>`);
				$('#player2').append(`<p id="nameTwo">${$player2}</p>`);
				twoPlayerGame();
			}
};

//-----------------------------WIN AND TIE FUNCTIONS-----------------------------------

const oWin = function() {
	$($board).click(function() {
			if($(this).hasClass("row1") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.row1 += 1;
			}
			if($(this).hasClass("row2") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.row2 += 1;
			}
			if($(this).hasClass("row3") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.row3 += 1;
			}
			if($(this).hasClass("column1") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.column1 += 1;
			}
			if($(this).hasClass("column2") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.column2 += 1;
			}
			if($(this).hasClass("column3") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.column3 += 1;
			}
			if($(this).hasClass("diagonal1") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.diagonal1 += 1;
			}
			if($(this).hasClass("diagonal2") && $(this).hasClass("box-filled-1")) {
				oWinScenarios.diagonal2 += 1;
			}
		
			console.log(oWinScenarios);

		for( const boxes in oWinScenarios) {
			let $player1 = $('#player1Name').val(); 
			setTimeout(function(){
				if(oWinScenarios[boxes] === 3) {
					$('#board').slideUp(700);
					$('#finish').fadeIn(700);
					$('#finish').addClass("screen-win-one");
					$('.message').text(`${$player1} is the winner!`);
				}
			}, 1000);
		}
	});	
};

const xWin = function() {
	
	$($board).click(function() {
		if($(this).hasClass("row1") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row1 += 1;
		}
		if($(this).hasClass("row2") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row2 += 1;
		}
		if($(this).hasClass("row3") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.row3 += 1;
		}
		if($(this).hasClass("column1") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.column1 += 1;
		}
		if($(this).hasClass("column2") && $(this).hasClass("box-filled-2")) {
			xWinScenarios.column2 += 1;
		}
		if($(this).hasClass("column3") && $(this).hasClass("box-filled-2")) {
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
				let $player2 = $('#player2Name').val();
				setTimeout(function(){
					$('#board').slideUp(700);
					$('#finish').fadeIn(700);
					$('#finish').addClass("screen-win-two");
					$('.message').text(`${$player2} is the winner!`);
				}, 1000);
				
			}
		}
	});	
};

const tieGame = function() {
	let boxCount = oWinScenarios.row1 + oWinScenarios.row2 + oWinScenarios.row3 + xWinScenarios.row1 + xWinScenarios.row2 + xWinScenarios.row3; 
	setTimeout(function(){	
		if(boxCount === 8) {
			$('#board').slideUp(700);
			$('#finish').fadeIn(700);
			$('#finish').addClass("screen-win-tie");
			$('.message').text("It's a tie!");
		}
	}, 1000);
	
};

//----------------------------NEW GAME---------------------------------------------

const startOver = function() {
	location.reload();
};

//-----------------------------BUILD THE GAME----------------------------------------
const ticTacToe = function() {

	startScreen();

	$('#startBtn').click(function() {
		startGame();
	});

	$('#newGame').click(function() {
		startOver();	
	});

};

//-----------------------------PLAY THE GAME!---------------------------------------

ticTacToe();
} ();








