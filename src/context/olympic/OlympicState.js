import React, { useReducer } from 'react';
import OlympicContext from './olympicContext';
import OlympicReducer from './olympicReducer';
import * as d3 from 'd3';
import {
	GET_OLYMPICS_ALL,
	GET_OLYMPICS_BY_YEAR,
	GET_OLYMPICS_BY_TEAM,
	CLEAR_OLYMPICS_FILTERED,
} from '../types';

const OlympicState = (props) => {
	const initialState = {
		olympicsAll: null,
		yearsAll: null,
		olympicsFiltered: null,
		loading: true,
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
		console.log('1');
		if (state.olympicsAll == null) {
			console.log('2');
			await getOlympicsAll();
		}

		dispatch({ type: GET_OLYMPICS_BY_YEAR, payload: range });
		console.log('3');
	};

	const getOlympicsByTeams = async (beginYear, endYear) => {
		if (state.olympicsAll !== null) {
			dispatch({
				type: GET_OLYMPICS_BY_TEAM,
				payload: state.olympicsAll,
			});
		}
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
				getOlympicsAll,
				getOlympicsByYearRange,
				getOlympicsByTeams,
			}}
		>
			{props.children}
		</OlympicContext.Provider>
	);
};

export default OlympicState;
