import * as d3 from 'd3';
import {
	GET_OLYMPICS_ALL,
	GET_OLYMPICS_BY_YEAR,
	GET_OLYMPICS_BY_TEAM,
	CLEAR_OLYMPICS_FILTERED,
	GET_TEAM_MEDAL_ROLLUP,
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
		case GET_OLYMPICS_BY_TEAM:
			return {
				...state,
				teamResults: d3.group(state.olympicsAll, (d) => d.Team),
			};
		case GET_TEAM_MEDAL_ROLLUP:
			return {
				...state,
				teamMedalRollup: d3.rollup(
					state.olympicsAll,
					(v) => d3.sum(v, (d) => parseInt(d.DidMedal)),
					(d) => d.Team
				),
			};
		default:
			return state;
	}
};

export default olympicReducer;
