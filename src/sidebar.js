import React, { Component } from 'react';

class Sidebar extends Component {

  render() {
    const lastMove = 'Player ' + this.props.lastPlayer +
    ' attacked ' + this.props.lastMoveY + this.props.lastMoveX;
    return (
      <div className='col s3 blue lighten-4 sidebar'>
        Current player: Player {this.props.player}
        <br />
        Last move:&nbsp;
        {this.props.lastMoveX ? lastMove : 'No moves yet'}
        <br />
        {(this.props.winner === 0) ? "" : 'Player '+this.props.winner+' won!'}
      </div>
    );
  }

}

export default Sidebar;
