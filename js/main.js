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

import { sadFace, noSound, playSound } from "./icons.js";
import { soundWin, soundDraw, soundMakeMoveX, soundMakeMoveO, soundClick, soundResetGame, soundResetScores, soundOn } from "./audio.js";
// import { colorCodes } from "./colors.js";


//variables
const xMove = 'x'; // setting CSS 'x' class to a variable
const oMove = 'o'; // setting CSS 'o' class to a variable

const tl1 = new TimelineMax();
const tl2 = new TimelineMax();
const tl3 = new TimelineMax();
const tl4 = new TimelineMax();

const colorCodes = {
    red: "rgb(255, 99, 71)",
    blue: "rgb(64,200,225)",
    green: "rgb(80, 200, 120)",
    yellow: "rgb(255 239 0)",
    pink: "rgb(249, 120, 185)",
    purple: "rgb(207, 159, 255)",
    orange: "rgb(247, 135, 2)",
    white: "rgb(255,255,255)"
}

// mp3 sound files, located in audio folder ('./../assets/audio/success.mp3')
// opensource sound files obtained from pixabay (https://pixabay.com/sound-effects/)
// Howler: https://cdnjs.com/libraries/howler

  

let xCurrentSymbol; // true if current symbol is x, false if current symbol is o
let gamesPlayed = 0;
let drawScore = 0;
let mute = false;
let newColorPicked = []
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



//CSS variables


//Selecting HTML elements + assigning them to variables
const grid = document.querySelector('.grid')
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)
const player1Form = document.querySelector('#player-1-input-form')
const player2Form = document.querySelector('#player-2-input-form')
const nameInputPlayer1 = document.querySelector('#player-1-name-input')
const nameInputPlayer2 = document.querySelector('#player-2-name-input')
const player1NameDisplays = document.querySelectorAll('.display-name-player-1')
const player2NameDisplays = document.querySelectorAll('.display-name-player-2')
const playerTurnDisplay = document.querySelector('.current-player-display')
const drawsDisplay = document.querySelector('.score-board .draw-score-reset .draw-score')
let scorePlayer1 = document.querySelector('#player-1-score')
let scorePlayer2 = document.querySelector('#player-2-score')
const startGameBtn = document.querySelector('.center .start-game-btn')
const startNewGameBtn = document.querySelector('.message .btn') //button appears in overlay + starts new game after a game ends (win or draw)
const btnsAddInfo = document.querySelectorAll('.btn-add-player-info') //NodeList(2)
const btnsPlayerSubmitInfo = document.querySelectorAll('.btn-submit-player-input') //NodeList(2)
const resetGameBtn = document.querySelector('.settings .btn-reset')
const btnSound = document.querySelector('.btn-sound')
const clearScoresBtn = document.querySelector('.btn.btn-clear-scores')
const message = document.querySelector('.message') // overlay that appears only when game ends (win or draw)
const winnerAnnouncement = document.querySelector('.winner-announcement') //text text that appears on overlay after game ends (win or draw)

//color dropdown
const colorOptions = document.querySelectorAll('.color-tag')
const colorDropDownPlayer1 = document.querySelector('#color-palette-player-1')
const colorDropDownPlayer2 = document.querySelector('#color-palette-player-2')
const iconPlayer1 = document.querySelector('#player-1-symbol-display')
const iconPlayer2 = document.querySelector('#player-2-symbol-display')


//-------------------------------------------------------------------------









//----------------------------------------------------------------------------


//Event Listeners
startGameBtn.addEventListener('click', startGame)
startNewGameBtn.addEventListener('click', () => {
    if (!mute) {
        soundClick.play()
    }
    initialiseGame()
})

resetGameBtn.addEventListener('click', () => {
    if (!mute) {
        soundResetGame.play()
    }
    initialiseGame()
})

clearScoresBtn.addEventListener('click', clearScores)

btnsAddInfo.forEach(btn => {
    btn.addEventListener('click', displayInputFields, {once: true})
})

btnsPlayerSubmitInfo.forEach(btn => {
    btn.addEventListener('click', handlePlayerInfoSubmit)
})

