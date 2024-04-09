all:
	@echo "Compiling..."
	@clang++ -std=c++11 main.cpp gameLogic.cpp transTable.cpp restAPI.cpp -o main -L/opt/homebrew/Cellar/openssl@3/3.2.1/lib -lssl -lcrypto -I/opt/homebrew/Cellar/cpprestsdk/2.10.19/include -I/opt/homebrew/Cellar/boost/1.84.0_1/include -I/opt/homebrew/Cellar/openssl@3/3.2.1/include
	@echo "Running..."
	@time ./main
