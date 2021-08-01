import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';


const TotalMedals = () => {
    const [medalData, setMedalData] = useState([])	

	useEffect(() => {
		d3.csv('./data/TotalMedals.csv')
			.then(data => setMedalData(data))
			.then(console.log(medalData))
            .then(createChart())
	}, []);
    
    let createChart = () => {
        const svg = d3
                .select('#medalChart')
                .append('svg')
                .attr("viewBox", `0 0 300 600`)
        console.log(medalData[0])
    }

    return (
        <div>
            <div className="row"> 
                <div className="col">
                    <h1>Total Medals</h1>
                </div>
                <div className="col">
                    <h2>Test</h2>
                </div>
            </div>
            <br />
            <div id="medalChart"></div>
        </div>
    )
}

export default TotalMedals
