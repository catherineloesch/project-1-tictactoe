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

//Selecting all cells in the grid + save to a variable
const allCells = document.querySelectorAll('.cell') // -> NodeList(9)


//attaching an eventListener to each cell so we know when user clicks on it
allCells.forEach((cell) => {
    cell.addEventListener('click', handleUserInput)
})

function handleUserInput(e) {
    console.log(`${e.target.id} was clicked!`)
}