const temperatureContainer = document.getElementById('temperature').getContext('2d');

export function createTemperatureChart(chartContainer, xaxis, yaxis) {
    return new Chart( chartContainer, {
        type: 'line',
        data: {
            labels: yaxis, // Time series data
            datasets: [{
                label: 'temprature',
                data: xaxis // Temperature data
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }); 
}

export function updateChart(chart, xaxis, yaxis){
    chart[0].data.datasets.data.push(xaxis);
    chart[0].data.labels.push(yaxis);
    return chart;
}