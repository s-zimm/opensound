import React, { Component } from 'react';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bpm: 100
        }
    }

    render() {
        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{this.state.bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="240"
                        value={this.state.bpm}
                        onChange={(event) => this.setState({ bpm: event.target.value })}
                    />
                </div>
                <button>
                    {this.state.playing ? "Stop" : "Start"}
                </button>
            </div>
        )
    }
}

export default Metronome;