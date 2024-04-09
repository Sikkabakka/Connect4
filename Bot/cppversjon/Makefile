
# BINARY=main

# #put in mappe med inclueds etter I.
# INCDIRS=-I. 

# OPT=-O0
# CODEDIRS=. sourceFiles
# OBJDIR= objectFiles
# CFLAGS=-Wall -Wextra -g $(INCDIRS) $(OPT)

# CC=clang++

# CFILES=$(foreach D, $(CODEDIRS), $(wildcard $(D)/*.cpp))
# OBJECTS=$(patsubst %.cpp, $(OBJDIR)/%.o, $(CFILES))

# all: $(BINARY)
# 	@echo "Compiling..."
# 	@echo "Running..."
# 	@time ./main

# $(BINARY): $(OBJECTS)
# 	$(CC) -o $@ $^

# $(OBJDIR)/%.o: %.cpp
# 	@mkdir -p $(@D)
# 	$(CC) $(CFLAGS) -c -o $@ $<

# clean:
# 	rm -rf $(BINARY) $(OBJECTS)

all:
	@echo "Compiling..."
	@clang++ -std=c++11 restAPI.cpp -o main -L/opt/homebrew/Cellar/openssl@3/3.2.1/lib -lssl -lcrypto -I/opt/homebrew/Cellar/cpprestsdk/2.10.19/include -I/opt/homebrew/Cellar/boost/1.84.0_1/include -I/opt/homebrew/Cellar/openssl@3/3.2.1/include
	@echo "Running..."
	@time ./main
