# Readme sections

1. List + explain technologies used and approach taken

2. Installation instructions

3. Unsolved problems

4. Link to wireframes and user stories.

5. Document your planning and tell a story about your development process and problem-solving strategy.

6. List unsolved problems which would be fixed in future iterations.

7. Describe how you solved for the winner

8. Describe how some of your favorite functions work

# Deliverables

1. A working game hosted online

2. A link to hosted working game in the URL section of your Github repository

3. A git repository hosted on Github, with a link to your hosted game, and frequent commits dating back to the very beginning of the project

- Explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.

## MVP/Bronze Plan - Minimum viable Product

- build a dynamic game that allows two players to compete ina game of Tic Tac Toe from the same computer

- - Include separate HTML / CSS / JavaScript files

- Render a game board in the browser

- Switch turns between X and O (or whichever markers you select)

- Visually display which side won if a player gets three in a row, or show a draw if neither player wins

- adhere to KISS + DRY principles

- Use JavaScript for DOM manipulation

- Deploy game online

- Use semantic markup for HTML and CSS

- well-formatted, and well-commented code

- HTML page with a table of 9 cells
  - Just enough Javascript to show you who the current player is and change the background color of a cell when you click on it.
  - Just enough CSS to make the cells visible.

## User Stories

- As a user, I should be able to start a new tic tac toe game

- As a user, I should be able to click on a square to add X first and then O, and so on

- As a user, I should be shown a message after each turn for if I win, lose, tie or who's turn it is next

- As a user, I should not be able to click the same square twice

- As a user, I should be shown a message when I win, lose or tie

- As a user, I should not be able to continue playing once I win, lose, or tie

- As a user, I should be able to play the game again without refreshing the page

## Silver Plan

- Enough CSS to make it actually look like a game, and enough Javascript for a "reset" button.

## Gold Plan

- Keep track of multiple game rounds with a win, lose and tie counter

- Allow players to customize their tokens (X, O, name, picture, etc)

- Use localStorage to persist data locally to allow games to continue after page refresh or loss of internet connectivity

- Involve Audio in your game

- Create an AI opponent: teach JavaScript to play an unbeatable game against you

- Make your site fully responsive so that it is playable from a mobile phone

- Get inventive with your styling e.g. use hover effects or animations

- Allow 2 players to play online with each other using any means such as WebSockets, Firebase, or other 3rd-party services.

- play against computer

- Gold: CSS transitions or animations, showing "X" and "O" instead of colors, and Javascript that tells you when the game is over and who won.
