from flask import render_template, url_for, redirect
from flask_socketio import emit
from astrocultivators import app, socket

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure, get_current_data, get_time_data
from sensor_data import SensorData
from detect_distance import RS_Camera

port = 1
address = 0x77
document_name = 'test'

sensor = SensorData(port, address, document_name)

@socket.on('connect')
def handle_init_chart():
    print('Connected!')
    emit('init-chart', get_figure())

# Update emitted from liveChart.js
@socket.on('update')
def handle_update():
    sensor.run()
    emit('update-current', get_current_data(), broadcast=True)
    emit('update-chart', get_current_data(), broadcast=True)

@socket.on('take-picture')
def handle_take_picture():
    print('Smile!')
    camera = RS_Camera()
    camera.take_picture()


@app.route("/")
@app.route("/home")
def home():
    current_sensor_readings = get_current_data()

    return render_template('home.html', 
                           rgb_image=url_for('static', filename='images/rgb/test.png'), 
                           objdet_image=url_for('static', filename='images/object_detection/test.png'),
                           hyperspectral_image=url_for('static', filename='images/hyperspectral/test.png'),
                           current = current_sensor_readings )

@app.route("/csv")
def csv():

    return render_template('csv.html', title='Show Data')
