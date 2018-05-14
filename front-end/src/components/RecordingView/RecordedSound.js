import React, { Component } from 'react';
import axios from 'axios';
import Sound from 'react-sound';
import AudioControls from './AudioControls';

class RecordedSound extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

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
            <React.Fragment>
                <div className="sound-clip-container">
                    <h5 style={{ margin: 0 }}>{this.props.soundName}</h5>
                    {/* <audio controls src={this.props.audioSrc}></audio> */}
                    <AudioControls 
                        url={this.props.audioSrc}
                        playAll={this.props.playAll}
                    />
                    <button onClick={this._saveSound}>Save</button>
                    <button onClick={this._deleteSound}>Delete</button>
                </div>
            </React.Fragment>
        )
    }
}

export default RecordedSound;