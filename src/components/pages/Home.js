import React from 'react';
import * as d3 from 'd3';

const Home = () => {

    let init = async () => {
        let deadliestCreatureData = await d3.csv('./data/deadliestCreatureDataRaw.csv');
        console.log(deadliestCreatureData);
    };
    
    return(
        <div className='home'>
            <div>
                <h1>Narrative Visualization</h1>
            </div>
            
        </div>
    );
}

export default Home;