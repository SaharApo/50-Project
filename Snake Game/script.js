const  playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalID = false;


const changeFoodPosition = () => {
    // Passing a random 0 - 30 values as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const hanndleGameOver = () => {
    alert("Game Over! Press OK to replay...");
}

const changeDiraction = (e) => {
    // Changing velocity value based on key pressed
    if (e.key === "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }else if (e.key === "ArrowDown") {
        velocityX = 0;
        velocityY = 1;
    }else if (e.key === "ArrowLeft") {
        velocityX = -1;
        velocityY = 0;
    }else if (e.key === "ArrowRight") {
        velocityX = 1;
        velocityY = 0;
    }
}

const initGame = () => {
    if (gameOver) return hanndleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    //Checking if the snake hit the food
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // Pushing food position to snake body array
        console.log(snakeBody);
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
        // Shifting forward the value of the elements in the snake body by one
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Setting first element of snake body to current snake position

    //Updating the snakes head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // Checking if the snake's head is out of wall, is so setting gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        // Adding a div for each part of the snake body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    }
    playBoard.innerHTML = htmlMarkup;
    // console.log({x:snakeX,y:snakeY},{x:foodX, y:foodY});
}

changeFoodPosition();
setInterval(initGame, 125);
document.addEventListener('keydown', changeDiraction);

