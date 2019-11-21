import React, { Component } from 'react';

import Announcment from '../Announcment';
import RecetButton from '../RecetButton';
import Tile from '../Tile';
import { declareModuleExports } from '@babel/types';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null
    }
  }

  updateBoard = (loc, player) => {
    if(this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner) {
      return;
    }
    let currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc, 1, this.state.turn);
    this.setState({gameBoard: currentGameBoard})

    let topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
    if(topRow.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];
    if(middleRow.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    };

    let leftCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
    if(leftCol.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let middleCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
    if(middleCol.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let rightCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
    if(rightCol.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let leftDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[7];
    if(leftDiag.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let rightDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];
    if(rightDiag.match(/xxx|ooo/)) {
      this.setState({
        winner: this.state.turn
      });
      return
    }

    let moves = this.state.gameBoard.join('').replace(/ /g, '');
    if(moves.length === 9) {
      this.setState({winner: 'd'})
      // this.resetBoard();
    }

    this.setState({
      turn: (this.state.turn === 'x') ? '0' : 'x'
    })
  }

  resetBoard = () => {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null
    })
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1> Tic-Tac_toe</h1>
          <Announcment winner={this.state.winner} />
          <RecetButton reset={this.resetBoard} />
        </div>
        {this.state.gameBoard.map((value, i) => (
          <Tile
            key={i}
            loc={i}
            value={value}
            updateBoard={this.updateBoard.bind(this)}
            turn={this.state.turn}
          />
        ))}
      </div>
    )
  }
}

export default Game;