import {
    GET_OLYMPICS_ALL
} from '../types';

const olympicReducer = (state, action) => {
    switch (action.type) {
        case GET_OLYMPICS_ALL:
            return {
                ...state,
                olympicsAll: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default olympicReducer;