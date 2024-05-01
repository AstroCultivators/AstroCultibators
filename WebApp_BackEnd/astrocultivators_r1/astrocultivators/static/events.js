// import { createTemperatureChart } from "./sensorCharts";
const temperatureContainer = document.getElementById('temperature').getContext('2d');
const pressureContainer = document.getElementById('pressure').getContext('2d');
const humidityContainer = document.getElementById('humidity').getContext('2d');
var temperatureChart;
var pressureChart;
var humidityChart

var socket = io();
socket.on('connect', () => {
    console.log('Connected');
});

socket.on('init-chart', (data) => {
    console.log(data)
    temperatureChart = createTemperatureChart(temperatureContainer, data[1], data[0]);
    pressureChart = createPressureChart(pressureContainer, data[2], data[0])
    humidityChart = createHumidityChart(humidityContainer, data[3], data[0])
})

socket.on('update-chart', (sensorData) => {
    //console.log(`update chart js ${sensorData.currentData}`);
    console.log(sensorData.currentData);
    x = temperatureChart.data.datasets.push( sensorData.currentData[1]);
    y = temperatureChart.data.labels.push( sensorData.currentData[0]);
    
    temperatureChart = createTemperatureChart(temperatureContainer, x, y);

    socket.emit('update-current', sensorData.currentData);
});

socket.on('update-current', (mostCurrent) => {
    console.log(`update current js ${mostCurrent}`);
    currentTime = document.getElementById('current-time');
    currentTemp = document.getElementById('current-temp');
    currentHumidity = document.getElementById('current-humidity');
    currentPressure = document.getElementById('current-pressure');

    currentTime.innerHTML = mostCurrent[0];
    currentTemp.innerHTML = mostCurrent[1];
    currentHumidity.innerHTML = mostCurrent[2];
    currentPressure.innerHTML = mostCurrent[3];
})

setInterval(() => {
    socket.emit('update');
    console.log('update sent');
}, 1000); 


function createTemperatureChart(chartContainer, xaxis, yaxis) {
    if(temperatureChart) {
        temperatureChart.destroy();
    }
    return new Chart( chartContainer, {
        type: 'line',
        data: {
            labels: yaxis, // Time series data
            datasets: [{
                label: 'temperature',
                data: xaxis // Temperature data
            }]
        },
        options: {
            elements: {
                point: {
                    pointStyle: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Temperature'
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}
function createPressureChart(chartContainer, xaxis, yaxis) {
    return new Chart( chartContainer, {
        type: 'line',
        data: {
            labels: yaxis, // Time series data
            datasets: [{
                label: 'Pressure',
                data: xaxis // Pressure data
            }]
        },
        options: {
            elements: {
                point: {
                    pointStyle: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Pressure'
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}
function createHumidityChart(chartContainer, xaxis, yaxis) {
    return new Chart( chartContainer, {
        type: 'line',
        data: {
            labels: yaxis, // Time series data
            datasets: [{
                label: 'Humidity',
                data: xaxis // Humidity data
            }]
        },
        options: {
            elements: {
                point: {
                    pointStyle: false
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title:{
                    display: true,
                    text: 'Humidity'
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}