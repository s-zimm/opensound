import { combineReducers } from 'redux';

import { SET_BPM, TOGGLE_PLAY_ALL } from "../actions/actions";

const recordingControls = (state = { bpm: 120 }, action) => {
    switch (action.type) {
        case SET_BPM:
            return { ...state, bpm: action.payload }

        default:
            return state;
    }
}

const playbackStatus = (state = { playAll: false }, action) => {
    switch (action.type) {
        case TOGGLE_PLAY_ALL:
            return { ...state, playAll: !state.playAll }

        default:
            return state
    }
}

export default combineReducers({ 
    recordingControls,
    playbackStatus
});