import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';


const Olympics = ({ olympicData }) => {
    
    
    let createChart = () => {
        const svg = d3
                .select('#olympicChart')
                .append('svg')
                .attr("viewBox", `0 0 300 600`)
        //console.log(olympicData[0].Age)
        let x = d3.scaleLog()
            .domain([10, 150])
            .range([0, 600]);

        let y = d3.scaleLog()
            .domain([10, 150])
            .range([300, 0]);
        
        let yAxis = d3.axisLeft()
            .scale(y)
            // .tickValues([10, 20, 50, 100])
            .tickFormat(d3.format("~s"))

        let xAxis = d3.axisBottom()
            .scale(x)
            .tickValues([10, 20, 50, 100])
            .tickFormat(d3.format("~s"))

            d3.selectAll('svg')
            .append('g')
            .attr('transform', 'translate(50,50)')
            .selectAll()
            .data(olympicData)
            .enter()
            .append('circle')
            .attr('cx', (d) => { return x(d.Team); } )
            .attr('cy', (d) => { return y(d.Year); } )
            .attr('r', (d) => { return 2 + parseInt(d3.mean(d.Age)); } )
    }

	useEffect(() => {
        console.log('hi')
		console.log(olympicData)
	}, []);
    

    return (
        <div className="Container-Fluid">
            <div className="row">
                <div className="col col-sm-8">
                    <h1>Summer Olympics</h1>
                </div>
                <div className="col col-sm-4">
                    <h2>Test</h2>
                </div>
            </div>
            <div className="row"> 
                <div className="col col-sm-2" id='#leftSideBar'>
                    <h2>LeftSideBar</h2>
                </div>
                <div className="col col-sm-8">
                    <h2>ChartArea</h2>
                    <div id="#olympicChart"></div>
                </div>
                <div className="col col-sm-2" id='#rightSideBar'>
                    <h2>RightSideBar</h2>
                </div>
            </div>
            <br />
        </div>
    )
}

export default Olympics
