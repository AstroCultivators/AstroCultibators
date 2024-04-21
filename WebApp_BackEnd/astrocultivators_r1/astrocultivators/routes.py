from flask import render_template, url_for, redirect
from flask_socketio import emit
from astrocultivators import app, socket

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure, get_current_data

# Update emitted from liveChart.js
@socket.on('update')
def handle_update():

    fig = get_figure()
    # save to a buffer
    buf = BytesIO()
    fig.savefig(buf, format="png")

    # Embed saved fig in html output
    data = base64.b64encode(buf.getbuffer()).decode('ascii')
    # emit('update-chart', { 'image': True, 'sensorData': data }, broadcast=True)
    emit('update-current', get_current_data())

@app.route("/")
@app.route("/home")
def home():

    fig = get_figure()
    # save to a buffer
    buf = BytesIO()
    fig.savefig(buf, format="png")

    # Embed saved fig in html output
    data = base64.b64encode(buf.getbuffer()).decode('ascii')    

    current_sensor_readings = get_current_data()

    return render_template('home.html', 
                           rgb_image=url_for('static', filename='images/rgb/test.png'), 
                           objdet_image=url_for('static', filename='images/object_detection/test.png'),
                           hyperspectral_image=url_for('static', filename='images/hyperspectral/test.png'),
                           sensor_data_figure=f'data:image/png;base64,{data}',
                           current = current_sensor_readings )

@app.route("/csv")
def csv():

    return render_template('csv.html', title='Show Data')
