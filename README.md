# Readme sections

1.  approach taken

2.  Unsolved problems

3.  Document your planning and tell a story about your development process and problem-solving strategy.

4.  List unsolved problems which would be fixed in future iterations.

5.  Describe how you solved for the winner

6.  Describe how some of your favorite functions work

# summary / Description

convey your specific experience and approach.

List of Features / User Stories
This typically will be a short list of the features / user stories that you planned during the development phase of the project
To provide more detail, you can show how you categorized these features into Bronze (MVP), Silver, and Gold Levels and indicate which features you complete / have yet to complete

##Approach

-> how winner is selected:
-> Figma for control flow

## Requirements met

Build a web application from scratch, must be your own work.

## MVP requirements

## Stretch Technical Goals

##methodology

- wireframe
- pseudocode
- basic html/css
- game logic in JS for MVP
- addition features: add name, overlay to display message, display whose turn it is

Good links to include are:
A link to the project's main repository
A link to the project's issue tracker

# Template

Project Title
One Paragraph of project description goes here

Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Prerequisites
What things you need to install the software and how to install them

Give examples
Installing
A step by step series of examples that tell you how to get a development env running

Say what the step will be

Give the example
And repeat

until finished
End with an example of getting some data out of the system or using it for a little demo

Running the tests
Explain how to run the automated tests for this system

Break down into end to end tests
Explain what these tests test and why

Give an example
And coding style tests
Explain what these tests test and why

Give an example
Deployment
Add additional notes about how to deploy this on a live system

Built With
Dropwizard - The web framework used
Maven - Dependency Management
ROME - Used to generate RSS Feeds
Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

Authors
Billie Thompson - Initial work - PurpleBooth
See also the list of contributors who participated in this project.

License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
Hat tip to anyone whose code was used
Inspiration
etc

ISSUES

- mp3 files don't work on github pages : Failed to load resource: the server responded with a status of 404 ()
- removed audio folder from assets folder and put it in main project folder-> that solved the issue

```
function checkForWin(currentSymbol) {
    const result = winningCombinations.some((combo) => {
        return combo.every(index => {
            return Array.from(allCells)[index].classList.contains(currentSymbol) //need to turn html collection into array
        })
    })
    return result

}
´´´
```

function checkForWin(currentSymbol) { //checking grid to see if player won after making a move
const result = winningCombinations.some((combo) => { //for each possible winning combination (array of 3 indexes e.g. [0, 1, 2])
return combo.every(index => { //is there a match for EVERY single one of those 3 indexes
return Array.from(allCells)[index].classList.contains(currentSymbol) // in the array of all the cells that contain the current symbol??
}) //need to turn html collection into array with Array.from()
})
return result

}

describe how some of your favorite functions work

- [ ] What would you do differently?
- [ ] What are you most proud of?
- [ ] What would you do next?
- [ ] How did you plan your project?
- [ ] What did you learn?

---

# 1. Description

### **A game of Tic Tac Toe a.k.a. Naughts & Crosses built with HTML/CSS/JS.** <br>

The goal was to build a web application from scratch for my first project of the General Assembly Software Engineering Immersive Course. The result is a dynamic game that allows two players to compete from the same computer.

<br>

![Example of Tic Tac Toe Game ](./assets/TicTacToe_example.jpg)

---

<br>

# 2. Deployment link

- The project is hosted online GitHub pages: https://catherineloesch.github.io/project-1-tictactoe/
- Git repository: https://github.com/catherineloesch/project-1-tictactoe

---

# 3. Getting Started/Code Installation

No installations are required to run this game. Th only tools needed are a web browser with JavaScript Support and internet connectivity.

---

# 4. Timeframe & Working Team

This was an individual project, written by myself.
Timeframe: 5 days (3 working days) to complete.

---

# 5. Technologies Used

This game was written in vanilla JavaScript, HTML and CSS
(CSS Flexbox Grid were used)

### Additional tools:

- Figma for building the wireframe
- Visual Studio Code: code editor used for writing HTML, CSS and JavaScript
- Google Chrome Web Browser: used for launching the website, displaying the application
  - Google Chrome Developer Tools: For troubleshooting and debugging
- Git/GitHub (for version control) and Github pages(for deployment)
  <br>

### External web resources:

- icons
  - all icons used are Scalable Vector Graphics from iconify (open source svg library)
    - https://iconify.design/
- Google Fonts
  - Comfortaa, designed by Johan Aakerlund
    - https://fonts.google.com/specimen/Comfortaa
- Animation
  - JavaScript Confetti library
    - https://www.npmjs.com/package/js-confetti
  - TimelineMax/GSAP library for timing animations
    - https://cdnjs.com/libraries/gsap
    - https://greensock.com/docs/v2/TimelineMax
- Audio
  - all sound effects used are open-source .mp3 sound files from Pixabay
    - https://pixabay.com/sound-effects/
  - Howler audio library
    - https://howlerjs.com/
    - https://cdnjs.com/libraries/howler
    - https://github.com/goldfire/howler.js/

---

# 6. Deliverables

