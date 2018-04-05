import React, { Component } from 'react';

class SingleSound extends Component {
    
    render() {
        return (
            <div className="column-container single-sound-container">
                <div className="info">
                    <h3>Sound Name</h3>
                    <p>Sound Dashboard</p>
                    <p>Date Created</p>

                </div>
                <div className="audio row-container">
                    <div className="play-btn">{'>'}</div>
                    <audio src=""></audio>
                    <progress value={0} max={1}></progress>
                </div>
            </div>
        )
    }
}

export default SingleSound;