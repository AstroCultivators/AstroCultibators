import cv2
import pyrealsense2
from realsense_depth import *
import os
import datetime

#Initialize Camera Intel RealSense
intelImages = "astrocultivators/static/images/rgb"
if not os.path.exists(intelImages):
    os.makedirs(intelImages)

dc = DepthCamera() #initialize camera
count = 0

while count == 0 :
    ret, depth_frame, rgb_frame = dc.get_frame()
    #rgb_frame,depth_frame = dc.get_frame()
    rgb_filename=os.path.join(intelImages,f"rgb_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.png")
    cv2.imwrite(rgb_filename,rgb_frame)

    #save depth image with timestamp
    depth_filename=os.path.join(intelImages,f"depth_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.png")
    cv2.imwrite(depth_filename, depth_frame)

    print("Images saved successfully")

    #Show distance for a specific point
    point= (400, 300) 
    cv2.circle(rgb_frame, point, 4, (0, 0, 255)) 
    distance = depth_frame[point[1], point[0]]    
    print(distance) 

    cv2.imshow("depth frame", depth_frame) 
    cv2.imshow("Color frame", rgb_frame)
    count = 1



#cv2.waitKey(0)
#key = cv2.waitKey(1)

