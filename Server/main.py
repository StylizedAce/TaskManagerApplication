from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_database
from LoginController.LoginController import LogRegController
from Controllers.TaskController import TaskController

app = Flask(__name__)

cors = CORS(app, origins='*', allow_headers=['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers']
            , methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'])

@app.route('/start')
def start():
    return jsonify({'message': 'Server started'})

db = get_database()
print(db.users.find)


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    return LogRegController.login(data, db)

@app.route('/api//register', methods=['POST'])
def register():
    data = request.json
    return LogRegController.register(data, db)


@app.route('/api/get_tasks', methods=['GET'])
def getTasks():
    # Retrieve the username from the request parameters
    username = request.args.get('username')
    print(username)
    
    entries = db.tasks.find({"username": username})

    tasks = []
    for entry in entries:
        tasks.extend(entry['tasks'])    

    print(tasks)
    return jsonify({'tasks': tasks})


if __name__ == '__main__':
    app.run(debug=True, port=5000)