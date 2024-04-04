from flask import Flask
from flask import render_template
import os
import datetime

app = Flask(__name__)

#Get most recent image file
def get_most_recent_image():
    image_directory = '/home/orin/AstroCultivators/WebApp_BackEnd/astrocultivators_r1/static/RGB_Images' #path to image directory
    images = os.listdir(image_directory)
    if images:
        images.sort(reverse=True, key=lambda x:
                os.path.getmtime(os.path.join(image_directory, x)))
        most_recent_image = images[0]
        return most_recent_image
    else:
        return None


@app.route('/')
def home():
    #Get the most recent image
    image_path = get_most_recent_image()

    #Get the current date and time
    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    #Render the template with the image and date/time
    return render_template('index.html', image_path=image_path, current_time=current_time)

def hello_plant_lover():
    return 'Hello, Plant Lover!'

if __name__ == "__main__":
    host = '130.166.24.117'
    app.run(host=host, port=5000, debug=True)
