import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import TotalMedals from './components/pages/TotalMedals';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Olympics from './components/pages/Olympics';
import * as d3 from 'd3';

const App = () => {

	let name ='Chris'
	
	const [olympicData, setOlympicData] = useState([])		

	useEffect(() => {
		d3.csv('./data/OlympicData.csv')
			.then(data => setOlympicData(data))
	}, []);

	return (
		<Router>
			<div className='App'>
				<div>
					{/* <h1>Hello, {name}</h1> */}
					<Switch>
						<Route exact path='/' component={ Home } />
						<Route exact path='/totalMedals' component={ TotalMedals } />
						<Route exact path='/olympics' component={ Olympics } props={ olympicData } />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
