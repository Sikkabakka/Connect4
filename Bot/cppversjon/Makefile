
# BINARY=main

# #put in mappe med inclueds etter I.
# INCLUDE_PATH = -I ./includes -I ./includes/**

# OPT=-O0
# CODEDIRS=. sourceFiles
# OBJDIR= objectFiles
# CFLAGS= -Wall -Wextra -g $(INCLUDE_PATH) $(OPT) 


# CC=clang++

# CFILES= ./src/nettverking.cpp
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
	@clang++ ./src/*.cpp -std=c++11 -I./includes -I./includes/** -o main 
	@echo "Running..."
	@time ./main


