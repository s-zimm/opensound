export const SET_BPM = 'SET_BPM';
export const TOGGLE_PLAY_ALL = 'TOGGLE_PLAY_ALL';
export const ADD_RECORDING = 'ADD_RECORDING';

export const setBPM = (bpm) => ({
    type: SET_BPM,
    payload: bpm
});

export const togglePlayAll = () => ({
    type: TOGGLE_PLAY_ALL
});

export const addRecording = (recording) => ({
    type: ADD_RECORDING,
    payload: recording
})