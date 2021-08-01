import {
	GET_OLYMPICS_ALL,
	GET_OLYMPICS_BY_YEAR,
	GET_OLYMPICS_BY_TEAM,
	CLEAR_OLYMPICS_FILTERED,
} from '../types';

const olympicReducer = (state, action) => {
	switch (action.type) {
		case GET_OLYMPICS_ALL:
			return {
				...state,
				olympicsAll: action.payload,
				loading: false,
			};
		case GET_OLYMPICS_BY_YEAR:
			return {
				...state,
				olympicsFiltered: state.olympicsAll.filter((o) => {
					return (
						parseInt(o.Year) >= action.payload[0] &&
						parseInt(o.Year) <= action.payload[1]
					);
				}),
			};
		case CLEAR_OLYMPICS_FILTERED:
			return {
				...state,
				olympicsFiltered: null,
			};
		default:
			return state;
	}
};

export default olympicReducer;
