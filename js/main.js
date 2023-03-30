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


//variables
const xMove = 'x'; // setting CSS 'x' class to a variable
const oMove = 'o'; // setting CSS 'o' class to a variable


let xCurrentSymbol; // true if current symbol is x, false if current symbol is o
let gamesPlayed = 0

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

//svg for sad face
const sadFace = `<span class="draw-sad-face"> Draw! <svg class="icon sad-face" xmlns="http://www.w3.org/2000/svg" width="9rem" height="9rem" viewBox="0 0 20 20"><g transform="translate(20 0) scale(-1 1)"><path fill="currentColor" d="M7.5 9.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm.062 4.89a.5.5 0 0 1-.7-.075l-.003-.003a1.91 1.91 0 0 0-.137-.137a3.069 3.069 0 0 0-.507-.37c-.461-.27-1.187-.555-2.213-.555s-1.753.284-2.216.556a3.088 3.088 0 0 0-.508.37a1.92 1.92 0 0 0-.138.137l-.003.003a.5.5 0 0 1-.777-.63l.39.314l-.39-.313v-.001l.002-.001l.002-.002l.005-.006l.014-.018l.049-.054c.04-.043.098-.102.174-.17c.152-.138.375-.316.674-.491c.6-.353 1.5-.694 2.722-.694c1.221 0 2.12.34 2.72.694c.3.176.522.353.673.49a2.907 2.907 0 0 1 .222.226l.015.017l.005.006l.002.003s.001.002-.389.314l.39-.312a.5.5 0 0 1-.078.702ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></g></svg></span>`


//Selecting HTML elements + assigning them to variables
const grid = document.querySelector('.grid')
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)
const message = document.querySelector('.message') // overlay that appears only when game ends (win or draw)
const winnerAnnouncement = document.querySelector('.winner-announcement') //text text that appears on overlay after game ends (win or draw)
const startNewGameBtn = document.querySelector('.message .btn') //button appears in overlay + starts new game after a game ends (win or draw)
const nameInputPlayer1 = document.querySelector('#player-1-name-input')
const nameInputPlayer2 = document.querySelector('#player-2-name-input')
const player1NameDisplays = document.querySelectorAll('.display-name-player-1')
const player2NameDisplays = document.querySelectorAll('.display-name-player-2')
const playerTurnDisplay = document.querySelector('.current-player')
const addInfoButtons = document.querySelectorAll('.add-player-info.btn') //NodeList(2)
const player1Form = document.querySelector('#player-1-input-form')
const player2Form = document.querySelector('#player-2-input-form')
const btnsPlayerSubmitInfo = document.querySelectorAll('.btn-submit-player-input') //NodeList(2)
const resetGameBtn = document.querySelector('.settings .btn-reset')
const clearScoresBtn = document.querySelector('.btn.btn-clear-scores')
let scorePlayer1 = document.querySelector('#player-1-score')
let scorePlayer2 = document.querySelector('#player-2-score')


//Event Listeners
startNewGameBtn.addEventListener('click', initialiseGame)
resetGameBtn.addEventListener('click', initialiseGame)
clearScoresBtn.addEventListener('click', clearScores)

allCells.forEach((cell) => { //attaching an eventListener to each cell so we know when player clicks on it
    cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
})

addInfoButtons.forEach(btn => {
    btn.addEventListener('click', displayInputFields, {once: true})
})

btnsPlayerSubmitInfo.forEach(btn => {
    btn.addEventListener('click', handlePlayerInfoSubmit)
})

//functions
function initialiseGame() {
    //the starting symbol should switch at every turn
    if (gamesPlayed === 0) { //if this is the first game
        xCurrentSymbol = true;          // x symbol starts
    } else if (gamesPlayed%2 === 0) {//x symbol starts for even number or games
        xCurrentSymbol = true
    } else {
        xCurrentSymbol = false      //o symbol starts for odd number of games
    }
    
    allCells.forEach((cell) => {      //start with empty grid
        cell.classList.remove(xMove) //remove all x symbols in grid
        cell.classList.remove(oMove) //remove all o symbols in grid
        //attaching an eventListener to each cell so we know when player clicks on it
        cell.removeEventListener('click', handleUserInput) //remove previous eventListeners so there are no duplicates
        cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
        activateHoverSymbol()
        message.classList.remove('display') //remove wind/draw overlay
    })
}

function handleUserInput(e) {
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
        gameEnd(true)                   //the game ends
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
    let name;
    if ((xCurrentSymbol && player1.symbol === xMove) || (!xCurrentSymbol && player1.symbol === oMove)) {
        name = player1.name
    } else if ((xCurrentSymbol && player1.symbol !== xMove) || (!xCurrentSymbol && player1.symbol !== oMove)) {
        name = player2.name
    } else {
        name = undefined
    }
    playerTurnDisplay.innerText = `${name}, it's your turn!`

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
            return Array.from(allCells)[index].classList.contains(currentSymbol) //need to turn html collection into array
        })
    })
    return result

}

function checkForDraw() { //returns true if every cell has either an x or an o
    const result = Array.from(allCells).every(cell => { //need to turn html collection into array
        return cell.classList.contains(xMove) || cell.classList.contains(oMove)
    })
    return result
}

function gameEnd(draw) {
    if (draw) {
        winnerAnnouncement.innerHTML = `${sadFace} Neither player wins the game!`
    } else {
        if (xCurrentSymbol && (player1.symbol === xMove)
                || (!xCurrentSymbol && (player1.symbol === oMove))) {
                    player1.wins++
                    scorePlayer1.innerHTML = player1.wins
                    winnerAnnouncement.innerHTML = `${player1.name} wins the Game!`
        } else {
            player2.wins++
            scorePlayer2.innerHTML = player2.wins
            winnerAnnouncement.innerHTML = `${player2.name} wins the Game!`
        }
    }
    message.classList.add('display') //overlay appears only when class 'display' is added to message
    gamesPlayed++
}

// adding player names
function displayInputFields(e) {
    // console.log(e.target.parentNode.parentNode.id)
    if (e.target.parentNode.parentNode.id === 'player-1-add-info-btn' ||
    e.target.parentNode.parentNode.id === 'player-1') {
        player1Form.classList.add('display')
    } else {
        player2Form.classList.add('display')
    }
}

function handlePlayerInfoSubmit(e) {
    e.preventDefault()

    if (e.target.parentNode.parentNode.id === 'player-1-input-form' ||
    e.target.parentNode.parentNode.id === 'btn-submit-player-1') {
        if (nameInputPlayer1.value !== "") {
            player1.name = nameInputPlayer1.value
            player1NameDisplays.forEach(display => display.innerText = nameInputPlayer1.value)
            nameInputPlayer1.value = ''   
        }
        player1Form.classList.remove('display')
        console.log(`Player 1's name is ${player1.name}`)
    } else {
        if (nameInputPlayer2.value !== "") {
            player2.name = nameInputPlayer2.value
            player2NameDisplays.forEach(display => display.innerText = nameInputPlayer2.value)
            nameInputPlayer2.value = ''
        }
        player2Form.classList.remove('display')
        console.log(`Player 2's name is ${player2.name}`)   
    }
    
    addInfoButtons.forEach((btn) => {
        removeEventListener('click', displayInputFields, {once: true})
        btn.addEventListener('click', displayInputFields, {once: true})
    })
}

function clearScores() {
    player1.wins = 0;
    player2.wins = 0;
    scorePlayer1.innerHTML = 0;
    scorePlayer2.innerHTML = 0;
}

//when page loads, first game starts
initialiseGame()