- A working game hosted online
- A git repository hosted on Github, including
  - a link to the hosted game
  - frequent commits dating back to the very beginning of the project
- The Tic Tac Toe game should:
  - Render a game board in the browser
  - Switch turns between X and O (or whichever markers you select)
  - Visually display which side won if a player gets three in a row, or show a draw if neither player wins
  - include separate HTML / CSS / JavaScript files
  - adhere to KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
  - use JavaScript for DOM manipulation
  - use semantic markup for HTML and CSS while adhering to best practices
  - write code that is well-formatted and well-commented

## User Stories

- As a user, I should be able to start a new tic tac toe game.
- As a user, I should be able to click on a square to add X first and then O, and so on.
- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next.
- As a user, I should not be able to click the same square twice.
- As a user, I should be shown a message when I win, lose or tie.
- As a user, I should not be able to continue playing once I win, lose, or tie.
- As a user, I should be able to play the game again without refreshing the page.

---

# 7. Planning

I started the planning procress by makes 3 different plans:

1. A bronze plan that fullfills all the requirements for the MVP.
2. A silver plan with additional features I would like to add to my project if time allows for it.
3. A gold plan with more features that my ideal project would contain, with the intention of implementing some of them if there's enough time.

## Bronze Plan: MVP (Minimum viable product)

- make a Tic Tac Toe game that works with the following features:
  - write code that follows KISS/DRY principles and make separate files for HTML, CSS and JavaScript
  - use semantic markup when writing HTML and CSS and use JavaScript for DOM manipulation
  - make sure code has comments explaining logic and adequate formatting
  - render error-free in browser
  - render a 3x3 grid in the browser
    - use HTML+CSS to make sure cells are clearly visible
  - two player can compete from the same computer following traditional Tic Tac Toe rules
    - https://www.gamesver.com/all-about-tic-tac-toe-purpose-rules-how-to-play-strategy/
  - create button that enables user to start a game
  - when a player clicks a square either a an X or O will display depending on which player's turn it is
  - players can't click the same cell twice
  - automatically switch turns between 2 players (i.e. between X and O icons)
  - let players know whose turn it is
  - if a player has 3 in a row, display a message announcing their win
  - after there's a win, player should can't click more squares to place icons
  - if all nine cells are marked and there's no win, display a message announcing a draw
  - create button allowing player to reset the game without page refreshing
- host project on github pages

## Silver Plan

- keep track of wins and losses
- display wins and losses on a score board
- enable user to reset scores
- enable user to enter name and have it displayed instead of "Player 1" or "Player 2"
- Make game look more polished with CSS features
- let user pick a color for their icon
- display a message when it's their turn to play in the color they selected
- add sounds effects
- add animation effects
- enable user to mute sound effects
- show player preview of their icon when they hover over an empty cell

## Gold Plan

- use localStorage to save game data locally and enable player to continue where they left off after page refreshes or the internet connection is interrupted
- create an AI opponent
- make web page fully responsive so that it can be used from a smartphone or smaller screen
- enable 2 players to play online with each other using a third party service (e.g.WebSockets or Firebase)

After lining out my bronze, silver and gold plans, I created a wireframe:

<br>

![MVP Wireframe](./assets/tictactoe_wirerame.jpg)

After completing the wireframe I wrote some pseudocode for my MVP.

---

# 8. Build/Code Process

-> longest section of your ReadMe
-> steps you took to code the project.
-> your approach and problem solving from the start of the project through to the end.
-> minimum of 3-4 code snippets,
-> highlighting code you're particularly proud of and these code snippets will have descriptions on what you did, how and why to set the context of the snippet you include.
REASONING
key sections of the project build.
go through different stages

- create a repository on github for the project
- clone it to local machine
- create new HTML/CSS/JavaScript files
- connect CSS and JavaScript files to HTML and test they work
- basic board
- pseudocode for logic
- deploy on gitHub Pages

---

# 9. Challenges

- What technical challenges did you come across?
- Why were these challenges?
- What problem solving did you do to rectify them?
- Team dynamics/ Project management
- Tools/Tech you used

---

# 10. Wins

- Interesting problem solving you did
- Strong sections of code
- Collaboration with other team members
- Visual design of the project

aspects of your project you are most proud of.

---

# 11. Key Learnings/Takeaways

most important parts of your ReadMe from an engineers’ perspective
Engineers love to understand what you learn from each project and how it has shaped you as an engineer.

See this as your opportunity to show the engineers how your skills grew during each project sprint.
Things you could discuss here:

- What Technologies/Tools do you now feel more confident with? Tell them specifically what you learnt about these.
- What engineering processes did you become more comfortable with? Standups? Pair programming? Project management? Tell them what you learnt from these processes?

---

# 12. Bugs

In either sentences or bullets, explain what the bugs are. If you have no bugs, you can leave this section blank.

---

# 13. Future Improvements

It’s common to get to the end of your project and have ideas on what you would do if you have more time, as well as how you might improve it.
If you do, you should detail this here. It’s great to give that context on potential future improvements, to share your creative or technical ideas with the engineers reading your ReadMes.
In either sentences or bullets, explain what your future improvements would be.
