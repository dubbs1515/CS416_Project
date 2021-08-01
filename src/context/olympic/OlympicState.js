import React, { useReducer } from 'react';
import OlympicContext from './olympicContext';
import OlympicReducer from './olympicReducer';
import * as d3 from 'd3';
import {
	GET_OLYMPICS_ALL,
	GET_OLYMPICS_BY_YEAR,
	GET_OLYMPICS_BY_TEAM,
	CLEAR_OLYMPICS_FILTERED,
	GET_TEAM_MEDAL_ROLLUP,
} from '../types';

const OlympicState = (props) => {
	const initialState = {
		olympicsAll: null,
		yearsAll: null,
		olympicsFiltered: null,
		loading: true,
		teamResults: null,
		teamMedalRollup: null,
	};

	const [state, dispatch] = useReducer(OlympicReducer, initialState);

	const getOlympicsAll = async () => {
		try {
			let data = await d3.csv('./data/OlympicData.csv');
			dispatch({ type: GET_OLYMPICS_ALL, payload: data });
		} catch (error) {
			console.log(error);
		}
	};

	const getOlympicsByYearRange = async (range) => {
		if (state.olympicsAll == null) {
			await getOlympicsAll();
		}

		dispatch({ type: GET_OLYMPICS_BY_YEAR, payload: range });
	};

	const getOlypmicsGroupedByTeams = async () => {
		if (state.olympicsAll == null) {
			await getOlympicsAll();
		}

		dispatch({
			type: GET_OLYMPICS_BY_TEAM,
		});
	};

	const getTeamMedalRollup = async () => {
		if (state.olympicsAll == null) {
			await getOlympicsAll();
		}
		state.loading = true;
		console.log('hi there');
		dispatch({
			type: GET_TEAM_MEDAL_ROLLUP,
		});
	};

	const clearOlympicsFiltered = () => {
		dispatch({ type: CLEAR_OLYMPICS_FILTERED });
	};

	return (
		<OlympicContext.Provider
			value={{
				olympicsAll: state.olympicsAll,
				loading: state.loading,
				olympicsFiltered: state.olympicsFiltered,
				teamResults: state.teamResults,
				teamMedalRollup: state.teamMedalRollup,
				getOlympicsAll,
				getOlympicsByYearRange,
				getOlypmicsGroupedByTeams,
				getTeamMedalRollup,
			}}
		>
			{props.children}
		</OlympicContext.Provider>
	);
};

export default OlympicState;
