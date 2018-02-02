import React, { Component } from 'react';
import Grid from './grid.js'
import Sidebar from './sidebar.js'

// Check if the opponent's ships have all been sunk; if so, you win!
function calculateWinner(squares) {
  for ( var x in squares ) {
    // If a ship pattern is found, there are still moves to be made
    if ( /^p[12]S./.test(squares[x]) ) {
      return false; // no winner yet
    }
  }
  console.log('We have a winner! There were no floating ships found!')
  return true; // current player is the winner
}

class BattleShipt extends Component {
  constructor(props) {
    super(props);
    /*
     * playerIsOne is a toggle to keep track of who's turn it is
     * history is an array that contains the square states as well
     *  as the last clicked (x,y) coordinate
     * stepNumber is used to iterate over previous states to see
     * previous moves and player status
     */
    this.state = {
      playerIsOne: true,
      history: [{
        playerOneSquares: this.generateNShips(2, 1),
        playerTwoSquares: this.generateNShips(2, 2),
        posX: null,
        posY: null,
        winner: 0,
        player: 1,
        result: null,
      }],
      stepNumber: 0,
    }
  }

  generateNShips(numShips, player) {
    var arr = new Array(100).fill(null);
    for (let n=0; n<numShips; n++) {
      // Randomly generate ships for player one and player
      var shipStart = Math.floor(Math.random() * 99); // between 0 and 99
      var shipDirection = Math.floor(Math.random() * 2); // between 0 and 1
      var len = Math.floor(Math.random() * 3) + 2; // between 2 and 5

      // Check if there's going to be an issue
      if(shipDirection === 0) { // Horizontal
        for (let i=shipStart-len; i<len; i++){
          if(arr[i] != null) {
            shipDirection = 1;
            console.log('There would be collision on '+i+'. Toggling direction.')
            break;
          }
        }
      } else { // Vertical
        for (let i=shipStart-(10*len); i<10*len; i+=10){
          if(arr[i] != null) {
            shipDirection = 0;
            console.log('There would be collision on '+i+'. Toggling direction.')
            break;
          }
        }
      }

      console.log('Player '+player+' Ship '+n+' starts at: ' + shipStart +
      ', shipDirection: ' + shipDirection +
      ', length: ' + len);

      // Example 1, starting at 45, 46%10=6, if length is <3, it will fit;
      //  otherwise, flip the direction, i.e. len=5, 41-46 instead of 46-50
      // Example 2, let shipStart be 49 and length be 4. 49%10=9+4=13>9
      //  therefore, go the negative direction (46-50 instead of 50-54)
      // Example 3, let shipStart be 21 and length be 2. 21%10=1+2=3<9
      //  however, 21%10=1 which is less than the length, skip and go positive
      if ( shipDirection === 0 ) { // If horiizontal
        if ( ((shipStart) % 10) + len > 9 && ((shipStart) % 10) > len ) {
        console.log('Going negative direction from '+shipStart);
          for (let i=0; i<len; i++) {
            console.log('Marking '+(shipStart-i));
            arr[shipStart - i] = 'p'+player+'S'+n;
          }
        } else {
          console.log('Going positive direction from '+shipStart);
          for (let i=0; i<len; i++) {
            console.log('Marking '+(shipStart+i))
            arr[shipStart + i] = 'p'+player+'S'+n;
          }
        }
      } else { // If vertical
        // Example 1, let shipStart be 89 and len be 3. 89+10*3=109>100
        //  therefore, it needs to move in a negative direction (up)
        // Example 2, let shipStart be 30 and len be 4. 30+10*4=70<100
        //  so going in the positive direction is fine (else clause)
        // Example 3, let shipStart be 6 and len be 2. 6+10*2=26<100
        //  so going in the positive direction is fine (else clause)
        if ( shipStart+(10*len) > 100 ) {
          console.log('Going negative direction from '+shipStart);
          for (let i=0; i<len; i++) {
            console.log('Marking '+(shipStart-(10*i)));
            arr[shipStart - (10*i)] = 'p'+player+'S'+n;
          }
        } else {
          console.log('Going positive direction from '+shipStart);
          for (let i=0; i<len; i++) {
            console.log('Marking '+(shipStart+(10*i)));
            arr[shipStart + (10*i)] = 'p'+player+'S'+n;
          }
        }
      }
    }
    // Update the player Array
    return arr;
  }

