import React, { Component } from 'react';
import Board from './board';

class App extends Component { 

    render() { 
        return (
            <React.Fragment>
                <header>
                    <h1>Tic Tac Toe!</h1>
                </header>
                <Board />
            </React.Fragment>
        );
    }
}
 
export default App;