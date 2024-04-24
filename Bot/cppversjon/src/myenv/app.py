from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get data from the POST request
        input_data = request.form['input_field_name']  # Change 'input_field_name' to the name attribute of your input field
        # Process the input data (e.g., perform some operation)
        processed_data = process_input(input_data)
        # Return a response
        return processed_data
    else:
        return 'This is a GET request. Use a POST request to send input data.'

def process_input(input_data):
    # Example processing of input data
    return 'Processed input: ' + input_data

if __name__ == '__main__':
    app.run(debug=True)
