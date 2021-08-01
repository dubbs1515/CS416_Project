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
		teamResults,
		olympicsFiltered,
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
		getOlympicsByYearRange([2004, 2016]);
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
					<div className='row'>
						<div className='col col-sm-8'>
							<h1>Summer Olympics</h1>
						</div>
						<div className='col col-sm-4'>
							<h2>Test</h2>
						</div>
					</div>
					<div className='row'>
						<div className='col col-sm-2' id='#leftSideBar'>
							<h2>LeftSideBar</h2>
						</div>
						<div className='col col-sm-8'>
							{console.log(teamMedalRollup)}
							<BarChart data={teamMedalRollup} />
						</div>
						<div className='col col-sm-2' id='#rightSideBar'>
							<h2>RightSideBar</h2>
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

export default Olympics;

// let createChart = () => {
//     const svg = d3
//             .select('#olympicChart')
//             .append('svg')
//             .attr("viewBox", `0 0 300 600`)
//     let x = d3.scaleLog()
//         .domain([10, 150])
//         .range([0, 600]);

//     let y = d3.scaleLog()
//         .domain([10, 150])
//         .range([300, 0]);

//     let yAxis = d3.axisLeft()
//         .scale(y)
//         .tickValues([10, 20, 50, 100])
//         .tickFormat(d3.format("~s"))

//     let xAxis = d3.axisBottom()
//         .scale(x)
//         .tickValues([10, 20, 50, 100])
//         .tickFormat(d3.format("~s"))

//     svg.append('g')
//         .attr('transform', 'translate(50,50)')
//         .selectAll()
//         .data(olympicsAll)
//         .enter()
//         .append('circle')
//         .attr('cx', (d) => { return x(d.Team); } )
//         .attr('cy', (d) => { return y(d.Year); } )
//         .attr('r', (d) => { return parseInt(d3.mean(d.Age)); } )

//     svg.append('g')
//         .attr('transform', 'translate(50,50)')
//         .call(yAxis)

//     svg.append('g')
//         .attr('transform', 'translate(50,250)')
//     .call(xAxis)
// }
