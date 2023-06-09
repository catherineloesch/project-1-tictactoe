

//Classes
import { Player } from "./Player.js";
import { Session } from "./Session.js";

//visuals
import { sadFace, noSound, playSound } from "./icons.js";
import { soundWin, soundDraw, soundMakeMoveX, soundMakeMoveO, soundClick, soundResetGame, soundResetScores, soundOn, soundSave, soundRetrieve } from "./audio.js";
import { colorCodes } from "./colors.js";

//timelines for transitions
const tl1 = new TimelineMax();
const tl2 = new TimelineMax();
const tl3 = new TimelineMax();
const tl4 = new TimelineMax();

//VARIABLES
let player1
let player2
const xMove = 'x'; // setting CSS 'x' class to a variable -> x appears on cell when user clicks
const oMove = 'o'; // setting CSS 'o' class to a variable -> o appears on cell when user clicks
let xCurrentSymbol; // boolean -> returns true if current symbol is x, false if current symbol is o
                    //i.e. true if player1 is currently playing, false if player2 is currently playing

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //horizontal combinations
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //vertical combinations
    [0, 4, 8], [2, 4, 6] //diagonal combinations
]

let gamesPlayed = 0; //number of games played
let drawScore = 0; //number of draws

let mute = false; //when false -> no sounds play, when true sound effects play
let newColorPicked = [] //first element of array is which player picked the color, second is which color they picked


//Selecting HTML elements + assigning them to variables
//center section of screen
const grid = document.querySelector('.grid')
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)

const btnStartGame = document.querySelector('.center .start-game-btn') //click to start first game
const btnResetGame = document.querySelector('.settings .btn-reset') //click to start new game after win/draw
const btnSave = document.querySelector('.btn-save') //click to save game session to keep playing later
const btnRetrieveData = document.querySelector('.btn-retrieve-data') //retrieve data from previously saved session
const btnSound = document.querySelector('.btn-sound') //toggle sound effects on/off

//right section of screen
const playerTurnDisplay = document.querySelector('.current-player-display') //display telling users whose turn it is

    //User input: picking a color for their symbol
const iconPlayer1 = document.querySelector('#player-1-symbol-display') //icon player1 clicks to pick color
const iconPlayer2 = document.querySelector('#player-2-symbol-display') //icon player2 clicks to pick color
const colorDropDownPlayer1 = document.querySelector('#color-palette-player-1')
const colorDropDownPlayer2 = document.querySelector('#color-palette-player-2')
const colorOptions = document.querySelectorAll('.color-tag') //colors to pick from
const crossIcon = document.querySelector('.icon.cross') //svg showing player1 their symbol is x
const circleIcon = document.querySelector('.icon.circle')//svg showing player2 their symbol is o



    
    //User input: adding their name
const btnsAddInfo = document.querySelectorAll('.btn-add-player-info') //NodeList(2)
const btnsPlayerSubmitInfo = document.querySelectorAll('.btn-submit-player-input') //NodeList(2)
const player1Form = document.querySelector('#player-1-input-form')
const player2Form = document.querySelector('#player-2-input-form')
const nameInputPlayer1 = document.querySelector('#player-1-name-input') //input field where player1 enters name
const nameInputPlayer2 = document.querySelector('#player-2-name-input') //input field where player2 enters name
const player1NameDisplays = document.querySelectorAll('.display-name-player-1') //elements on screen that display player1's name
const player2NameDisplays = document.querySelectorAll('.display-name-player-2') //elements on screen that display player2's name

//left section of screen
let scorePlayer1 = document.querySelector('#player-1-score')
let scorePlayer2 = document.querySelector('#player-2-score')

const btnClearScores = document.querySelector('.btn.btn-clear-scores') //when clicked -> sets scores and draw number back to 0
const drawsDisplay = document.querySelector('.score-board .draw-score-reset .draw-score')

//Overlay after win/draw
const message = document.querySelector('.message') // overlay that appears only when game ends (win or draw)
const winnerAnnouncement = document.querySelector('.winner-announcement') //text text that appears on overlay after game ends (win or draw)
const btnStartNewGame = document.querySelector('.message .btn') //button appears in overlay + starts new game after a game ends (win or draw)





