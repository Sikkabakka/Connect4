#include <cpprest/http_listener.h>
#include <cpprest/json.h>
#include <iostream>
//restAPI.cpp -o main -L/opt/homebrew/Cellar/openssl@3/3.2.1/lib -lssl -lcrypto -I/opt/homebrew/Cellar/cpprestsdk/2.10.19/include -I/opt/homebrew/Cellar/boost/1.84.0_1/include -I/opt/homebrew/Cellar/openssl@3/3.2.1/include
using namespace web;
using namespace web::http;
using namespace web::http::experimental::listener;
using namespace web::http:client;

int main(){

web::json::value json_return;
web::json::value json_v ;
json_v["title"] = web::json::value::string("foo");
json_v["body"] = web::json::value::string("bar");
json_v["userId"] = web::json::value::number(1);
web::http::client::http_client client("https://jsonplaceholder.typicode.com/posts");
client.request(web::http::methods::POST, U("/"), json_v)
.then([](const web::http::http_response& response) {
    return response.extract_json(); 
})
.then([&json_return](const pplx::task<web::json::value>& task) {
    try {
        json_return = task.get();
    }
    catch (const web::http::http_exception& e) {                    
        std::cout << "error " << e.what() << std::endl;
    }
})
.wait();

std::cout << json_return.serialize() << std::endl;

return 0;
}