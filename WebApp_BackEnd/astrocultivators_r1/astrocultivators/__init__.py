from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = 'cb8830318b22945dc6f811d2812ef6be' # for use with cookies

from astrocultivators import routes # placed at end of file to avoid import loops