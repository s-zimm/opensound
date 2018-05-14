import React, { Component } from 'react';
import RecordedSound from './RecordedSound';
import Metronome from '../Metronome/Metronome';
import { connect } from 'react-redux';

class RecordingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaRecorder: null,
            recording: false,
            audioBlob: null,
            recordings: [],
            countIn: null,
            playAll: false
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

    _handleStartRecording = async () => {
        await this._countIn()
        this.state.mediaRecorder.start();
        this.setState({ recording: true });
        console.log(this.state.mediaRecorder.state)
    }

    _handleStopRecording = () => {
        this.setState({ recording: false, countIn: null });
        let chunks = [];
        let mediaRecorder = this.state.mediaRecorder;
        mediaRecorder.ondataavailable = event => {
            chunks.push(event.data);
        }
        mediaRecorder.onstop = (event) => {
            let blob = new Blob(chunks, { 'type' : 'audio/mp3; codecs=opus' });
            let audioSrc = window.URL.createObjectURL(blob);
            console.log(blob);
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
                    playAll={this.state.playAll}
                />
                )
        })
    }

    _countIn = () => {
        return new Promise(resolve => {
            this.setState({ countIn: 4 }, () => {
                  let interval = setInterval(() => {
                    if (this.state.countIn > 1) {
                        this.setState({ countIn: this.state.countIn - 1 })
                    } else {
                        resolve(clearInterval(interval));
                    }
                }, (60 / this.props.bpm) * 1000);
            })
        });
        
    }

    _handlePlayAll = () => {
        this.setState({ playAll: true })
    }

    render() {
        return (
            <div className="recording-controls-container">
                {this.state.recording
                    ? <button onClick={this._handleStopRecording} className="record-btn-active">Stop</button>
                    : this.state.countIn
                        ? <button className="record-btn" onClick={this._handleStartRecording}>{this.state.countIn}</button>
                        : <button className="record-btn" onClick={this._handleStartRecording}>Record</button>}
                <Metronome />
                
                <div className="recording-controls-container">
                    <div className="all-recordings">
                        <div className="play-all">
                                <div className="play-btn" onClick={this._handlePlayAll}>
                                    {this.state.playing
                                        ? <i className="fas fa-pause"></i>
                                        : <i className="fas fa-play"></i>}
                                </div>
                                Play All
                            </div>
                            {this._handleRenderRecordings()}    
                        </div>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    bpm: state.recordingControls.bpm
})

export default connect(mapStateToProps)(RecordingPage);