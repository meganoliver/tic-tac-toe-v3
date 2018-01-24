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

let almostWinO = [];
let almostWinX = [];
let openBoxes = [];
let boxChoice;
let done = false;
let hoverBox;
let block = "";
let win = "";
let rowColumnX;
let rowColumnO;

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

//-----------------------------WIN AND TIE FUNCTIONS-----------------------------------

const endGame = function() {
	let $player1Name = $('#player1Name').val(); 
	let $player2Name = $('#player2Name').val();
	 oWinScenarios = {
		row1: 0,
		row2: 0,
		row3: 0,
		column1: 0,
		column2: 0,
		column3: 0,
		diagonal1: 0,
		diagonal2: 0
	};

	xWinScenarios = {
		row1: 0,
		row2: 0,
		row3: 0,
		column1: 0,
		column2: 0,
		column3: 0,
		diagonal1: 0,
		diagonal2: 0
	};

		$.each($board, function() {
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
		});
		

	let boxCount = oWinScenarios.row1 + oWinScenarios.row2 + oWinScenarios.row3 + xWinScenarios.row1 + xWinScenarios.row2 + xWinScenarios.row3; 
	
	if($($player1).hasClass("active")) {
		setTimeout(function(){
			for( const boxes in oWinScenarios) {
				if(oWinScenarios[boxes] === 3) {
					$('#board').slideUp(700);
					$('#finish').fadeIn(700);
					$('#finish').addClass("screen-win-one");
					$('.message').text(`${$player1Name} is the winner!`);
				} else if(boxCount === 8) {
				$('#board').slideUp(700);
				$('#finish').fadeIn(700);
				$('#finish').addClass("screen-win-tie");
				$('.message').text("It's a tie!");
				}
			}
		}, 700);
	} else if($($player2).hasClass("active")) {
		setTimeout(function(){
			for( const boxes in xWinScenarios) {
				if(xWinScenarios[boxes] === 3) {
					$('#board').slideUp(700);
					$('#finish').fadeIn(700);
					$('#finish').addClass("screen-win-two");
					$('.message').text(`${$player2Name} is the winner!`);
				} else if(boxCount === 8) {
				$('#board').slideUp(700);
				$('#finish').fadeIn(700);
				$('#finish').addClass("screen-win-tie");
				$('.message').text("It's a tie!");
				}
			} 
		}, 700);
	} 
};


//-------------------------------START SCREEN------------------------------------------

const startScreen = function() {
	$('#board').hide();
		$('#finish').hide();
		$('#start').show();
		$('#nameInput').hide();
		$('#radioBtns').change(function() {
			$('#player1Name').focus();
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
	if(!$(hoverBox).hasClass("box-filled-1") && !$(hoverBox).hasClass("box-filled-2") ) {
		if($($player1).hasClass("active")) {
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
			endGame();
			console.log(oWinScenarios);
			console.log(xWinScenarios);
			$($player1).removeClass("active");
			$($player2).addClass("active");
			openBoxes = $($boxes).not(document.getElementsByClassName("box-filled-1")).not(document.getElementsByClassName("box-filled-2"));
		}
		if($($player2).hasClass("active")) {
			$.each(xWinScenarios, function(key, value) {
				if(value === 2){
					rowColumnX = key;
					almostWinX = $(`.${rowColumnX}`).toArray();
					win = almostWinX.filter(Xitem => {
						if($(Xitem).hasClass("box-filled-2") || $(Xitem).hasClass("box-filled-1")) {
							return false;
						} else {
							return true;
						}
				});
				}
			});
			$.each(oWinScenarios, function(key, value) {
				if(value === 2){
					rowColumnO = key;
					almostWinO = $(`.${rowColumnO}`).toArray();
					block = almostWinO.filter(Oitem => {
						if($(Oitem).hasClass("box-filled-1") || $(Oitem).hasClass("box-filled-2")) {
							return false;
						} else {
							return true;
						}
					});
				}
			});

			if(win.length === 1 && done === false) {
					$(win).addClass("box-filled-2");
					endGame();
					done = true;
					$($player2).removeClass("active");
					$($player1).addClass("active");
			} else if(block.length === 1 && done === false) {
					$(block).addClass("box-filled-2");
					endGame();
					done = true;
					$($player2).removeClass("active");
					$($player1).addClass("active");
			} else if(rowColumnX === undefined && rowColumnO === undefined && done === false) {
				$(openBoxes[0]).addClass("box-filled-2");
				endGame();
				done = true;
				$($player2).removeClass("active");
				$($player1).addClass("active");
			}
		}

	});	
	
};

const twoPlayerGame = function() {		
	$($board).click(function() {
		let boxChoice = this;
		if($($player1).hasClass("active")) {
			if($(this).hasClass("box-filled-2") === false && $(this).hasClass("box-filled-1") === false) {
				$(boxChoice).css("pointerEvents", "none");
				$(boxChoice).addClass("box-filled-1");
				endGame();
				$($player1).removeClass("active");
				$($player2).addClass("active");
			}
		} else if($($player2).hasClass("active")) {
			if($(this).hasClass("box-filled-1") === false && $(this).hasClass("box-filled-2") === false) {
				$(boxChoice).css("pointerEvents", "none");
				$(boxChoice).addClass("box-filled-2");
				endGame();
				$($player2).removeClass("active");
				$($player1).addClass("active");	
			}
		}
	});	
};

//-------------------------------START GAME--------------------------------------------

const startGame = function() {
		let $player1Name = $('#player1Name').val(); 
		let $player2Name = $('#player2Name').val();
		$('#start').slideUp(700);
		$('#board').fadeIn(900);
		$('#player1').addClass("active");
		if($('#1player').is(":checked") && $player1.length > 0) {
				$('#player1').append(`<p>${$player1Name}</p>`);
				$('#player2').append(`<p>Mr. Roboto</p>`);
				onePlayerGame();
		} else if($('#2player').is(":checked") && $player1.length > 0 && $player2.length > 0) {
				$('#player1').append(`<p id="nameOne">${$player1Name}</p>`);
				$('#player2').append(`<p id="nameTwo">${$player2Name}</p>`);
				twoPlayerGame();
			}
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








