
BINARY=main

#put in mappe med inclueds etter I.
INCLUDE_PATH = -I//local/Cellar/asio/1.28.1/include

OPT=-O0
CODEDIRS=. sourceFiles
OBJDIR= objectFiles
CFLAGS= -Wall -Wextra -g $(INCLUDE_PATH) $(OPT)
CFLAGS += $(shell pkg-config --cflags <package_name>)


CC=clang++

CFILES= simpleExample.cpp
OBJECTS=$(patsubst %.cpp, $(OBJDIR)/%.o, $(CFILES))

all: $(BINARY)
	@echo "Compiling..."
	@echo "Running..."
	@time ./main

$(BINARY): $(OBJECTS)
	$(CC) -o $@ $^

$(OBJDIR)/%.o: %.cpp
	@mkdir -p $(@D)
	$(CC) $(CFLAGS) -c -o $@ $<

clean:
	rm -rf $(BINARY) $(OBJECTS)

# all:
# 	@echo "Compiling..."
# 	@clang++ connecttome.cpp -std=c++11 -o main 
# 	@echo "Running..."
# 	@time ./main
