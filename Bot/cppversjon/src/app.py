from flask import Flask, request
from flask_cors import *
import ctypes

lib = ctypes.CDLL('./adder.dylib')

lib.getBestMove.argtypes = (ctypes.c_char_p,)
lib.getBestMove.restype = ctypes.c_int

app = Flask(__name__)
CORS(app)

@app.post('/x')
def post():
    print("post request")
    print(type(request.data))
    data = request.data.decode('utf-8')
    c_data = ctypes.create_string_buffer(data.encode())  
    result = lib.getBestMove(c_data)
    return f"{result}", 200

if __name__ == '__main__':
    app.run(debug=True)