import React from 'react';
import '../css/newsfeed.css';
import LineGraph from './lineGraph';
import {useState, useEffect} from 'react';

function NewsFeed(props) {
    //display the graph of the passed stock.
    return (
        <div className="newsfeed">
            <div className="newsfeed-portfolio">
                <h2>{props.stock}</h2>
            </div>
            <div className="newsfeed-chart">
                <LineGraph stock={props.stock}/>
            </div>
        </div>
    )
}

export default NewsFeed;