# creates a matplotlib figure of data recieved from a .csv file
# This figure does not use pyplot as using pylot can lead to memory leaks.
import pandas as pd
from matplotlib.figure import Figure

def get_figure():
    '''
    data[0] = Date
    data[1] = Temperature
    data[2] = Humidity
    data[3] = Pressure
    '''

    format = '-'

    # read in .csv data
    data = pd.read_csv('test_seconds.csv', header=None)

    timestamp = pd.to_datetime(data[0])
    temp = data[1]
    humid = data[2]
    pres = data[3]

    # create the figure
    fig = Figure()
    fig.suptitle('Sensor Data')

    # create axes using add_suplot([# rows in fig], [# columns in fig], AxesNum)
    temperature = fig.add_subplot(311)
    temperature.set_ylabel('\N{DEGREE SIGN}C')
    temperature.plot_date(x=timestamp, y=temp, fmt=format)

    humidity = fig.add_subplot(312)
    humidity.set_ylabel('Humidity')
    humidity.plot_date(x=timestamp, y=humid, fmt=format)

    pressure = fig.add_subplot(313)
    pressure.set_ylabel('Pressure')
    pressure.plot_date(x=timestamp, y=pres, fmt=format)

    # style layout margins, labels, and axies
    fig.tight_layout()
    fig.align_ylabels()
    fig.autofmt_xdate()

    return fig