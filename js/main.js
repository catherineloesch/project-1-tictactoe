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

const tl1 = new TimelineMax();
const tl2 = new TimelineMax();
const tl3 = new TimelineMax();
const tl4 = new TimelineMax();

// mp3 sound files, located in audio folder ('./../assets/audio/success.mp3')
// opensource sound files obtained from pixabay (https://pixabay.com/sound-effects/)
// Howler: https://cdnjs.com/libraries/howler

const soundWin = new Howl({
    src: ['./../assets/audio/success.mp3'],
    volume: 0.5
})

const soundDraw = new Howl({
    src: ['./../assets/audio/draw.mp3'],
    volume: 0.4
})

const soundMakeMove = new Howl({
    src: ['./../assets/audio/clicks.mp3'],
    volume: 0.5
})

const soundClick = new Howl({
    src: ['./../assets/audio/mouseClick.mp3'],
    volume: 0.5
})

const soundResetGame = new Howl({
    src: ['./../assets/audio/processing.mp3'],
    volume: 0.8
})

const soundResetScores = new Howl({
    src: ['./../assets/audio/game_button.mp3'],
    volume: 0.5
})

// var sound = new Howl({
//     src: ['sound.webm', 'sound.mp3', 'sound.wav'],
//     autoplay: true,
//     loop: true,
//     volume: 0.5,
//     onend: function() {
//       console.log('Finished!');
//     }
//   });
  

let xCurrentSymbol; // true if current symbol is x, false if current symbol is o
let gamesPlayed = 0;
let drawScore = 0;
let mute = false;
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

//svg for sad face icon
const sadFace = `<span class="draw-sad-face"> Draw! &nbsp;<svg class="icon sad-face" xmlns="http://www.w3.org/2000/svg" width="8rem" height="8rem" viewBox="0 0 20 20"><g transform="translate(20 0) scale(-1 1)"><path id="no-sound-path" fill="currentColor" d="M7.5 9.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm.062 4.89a.5.5 0 0 1-.7-.075l-.003-.003a1.91 1.91 0 0 0-.137-.137a3.069 3.069 0 0 0-.507-.37c-.461-.27-1.187-.555-2.213-.555s-1.753.284-2.216.556a3.088 3.088 0 0 0-.508.37a1.92 1.92 0 0 0-.138.137l-.003.003a.5.5 0 0 1-.777-.63l.39.314l-.39-.313v-.001l.002-.001l.002-.002l.005-.006l.014-.018l.049-.054c.04-.043.098-.102.174-.17c.152-.138.375-.316.674-.491c.6-.353 1.5-.694 2.722-.694c1.221 0 2.12.34 2.72.694c.3.176.522.353.673.49a2.907 2.907 0 0 1 .222.226l.015.017l.005.006l.002.003s.001.002-.389.314l.39-.312a.5.5 0 0 1-.078.702ZM10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm-7 8a7 7 0 1 1 14 0a7 7 0 0 1-14 0Z"/></g></svg></span>`

//svg for sound icons
const noSound = '<svg class="svg icon" id="no-sound-icon" xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 24 24"><g fill="none" stroke-width="1.5"><g stroke="currentColor" clip-path="url(#iconoirSoundOff0)"><path id="no-sound-path" stroke-linecap="round" stroke-linejoin="round" d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2"/><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z"/></g><defs><clipPath id="iconoirSoundOff0"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>'


const playSound = '<svg class="icon svg" id="play-sound-icon"  xmlns="http://www.w3.org/2000/svg" width="3.5rem" height="3.5rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path id="play-sound-path "d="M1 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H3a2 2 0 0 1-2-2Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17.5 7.5S19 9 19 11.5s-1.5 4-1.5 4m3-11S23 7 23 11.5s-2.5 7-2.5 7"/></g></svg>'

//CSS variables
console.log(window.getComputedStyle(document.documentElement).getPropertyValue('--x-color'))



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
    if (!mute) {
        soundMakeMove.play()
    }

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
    if ((e.target.id === 'btn-sound') || 
    (e.target.id === 'no-sound-icon') ||
    (e.target.id === 'no-sound-path')) {
        mute = false;
        btnSound.innerHTML = playSound
        console.log("I'm playing sounds now'!")
    } else {
        mute = true;
        btnSound.innerHTML = noSound
        console.log("I'm on mute now!")
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
    console.log(e.target)
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




//timeline

// top:46.5%;
//     left:50%;

//     startGameBtn

