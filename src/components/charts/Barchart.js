import React from 'react';
import { useD3 } from '../../hooks/useD3';
import * as d3 from 'd3';

const width = 600;
const height = 600;

const BarChart = ({ data }) => {
	data = data.slice(1, 10);
	const ref = useD3(
		(svg) => {
			const margin = { top: 20, right: 10, bottom: 20, left: 10 };

			const y = d3
				.scaleLinear()
				.domain([0, d3.max(data, (d) => d3.mean(d.Age))])
				.rangeRound([height - margin.bottom, margin.top]);

			const x = d3
				.scaleBand()
				.domain(data.map((d) => d.Year))
				.rangeRound([margin.left, width - margin.right]);

			const yAxis = (g) => {
				g.attr('transform', `translate(${margin.left}, 0)`)
					.style('color', 'blue')
					.call(d3.axisLeft(y).ticks(null, 's'))
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

			const xAxis = (g) => {
				g.attr(
					'transform',
					`translate(0, ${height - margin.bottom})`
				).call(
					d3
						.axisBottom(x)
						.tickValues(
							d3
								.ticks(...d3.extent(x.domain()), width / 40)
								.filter((v) => x(v) !== undefined)
						)
						.tickSizeOuter(0)
				);
			};

			svg.select('.x-axis').call(xAxis);
			svg.select('.y-axis').call(yAxis);

			svg.select('.plot-area')
				.attr('fill', 'blue')
				.selectAll('.bar')
				.data(data)
				.join('rect')
				.attr('class', 'bar')
				.attr('x', (d) => x(d.Year))
				.attr('width', x.bandwidth())
				.attr('y', (d) => y(d3.mean(d.Age)))
				.attr('height', (d) => y(0) - y(d3.mean(d.Age)));
		},
		[data.length]
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
