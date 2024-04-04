import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
import math
import cv2
import random
import pyrebase
import os
hosting = "http://127.0.0.1:8080/"

classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
              "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
              "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
              "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
              "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
              "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
              "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
              "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
              "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
              "teddy bear", "hair drier", "toothbrush"
              ]


media_folder = "media/"

allowed_classes = ["person", "original", "car", "truck"]
def delete_image_files(file_paths):
    for path in file_paths:
        try:
            os.remove(path)
        except OSError as e:
            print(f"Error deleting {path}: {e}")
    


class YoloEffect:
 def __init__(self):
  pass
  
 def generate_randomname(self):
    ret = ""
    for _ in range(14):
        ret += str(random.randint(0, 9))
    return ret

 def redirect(self,ret):
    for i in range(len(ret)):
        ret[i] = hosting + ret[i]
    return ret
    

 def cut(self, imgname):

  ret = []  
  clss = ["original"]
  model = YOLO("yolov8n.pt")
  res = model(imgname, show=False)
  cv2.waitKey(0)
  c = 0
  image = cv2.imread(imgname)
  img_name = self.generate_randomname()
  file_path = os.path.join(media_folder, f"{img_name}{c}.jpg")
  cv2.imwrite(file_path, image)
  
  ret.append(media_folder+img_name + f"{c}" + ".jpg")

  for i in res[0].boxes.data:
      
      c += 1
      
      original_image = cv2.imread(imgname)
      if classNames[int(res[0].boxes.cls[c - 1])] not in allowed_classes: continue
      x, y, w, h = math.floor(i[0]), math.floor(i[1]), math.floor(i[2]), math.floor(i[3])
      cropped_image = original_image[y:h, x:w]
      img_name = self.generate_randomname()      
      file_path = os.path.join(media_folder, f"{img_name}{c}.jpg")
      cv2.imwrite(file_path, cropped_image)
      ret.append(media_folder+img_name + f"{c}" + ".jpg")
      clss.append(classNames[int(res[0].boxes.cls[c - 1])])
  
  file_path = os.path.join('', imgname) 
  print(file_path)

  if os.path.exists(file_path):
      os.remove(file_path)

      
  return ret, clss
  