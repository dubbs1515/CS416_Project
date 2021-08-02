import React from 'react';
import { Button } from 'react-bootstrap';
//import * as d3 from 'd3';

const Home = () => {
	return (
		<div
			className='home'
			style={{ margin: '2em auto', textAlign: 'center' }}
		>
			<div className='row'>
				<h1>Who has succeeded the Summer Olympics Lately?</h1>
			</div>
			<div
				className='row'
				style={{ margin: '2em auto', textAlign: 'center' }}
			>
				<div className='col'>
					<Button href='/Olympics'>Let's Find Out</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
