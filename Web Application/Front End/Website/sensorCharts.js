document.addEventListener("DOMContentLoaded", function () {
    // Collecting related divs
    const humidityCanvas = document.getElementById("humidity-canvas").getContext("2d");
    const temperatureCanvas = document.getElementById("temperature-canvas").getContext("2d");
    const pressureCanvas = document.getElementById("pressure-canvas").getContext("2d");
    const currentHumidity = document.getElementById("current-humidity");
    const currentTemp = document.getElementById("current-temp");
    const currentPressure = document.getElementById("current-pressure");

    let humidityChart, temperatureChart, pressureChart;

    const getTimeLabels = (data) => {
        const lastTenEntries = data.slice(-10);
        return lastTenEntries.map(entry => entry[0]);
    }

    const getTempData = (data) => {
        const lastTenEntries = data.slice(-10);
        return lastTenEntries.map(entry => entry[1]);
    }

    const getHumidityData = (data) => {
        const lastTenEntries = data.slice(-10);
        return lastTenEntries.map(entry => entry[2]);
    }

    const getPressureData = (data) => {
        const lastTenEntries = data.slice(-10);
        return lastTenEntries.map(entry => entry[3]);
    }

    const getCurrentTemp = (data) => {
        const currentTempData = data.slice(-2);
        return currentTempData[0][1];
    }
    const getCurrentHumidity = (data) => {
        const currentHumidityData = data.slice(-2);
        return currentHumidityData[0][2];
    }
    const getCurrentPressure = (data) => {
        const currentPressureData = data.slice(-2);
        return currentPressureData[0][3];
    }

    function updateHumidityChart(data) {
        if (humidityChart) {
            humidityChart.destroy();
        } 
        humidityChart = new Chart(humidityCanvas, {
            type: 'line',
            data: {
                labels: getTimeLabels(data),
                datasets: [{
                    label: 'Humidity',
                    data: getHumidityData(data),
                    fill: false,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(245,245,245)',
                    tension: 0.1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            parser: 'MM/DD/YYYY H:mm',
                            unit: 'hour',
                            displayFormats: {
                                hour: 'MM/DD/YYYY H:mm'
                            }
                        },
                        ticks: {
                            maxRotation: 0,
                            minRotation: 0
                        }
                    }]
                },
                animation: {
                    duration: 0, // Set the duration of the animation to 0 to disable it
                    //easing: 'linear' // Set the easing to 'linear' (optional, but can be used to customize)
                }
            }
        });
    }

    function updateTemperatureChart(data) {
        //console.log('Labels:', getTimeLabels(data)); // Add this line for logging

        if (temperatureChart) {
            temperatureChart.destroy();
        } 
        temperatureChart = new Chart(temperatureCanvas, {
            type: 'line',
            data: {
                labels: getTimeLabels(data),
                datasets: [{
                    label: 'Temperature',
                    data: getTempData(data),
                    fill: false,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(245,245,245)',
                    tension: 0.1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                },
                animation: {
                    duration: 0, // Set the duration of the animation to 0 to disable it
                    //easing: 'linear' // Set the easing to 'linear' (optional, but can be used to customize)
                }
            }
        });
    }

    function updatePressureChart(data) {
       //console.log('Labels:', getTimeLabels(data)); // Add this line for logging

        if (pressureChart) {
            pressureChart.destroy();
        } 
        pressureChart = new Chart(pressureCanvas, {
            type: 'line',
            data: {
                labels: getTimeLabels(data),
                datasets: [{
                    label: 'Pressure',
                    data: getPressureData(data),
                    fill: false,
                    borderColor: 'rgb(0, 0, 0)',
                    backgroundColor: 'rgb(245,245,245)',
                    tension: 0.1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false
                        }
                    }]
                    
                },
                animation: {
                    duration: 0, // Set the duration of the animation to 0 to disable it
                    //easing: 'linear' // Set the easing to 'linear' (optional, but can be used to customize)
                }
                
            }
        });  
    }

    function handleCSV(csvText) {
        Papa.parse(csvText, {
            header: false,
            dynamicTyping: true,
            complete: function (results) {
                updateHumidityChart(results.data);
                updateTemperatureChart(results.data);
                updatePressureChart(results.data);
                currentHumidity.innerHTML = getCurrentHumidity(results.data);
                currentTemp.innerHTML = getCurrentTemp(results.data);
                currentPressure.innerHTML = getCurrentPressure(results.data);
            }
        });
    }
    
    function readCSVFile() {
        fetch('testData.csv')
        .then(response => response.text())
        .then(handleCSV)
        .catch(error => console.error('Error reading CSV file:', error));
    }
    
    readCSVFile();
    setInterval(readCSVFile, 1000); // Update every second
    

    const emergencyStop = document.getElementById("Emergency-Stop");
    const homeRobot = document.getElementById("Home-Robot");

    // Add a click event listener to make it clickable
    emergencyStop.addEventListener("click", function () {
        alert("You clicked EMERGENCY STOP. Robot stopping now!");
    });

    homeRobot.addEventListener("click", function () {
        alert("You clicked Home Robot! Robot moving into Home position.");
    });
});
    