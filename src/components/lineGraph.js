import React from 'react';
import {Line, Bar, PolarArea, Pie, Doughnut, Radar, Scatter, Bubble} from "react-chartjs-2";
import Chart from 'chart.js/auto';
import {useState, useEffect} from 'react';
import '../css/newsfeed.css';

function LineGraph(props) {
    const [data, setData] = useState({});
    const [todayData, setTodayData] = useState({});

    useEffect(() => {
        const api_key = 'POVLG5LU9CLUO4IU';
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${props.stock}&interval=60min&slice=year1month3&outputsize=full&apikey=${api_key}`;
        fetch(url)
        .then(data => data.json())
        .then(res =>{ 
            const dates = [];
            const values = [];

            const obj = res['Time Series (Daily)'];

            for (const date in obj) {
                const data = {date: date, data: obj[date]};
                setTodayData(data);
                break;
            }

            for (const date in obj) {
                const key = date;
                const value = obj[key];
                const open = value[Object.keys(value)[0]];
                dates.push(key);
                values.push(open);
            }
            
            const newData = {labels: dates.reverse(), data: values.reverse()}; 
            setData(newData);
        })
    }, [props.stock])

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
                    display: true,
                    color: 'white',
                    callback: value => `${value}$`,
                },
            },
            x: {
                ticks: {
                    display: false,
                }
            }
        }
    }

    const dataSet = {
        labels: data.labels,
        datasets: [
            {
                label: props.stock,
                data: data.data,
                backgroundColor: 'black',
                borderWidth: 1,
                borderColor: 'green',
                pointBackgroundColor: 'transparent',
                pointBorderWidth: 0,
            }
        ]
    }

    return (
        <div className="linegraph">
            <div>
                {(Object.keys(todayData).length === 0)?null:
                    <>
                        <div className="today-date">
                            {todayData.date}
                            <p className="stock-info"><span>Open</span><span>{todayData.data['1. open']}$</span></p>
                        </div>
                    </>
                }
            </div>
            <div className="chart-container">
                <div className="chart" style={{width: '100%'}}>
                    <Line data={dataSet} options={options}/>
                </div>
            </div>
            <div>
                {(Object.keys(todayData).length === 0)?null:
                    <>
                        <div className="stock-info-detail">
                            <p className="stock-info"><span>High</span><span>{todayData.data['2. high']}$</span></p>
                            <p className="stock-info"><span>Low</span><span>{todayData.data['3. low']}$</span></p>
                            <p className="stock-info"><span>Close</span><span>{todayData.data['4. close']}$</span></p>
                            <p className="stock-info"><span>Volumn</span><span>{todayData.data['6. volume']}</span></p>
                            <p className="stock-info"><span>Dividend amount</span><span>{todayData.data['7. dividend amount']}</span></p>
                            <p className="stock-info"><span>Split coefficient</span><span>{todayData.data['8. split coefficient']}</span></p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default LineGraph;