import React, { Component } from 'react';

class RecordingControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaRecorder: null
        }
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Stream connected');
                let mediaRecorder = new MediaRecorder(stream);
                this.setState({ mediaRecorder });
            })
    }

    _handleStartRecording = () => {
        this.state.mediaRecorder.start();
        console.log(this.state.mediaRecorder.state)
    }

    _handleStopRecording = () => {
        this.state.mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state)
    }

    render() {
        return (
            <div>
                <button onClick={this._handleStartRecording}>Record</button>
                <button onClick={this._handleStopRecording}>Stop</button>
            </div>
        )
    }
}

export default RecordingControls;