import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    const history = this.props.history;

    const moves = history.map((step, move) => {
      var stat = move ? 'Player ' +
        history[move].player + ' attacked ' +
        history[move].posY + history[move].posX + '('
        + history[move].result + ')' : '';

      var lastMoveClasses = "collection-item";
      lastMoveClasses += (/won/.test(history[move].result)) ? " teal accent-3" : "";

      if ( stat !== '' ) {
        return (
          <li key={move} className={lastMoveClasses}>
            <span>{stat}</span>
          </li>
        );
      } else {
        return (<li key={0} className="collection-item">
          <span>Game start</span>
          </li>);
      }
    });

    const lastMove = moves[moves.length-1];

    return (
      <div className='col s3'>
        <ul className="collection with-header">
          <li className="collection-header">Current player</li>
          <li className="collection-item">Player {this.props.player}</li>
        </ul>
        <ul className="collection with-header">
          <li className="collection-header">Last move</li>
          {this.props.lastMoveX ? lastMove : 'No moves yet'} 
        </ul>
        <ul className="collection with-header">
          <li className="collection-header">Full history</li>
          {moves}
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
