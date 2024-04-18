from flask import render_template, url_for, redirect
from flask_socketio import emit
from astrocultivators import app, socket

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure

count = 0

# Update emitted from liveChart.js
@socket.on('update')
def handle_update():
    # global count

    fig = get_figure()
    # save to a buffer
    buf = BytesIO()
    fig.savefig(buf, format="png")

    # Embed saved fig in html output
    data = base64.b64encode(buf.getbuffer()).decode('ascii')
    emit('update-chart', (f'data:image/png;base64,{data}'))

    """ print('update-chart {}', count)
    emit('update-chart', (count))
    count += 1 """

@app.route("/")
@app.route("/home")
def home():

    fig = get_figure()
    # save to a buffer
    buf = BytesIO()
    fig.savefig(buf, format="png")

    # Embed saved fig in html output
    data = base64.b64encode(buf.getbuffer()).decode('ascii')    

    return render_template('home.html', 
                           rgb_image=url_for('static', filename='images/rgb/test.png'), 
                           objdet_image=url_for('static', filename='images/object_detection/test.png'),
                           hyperspectral_image=url_for('static', filename='images/hyperspectral/test.png'),
                           sensor_data_figure=f'data:image/png;base64,{data}')

@app.route("/csv")
def csv():

    return render_template('csv.html', title='Show Data')
