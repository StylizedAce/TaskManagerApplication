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
    return TaskController.getTasks(username, db)

@app.route('/api/add_task', methods=['POST'])
def addTask():
    data = request.json
    return TaskController.addTask(data['username'], data['task'], db)

@app.route('/api/delete_task/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    username = request.args.get('username')
    return TaskController.deleteTask(username, task_id, db)

@app.route('/api/get_latest_task_id', methods=['GET'])
def get_latest_task_id():
    username = request.args.get('username')
    return TaskController.get_latest_task_id(username, db)

@app.route('/api/update_task/<task_id>', methods=['PUT'])
def edit_task(task_id):
    
    username = request.args.get('username')
    updatedTask = request.json.get('task')
    print("Here is the updated task", updatedTask)
    return TaskController.updateTask(username, task_id, updatedTask, db)



if __name__ == '__main__':
    app.run(debug=True, port=5000)