import React/*, { useState, useEffect }*/ from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import TotalMedals from './components/pages/TotalMedals';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Olympics from './components/pages/Olympics';
import OlympicState from './context/olympic/OlympicState';


const App = () => {

	//let name ='Chris'
	
	return (
		<OlympicState>
			<Router>
				<div className='App'>
					<div>
						{/* <h1>Hello, {name}</h1> */}
						<Switch>
							<Route exact path='/' component={ Home } />
							<Route exact path='/totalMedals' component={ TotalMedals } />
							<Route exact path='/olympics' component={ Olympics }/>
						</Switch>
					</div>
				</div>
			</Router>
		</OlympicState>
	);
}

export default App;
