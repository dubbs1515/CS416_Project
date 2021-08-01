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
			const margin = { top: 20, right: 10, bottom: 20, left: 10 };

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
				// g.attr(
				// 	'transform',
				// 	`translate(0, ${height - margin.bottom})`
				// ).call(
				// 	d3
				// 		.axisBottom(x)
				// 		.tickValues(
				// 			d3
				// 				.ticks(...d3.extent(x.domain()), width / 40)
				// 				.filter((v) => x(v) !== undefined)
				// 		)
				// 		.tickSizeOuter(0)
				// );
			};

			const yAxis = (g) => {
				// g.attr('transform', `translate(${margin.left}, 0)`)
				// 	.style('color', 'blue')
				// 	.call(d3.axisLeft(y).ticks(null, 's'))
				// 	.call((g) => g.select('.domain').remove())
				// 	.call((g) =>
				// 		g
				// 			.append('text')
				// 			.attr('x', -margin.left)
				// 			.attr('y', 10)
				// 			.attr('fill', 'currentColor')
				// 			.attr('text-anchor', 'start')
				// 			.text(data.y)
				// 	);
			};

			svg.select('.x-axis').call(xAxis);
			svg.select('.y-axis').call(yAxis);

			svg.select('.plot-area')
				.attr('fill', 'blue')
				.selectAll('.bar')
				// .data([...data.values()])
				.data(data)
				.join('rect')
				.attr('class', 'bar')
				.attr('x', (d, i) => {
					return x([...data.keys()][i]);
				})
				.attr('width', x.bandwidth())
				.attr('y', (d, i) => y(d[1]))
				.attr('height', (d, i) => {
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
