import React, {Component} from 'react';

class RecetButton extends Component {
 
  render() {
    return(
      <button onClick={this.props.reset}>Reset</button>
    );
  }
}

export default RecetButton; 