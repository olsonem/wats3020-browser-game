/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */

// Player Class
class Player {
    constructor(token){
      this.token = token;
    }
}

// Game Class
class TicTacToe {
    constructor(){

      this.player1 = new Player('fire');
      this.player2 = new Player('tint');
      this.currentPlayer = null;
      this.gameStatus = null;
      this.winner = null;
      this.moveCount = 0;

        // Set up DOM elements used in game as Class properties

      this.startPrompt = document.querySelector('#start-prompt');   
      this.movePrompt = document.querySelector('#move-prompt');      
      this.currentPlayerToken = document.querySelector('#player-token'); 
      this.gameboard = document.querySelector('#gameboard');      
      this.winScreen = document.querySelector('#win-screen'); 
      this.winnerToken = document.querySelector('#winner-token');     
      this.drawScreen = document.querySelector('#draw-screen');

        // Initializes an Array representing the starting state of the game board.
        this.gameState = [
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null],
            [null, null, null, null, null]
        ];

        // Array of Win States

        this.winStates = [
          [[0,0],[0,1],[0,2],[0,3],[0,4]],
          [[1,0],[1,1],[1,2],[1,3],[1,4]],
          [[2,0],[2,1],[2,2],[2,3],[2,4]],
          [[3,0],[3,1],[3,2],[3,3],[4,4]],
          [[4,0],[4,1],[4,2],[4,3],[4,4]],
          [[0,0],[1,0],[2,0],[3,0],[4,0]],
          [[0,1],[1,1],[2,1],[3,1],[4,1]],
          [[0,2],[1,2],[2,2],[3,2],[4,2]],
          [[0,3],[1,3],[2,3],[3,3],[4,3]],
          [[0,4],[1,4],[2,4],[3,4],[4,4]],
          [[0,0],[1,1],[2,2],[3,3],[4,4]],
          [[0,4],[1,3],[2,2],[3,1],[4,0]]
         
        ];
    }

    // Check for Winner method.
    checkForWinner(){
      console.log('Checking for winner')
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;
                let winEvent = new Event('win');
                document.dispatchEvent(winEvent);
                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`)
        if (this.moveCount >= 25) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';
            let drawEvent = new Event('draw');
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event){
      console.log('Recording move.');
        // This method handles recording a move in the `this.gameState` property.
        let tileX = event.target.dataset.x;
        let tileY = event.target.dataset.y;
        this.gameState[tileX][tileY] = this.currentPlayer.token;
        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`)
    }
    switchPlayer(){
      console.log('Switching Player.');
        // This method handles switching between players after each move.
     if (this.currentPlayer === this.player1){
            this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
        this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`)
    }

    setUpTileListeners(){
      console.log('Setting up Tile Listeners')
        // This method sets up event listeners for tiles. It is called when we
      let tileElements = document.querySelectorAll('.tile');
      for (let tile of tileElements){
        tile.addEventListener('click', handleMove);
      }
    }

    showWinScreen(){
        // This method displays the end game screen for a Win.
        console.log('now showing win screen');
        this.winScreen.setAttribute('class', 'show');
        this.winnerToken.setAttribute('class', `glyphicon glyphicon-${this.winner.token}`);
    }

    showDrawScreen(){
        // This method displays the end game screen for a Draw.
        console.log('Now showing draw screen')
        this.drawScreen.setAttribute('class', 'show');
    }

    setUpBoard(){
      console.log('setting up gameboard');
      this.gameboard.innerHTML = '';
        for (let i=0; i<5; i++){
            let newRow = document.createElement('div');
            newRow.setAttribute('class', 'row');
            
            for (let j=0; j<5; j++){
              let newCol = document.createElement('div');
              newCol.setAttribute('class', 'col-xs-2');
              let newTile = document.createElement('span');
              newTile.setAttribute('class', 'tile glyphicon glyphicon-home');
              newTile.dataset.x = i;
              newTile.dataset.y = j;
              newCol.appendChild(newTile);
              newRow.appendChild(newCol);
            } // second `for` loop ends here.
            this.gameboard.appendChild(newRow);
        }// First `for` loop should ends here.
      this.setUpTileListeners();
    }

    initializeMovePrompt(){
        // This method initializes the `this.movePrompt` element.
      console.log('Initializing move prompt');
      this.startPrompt.setAttribute('class', 'hidden');
      this.movePrompt.setAttribute('class', '');
      this.currentPlayer = this.player1
      this.currentPlayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`)
    }

    start(){
        // This method handles the logic to create a new game. 
      console.log ('starting game.')
      this.setUpBoard();
      this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.

// items to control the game
 
let game; 
document.addEventListener('DOMContentLoaded', function(event){
   console.log('DOM content has loaded');
   // Starts the TicTacToe game
   let startButton = document.querySelector('#start-button');
   startButton.addEventListener('click', function(event){     
      game = new TicTacToe();
      game.start();
    });
}); // End DOMContent



// "win" event listener
document.addEventListener('win', function(event){
    console.log('Detected win event')
    game.showWinScreen();
})
// End of the "win" event listener.

// "Draw event listener"
document.addEventListener('draw', function(event){
    console.log('Detected draw event');
    game.showDrawScreen();
})
// End of the "draw" event listener.

// Play again? event listener
let playAgainButtons = document.querySelectorAll('.play-again')
    for (let button of playAgainButtons) {
        button.addEventListener('click', function(event){
        game = new TicTacToe();
        game.start();
        this.drawScreen.classList.remove('show');
        this.winScreen.classList.remove('show'); 

    });
}
// End of the play again event listener

// External function for event listeners.
function handleMove(event){
  console.log('Handling player move');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
