var socket = io();
socket.on('connect', () => {
    console.log('Connected')
});

socket.on('update-chart', (sensorData) => {

    sensorChartFigure = document.getElementById('sensor-data-figure')
    console.log(sensorChartFigure.src)
    sensorChartFigure = document.createElement('img')
    sensorChartFigure.setAttribute('id', 'sensor-data-figure')
    sensorData.src = sensorData
    
});

setInterval(() => {
    socket.emit('update')
    console.log('update sent')
}, 1000);