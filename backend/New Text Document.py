import mimetypes
import os
from flask import Flask, send_file
from flask import request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
import math
from flask import Flask, request
from flask_restful import Api, Resource
from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
import math
from model import YoloEffect
from model import delete_image_files
import cv2
import numpy as np
from ultralytics import YOLO
import matplotlib.pyplot as plt
import math
import cv2
from flask_mysqldb import MySQL 
import urllib
import pyrebase




app = Flask(__name__)
api = Api(app)
CORS(app) 
app = Flask(__name__)

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'  # MySQL host
app.config['MYSQL_USER'] = 'your_username'  # MySQL username
app.config['MYSQL_PASSWORD'] = 'your_password'  # MySQL password
app.config['MYSQL_DB'] = 'your_database'  # MySQL database name
mysql = MySQL(app)


firebaseConfig = {
  "apiKey": "AIzaSyDTzQ1MCG_OJPdQGcwfc0OnLEzakcpzjEQ",
  "authDomain": "prompt-397314.firebaseapp.com",
  "projectId": "prompt-397314",
  "storageBucket": "prompt-397314.appspot.com",
  "messagingSenderId": "885517242235",
  "appId": "1:885517242235:web:2f509be14004da261677de",
  "measurementId": "G-0PW0HM9KT0",
  # "databaseURL": "https://prompt-397314.firebaseio.com"
  "databaseURL": "https://prompt-397314-default-rtdb.firebaseio.com/"
}

firebase=pyrebase.initialize_app(firebaseConfig)
storage=firebase.storage()


@app.route('/fet', methods=['GET'])
@cross_origin(origin="http://localhost:3000")
def fet():
    # print("POST eshtagal")
    images_directory = ''
    imgname = "cur3.jpg"
    image_path = os.path.join(images_directory, imgname)
    mimetype, _ = mimetypes.guess_type(image_path)
    return send_file(image_path, mimetype=mimetype)




        






    
   
   
 
 
# @app.route('/upload', methods=['POST'])
# @cross_origin(origin="http://localhost:3000")
# def upload_image():
    
#     if len(request.files) == 0:
#         return {'message': 'File not found'}, 404 

#     f = request.files['image']
#     print(type(f))
#     try:
#         f.save(os.path.join('/', "filename"))
#     except Exception as e:
#         return {'message': '##########'}, 200  
#     print(f)
#     return {'message': 'File uploaded successfully'}, 200


def store_to_database(names):
    url_arr = []
    for _ in names:
        fle = _
        cloudfilename=f"media/{fle}"
        storage.child(cloudfilename).put(fle)
        url_arr.append(storage.child(cloudfilename).get_url(None))

    return url_arr
        

@app.route('/upload', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def upload_image():
    cls = YoloEffect()
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    try:
        names = []
        file.save(os.path.join('', file.filename))
        ret , clss= cls.cut(file.filename)
        for _ in ret: names.append(_)
        ret = cls.redirect(ret)
        os.path.dirname(os.path.abspath(__file__))
        #GANs
        
       
        
        
        return jsonify({'message':ret,'classes': clss,'status':200})
    except Exception as e:
        return jsonify({'error': f'Failed to save file - {str(e)}'}), 500

 


@app.route('/delete', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def delete_images():
    if request.method == 'POST':
        data = request.json.get('data') 
        a = []
        for filename in data:
            idx = filename.find("media")
            a.append(filename[idx:])
        print("####################")
        print(data)
        delete_image_files(a)
        return 'deleted successfully', 200
    
    
    
@app.route('/store', methods=['POST'])
@cross_origin(origin="http://localhost:3000")
def store():
    if request.method == 'POST':
        data = request.json.get('data') 
        print(data)
        try:
            a = []
            for filename in data:
                idx = filename.find("media")
                a.append(filename[idx:])
            
            url = store_to_database(a)
            delete_image_files(a)
            return jsonify({'images_url':url, 'status':200})
        except:
            return 'error', 500
            
        
        
    
@app.route('/')
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
    
    
    