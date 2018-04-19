import React, { Component } from 'react';
import Sound from 'react-sound';

class AudioControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED,
            playing: false,
            loop: false,
            position: 0
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
                <div className="duration">
                    
                </div>
                <button className={`loop loop-${this.state.loop}`} onClick={() => this.setState({ loop: !this.state.loop })}>
                    Loop
                </button>
                <Sound 
                    url={this.props.url}
                    playStatus={this.state.playStatus}
                    loop={this.state.loop}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED, playing: false })}
                    onPlaying={(position, duration) => console.log(position, duration)}
                    position={this.state.position}
                />
            </div>
        )
    }
}

export default AudioControls;