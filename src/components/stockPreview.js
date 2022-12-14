import React from 'react';
import {useState, useEffect} from 'react';
import '../css/stockPreview.css';
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto';

function StockPreview(props) {
    const [data, setData] = useState({});
    const [lastOpen, setLastOpen] = useState('');

    const dataSet = {
        labels: data.labels,
        datasets: [
            {
                label: props.stockName,
                data: data.data,
                borderWidth: 1,
                borderColor: 'green',
                backgroundColor: 'transparent',
                pointBorderWidth: 0,
            }
        ]
    }

    const options = {
        animation: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: false,
                    color: 'black',
                    // callback: value => `${value}m`,
                },
            },
            x: {
                ticks: {
                    display: false,
                }
            }
        }
    }
    
    useEffect(() => {
        const token = 'POVLG5LU9CLUO4IU';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${props.stockName}&interval=60min&slice=year1month3&outputsize=full&apikey=${token}`;

        fetch(url)
        .then(data=>data.json())
        .then(res=>{
            const dates = [];
            const values = [];

            const obj = res['Time Series (Daily)'];
            for (const date in obj) {
                const key = date;
                const value = obj[key];
                const open = value[Object.keys(value)[0]];
                dates.push(key);
                values.push(open);
            }
            
            const newData = {labels: dates.reverse(), data: values.reverse()}; 
            setData(newData);
            setLastOpen(newData.data[newData.data.length - 1]);
        })
    }, [])

    return (
        <li className="stockpreview" onClick={() => {return props.changeStock(props.stockName)}}>
            <div>
                {props.stockName}
            </div>
            <div className="stockpreview-graph">
                <Line data={dataSet} options={options}/>
            </div>
            <div>
                {lastOpen}$
            </div>
        </li>
    )
}

export default StockPreview;