//EVENT LISTENERS
btnStartGame.addEventListener('click', startGame) //Starts first game

btnStartNewGame.addEventListener('click', () => { //starts new game after win/draw
    if (!mute) {
        soundClick.play()
    }
    initialiseGame()
})

btnResetGame.addEventListener('click', () => { //clears the grid
    if (!mute) {
        soundResetGame.play()
    }
    initialiseGame()
})

btnSound.addEventListener('click', handleSound) //mute/unmute btn
btnSave.addEventListener('click', handleSave) //save game session to keep playing later
btnRetrieveData.addEventListener('click', retrieveSavedData)
btnClearScores.addEventListener('click', clearScores) //sets scores+draws back to 0

iconPlayer1.addEventListener('click', handleIcon1Click) //clicked when player1 wants to change color of their symbol
iconPlayer2.addEventListener('click', handleIcon2Click)//clicked when player2 wants to change color of their symbol
colorOptions.forEach((color) => { //clicked when user picks a color from palette
    color.addEventListener('click', handleColorSelected)
})

btnsAddInfo.forEach(btn => { //when btn is clicked, input fields appear for user to enter name
    btn.addEventListener('click', displayInputFields, {once: true})
})

btnsPlayerSubmitInfo.forEach(btn => { //clicked when user submits their name
    btn.addEventListener('click', handlePlayerInfoSubmit)
})


//FUNCTIONS
function startGame(){
    if (!mute) {
        soundClick.play()
    }
    initialiseGame()
    tl4.fromTo(btnStartGame, 1.2, {y: 0}, {y: 1000, ease: Power2.easeInOut}) //after start game btn is clicked it moves down
    setTimeout(function() {btnStartGame.remove()}, 1000);                   //and then it disappears
   
}

function yourTurn(player) { //Display's the name of whose turn it is on top right of screen
    if (player) {
    const msg1 = `${player.name},`
    const msg2 = `it's your turn!`
    const msg3 = msg1 + `<br>` + msg2
    if (player.color === "white") {
        playerTurnDisplay.innerHTML = `<div class='your-turn-display' style="color:${colorCodes["yellow"]};" class='your-turn'>${msg3}</div>`
    } else {
        playerTurnDisplay.innerHTML = `<div class='your-turn-display' style="color:${colorCodes[player.color]};" class='your-turn'>${msg3}</div>`

    }}
}

function initialiseGame() {
    if (gamesPlayed === 0) {    //if this is the first game
        xCurrentSymbol = true;  // x symbol/player1 starts by default
        yourTurn(player1)  //player1's name is displayed on screen 
                                //to tell them it's their turn

    } else if (gamesPlayed%2 === 0) {   //After the first round(0), players take turns starting game
        xCurrentSymbol = true           // so x symbol starts for even number or games (i.e. 0, 2, 4, 6, etc)
        yourTurn(player1)
        
    } else {                         //player2 starts the second round(1)
        xCurrentSymbol = false      //so o symbol starts for odd number of games (i.e. 1, 3, 5, 7, etc)
        yourTurn(player2)     
    }
    
    allCells.forEach((cell) => {      //start with empty grid
        cell.classList.remove(xMove) //remove all x symbols in grid
        cell.classList.remove(oMove) //remove all o symbols in grid
       
        cell.removeEventListener('click', handleUserInput) //remove any previous eventListeners so there are no duplicates
        cell.addEventListener('click', handleUserInput,  {once: true})  //attaching an eventListener to each cell so we know when a player clicks on it
                                                                        //each cell cell can only be clicked once
        activateHoverSymbol() //when hovering over a cell, a preview of player's symbol appears
       
    })

    tl2.fromTo(message, 1, {y: 0}, {y: 1000, ease: Power2.easeInOut}) 
    setTimeout(() => {message.classList.remove('display')}, 1000)
    setTimeout(() => {message.classList.remove('display-win')}, 1000)
    setTimeout(() => {message.classList.remove('display-draw')}, 1000)       // remove display classes so overlay is not visible
                                                                        // wait until after transition effect is finished (1s -> 1000ms)
}

