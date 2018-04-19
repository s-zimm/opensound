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
            this.setState({ playing: true, playStatus: Sound.status.PLAYING });
        } else {
            this.setState({ playing: false, playStatus: Sound.status.PAUSED });
        }
    }

    render() {
        return (
            <div className="audio-controls">
                <div className="play-btn" onClick={this._handlePlayBtn}>
                    {this.state.playing
                        ? <i className="fas fa-pause"></i>
                        : <i className="fas fa-play"></i>}
                </div>
                <Sound 
                    url={this.props.url}
                    playStatus={this.state.playStatus}
                    loop={false}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED, playing: false })}
                />
            </div>
        )
    }
}

export default AudioControls;