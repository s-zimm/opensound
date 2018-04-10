import React, { Component } from 'react';
import RecordedSound from './RecordedSound';

class RecordingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaRecorder: null,
            recording: false,
            audioBlob: null,
            recordings: []
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

    componentWillUnmount() {
        this.setState({ mediaRecorder: null })
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
        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        }
        mediaRecorder.onstop = (event) => {
            let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
            let audioSrc = window.URL.createObjectURL(blob);
            console.log(blob);
            // this.setState({ audioBlob: blob }, () => console.log(this.state.audioBlob));
            // this.setState({ audioSrc }, () => console.log(this.state.audioSrc));
            this.setState({ recordings: [
                ...this.state.recordings,
                    { 
                        soundName: prompt('Name your sound:'),
                        audioBlob: blob,
                        audioSrc
                    }
                ]
            });
        }
        mediaRecorder.stop();
        console.log(this.state.mediaRecorder.state)
        
    }

    _handleSoundDelete = (index) => {
        let newRecordings = this.state.recordings.filter(rec => rec !== this.state.recordings[index]);
        this.setState({
            recordings: newRecordings
        });
    }

    _handleRenderRecordings = () => {
        return this.state.recordings.map((recording, i) => {
            return (
                <RecordedSound
                    key={i}
                    audioBlob={recording.audioBlob}
                    currentUser={this.props.match.params.userId}
                    soundName={recording.soundName}
                    audioSrc={recording.audioSrc}
                    index={i}
                    handleDelete={this._handleSoundDelete}
                />
                )
        })
    }

    render() {
        return (
            <div className="recording-controls-container">
                {this.state.recording
                    ? <button className="record-btn-active">Record</button>
                    : <button className="record-btn" onClick={this._handleStartRecording}>Record</button>}
                <button onClick={this._handleStopRecording}>Stop</button>
                <div className="recording-controls-container">
                    {this._handleRenderRecordings()}    
                </div>
            </div>
        )
    }
}

export default RecordingPage;