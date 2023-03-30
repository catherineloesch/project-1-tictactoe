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

let xCurrentSymbol; // true if current symbol is x, false if current symbol is o
let gamesPlayed = 0

//Selecting all cells in the grid + save to a variable
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)

//Selecting the whole grid + save to a variable
const grid = document.querySelector('.grid')

//message: overlay that appears only when game ends -> select and save to variable
const message = document.querySelector('.message')

//winner announcement: text that appears inside message if either player wins the game
const winnerAnnouncement = document.querySelector('.winner-announcement')

//selecting button to start new game after game end
const startNewGameBtn = document.querySelector('.message .btn')


initialiseGame()

startNewGameBtn.addEventListener('click', initialiseGame)

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

//attaching an eventListener to each cell so we know when player clicks on it
allCells.forEach((cell) => {
    cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
})

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
        winnerAnnouncement.innerHTML = 'Draw! <br> Neither player wins the game :('
    } else {
        winnerAnnouncement.innerHTML = `${xCurrentSymbol ? "X" : "O"} wins the Game!`
    }
    message.classList.add('display') //overlay appears only when class 'display' is added to message
    gamesPlayed++

}


// adding player names
//selecting buttons that let player enter info
const addInfoButtons = document.querySelectorAll('.add-player-info.btn') //NodeList(2)
const player1Form = document.querySelector('#player-1-input-form')
const player2Form = document.querySelector('#player-2-input-form')

addInfoButtons.forEach(btn => {
    btn.addEventListener('click', displayInputFields, {once: true})
})


function displayInputFields(e) {
    // console.log(e.target.parentNode.parentNode.id)
    if (e.target.parentNode.parentNode.id === 'player-1-add-info-btn' ||
    e.target.parentNode.parentNode.id === 'player-1') {
        player1Form.classList.add('display')
    } else {
        player2Form.classList.add('display')
    }
}


const btnsPlayerSubmitInfo = document.querySelectorAll('.btn-submit-player-input') //NodeList(2)
btnsPlayerSubmitInfo.forEach(btn => {
    btn.addEventListener('click', handlePlayerInfoSubmit)
})

const nameInputPlayer1 = document.querySelector('#player-1-name-input')
const nameInputPlayer2 = document.querySelector('#player-2-name-input')

function handlePlayerInfoSubmit(e) {
    e.preventDefault()

    if (e.target.parentNode.parentNode.id === 'player-1-input-form' ||
    e.target.parentNode.parentNode.id === 'btn-submit-player-1') {
        if (nameInputPlayer1.value !== "") {
            player1.name = nameInputPlayer1.value
            nameInputPlayer1.value = ''   
        }
        player1Form.classList.remove('display')
        console.log(`Player 1's name is ${player1.name}`)
    } else {
        if (nameInputPlayer2.value !== "") {
            player2.name = nameInputPlayer2.value
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


//Reset Game button clicked -> resets the game
resetGameBtn = document.querySelector('.settings .btn-reset')
resetGameBtn.addEventListener('click', initialiseGame)