var socket = io();
socket.on('connect', () => {
    console.log('Connected')
});

socket.on('update-chart', (sensorData) => {
    console.log(`update chart js ${sensorData.sensorData}`)
    sensorDataContainer = document.getElementById('sensor-data-container');
    sensorDataContainer.innerHTML = `<img id="sensor-data-figure" src=${'../figure.png'} />`
    
    socket.emit('update-current', sensorData.currentData);
});

socket.on('update-current', (mostCurrent) => {
    console.log(`update current js ${mostCurrent}`)
    currentTime = document.getElementById('current-time')
    currentTemp = document.getElementById('current-temp')
    currentHumidity = document.getElementById('current-humidity')
    currentPressure = document.getElementById('current-pressure')

    currentTime.innerHTML = mostCurrent[0]
    currentTemp.innerHTML = mostCurrent[1]
    currentHumidity.innerHTML = mostCurrent[2]
    currentPressure.innerHTML = mostCurrent[3]
})

setInterval(() => {
    socket.emit('update')
    console.log('update sent')
}, 1000); 