btnSound.addEventListener('click', handleSound) 
iconPlayer1.addEventListener('click', handleIcon1Click)
iconPlayer2.addEventListener('click', handleIcon2Click)
colorOptions.forEach((color) => {
    color.addEventListener('click', handleColorSelected)
})


//functions

function startGame(){
    if (!mute) {
        soundClick.play()
    }
    initialiseGame()
    tl4.fromTo(startGameBtn, 1.2, {y: 0}, {y: 1000, ease: Power2.easeInOut})
    setTimeout(function() {startGameBtn.remove()}, 1000);
   
}

function yourTurn(name) {
    const msg1 = `${name},`
    const msg2 = `it's your turn!`
    const msg3 = msg1 + `<br>` + msg2
    playerTurnDisplay.innerHTML = `<div class='your-turn'>${msg3}</div>`
}

function initialiseGame() {
    //the starting symbol should switch at every turn
    if (gamesPlayed === 0) { //if this is the first game
        xCurrentSymbol = true;          // x symbol starts
        yourTurn(player1.name)
      

    } else if (gamesPlayed%2 === 0) {//x symbol starts for even number or games
        xCurrentSymbol = true
        yourTurn(player1.name)
        

    } else {
        xCurrentSymbol = false      //o symbol starts for odd number of games
        yourTurn(player2.name)
    }
    
    allCells.forEach((cell) => {      //start with empty grid
        cell.classList.remove(xMove) //remove all x symbols in grid
        cell.classList.remove(oMove) //remove all o symbols in grid
        //attaching an eventListener to each cell so we know when player clicks on it
        cell.removeEventListener('click', handleUserInput) //remove previous eventListeners so there are no duplicates
        cell.addEventListener('click', handleUserInput,  {once: true}) //same cell can only be clicked once
        activateHoverSymbol()
       
    })

    tl2.fromTo(message, 1, {y: 0}, {y: 1000, ease: Power2.easeInOut})
    setTimeout(() => {message.classList.remove('display')}, 1000) // remove display class so overlay is not visible
                                                                    // wait until after transition effect is finishes (1s -> 1000ms)
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
    if (!mute && currentSymbol === xMove) {
            soundMakeMoveX.play()

    } else if (!mute && currentSymbol === oMove) {
        soundMakeMoveO.play()
    }

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
    yourTurn(name)

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
        drawScore++
        drawsDisplay.innerHTML = `Draws: &nbsp; ${drawScore}`
        winnerAnnouncement.innerHTML = `${sadFace} Neither player wins the game!`
        if (!mute) {
            soundDraw.play()
        }
    } else {
        if (xCurrentSymbol && (player1.symbol === xMove)
                || (!xCurrentSymbol && (player1.symbol === oMove))) {
                    player1.wins++
                    scorePlayer1.innerHTML = player1.wins
                    winnerAnnouncement.innerHTML = `${player1.name} wins the Game!`
                    if (!mute) {
                        soundWin.play()
                    }
        } else {
            player2.wins++
            scorePlayer2.innerHTML = player2.wins
            winnerAnnouncement.innerHTML = `${player2.name} wins the Game!`
            if (!mute) {
                soundWin.play()
            }
        }
        
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()
    }
    message.classList.add('display') //overlay appears only when class 'display' is added to message
    
    tl1.fromTo(message, 0.8, {y: 1000}, {y: 0, ease: Power2.easeInOut}
    )
    gamesPlayed++
}

function handleSound(e) {
    if ((e.target.id === 'btn-sound' && mute===true) || 
    (e.target.id === 'no-sound-icon') ||
    (e.target.id === 'no-sound-path')) {
        mute = false;
        soundOn.play()
        btnSound.innerHTML = playSound
        // console.log("I'm playing sounds now'!")
    } else {
        mute = true;
        btnSound.innerHTML = noSound
        // console.log("I'm on mute now!")
    }
}

