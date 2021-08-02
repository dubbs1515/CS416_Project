import React from 'react';
import { useD3 } from '../../hooks/useD3';
import * as d3 from 'd3';
import { Redirect, Router, BrowserRouterProps } from 'react-router-dom';

const width = 600;
const height = 600;

const YearChart = (props) => {
	let data = props.data;
	let teamName = [...data.keys()][0];
	console.log(teamName);
	let medalData = [...data.values()][0];
	console.log(medalData);
	// console.log([...data.keys()]);
	// console.log([...data.values()]);
	console.log(Math.max(...medalData.values()));
	const ref = useD3(
		(svg) => {
			const margin = { top: 20, right: 10, bottom: 200, left: 30 };

			const x = d3
				.scaleBand()
				.domain([...medalData.keys()])
				.rangeRound([margin.left, width - margin.right])
				.padding(0.2);

			const y = d3
				.scaleLinear([0, Math.max(...medalData.values())])
				.domain([0, Math.max(...medalData.values())])
				.range([height - margin.bottom, margin.top]);

			const xAxis = (g) => {
				g.attr('transform', `translate(0, ${height - margin.bottom})`)
					.call(d3.axisBottom(x))
					.call((g) =>
						g
							.append('text')
							.attr('x', -margin.left)
							.attr('y', 10)
							.attr('fill', 'currentColor')
							.attr('text-anchor', 'start')
							.text(medalData.x)
					);
			};

			const yAxis = (g) => {
				g.attr('transform', `translate(${margin.left}, 0)`)
					.style('color', 'black')
					.call(d3.axisLeft(y).ticks(null))

					.call((g) => g.select('.domain').remove())
					.call((g) =>
						g
							.append('text')
							.attr('x', -margin.left)
							.attr('y', 10)
							.attr('fill', 'currentColor')
							.attr('text-anchor', 'start')
							.text(medalData.y)
					);
			};

			svg.select('.x-axis')
				.call(xAxis)
				.selectAll('text')
				.attr('dy', '-.5em')
				.attr('dx', '-3em')
				.attr('transform', 'rotate(270)')
				.style('text-anchor', 'end');

			svg.select('.y-axis').call(yAxis);

			svg.select('.plot-area')
				.selectAll('.bar')
				.data(medalData)

				.join('rect')
				.attr('class', 'bar')
				.attr('x', (d) => {
					return x(d[0]);
				})
				.attr('width', x.bandwidth())
				.attr('y', (d) => y(d[1]))
				.attr('height', (d) => {
					console.log(d[1]);
					return y(0) - y(d[1]);
				})
				.attr('fill', (d) => {
					return d3.interpolateWarm(d[1] / 1000.0);
				})
				.attr('#id', medalData.x);
		},
		[medalData.size]
	);

	return (
		<svg
			ref={ref}
			viewBox={`0 0 ${height} ${width}`}
			style={{
				height: 500,
				width: '100%',
				marginRight: '0px',
				marginLeft: '0px',
			}}
		>
			<g className='plot-area' />
			<g className='x-axis' />
			<g className='y-axis' />
		</svg>
	);
};

export default YearChart;
