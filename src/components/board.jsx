import React, { Component} from 'react';
import Box from './box';
import Turn from './turn';


class Board extends Component {
    /* 
        current state of the board; contains the boxes, the number of filled boxes,
        the available pieces, current turn, and current state of the
    */
    state = { 
        boxes: [
            { id: 0, value: ""},
            { id: 1, value: ""},
            { id: 2, value: ""},
            { id: 3, value: ""},
            { id: 4, value: ""},
            { id: 5, value: ""},
            { id: 6, value: ""},
            { id: 7, value: ""},
            { id: 8, value: ""}
        ],
        filledBoxesCount: 0,
        pieces: [
            'X',
            'O'
        ],
        turn: 0,
        currentState: 0
     };

    // binding every box component with this onclick function
    handleBoxClick = (id) => {
        const boxes = this.state.boxes.slice();
        let box = boxes[id];
        let currentPiece = this.state.pieces[this.state.turn % 2]

        // if the state of the game is already decided then stop the game
        if (this.state.currentState !== 0) return;
        
        if (box.value === "") {
            box.value = currentPiece;
            this.setState({ boxes: boxes } );
            this.setState({ filledBoxesCount: this.state.filledBoxesCount + 1})
            this.checkState(currentPiece);
        }
    };

    // returns updated piece for the clicked box
    renderPiece = (id) => {
        let box = this.state.boxes[id];
        return box.value;
    }


    /*
        checkRow: checks each row of the board
        checkColumn: checks each column of the board
        checkDiag: checks the left and right diagonals of the board
        checkState: calls the above three mentioned functions plus checks 
                amount of filled boxes
    */

    checkRow (lastPiece) {
        // row represents the current row
        for (let row = 0; row < this.state.boxes.length; row += 3) {
            let box1 = this.state.boxes[row], box2 = this.state.boxes[row + 1],
                box3 = this.state.boxes[row + 2];
            if (box1.value === lastPiece && box2.value === lastPiece &&
                box3.value === lastPiece) 
                return true;
        }  
        return false;
    }

    checkColumn (lastPiece) { 
        // col represents the current column
        for (let col = 0; col < Math.floor(this.state.boxes.length / 3);
                 col += 1) {
            let box1 = this.state.boxes[col], box2 = this.state.boxes[col + 3],
                box3 = this.state.boxes[col + 6];
            if (box1.value === lastPiece && box2.value === lastPiece &&
                box3.value === lastPiece) 
                return true;
        }
        return false;
    }

    checkDiag (lastPiece) {
        // leftDiag is the left diagonal of the board, rightDiag is the right diagonal
        let leftDiag = this.state.boxes[0].value === lastPiece &&
                        this.state.boxes[4].value === lastPiece && 
                        this.state.boxes[8].value === lastPiece;
        let rightDiag = this.state.boxes[2].value === lastPiece &&
                         this.state.boxes[4].value === lastPiece &&
                         this.state.boxes[6].value === lastPiece;
        return leftDiag || rightDiag;
    }

    checkState (lastPiece) {
        if (this.checkRow(lastPiece) || this.checkColumn(lastPiece) || 
            this.checkDiag(lastPiece) ){
            this.setState( {currentState: 1} );
        } else if (this.state.filledBoxesCount === this.state.boxes.length - 1) {
            this.setState( {currentState: -1});
        } else {
            this.setState({ turn: this.state.turn + 1});
        }
    }

    
    // renders turn component and board with boxes components
    render() { 
        return ( 
            <React.Fragment>
                <Turn 
                    currentPiece={this.state.pieces[this.state.turn % 2]}
                    currentState={this.state.currentState}
                />
                <div 
                    className="board" 
                >
                    {this.state.boxes.map( box => <Box 
                                                key={box.id} 
                                                onClick={() => this.handleBoxClick(box.id)}
                                                currentPiece={this.renderPiece(box.id)}/>)}
                </div>
            </React.Fragment>
        );
    }

}
 
export default Board;