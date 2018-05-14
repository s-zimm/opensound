export const SET_BPM = 'SET_BPM';
export const TOGGLE_PLAY_ALL = 'TOGGLE_PLAY_ALL';

export const setBPM = (bpm) => ({
    type: SET_BPM,
    payload: bpm
});

export const togglePlayAll = () => ({
    type: TOGGLE_PLAY_ALL
});