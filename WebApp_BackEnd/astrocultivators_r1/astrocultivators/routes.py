from flask import render_template, url_for, redirect
from astrocultivators import app

# imports for charts
import base64 
from io import BytesIO
from sensor_figure import get_figure

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
                           rgb_image=url_for('static', filename='images/RGB_Images/Straight_1.png'), 
                           objdet_image=url_for('static', filename='images/Object Detected Photo/Straight 1.png'),
                           sensor_data_figure=f'data:image/png;base64,{data}')

@app.route("/csv")
def csv():

    return render_template('csv.html', title='Show Data')
