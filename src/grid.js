import React, { Component } from 'react';

function Square(props) {
  var styleVar = "square";
  if(!props.clickable) {
    styleVar += " unclickable";
  }
  if(props.visible) {
    if ( /^p[12]S./.test(props.value) ) {
      styleVar += " ship";
    } else if ( props.value === 'H' ) {
      styleVar += " hit";
    } else if ( props.value === 'M' ) {
      styleVar += " miss";
    }
  }

  return (
  // Not props.onClick() because that would call it immediately
  // onClick={() => props.onClick()} also works
  // props.visible is ued to hide the ship locations from non-owner
    <button className={styleVar}
      onClick={props.onClick} disabled={!props.clickable}>
      {props.visible ? '' : null}
    </button>
  );
}

class Grid extends Component {

  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        visible={this.props.shipsVisible}
        clickable={this.props.clickable}
        // If top grid, make clickable. If bottom grid (player's grid)
        // make it unclickable
        onClick={() => this.props.onClick(i)}
     />
    );
  }

  render() {
    return (
      <div className="card-content">
        <span className="grid-header">&nbsp;&nbsp;A  B  C  D  E  F  G  H  I  J</span>
        {[...new Array(10)].map((x, rowIndex) => {
            return (
              <div className="board-row" key={rowIndex}>
                <span className="grid-row-header">{rowIndex+1}</span>
                {[...new Array(10)].map((y, colIndex) =>
                    this.renderSquare(rowIndex*10 + colIndex)
                  )
                }
              </div>
            )
          })
        }
      </div>
    );
  }

}

export default Grid;