// adding player names
function displayInputFields(e) { 
    if (!mute) {
        soundClick.play()
    }           //when one of the add-info buttons is clicked
    if (e.target.id === 'path-player-1' ||  //and its id matches a player-1 element
    e.target.id === 'add-info-player-1' ||      
    e.target.id === 'btn-add-info-player-1')
    {                                          
        player1Form.classList.add('display')  //add an input field to player-1
        nameInputPlayer1.focus();             //put cursor into input field
        nameInputPlayer1.select();
    } else {                                  //otherwise (button doesn't match a player-1 element)
        player2Form.classList.add('display')  //add an input field to player-2
        nameInputPlayer2.focus();             ////put cursor into input field
        nameInputPlayer2.select();
    }
}

function handlePlayerInfoSubmit(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    // console.log(e.target)
    if (e.target.parentNode.parentNode.id === 'player-1-input-form' ||
    e.target.parentNode.parentNode.id === 'btn-submit-player-1' ||
    e.target.id === 'btn-submit-player-1'
    ) 
    {
        if (nameInputPlayer1.value !== "") {
            player1.name = nameInputPlayer1.value
            player1NameDisplays.forEach(display => display.innerText = nameInputPlayer1.value)
            nameInputPlayer1.value = ''   
        }
        player1Form.classList.remove('display')
        if (xCurrentSymbol) {
            yourTurn(player1.name)

        }
    } else {
        if (nameInputPlayer2.value !== "") {
            player2.name = nameInputPlayer2.value
            player2NameDisplays.forEach(display => display.innerText = nameInputPlayer2.value)
            nameInputPlayer2.value = ''
        }
        player2Form.classList.remove('display')
        if (!xCurrentSymbol) {
            yourTurn(player2.name)

        }
    }

    btnsAddInfo.forEach((btn) => {
        removeEventListener('click', displayInputFields, {once: true})
        btn.addEventListener('click', displayInputFields, {once: true})
    })
}

function clearScores() {
    player1.wins = 0;
    player2.wins = 0;
    scorePlayer1.innerHTML = 0;
    scorePlayer2.innerHTML = 0;
    drawScore = 0;
    drawsDisplay.innerHTML = `Draws: &nbsp; ${drawScore}`
    if (!mute) {
        soundResetScores.play()
    }
}

//page loads
grid.classList.remove(xMove)
grid.classList.remove(oMove)
allCells.forEach(cell => cell.removeEventListener('click', handleUserInput))
startGameBtn.style.opacity = "1";
tl3.fromTo(startGameBtn, 1.5, {y: 1000}, {y: 0, ease: Power2.easeInOut})

function handleIcon1Click(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    colorDropDownPlayer1.classList.add('show-colors')
}

function handleIcon2Click(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    colorDropDownPlayer2.classList.add('show-colors')
}

function handleColorSelected(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    const newColor = e.target.id.slice(0, -1)
    const player = e.target.id[e.target.id.length-1]
    newColorPicked = [player, newColor]

    //After the color has been picked, the dropdown disappears
    if (player === '1') {
        colorDropDownPlayer1.classList.remove('show-colors')
    } else {
        colorDropDownPlayer2.classList.remove('show-colors')
    }
    console.log(newColorPicked)
    
    //change icon color

    changeIconColor(newColorPicked)
    //change symbol color
    
}


let crossIcon = document.querySelector('.icon.cross')
let circleIcon = document.querySelector('.icon.circle')

console.log(circleIcon)


// changing the color of icon that appears on screen next to name
function changeIconColor(newColorPicked) {
    if (newColorPicked[0] === '1') { //if player 1 picked, change X icon
        crossIcon.style.color = colorCodes[newColorPicked[1]]
        document.documentElement.style.setProperty('--x-color', colorCodes[newColorPicked[1]])
    } else {
        //if player 1 didn't pick, player 2 picked so change O icon
        circleIcon.style.color = colorCodes[newColorPicked[1]]
        document.documentElement.style.setProperty('--o-color', colorCodes[newColorPicked[1]])
    }
}




//timeline

// top:46.5%;
//     left:50%;

//     startGameBtn