  // i is the index in the player's grid
  handleClick(i) {
    const p = this.state.playerIsOne ? 1 : 2;
    console.log('Player '+p+' clicked on '+i);

    if ( (this.state.playerIsOne && p!==1) || (!this.state.playerIsOne && p!==2) ) {
      console.log('This grid is locked for player '+p)
      // If the player tries to click the opponent's grid, do nothing
        return false;
    }

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    var result = '';

    // If player is one, set to player two's squares and vice versa
    var playerOnesTurn = this.state.playerIsOne;
    var squares = (playerOnesTurn) ? current.playerTwoSquares.slice() : current.playerOneSquares.slice();

    if ( squares[i] === 'H' || squares[i] === 'M') { // Check if already clicked
      alert("That square has already been clicked!");
    } else if ( squares[i] === null ) { // if empty
      console.log('Miss');
      result = 'Miss';
      squares[i] = 'M';
      playerOnesTurn = !playerOnesTurn;
    } else if ( /^p[12]S.$/.test(squares[i]) ) { // If there's a boat
      console.log('Hit!');
      result = 'Hit';
      squares[i] = 'H';
      playerOnesTurn = !playerOnesTurn;
    } else {
      alert("Please click a square in your top grid to fire.");
    }

    // Check if the game is won
    let gameOver = calculateWinner(squares);

    if ( p === 1 ) {
      //console.log('Updating p2 squares:'); for (var x in squares) {console.log(x+':'+squares[x]);}
      this.setState({
        playerIsOne: playerOnesTurn,
        history: history.concat([{
          playerOneSquares: current.playerOneSquares, // no change
          playerTwoSquares: squares,
          posX: Math.floor(i / 10) + 1, // input should be 0-10
          posY: String.fromCharCode(i % 10 + 65), // Int to Char
          winner: gameOver ? p : 0,
          player: 1,
          result: result,
        }]),
        stepNumber: this.state.stepNumber+1,
      });
    } else {
      //console.log('Updating p1 squares:'); for (var x in squares) {console.log(x+':'+squares[x]);}
      this.setState({
        playerIsOne: playerOnesTurn,
        history: history.concat([{
          playerOneSquares: squares,
          playerTwoSquares: current.playerTwoSquares, // no change
          posX: Math.floor(i / 10) + 1,
          posY: String.fromCharCode(i % 10 + 65),
          winner: gameOver ? p : 0,
          player: 2,
          result: result,
        }]),
        stepNumber: this.state.stepNumber+1,
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[history.length-1];
    const winner = current.winner;
    const gameOver = (winner === 0) ? false : true;

    return (
      <div className='row'>
        <Sidebar
          // Check which player it is and display in sidebar
          player={this.state.playerIsOne ? 1 : 2}
          history={history}
          lastMoveX={current.posX}
          lastMoveY={current.posY}
          winner={winner}
        />
        <div className='container col s9'>
          <div className='section col s12 m12 l6 xl6'>
            <div className="col s12 center-align">
              <div className="card grey lighten-3">
                <div className="card-title">
                  Player 1
                </div>
                <Grid
                 player={2}
                 onClick={this.handleClick.bind(this)} // Or arrow function
                 clickable={this.state.playerIsOne ? !gameOver : false}
                 squares={current.playerTwoSquares}
                 shipsVisible={true}
                />
                <div className="divider" />
                <Grid
                  player={1}
                  onClick={this.handleClick.bind(this)}
                  clickable={false}
                  squares={current.playerOneSquares}
                  shipsVisible={true}
                />
              </div>
            </div>
          </div>
          <div className='section col s12 m12 l6 xl6'>
            <div className="col s12 center-align">
              <div className="card grey lighten-3">
                <div className="card-title">
                  Player 2
                </div>
                <Grid
                  player={1}
                  onClick={this.handleClick.bind(this)}
                  clickable={this.state.playerIsOne ? false : !gameOver}
                  squares={current.playerOneSquares}
                  shipsVisible={true}
                />
                <div className="divider" />
                <Grid
                  player={2}
                  onClick={this.handleClick.bind(this)}
                  clickable={false}
                  squares={current.playerTwoSquares}
                  shipsVisible={true}
                />
               </div>
             </div>
           </div>
        </div>
      </div>
    );
  }

}

export default BattleShipt;
