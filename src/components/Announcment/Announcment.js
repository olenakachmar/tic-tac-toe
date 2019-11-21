import React, { Component } from 'react';

import './Announcment.css';

class Announcment extends Component {
  render() {
    return (
      <div className={this.props.winner ? 'visible' : 'hidden'}>
        <h2>Game Over</h2>
      </div>
    )
  }
}

export default Announcment;