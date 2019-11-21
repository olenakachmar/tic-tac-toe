import React, { Component } from 'react';

import Announcment from '../Announcment';
import RecetButton from '../RecetButton';
import Tile from '../Tile';

import './Game.css';

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
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    }
  }

  tie = (board) => {
    let moves = board.join('').replace(/ /g, '');
    if(moves.length === 9) {
      return true;
    }
    return false;
  }

  winner = (board, player) => {
    if(
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    ) {
      return true;
    } else {
      return null;
    }
  }

  copyBoard = (board) => {
    return board.slice(0);
  }

  validMove = (move, player, board) => {
    let newBoard = this.copyBoard(board);

    if(newBoard[move] === ' ') {
      newBoard[move] = player;
      return newBoard;
    } else {
      return null;
    }
  }

  findAiMove = (board) => {
    let bestMoveScore = 100;
    let move = null;

    if(this.winner(board, 'x' ) || this.winner(board, 'o' ) || this.tie(board) ) {
      return null;
    }

    for(let i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      
      if(newBoard) {
        let moveScore = this.maxScore(newBoard);
        if(moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }

    return move;
  }

  minScore = (board) => {
    let bestMoveValue;

    if(this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      bestMoveValue = 100;
      // let move = 0;
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.minPlayer, board);
        if(newBoard) {
          let predictedMoveValue = this.maxScore(newBoard);
          if(predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            // move = i;
          }
        }
      }

      return bestMoveValue;
    }
  }

  maxScore = (board) => {
    let bestMoveValue;
    if(this.winner(board, 'x')) {
      return 10;
    } else if (this.winner(board, 'o')) {
      return -10;
    } else if (this.tie(board)) {
      return 0;
    } else {
      bestMoveValue = -100;
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.maxPlayer, board);
        if(newBoard) {
          let predictedMoveValue = this.maxScore(newBoard);
          if(predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue
          }
        }
      }

      return bestMoveValue;
    }
  }

  gameLoop = (move) => {
    let player = this.state.turn;
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);

    if(this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }
    if(this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      });
      return;
    }

    player = 'o';
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if(this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }
    if(this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'd'
      });
      return;
    }

    this.setState({
      gameBoard: currentGameBoard
    });
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
          <h1> Tic-Tac_Toe</h1>
          <Announcment winner={this.state.winner} />
          <RecetButton reset={this.resetBoard} />
        </div>
        <div className="tileWrapper">
          {this.state.gameBoard.map((value, i) => (
            <Tile
            key={i}
            loc={i}
            value={value}
            gameLoop={this.gameLoop}
            className="tile"
          />
        ))}
        </div>
        
      </div>
    )
  }
}

export default Game;