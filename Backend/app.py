from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Sample data (replace with your actual data storage mechanism)
bot_messages = [
    {'id': 1, 'text': 'Hello, how can I help you?'},
]

# Route to get all bot messages
@app.route('/bot/messages', methods=['GET'])
def get_bot_messages():
    return jsonify(bot_messages)

if __name__ == '__main__':
    app.run(debug=True)
