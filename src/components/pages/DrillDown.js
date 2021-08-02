import React, { Fragment, useContext, useEffect } from 'react';
//import * as d3 from 'd3';
import OlympicContext from '../../context/olympic/olympicContext';
import Spinner from '../layout/Spinner';
import { Button } from 'react-bootstrap';
import GenderChart from '../charts/GenderChart';
import YearChart from '../charts/YearChart';
import { useParams } from 'react-router-dom';

const DrillDown = () => {
	let { teamSlug } = useParams();
	const olympicContext = useContext(OlympicContext);
	const {
		olympicsAll,
		loading,
		getOlympicsAll,
		getTeamMedalRollupByGender,
		teamMedalRollupByGender,
		getTeamMedalRollupByYear,
		teamMedalRollupByYear,
	} = olympicContext;

	const loadAll = async () => {
		await getOlympicsAll();
	};

	useEffect(() => {
		console.log('loading: ' + loading);
		if (olympicsAll == null) {
			loadAll();
		}
		getTeamMedalRollupByGender(teamSlug);
		getTeamMedalRollupByYear(teamSlug);
		//eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			{teamMedalRollupByGender !== null &&
			teamMedalRollupByYear !== null &&
			!loading ? (
				<div className='container-fluid'>
					<div className='row' style={{ marginBottom: '10em' }}>
						<div className='col col-sm-8'>
							<h1>DrillDown</h1>
						</div>
						<div className='col col-sm-4'>
							<h2> Selected Team: {teamSlug}</h2>
						</div>
					</div>
					<div className='row'>
						<div className='col col-sm-2' id='#leftSideBar'>
							<p>
								Please, use the "Go Back" button to return to
								the main page
							</p>
						</div>
						<div className='col col-sm-5'>
							<h3>Medals Earned by Gender</h3>
							{console.log(teamMedalRollupByGender)}
							<GenderChart data={teamMedalRollupByGender} />
						</div>
						<div className='col col-sm-5'>
							<h3>Medals Earned by Year of Olympiad</h3>
							{console.log(teamMedalRollupByGender)}
							<YearChart data={teamMedalRollupByYear} />
						</div>
					</div>
					<div className='row'>
						<div
							style={{ margin: '2em auto', textAlign: 'center' }}
						>
							<Button className='btn' href='/Olympics'>
								Go Back
							</Button>
						</div>
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

export default DrillDown;
