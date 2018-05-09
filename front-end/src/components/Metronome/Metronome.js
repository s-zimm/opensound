import React, { Component } from 'react';
import click1 from '../../assets/click1.wav';
import click2 from '../../assets/click2.wav';
import { setBPM } from '../../actions/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Metronome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            beatsPerMeasure: 4
        }

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = (event) => {
        const bpm = event.target.value;
        this.props.setBPM(bpm);
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0 ) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(oldstate => ({
            count: (oldstate.count + 1) % oldstate.beatsPerMeasure
        }))
    }

    startStop = () => {
        if (this.state.playing) {
            clearInterval(this.timer);
            this.setState({ playing: false });
        } else {
            this.timer = setInterval(this.playClick, (60 / this.props.bpm) * 1000)
            this.setState({
                count: 0,
                playing: true
            }, this.playClick)
        }
        this.click1.play();
    }

    render() {
        const { bpm } = this.props;
        const { playing } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input
                        type="range"
                        min="60"
                        max="240"
                        value={bpm}
                        onChange={this.handleBpmChange}
                    />
                </div>
                <button onClick={this.startStop}>
                    {playing ? "Stop" : "Start"}
                </button>
            </div>
        )
    }
};

let mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setBPM
    }, dispatch)
};

let mapStateToProps = state => ({
    bpm: state.recordingControls.bpm
});

export default connect(mapStateToProps, mapDispatchToProps)(Metronome);