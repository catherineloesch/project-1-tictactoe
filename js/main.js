//when new game starts, make sure cells are all empty
//determine current player
//making a move
    //get user input
    //check if position is available on board
        //if position is taken, tell user to pick other cell i.e. make new input
        //if position is available, make the move
        //display move on board
//check if there is a winner or if board is full
    //if there is a winner
        //tell the user they won
        //update score board
    //if board is full
        //tell users it's a draw
    //if there is no winner and no draw
        //select new current player

const xMove = 'x'; // setting CSS 'x' class to a variable
const oMove = 'o'; // setting CSS 'o' class to a variable

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal combinations
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical combinations
    [0, 4, 8], [2, 4, 6] //diagonal combinations
]

//default: player 1 has x and player 2 has o
let player1 = {
    name: "Player 1",
    symbol: xMove,
    wins: 0
}

let player2 = {
    name: "Player 2",
    symbol: oMove,
    wins: 0
}

//Selecting all cells in the grid + save to a variable
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)

//Selecting the whole grid + save to a variable
const grid = document.querySelector('.grid')

//message: overlay that appears only when game ends -> select and save to variable
const message = document.querySelector('.message')

//winner announcement: text that appears inside message if either player wins the game
const winnerAnnouncement = document.querySelector('.winner-announcement')

let xCurrentSymbol; // true if current symbol is x, false if current symbol is o

initialiseGame()

function initialiseGame() {
    //attaching an eventListener to each cell so we know when player clicks on it
    xCurrentSymbol = true;
    allCells.forEach((cell) => {
    cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
    activateHoverSymbol()
    
})
}

//attaching an eventListener to each cell so we know when player clicks on it
allCells.forEach((cell) => {
    cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
})

function handleUserInput(e) {
    console.log(`${e.target.id} was clicked!`)
    const cell = e.target
    // make the move
    // if current player uses x, use CSS x class for x symbol
    // if current player uses o, use CSS o class for o symbol
    const currentSymbol = xCurrentSymbol ? xMove : oMove
    // display move on grid
    displayNewMove(cell, currentSymbol)

    // check if current player won or if grid is full
    if (checkForWin(currentSymbol)) {   //if one of the player won
        gameEnd(false)                  //the game ends
    } else if (checkForDraw()) {        //if there is a draw
        endGame(true)                   //the game ends
    } else {                            //if no win or draw the game continues
        switchTurns()                   //and it's the other player's turn
        activateHoverSymbol()
    }
    // check if current player won or if grid is full


    // if there is no winner and no draw
    // select new current player
}

function displayNewMove(cell, currentSymbol) {
    cell.classList.add(currentSymbol)
}

//after player makes move, it's the other player's turn
// if current player uses x, we switch to o
// if current player uses o, we switch to x
function switchTurns() {
    xCurrentSymbol = !xCurrentSymbol
}

function activateHoverSymbol() {
    grid.classList.remove(xMove)
    grid.classList.remove(oMove)
    if (xCurrentSymbol) {
        grid.classList.add(xMove)
    } else {
        grid.classList.add(oMove)
    }
}

function checkForWin(currentSymbol) {
    const result = winningCombinations.some((combo) => {
        return combo.every(index => {
            return allCells[index].classList.contains(currentSymbol)
        })
    })
    return result

}

function checkForDraw() {}

function gameEnd(draw) {
    if (draw) {

    } else {
        winnerAnnouncement.innerText = `${xCurrentSymbol ? "X" : "O"} wins the Game!`
    }
    message.classList.add('display') //overlay appears only when class 'display' is added to message

}