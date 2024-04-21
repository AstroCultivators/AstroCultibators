var socket = io();

socket.on('update-chart', (sensorData, currentData) => {

    sensorChartFigure = $('#sensor-data-figure')
    console.log(sensorData.sensorData)
    sensorChartFigure = document.createElement('img')
    sensorChartFigure.setAttribute('id', 'sensor-data-figure')
    sensorChartFigure.src = sensorData.sensorData
    socket.emit('update-current', currentData)
});

socket.on('update-current', (currentData) => {
    currentTime = $('#current-time')
    currentTemp = $('#current-temp')
    currentHumidity = $('#current-humidity')
    currentPressure = $('#current-pressure')

    currentTime.textContent = currentData[0]
    currentTemp.textContent = currentData[1]
    currentHumidity.textContent = currentData[2]
    currentPressure.textContent = currentData[3]
})