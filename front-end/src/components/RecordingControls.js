import React, { Component } from 'react';

class RecordingControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaRecorder: null,
            recording: false
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
        this.setState({ recording: true });
        console.log(this.state.mediaRecorder.state)
    }

    _handleStopRecording = () => {
        this.setState({ recording: false });
        let chunks = [];
        let mediaRecorder = this.state.mediaRecorder;
        mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state)
        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        }
        mediaRecorder.onstop = (event) => {
            let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
            let audioURL = window.URL.createObjectURL(blob);
            console.log(audioURL);
            this.setState({ audioURL });
        }
        
    }

    render() {
        return (
            <div>
                {this.state.recording
                    ? <button className="record-btn-active">Record</button>
                    : <button className="record-btn" onClick={this._handleStartRecording}>Record</button>}
                <button onClick={this._handleStopRecording}>Stop</button>
                <div>
                    {this.state.audioURL
                        ? <audio controls src={this.state.audioURL}></audio>
                        : null}
                </div>
            </div>
        )
    }
}

export default RecordingControls;