function clearScores() { //set player scores back to 0
    player1.wins = 0;
    player2.wins = 0;
    scorePlayer1.innerHTML = 0; //display changed number on screen
    scorePlayer2.innerHTML = 0;
    drawScore = 0;              //set draw number back to 0
    drawsDisplay.innerHTML = `Draws: &nbsp; ${drawScore}` //Display changed draw score on screen
    if (!mute) {                //if mute is false
        soundResetScores.play() // play sound effect for score reset
    }
}
                                                                   
function handleUserInput(e) {
    const cell = e.target
    // if current player uses x, use CSS "x" class
    // if current player uses o, use CSS "o" class
    const currentSymbol = xCurrentSymbol ? xMove : oMove
    // display move on grid
    displayNewMove(cell, currentSymbol)

    // check if current player won or if grid is full
    if (checkForWin(currentSymbol)) {   //if one of the players won
        gameEnd(false)                  //the game ends (the argument is false because there is no draw)
    } else if (checkForDraw()) {        //if there is a draw
        gameEnd(true)                   //the game ends (argument is true because there is a draw)
    } else {                            //if no win or draw the game continues
        switchTurns()                   //and it's the other player's turn
        activateHoverSymbol()
    }
}

function displayNewMove(cell, currentSymbol) {
    cell.classList.add(currentSymbol) //adding the symbol of current player to the the cell they clicked on
    if (!mute && currentSymbol === xMove) {         //if mute is false 
            soundMakeMoveX.play()                   //play sound effect for x
    } else if (!mute && currentSymbol === oMove) {  //or
        soundMakeMoveO.play()                       //sound effect for o
    }

}

function switchTurns() {             //after player makes move, it's the other player's turn             
    xCurrentSymbol = !xCurrentSymbol// if current player uses x, switch to o
                         // if current player uses o, switch to x
    if ((xCurrentSymbol && player1.symbol === xMove) || (!xCurrentSymbol && player1.symbol === oMove)) {
        yourTurn(player1)
    } else if ((xCurrentSymbol && player1.symbol !== xMove) || (!xCurrentSymbol && player1.symbol !== oMove)) {
        yourTurn(player2)
    } else {
        yourTurn(undefined)
    }

}

function activateHoverSymbol() { //when hovering over a cell, a preview of player's symbol appears
    grid.classList.remove(xMove)
    grid.classList.remove(oMove)
    if (xCurrentSymbol) {
        grid.classList.add(xMove)
    } else {
        grid.classList.add(oMove)
    }
}

function checkForWin(currentSymbol) {   //checking grid to see if player won after making a move
    const result = winningCombinations.some((combo) => { //for each possible winning combination (array of 3 indexes e.g. [0, 1, 2])
        return combo.every(index => {   //for each of the 3 indexes, find cells in grid with matching indexes to check their classList
            return Array.from(allCells)[index].classList.contains(currentSymbol) // do the 3 cells that match those indexes contain 'x' or 'o' class?
        }) //need to turn html collection into array with Array.from()
    })
    return result  //true all 3 indexes of any of the winning combinations match -> i.e. win
                   //false if there is no match i.e. -> there's either a draw or the game continues and it's the other player's turn

}

function checkForDraw() { //checking grid to see if it is full
    const result = Array.from(allCells).every(cell => { //need to turn html collection into array
        return cell.classList.contains(xMove) || cell.classList.contains(oMove) //for every cell, does it contain either an x or an o??
    })
    return result //returns true if every cell has either an x or an o -> i.e. there's a draw
                  //returns false otherwise -> i.e. there's no draw
}

