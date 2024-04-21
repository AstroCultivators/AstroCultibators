var socket = io();
socket.on('connect', () => {
    console.log('Connected')
});

socket.on('update-chart', (sensorData) => {

    sensorChartFigure = $('#sensor-data-figure')
    console.log(sensorData.sensorData)
    sensorChartFigure = document.createElement('img')
    sensorChartFigure.setAttribute('id', 'sensor-data-figure')
    sensorChartFigure.src = sensorData.sensorData
    
});

socket.on('update-current', (mostCurrent) => {
    currentTime = $('#current-time')
    currentTemp = $('#current-temp')
    currentHumidity = $('#current-humidity')
    currentPressure = $('#current-pressure')

    currentTime.textContent = mostCurrent[0]
    currentTemp.textContent = mostCurrent[1]
    currentHumidity.textContent = mostCurrent[2]
    currentPressure.textContent = mostCurrent[3]
})
/* 
setInterval(() => {
    socket.emit('update')
    console.log('update sent')
}, 1000); 
*/