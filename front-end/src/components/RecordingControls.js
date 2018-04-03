import React, { Component } from 'react';
import RecordedSound from './RecordedSound';

class RecordingControls extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaRecorder: null,
            recording: false,
            audioBlob: null
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
        this.setState({ soundName: prompt('Name your sound:')})
        let chunks = [];
        let mediaRecorder = this.state.mediaRecorder;
        mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state)
        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        }
        mediaRecorder.onstop = (event) => {
            let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
            let audioSrc = window.URL.createObjectURL(blob);
            console.log(audioSrc);
            this.setState({ audioSrc });
        }
        
    }

    render() {
        return (
            <div className="recording-controls-container">
                {this.state.recording
                    ? <button className="record-btn-active">Record</button>
                    : <button className="record-btn" onClick={this._handleStartRecording}>Record</button>}
                <button onClick={this._handleStopRecording}>Stop</button>
                <div className="recording-controls-container">
                    {this.state.audioSrc && this.state.soundName
                        ? (
                            <RecordedSound
                                audioBlob={this.state.audioBlob}
                                currentUser={this.props.match.params.userId}
                                soundName={this.state.soundName}
                                audioSrc={this.state.audioSrc}
                            />
                        )
                        : null}
                </div>
            </div>
        )
    }
}

export default RecordingControls;