function gameEnd(draw) { //argument is true if there's a draw and false if there's a win
    if (draw) {         //if there is a draw
        drawScore++     //increase the draw number by 1
        drawsDisplay.innerHTML = `Draws: &nbsp; ${drawScore}` //display the new number of draws on screen
        winnerAnnouncement.innerHTML = `${sadFace} Neither player wins the game!` //show overlay message informing players that there is a draw
        message.classList.add('display-draw') //overlay appears only when class 'display' is added to message
        if (!mute) {                                //if mute is false
            soundDraw.play()                        //play draw sound effect
        }
    } else {       //when the game ends but there is no draw -> there is a win
        if (xCurrentSymbol && (player1.symbol === xMove) //if x is the current symbol when game ends,
                || (!xCurrentSymbol && (player1.symbol === oMove))) {   //player1 wins
                    player1.wins++    //increase player1 win number by 1
                    scorePlayer1.innerHTML = player1.wins //display new win number on screen
                    winnerAnnouncement.innerHTML = `${player1.name} wins the Game!` //inform players that player1 won overlay message
                    message.classList.add('display-win') //overlay appears only when class 'display' is added to message
                    if (!mute) {    //if mute is false
                        soundWin.play()     //play the win sound effect
                    }
        } else { //when there's a win but player1 is not the winner -> player2 wins
            player2.wins++  //increase player2 win number by 1
            scorePlayer2.innerHTML = player2.wins //display new win number on screen
            winnerAnnouncement.innerHTML = `${player2.name} wins the Game!`  //inform players that player2 won overlay message
            message.classList.add('display-win') //overlay appears only when class 'display' is added to message
            if (!mute) {    //if mute is false
                soundWin.play() //play the win sound effect
            }
        }
        
        const jsConfetti = new JSConfetti() //https://www.npmjs.com/package/js-confetti
        jsConfetti.addConfetti()            //display confetti animation
       
    }    
    tl1.fromTo(message, 0.8, {y: 1000}, {y: 0, ease: Power2.easeInOut}
    )
    gamesPlayed++
}

function handleSound(e) {
    if ((e.target.id === 'btn-sound' && mute===true) || //if user presses sound button while mute is true
    (e.target.id === 'no-sound-icon') ||                    
    (e.target.id === 'no-sound-path')) {                    
        mute = false;                               //set mute to false
        soundOn.play()                             //play sound effect for sound on
        btnSound.innerHTML = playSound             //change icon to sound on icon
    } else {                                       //otherwise
        mute = true;                               // set mute to true
        btnSound.innerHTML = noSound               //change icon to mute icon
    }
}


function displayInputFields(e) {  //when one of the add-info buttons is clicked
    if (!mute) {                //if mute is false, play click sound when user presses button
        soundClick.play()
    }          
    if (e.target.id === 'path-player-1' ||  //if clicked id id matches a player-1 element
    e.target.id === 'add-info-player-1' ||      
    e.target.id === 'btn-add-info-player-1')
    {                                          
        player1Form.classList.add('display')  //add an input field to player-1
        nameInputPlayer1.focus();             //put cursor into input field
        nameInputPlayer1.select();
    } else {                                  //otherwise (button doesn't match a player1 element)
        player2Form.classList.add('display')  //add an input field to player-2
        nameInputPlayer2.focus();             //put cursor into input field
        nameInputPlayer2.select();
    }
}

function handlePlayerInfoSubmit(e) { //when player click submit button after entering name
    e.preventDefault()              //if mute is false, play click sound when user presses button
    if (!mute) {
        soundClick.play()
    }
    if (e.target.parentNode.parentNode.id === 'player-1-input-form' || //if clicked id matches a player1 element
    e.target.parentNode.parentNode.id === 'btn-submit-player-1' ||
    e.target.id === 'btn-submit-player-1'
    ) 
    {
        if (nameInputPlayer1.value !== "") { //and if the user entered something into the box for player1
            player1.name = nameInputPlayer1.value //replace the name of "player 1" with user input
            player1NameDisplays.forEach(display => display.innerText = nameInputPlayer1.value) //display new player name on screen
            nameInputPlayer1.value = ''   //clear input field
        }
        player1Form.classList.remove('display') //remove input field
        if (xCurrentSymbol) { //if x is the current symbol
            yourTurn(player1) // display new name on the current player display

        }
    } else { //if id doesn't match a player-1 element
        if (nameInputPlayer2.value !== "") { //and if the user entered something into the box for player2
            player2.name = nameInputPlayer2.value //replace the name of "player 2" with user input
            player2NameDisplays.forEach(display => display.innerText = nameInputPlayer2.value) //display new player name on screen
            nameInputPlayer2.value = ''  //clear input field
        }
        player2Form.classList.remove('display')  //remove input field
        if (!xCurrentSymbol) { //if x is not the current symbol, i.e. o is the current symbol
            yourTurn(player2) // display new name on the current player display

        }
    }

    btnsAddInfo.forEach((btn) => {
        removeEventListener('click', displayInputFields, {once: true}) //remove event listener so there are no duplicates
        btn.addEventListener('click', displayInputFields, {once: true})//add new event listener so user can click button and change name again
    })
}


