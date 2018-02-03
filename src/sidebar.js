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
        history[move].posY + history[move].posX + '('
        + history[move].result + ')' : '';

      if ( stat !== '' )
        return (
          <li key={move} className="collection-item">
            <span>{stat}</span>
          </li>
        );
      else
        return (<li key={0} className="collection-item">
          <span>Game start</span>
          </li>);
    });

    return (
      <div className='col s3'>
        <ul className="collection with-header">
          <li className="collection-header">Current player</li>
          <li className="collection-item">Player {this.props.player}</li>
        </ul>
        <ul className="collection with-header">
          <li className="collection-header">Last move</li>
          <li className="collection-item">
            {this.props.lastMoveX ? lastMove : 'No moves yet'}
          </li>
        </ul>
        {(this.props.winner === 0) ? "" : 'Player '+this.props.winner+' won!'}
        <ul className="collection with-header">
          <li className="collection-header">Full history</li>
          <li className="collection-item">{moves}</li>
          <li className="collection-item">
            <button className="waves-effect waves-light btn"
              onClick={this.props.onClick}>
              Restart Game
            </button>
          </li>
        </ul>
      </div>
    );
  }

}

export default Sidebar;
