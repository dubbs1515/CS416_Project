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
	GET_TEAM_MEDAL_ROLLUP_BY_GENDER,
	GET_TEAM_MEDAL_ROLLUP_BY_YEAR,
} from '../types';

const OlympicState = (props) => {
	const initialState = {
		olympicsAll: null,
		yearsAll: null,
		olympicsFiltered: null,
		loading: true,
		teamResults: null,
		teamMedalRollup: null,
		teamMedalRollupByGender: null,
		teamMedalRollupByYear: null,
	};

	const [state, dispatch] = useReducer(OlympicReducer, initialState);

	const getTeamOfInterest = async (tName) => {
		let toi = state.olympicsAll.filter((obj) => obj.Team == tName);
		console.log('cat');
		console.log(toi);
		return toi;
	};
	const getOlympicsAll = async () => {
		try {
			let data = await d3.csv('./data/OlympicVisData.csv');
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
		dispatch({
			type: GET_TEAM_MEDAL_ROLLUP,
		});
	};

	const getTeamMedalRollupByGender = async (team) => {
		if (state.olympicsAll == null) {
			await getOlympicsAll();
		}
		console.log('hi there');
		dispatch({
			type: GET_TEAM_MEDAL_ROLLUP_BY_GENDER,
			payload: await getTeamOfInterest(team),
		});
	};

	const getTeamMedalRollupByYear = async (team) => {
		if (state.olympicsAll == null) {
			await getOlympicsAll();
		}
		dispatch({
			type: GET_TEAM_MEDAL_ROLLUP_BY_YEAR,
			payload: await getTeamOfInterest(team),
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
				teamMedalRollupByGender: state.teamMedalRollupByGender,
				teamMedalRollupByYear: state.teamMedalRollupByYear,
				getTeamMedalRollupByYear,
				getOlympicsAll,
				getOlympicsByYearRange,
				getOlypmicsGroupedByTeams,
				getTeamMedalRollup,
				getTeamMedalRollupByGender,
			}}
		>
			{props.children}
		</OlympicContext.Provider>
	);
};

export default OlympicState;