// when cross icon is clicked, show color dropdown
function handleIcon1Click(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    if (colorDropDownPlayer1.classList.contains('show-colors')) {
        colorDropDownPlayer1.classList.remove('show-colors')

    } else {
        colorDropDownPlayer1.classList.add('show-colors')
    }
   
}

// when circle icon is clicked, show color dropdown
function handleIcon2Click(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    if (colorDropDownPlayer2.classList.contains('show-colors')) {
        colorDropDownPlayer2.classList.remove('show-colors')

    } else {
        colorDropDownPlayer2.classList.add('show-colors')
    }
}

//when user clicks on a color, color dropdown disappears
function handleColorSelected(e) {
    e.preventDefault()
    if (!mute) {
        soundClick.play()
    }
    const newColor = e.target.id.slice(0, -1) //first part of id is the color name
    const player = e.target.id[e.target.id.length-1] //last letter of id is 1 for player 1, 2 for player 2
    newColorPicked = [player, newColor] //saving player + new color into an array and assigning it to a variable

    //After the color has been picked, the dropdown disappears
    if (player === '1') {
        colorDropDownPlayer1.classList.remove('show-colors')
    } else {
        colorDropDownPlayer2.classList.remove('show-colors')
    }
    changeIconColor(newColorPicked) //the symvols on screen + icon will change to new color picked    
}

// changing the color of icon that appears on screen next to name + symbols on grid
function changeIconColor(newColorPicked) {
    if (newColorPicked[0] === '1') { //if player 1 picked, change X icon
        crossIcon.style.color = colorCodes[newColorPicked[1]] //change icon to color picked by player 1
        document.documentElement.style.setProperty('--x-color', colorCodes[newColorPicked[1]]) //change color of symbols on grid
        player1.color = newColorPicked[1] //change key-value pair in player1 instance
        if (xCurrentSymbol) {
            yourTurn(player1)
        }
        
    } else {//if player 1 didn't pick, player 2 picked so change O icon
        circleIcon.style.color = colorCodes[newColorPicked[1]] //change icon to color picked by player 2
        document.documentElement.style.setProperty('--o-color', colorCodes[newColorPicked[1]]) //change color of symbols on grid
        player2.color = newColorPicked[1] //change key-value pair in player2 instance
        if (!xCurrentSymbol) {
            yourTurn(player2)
        }
    }
}


//when save button clicked
function handleSave() {
    if (!mute) {
        soundSave.play()
    }
    const xCells = []
    for (let i=0; i<9; i++) {//Find all cells with 'x' class
        if (allCells[i].classList.contains(xMove)) {
            xCells.push(i)
        }
    }

    const oCells = []
    for (let i=0; i<9; i++) {//Find all cells with 'o' class
        if (allCells[i].classList.contains(oMove)) {
            oCells.push(i)
        }
    }

    player1.cells = xCells
    player2.cells = oCells

    const saveForLater = new Session(player1, player2, drawScore, gamesPlayed, mute)
    localStorage.setItem('lastGameSession', JSON.stringify(saveForLater))
}



// WHEN PAGE LOADS
window.onload = () => {
    grid.classList.remove(xMove) //make sure there are no symbols on the grid
    grid.classList.remove(oMove)
    allCells.forEach(cell => cell.removeEventListener('click', handleUserInput))

    btnStartGame.style.opacity = "1"; //startGame btn is visible
    tl3.fromTo(btnStartGame, 1.5, {y: 1000}, {y: 0, ease: Power2.easeInOut}) //starGame btn slides into screen

    //default: player 1 has x and player 2 has o
    player1 = new Player("Player 1", xMove)
    player2 = new Player("Player 2", oMove)


}


