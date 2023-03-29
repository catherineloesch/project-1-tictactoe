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


let xCurrentSymbol = true;
const xMove = 'x';
const oMove = 'o';

//Selecting all cells in the grid + save to a variable
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)


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
    switchTurns()
        // check if there is a winner or if board is full
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