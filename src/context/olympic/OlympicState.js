import React, { useReducer } from 'react';
import OlympicContext from './olympicContext';
import OlympicReducer from './olympicReducer';
import * as d3 from 'd3'; 
import {
    GET_OLYMPICS_ALL
} from '../types';

const OlympicState = (props) => {
    const initialState = {
        olympicsAll: null,
        loading: true
    };

    const [state, dispatch] = useReducer(OlympicReducer, initialState);

    const getOlympicsAll = async () => {
        try {      
            let data = await d3.csv('./data/OlympicData.csv');
            dispatch ({ type: GET_OLYMPICS_ALL, payload: data });   
        } catch (error) {
            console.log(error);
        }
    }

    // Clear Olympics

    return (
        <OlympicContext.Provider
        value={{
            olympicsAll: state.olympicsAll,
            loading: state.loading,
            getOlympicsAll
        }}>
            {props.children}
        </OlympicContext.Provider>
    );  
};

export default OlympicState;
