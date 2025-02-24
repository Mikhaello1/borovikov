
import React, { memo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineElement } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend, LineElement);

export const ScatterPlot = ({ xData, yData, style }) => {
    
    const data = {
        labels: xData,
        datasets: [
            {
                label: 'Точки',
                data: yData,
                backgroundColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.2
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X значения',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Y значения',
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



