import React, { Component } from 'react';

class Turn extends Component {
    
    render() { 
        return (
            <div className="display">
                <p>{ this.changeDisplay() }</p>
            </div> 
        );
    }

    // displays current state of the game
    changeDisplay() {
        if (this.props.currentState === 0) {
            return `${this.props.currentPiece}'s turn!`;
        } else if (this.props.currentState === 1) {
            return `${this.props.currentPiece} wins!`;
        } else {
            return `Draw!`;
        }
    }
    
}
 
export default Turn;