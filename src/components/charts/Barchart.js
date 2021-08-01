import React from 'react';
import { useD3 } from '../../hooks/useD3';
import * as d3 from 'd3';

const width = 600;
const height = 600;

const BarChart = ({ data }) => {
	console.log([...data.keys()]);
	console.log([...data.values()]);
	console.log(Math.max(...data.values()));
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
				g.attr(
					'transform',
					`translate(0, ${height - margin.bottom})`
				).call(d3.axisBottom(x));
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
				.attr('dx', '-2em')
				.attr('transform', 'rotate(270)')
				.style('text-anchor', 'end');

			svg.select('.y-axis').call(yAxis);

			svg.select('.plot-area')
				.selectAll('.bar')
				.data(data)
				.attr('fill', (d) => {
					return d3.interpolateCool(d[1] / 1000.0);
				})
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
