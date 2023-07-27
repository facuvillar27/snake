var blockSize = 16;
var total_row = 40; //total row number
var total_col = 60; //total column number
var board;
var context;

var snakeX = blockSize * 4;
var snakeY = blockSize * 4;

// Set the total number of rows and columns
var speedX = 0; //speed of snake in x coordinate.
var speedY = 0; //speed of snake in Y coordinate.

var snakeBody = [];

var foodX;
var foodY;

var score = 1;
var gameOver = false;

window.onload = function () {
	// Set board height and width
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keydown", changeDirection); //for movements
	// Set snake speed
    if (snakeBody.length < 10) {
        setInterval(update, 1000 / 10);
    } else if (snakeBody.length < 20) {
        setInterval(update, 1000 / 50);
    } else {
        setInterval(update, 1000 / 100);
    }
    console.log(snakeBody.length)
}

function update() {
	if (gameOver) {
		return;
	}

	// Background of a Game
	context.fillStyle = "black";
	context.fillRect(0, 0, board.width, board.height);

	// Set food color and position
	context.fillStyle = "yellow";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
        console.log(snakeBody.length)

        // Incrementar el puntaje
        score++;
        // Mostrar el puntaje en pantalla
        document.getElementById("score").innerText = "Score: " + score;
	}

	// body of snake will grow
	for (let i = snakeBody.length - 1; i > 0; i--) {
		// it will store previous part of snake to the current part
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "white";
	snakeX += speedX * blockSize; //updating Snake position in X coordinate.
	snakeY += speedY * blockSize; //updating Snake position in Y coordinate.
	context.fillRect(snakeX + 2, snakeY + 2, blockSize - 4, blockSize - 4);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0] + 2, snakeBody[i][1] + 2, blockSize - 4, blockSize - 4);
	}

	if (snakeX < 0
		|| snakeX > total_col * blockSize
		|| snakeY < 0
		|| snakeY > total_row * blockSize) {
		
		// Out of bound condition
		gameOver = true;
		alert("Game Over! Your score is " + score);
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
			
			// Snake eats own body
			gameOver = true;
			alert("Game Over! Your score is " + score);
		}
	}
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) {
		// Si se presiona la flecha hacia arriba y la serpiente no se mueve hacia abajo
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		// Si se presiona la flecha hacia abajo y la serpiente no se mueve hacia arriba
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		// Si se presiona la flecha hacia la izquierda y la serpiente no se mueve hacia la derecha
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		// Si se presiona la flecha hacia la derecha y la serpiente no se mueve hacia la izquierda
		speedX = 1;
		speedY = 0;
	}
	else if (e.type === "touchstart") {
		// Para dispositivos táctiles, detectar el movimiento del dedo y ajustar la dirección de la serpiente
		const touchX = e.touches[0].clientX;
		const touchY = e.touches[0].clientY;
		const deltaX = touchX - snakeX;
		const deltaY = touchY - snakeY;
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			speedX = deltaX > 0 ? 1 : -1;
			speedY = 0;
		} else {
			speedX = 0;
			speedY = deltaY > 0 ? 1 : -1;
		}
	}
}

// Randomly place food
function placeFood() {

	// in x coordinates.
	foodX = Math.floor(Math.random() * total_col) * blockSize;
	
	//in y coordinates.
	foodY = Math.floor(Math.random() * total_row) * blockSize;
}