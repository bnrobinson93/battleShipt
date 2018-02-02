import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    const history = this.props.history;
    const lastPlayer = history[history.length-1].player;
    const lastMove = 'Player ' + lastPlayer +
    ' attacked ' + this.props.lastMoveY + this.props.lastMoveX;

    const moves = history.map((step, move) => {
      var stat = move ? 'Player ' +
        history[move].player + ' attacked ' +
        history[move].posY + history[move].posX : '';

      if ( stat !== '' )
        return (
          <li key={move}>
            <span>{stat}</span>
          </li>
        );
      else return <br />
    });

    return (
      <div className='col s3 blue lighten-4 sidebar'>
        Current player: Player {this.props.player}
        <br />
        Last move:&nbsp;
        {this.props.lastMoveX ? lastMove : 'No moves yet'}
        <br />
        {(this.props.winner === 0) ? "" : 'Player '+this.props.winner+' won!'}
        <br />
        <br />
        Full history:<br />
        {moves}
      </div>
    );
  }

}

export default Sidebar;
