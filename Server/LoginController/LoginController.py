from flask import jsonify
from flask_cors import cross_origin

class LogRegController:
    
    def login(data, db):
        user = db.users.find_one({'username': data['username'], 'password': data['password']})
        if user:
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Login failed'})

    def register(data, db):
        user = db.users.find_one({'username': data['username']})
        if user:
            return jsonify({'message': 'User already exists'})
        else:
            # Insert user into the users collection
            db.users.insert_one(data)
            
            # Create an initial entry in the tasks collection for the new user
            initial_task_entry = {
                'username': data['username'],
                'tasks': []
            }
            db.tasks.insert_one(initial_task_entry)
            
            return jsonify({'message': 'User registered'})
