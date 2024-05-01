from flask import render_template, url_for, redirect
from flask_socketio import emit
from astrocultivators import app, socket

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure, get_current_data, get_time_data

@socket.on('connect')
def handle_init_chart():
    print('Connected!')
    emit('init-chart', get_figure())

# Update emitted from liveChart.js
@socket.on('update')
def handle_update():
    pass
    # emit('update-chart', {'currentData': get_current_data() }, broadcast=True)
    # emit('update-current', get_current_data(), broadcast=True)

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
