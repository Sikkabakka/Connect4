from flask import Flask, request
from flask_cors import CORS
import ctypes

lib = ctypes.CDLL("adder.dylib")

lib.getBestMove.argtypes = (ctypes.c_char_p, )
lib.getBestMove.restype = ctypes.c_int

test = ctypes.create_string_buffer("11".encode())
lib.getBestMove(test)


app = Flask(__name__)
CORS(app)


@app.post('/getBestMove')
def post():
    data = request.data
    cdata =  ctypes.create_string_buffer(data)
    result = lib.getBestMove(cdata)

    return f"{result}", 200

if __name__ == '__main__':
    app.run(debug=True)