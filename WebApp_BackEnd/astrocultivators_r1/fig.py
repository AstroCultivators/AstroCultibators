import pandas as pd
import datetime
from datetime import datetime as dt

start_data = 'start_data.csv'
test_seconds = 'test_seconds.csv'

data = pd.read_csv(start_data, header=None)

c_time = dt.now()

starting_array = [[0 for j in range(4)] for i in range(len(data))]

for i in range(len(starting_array)):
    print(i)
    starting_array[0][i] = dt.now() - datetime.timedelta(seconds=(len(data) - i))
    starting_array[1][i] = data[1][i]
    starting_array[2][i] = data[2][i]
    starting_array[3][i] = data[3][i]

print(starting_array)