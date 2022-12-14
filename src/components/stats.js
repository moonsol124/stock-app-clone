import React from 'react';
import '../css/stats.css';
import {useState, useEffect} from 'react';
import StockPreview from './stockPreview';
import uniqid from 'uniqid';

function Stats(props) {
    //get a list of stocks and display them.
    // const [stocks, setStocks] = useState(["AAPL"]);
    const [stocks, setStocks] = useState(["AAPL", "MSFT", "TSLA", "BABA", "UBER", "DIS", "SBUX"]);

    return (
        <div className="stats">
            <div>
                <h2> Stocks </h2>
                {/* <button onClick={props.changeStock}> click me </button> */}
            </div>
            <ul className="stats-ul">
                {stocks.map(s => {
                    return <StockPreview key={uniqid()} stockName={s} changeStock={props.changeStock}/>;
                })}
            </ul>
        </div>
    )
}

export default Stats;