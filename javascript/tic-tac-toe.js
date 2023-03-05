function ticTacToe() {
	const cells = document.querySelectorAll("td");
	const result = document.querySelector("#result");
	const playAgain = document.querySelector("#play-again");
	let player = "X";
	let moves = 0;
	let board = ["", "", "", "", "", "", "", "", ""];
  
	function updateTurn() {
		const turn = document.querySelector("#turn");
		turn.textContent = `Runda gracza ${player}`;
	}
  
	function updateBoard() {
		cells.forEach((cell, index) => {
			cell.textContent = board[index];
		});
	}
  
	function checkWin() {
		const winCombinations = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		return winCombinations.some(combination => {
			return combination.every(index => {
				return board[index] === player;
			});
		});
	}
  
	function endGame() {
		cells.forEach(cell => {
			cell.removeEventListener("click", handleClick);
		});
		playAgain.style.display = "block";
	}
  
	function resetGame() {
		player = "X";
		moves = 0;
		board = ["", "", "", "", "", "", "", "", ""];
		updateTurn();
		updateBoard();
		result.style.display = "none";
		playAgain.style.display = "none";
		cells.forEach(cell => {
			cell.addEventListener("click", handleClick, { once: true });
		});
	}
  
	function handleClick(event) {
		const cell = event.target;
		const cellIndex = cell.id;
		board[cellIndex] = player;
		cell.textContent = player;
		moves++;
		if (checkWin()) {
			result.textContent = `${player} Wygrywa!`;
			endGame();
		} else if (moves === 9) {
			result.textContent = "Remis!";
			endGame();
		} else {
			player = player === "X" ? "O" : "X";
			updateTurn();
		}
	}
  
	cells.forEach(cell => {
		cell.addEventListener("click", handleClick, { once: true });
	});
  
	playAgain.addEventListener("click", resetGame);
  }
  
  ticTacToe(); // call the function to initialize the game
  