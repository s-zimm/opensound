import React, { Component } from 'react';
import axios from 'axios';

class RecordedSound extends Component {

    _saveSound = () => {
        axios.post('POSTURLFORSOUND', {
            userId: this.props.currentUser,
            audioBlob: this.props.audioBlob
        })
            .then(data => {
                console.log('we posted')
            });
    }

    render() {
        return (
            <div className="sound-clip-container">
                <h5 style={{ margin: 0 }}>{this.props.soundName}</h5>
                <audio controls src={this.props.audioSrc}></audio>
                <button onClick={this._saveSound}>Save</button>
            </div>
        )
    }
}

export default RecordedSound;