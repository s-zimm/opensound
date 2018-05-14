import React, { Component } from 'react';
import Sound from 'react-sound';

class AudioControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playStatus: Sound.status.PAUSED,
            playing: false,
            loop: false,
            position: 0,
            duration: 0,
            playAll: false
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ playAll: this.props.playAll })
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
                <progress className="duration" min={0} max={this.state.duration} value={this.state.position}/>
                <button className={`loop loop-${this.state.loop}`} onClick={() => this.setState({ loop: !this.state.loop })}>
                    Loop
                </button>
                <Sound 
                    url={this.props.url}
                    playStatus={this.props.playAll
                                    ? Sound.status.PLAYING
                                    : this.state.playStatus}
                    loop={this.state.loop}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED, playing: false })}
                    onPlaying={({ position }) => this.setState({ position }, () => console.log(this.state.position))}
                    onStop={() => this.setState({ position: 0 })}
                    position={this.state.position}
                    onLoading={({ duration }) => this.setState({ duration }, () => console.log(this.state.duration))}
                />
            </div>
        )
    }
}

export default AudioControls;