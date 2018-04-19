import React, { Component } from 'react';
import Sound from 'react-sound';

class AudioControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED,
            playing: false
        }
    }

    _handlePlayBtn = () => {
        if (this.state.playStatus === Sound.status.PAUSED) {
            this.setState({ playStatus: Sound.status.PLAYING });
        } else {
            this.setState({ playStatus: Sound.status.PAUSED });
        }
    }

    render() {
        return (
            <div className="audio-controls">
                <div className="play-btn" onClick={this._handlePlayBtn}>
                    <i className="fas fa-play"></i>
                </div>
                <Sound 
                    url={this.props.url}
                    playStatus={this.state.playStatus}
                    loop={false}
                />
            </div>
        )
    }
}

export default AudioControls;