import ctypes

lib = ctypes.CDLL('./adder.dylib')

lib.getBestMove.argtypes = (ctypes.c_char_p,)
lib.getBestMove.restype = ctypes.c_int



result = lib.getBestMove(b"245321246532534")
print("move: ", result )
