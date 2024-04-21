from threading import Lock
from flask import render_template, url_for, redirect
from flask_socketio import emit
from astrocultivators import app, socket

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure, get_current_data

current_data = None
fig = None
thread = None
thread_lock = Lock()

def background_thread():
    global current_data, fig
    while True:
        socket.sleep(1)
        current_data = get_current_data()
        fig = get_figure()

        # save to a buffer
        buf = BytesIO()
        fig.savefig('figure.png', format="png")
        # Embed saved fig in html output
        data = base64.b64encode(buf.getbuffer()).decode('ascii')
        emit('update-chart', {'image': True, 'sensorData': data, 'currentData': current_data}, broadcast=True)
    

@socket.event
def connect():
    global thread, current_data, fig

    current_data = get_current_data()
    fig = get_figure()

    # save to a buffer
    buf = BytesIO()
    fig.savefig('figure.png', format="png")
    # Embed saved fig in html output
    data = base64.b64encode(buf.getbuffer()).decode('ascii')

    with thread_lock:
        if thread is None:
            thread = socket.start_background_task(background_thread)
    emit('update-chart', {'image': True, 'sensorData': data, 'currentData': current_data}, broadcast=True)

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
    emit('update-current', get_current_data(), broadcast=True)

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
