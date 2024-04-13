

from flask import jsonify
from flask_cors import cross_origin


class TaskController:
    
    @cross_origin(origins='*')  # Apply CORS to this route handler
    def getTasks(username, db):
        entries = db.tasks.find({"username": "ace"})
        print(entries)
        
        tasks = []
        for entry in entries:
            tasks.append(entry)
            
        return jsonify({'tasks': tasks})

    
    @cross_origin(origins='*')  # Apply CORS to this route handler
    def addTask(username, task, db):
        user = db.tasks.find_one({"username": username})
        if user:
            db.tasks.update_one({'_id': user['_id']}, {'$push': {'tasks': task}})
            return jsonify({'message': 'Task added to user'})
        else:
            return jsonify({'error': 'User not found'})
        
    
    @cross_origin(origins='*')  # Apply CORS to this route handler
    def updateTask(task, db):
        db.tasks.update_one({'_id': task['_id']}, {'$set': task})
        return jsonify({'message': 'Task updated'})
    
    
    @cross_origin(origins='*')  # Apply CORS to this route handler
    def deleteTask(task, db):
        db.tasks.delete_one({'_id': task['_id']})
        return jsonify({'message': 'Task deleted'})
