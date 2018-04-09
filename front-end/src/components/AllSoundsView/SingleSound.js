import React, { Component } from 'react';

class SingleSound extends Component {
    
    render() {
        return (
            <div className="column-container single-sound-container">
                <div className="info column-container">
                    <h3>Sound Name</h3>
                    <p>Sound Dashboard</p>
                    <p>Date Created</p>
                    <div className="star-button">
                        <i className="fas fa-star"></i>
                    </div>
                    <div className="stars-and-movements row-container">
                        <div className="stars-container row-container">
                            <i className="fas fa-star"></i>
                            <p>132</p>
                        </div>
                        <div className="stars-container row-container">
                            <i class="fas fa-headphones"></i>
                            <p>140</p>
                        </div>
                        <div className="stars-container row-container">
                            <i class="fas fa-code-branch"></i>
                            <p>50</p>
                        </div>
                    </div>
                    

                </div>
                {/* <div className="audio row-container">
                    <div className="play-btn">{'>'}</div>
                    <audio src=""></audio>
                    <progress value={0} max={1}></progress>
                </div> */}
                <div className="audio row-container">
                    <audio controls src=""></audio>
                </div>
            </div>
        )
    }
}

export default SingleSound;