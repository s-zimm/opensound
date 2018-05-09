import { combineReducers } from 'redux';

import { SET_BPM } from "../actions/actions";

const recordingControls = (state = {}, action) => {
    switch (action.type) {
        case SET_BPM:
            return { ...state, bpm: action.payload }

        default:
            return state;
    }
}

export default combineReducers({ 
    recordingControls
});