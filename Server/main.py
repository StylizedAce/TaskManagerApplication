from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_database
from LoginController.LoginController import LogRegController

app = Flask(__name__)

cors = CORS(app, origins='*')

@app.route('/start')
def start():
    return jsonify({'message': 'Server started'})

db = get_database()
print(db.users.find)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    return LogRegController.login(data, db)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    return LogRegController.register(data, db)



if __name__ == '__main__':
    app.run(debug=True, port=5000)