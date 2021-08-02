import React from 'react';
import { useD3 } from '../../hooks/useD3';
import { useHistory } from 'react-router-dom';
import * as d3 from 'd3';

const width = 600;
const height = 600;

const BarChart = (props) => {
	const history = useHistory();
	let data = props.data;
	const ref = useD3(
		(svg) => {
			const margin = { top: 20, right: 10, bottom: 200, left: 30 };

			const x = d3
				.scaleBand()
				.domain([...data.keys()])
				.rangeRound([margin.left, width - margin.right])
				.padding(0.2);

			const y = d3
				.scaleLinear([0, Math.max(...data.values())])
				.domain([0, Math.max(...data.values())])
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
							.text(data.x)
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
							.text(data.y)
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
				.data(data)

				.join('rect')
				.attr('class', 'bar')
				.attr('id', (d, i) => [...data.keys()][i])
				.attr('x', (d) => {
					return x(d[0]);
				})
				.attr('width', x.bandwidth())
				.attr('y', (d) => y(d[1]))
				.attr('height', (d) => {
					return y(0) - y(d[1]);
				})
				.attr('fill', (d) => {
					return d3.interpolateCool(d[1] / 1000.0);
				})
				.attr('#id', data.x)
				.on('click', (e) => {
					history.push(`/drillDown/${e.target.id}`);
				});
		},
		[data.size]
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

export default BarChart;
