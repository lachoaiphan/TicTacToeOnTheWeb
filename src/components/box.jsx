import React, { Component } from 'react';

// Box component to render each individual box on the web application
class Box extends Component {
    

    render() { 
        return ( 
            <div 
                onClick={this.props.onClick}
            >
                {this.props.currentPiece}
            </div>
        );
    }
}
 
export default Box;