//Retrieving local data
function retrieveSavedData() {
    let savedData = JSON.parse(localStorage.getItem('lastGameSession'))
    console.log(savedData)

    if (savedData) {
        if (!mute) {
            soundRetrieve.play()
        }
    player1 = savedData.player1 //retrieving player information
    player2 = savedData.player2
    drawScore = savedData.draws //retrieveing draw information
    gamesPlayed = savedData.gamesPlayed

    scorePlayer1.innerHTML = player1.wins //display player win numbers on screen
    scorePlayer2.innerHTML = player2.wins
    drawsDisplay.innerHTML = `Draws: &nbsp; ${drawScore}`//display draw number on screen

    //retrieve player data
    player1NameDisplays.forEach(display => display.innerText = player1.name) //display player names on screen
    player2NameDisplays.forEach(display => display.innerText = player2.name)

    crossIcon.style.color = colorCodes[player1.color] //change icon to color picked by player 1
    document.documentElement.style.setProperty('--x-color', colorCodes[player1.color]) //change color of symbols on grid
    
    circleIcon.style.color = colorCodes[player2.color] //change icon to color picked by player 2
    document.documentElement.style.setProperty('--o-color', colorCodes[player2.color]) //change color of symbols on grid

    mute = savedData.mute    //apply sound data retrieved
    if (mute) {
        btnSound.innerHTML = noSound
    } else {
        btnSound.innerHTML = playSound 
    }
    
    //1) Clear the current grid
    allCells.forEach((cell) => {      //start with empty grid
        cell.classList.remove(xMove) //remove all x symbols in grid
        cell.classList.remove(oMove) //remove all o symbols in grid
       
        cell.removeEventListener('click', handleUserInput) //remove any previous eventListeners so there are no duplicates
        cell.addEventListener('click', handleUserInput,  {once: true})  //attaching an eventListener to each cell so we know when a player clicks on it
                                                                        //each cell cell can only be clicked once
    })

    //2)Retrieve cell data + add it to the empty grid
    const xCells = player1.cells
    const oCells = player2.cells

    allCells.forEach((cell, index) => {
        if (xCells.includes(index)) {
            cell.classList.add(xMove) //place O Symbol on grid
            cell.removeEventListener('click', handleUserInput) //user can't click a cell that contains O symbol
        }
    })
    allCells.forEach((cell, index) => {
        if (oCells.includes(index)) {
            cell.classList.add(oMove) //place O Symbol on grid
            cell.removeEventListener('click', handleUserInput) //user can't click a cell that contains O symbol
        }
    })

    tl4.fromTo(btnStartGame, 1.2, {y: 0}, {y: 1000, ease: Power2.easeInOut}) //after start game btn is clicked it moves down
    setTimeout(function() {btnStartGame.remove()}, 1000);                   //and then it disappears
   

    //3) Checking whose turn it is
    if (xCells.length > oCells.length) {
        xCurrentSymbol = false
        yourTurn(player2)
    
    } else if (oCells.length > xCells.lenght) {
        xCurrentSymbol = true
        yourTurn(player1)
     
    } else { //same number of x and o on grid
        if (gamesPlayed === 0) {    //if this is the first game
            xCurrentSymbol = true;  // x symbol/player1 starts by default
            yourTurn(player1)  //player1's name is displayed on screen 
                               //to tell them it's their turn
        } else if (gamesPlayed%2 === 0) {   //After the first round(0), players take turns starting game
            xCurrentSymbol = true           // so x symbol starts for even number or games (i.e. 0, 2, 4, 6, etc)
            yourTurn(player1)
          
        } else {                         //player2 starts the second round(1)
            xCurrentSymbol = false      //so o symbol starts for odd number of games (i.e. 1, 3, 5, 7, etc)
            yourTurn(player2) 
               
        }
    }
    

    activateHoverSymbol() //when hovering over a cell, a preview of player's symbol appears
}
    }  