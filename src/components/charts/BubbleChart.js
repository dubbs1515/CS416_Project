import React from 'react';
import { useD3 } from '../../hooks/useD3';
import * as d3 from 'd3';

const BubbleChart = () => {
	const ref = useD3();
	const margin = { top: 20, right: 20, bottom: 20, left: 20 };

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

export default BubbleChart;
