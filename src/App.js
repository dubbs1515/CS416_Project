import React /*, { useState, useEffect }*/ from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import DrillDown from './components/pages/DrillDown';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Olympics from './components/pages/Olympics';
import OlympicState from './context/olympic/OlympicState';

const App = () => {
	return (
		<OlympicState>
			<Router>
				<div className='App'>
					<div>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route
								path='/drillDown/:teamSlug'
								component={DrillDown}
							/>
							<Route
								exact
								path='/olympics'
								component={Olympics}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</OlympicState>
	);
};

export default App;
