import React, { Component } from 'react';
import axios from 'axios';

class RecordedSound extends Component {

    _saveSound = () => {
        let config = { headers: {'Content-Type': 'multipart/form-data' } }

        let data = new FormData();
        data.append('userId', this.props.currentUser);
        data.append('audioBlob', this.props.audioBlob);
        data.append('title', this.props.soundName);

        axios.post('/api/sounds', data, config)
        .then(data => {
            console.log('we posted');
            console.log(data);
        });
    }

    _deleteSound = () => {
        this.props.handleDelete(this.props.index)
    }

    render() {
        return (
            <div className="sound-clip-container">
                <h5 style={{ margin: 0 }}>{this.props.soundName}</h5>
                <audio controls src={this.props.audioSrc}></audio>
                <button onClick={this._saveSound}>Save</button>
                <button onClick={this._deleteSound}>Delete</button>
            </div>
        )
    }
}

export default RecordedSound;