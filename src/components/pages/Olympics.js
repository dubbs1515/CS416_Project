import React, { Fragment, useContext, useEffect } from 'react';
//import * as d3 from 'd3';
import OlympicContext from '../../context/olympic/olympicContext';
import Spinner from '../layout/Spinner';
import BarChart from '../charts/Barchart';

const Olympics = () => {
	// Initialize Context
	const olympicContext = useContext(OlympicContext);
	const {
		olympicsAll,
		loading,
		getOlympicsAll,
		getOlympicsByYearRange,
		teamMedalRollup,
		getOlypmicsGroupedByTeams,
		getTeamMedalRollup,
	} = olympicContext;

	const loadAll = async () => {
		let res = await getOlympicsAll();
	};

	useEffect(() => {
		console.log('loading: ' + loading);
		if (olympicsAll == null) {
			loadAll();
		}
		getOlypmicsGroupedByTeams();
		getTeamMedalRollup();
		//eslint-disable-next-line
	}, []);

	if (olympicsAll !== null && olympicsAll.length === 0 && !loading) {
		return <h4>NO DATA...</h4>;
	}

	return (
		<Fragment>
			{teamMedalRollup !== null && !loading ? (
				<div className='container-fluid'>
					<div className='row' style={{ marginBottom: '3em' }}>
						<div className='col col-sm-8'>
							<h1>Summer Olympics</h1>
						</div>
						<div className='col col-sm-4'>
							<h2>2004 - 2016, Combined Medal Count</h2>
						</div>
					</div>
					<div className='row'>
						<div className='col col-sm-2' id='#leftSideBar'>
							The chart demonstrates overall team success for the
							past four Olympiads. <br /> Click on a bar for a
							team of interest to drill down further.
						</div>
						<div className='col col-sm-8'>
							{console.log(teamMedalRollup)}
							<BarChart data={teamMedalRollup} />
						</div>
						<div className='col col-sm-2' id='#rightSideBar'></div>
					</div>
				</div>
			) : (
				<div style={{}}>
					<h2>Loading...</h2>
					<Spinner />
				</div>
			)}
			;
		</Fragment>
	);
};

export default Olympics;
