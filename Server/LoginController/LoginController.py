from flask import jsonify
from flask_cors import cross_origin


class LogRegController:
    @cross_origin(origins='*')  # Apply CORS to this route handler
    def login(data, db):
        user = db.users.find_one({'username': data['username'], 'password': data['password']})
        if user:
            return jsonify({'message': 'Login successful'})
        else:
            return jsonify({'message': 'Login failed'})
        


    @cross_origin()  # Apply CORS to this route handler
    def register(data, db):
        user = db.users.find_one({'username': data['username']})
        if user:
            return jsonify({'message': 'User already exists'})
        else:
            db.users.insert_one(data)
            return jsonify({'message': 'User registered'})
