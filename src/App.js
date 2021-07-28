import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/pages/Home';
import './App.css';

function App() {
	return (
		<Router>
			<div className='App'>
				<div>
					<Switch>
						<Route exact path='/' component={ Home } />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
