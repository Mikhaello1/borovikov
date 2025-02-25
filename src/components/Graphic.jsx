
import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineElement, animator } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineElement);

export const ScatterPlot = ({ xData, yData, style, axisNames }) => {
    
    const data = {
        labels: xData,
        
        datasets: [
            {
                label: 'Точки',
                data: yData,
                backgroundColor: 'rgb(25, 255, 21)',
                fill: true,
                tension: 0.2
            },
        ],
    };

    const options = {

        animation: false,
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            
            
        },
        scales: {
            x: {
                beginAtZero: true,
                
                title: {
                    display: true,
                    text: axisNames[0],
                },
            },
            y: {
                
                beginAtZero: true,
                title: {
                    display: true,
                    text: axisNames[1],
                },
            },
        },
    };

    return (
        <div style={style}>
            <Line data={data} options={options}/>
        </div>
        
    );
};



