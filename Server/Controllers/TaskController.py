from flask import jsonify
from flask_cors import cross_origin
from bson.objectid import ObjectId

class TaskController:
    
    
    def getTasks(username, db):
        entries = db.tasks.find({"username": username})
        tasks = []
        for entry in entries:
            tasks.extend(entry['tasks'])    
        print("here are the tasks", tasks)
        return jsonify({'tasks': tasks})

    
    def addTask(username, task, db):
        user = db.tasks.find_one({"username": username})
        if user:
            db.tasks.update_one({'_id': user['_id']}, {'$push': {'tasks': task}})
            return jsonify({'message': 'Task added to user'})
        else:
            return jsonify({'error': 'User not found'})
        
    
    def updateTask(username, task_id, updated_task, db):
        try:
            db.tasks.update_one({'username': username, 'tasks.task_id': int(task_id)},
                                {'$set': {
                                    'tasks.$.title': updated_task['title'],
                                    'tasks.$.description': updated_task['description'],
                                    'tasks.$.CreationDate': updated_task['CreationDate'],
                                    'tasks.$.DueDate': updated_task['DueDate'],
                                }})
            
            return jsonify({'message': 'Task updated successfully'})
        except Exception as e:
            print("Error:", e)
            return jsonify({'error': 'Failed to update task'})


    
    def deleteTask(username, task_id, db):
        user = db.tasks.find_one({"username": username})    
        print("Here is the user", user)
        print ("THere is the task id", task_id)
        try:
            db.tasks.update_one({'_id': user['_id']}, {'$pull': {'tasks': {'task_id': int(task_id)}}})
            return jsonify({'message': 'Task deleted'})
        except:
            return jsonify({'error': 'Task not found'})



    
    def get_latest_task_id(username, db):
        latest_task = db.tasks.find_one({"username": username}, sort=[("_id", -1)])
        if latest_task:
            tasks = latest_task['tasks']
            if tasks:
                # Extract task numbers from task_id fields
                task_numbers = [task['task_id'] for task in tasks]
                max_task_number = max(task_numbers)
                next_task_number = max_task_number + 1
                next_task_id = next_task_number
                return jsonify({'next_task_id': next_task_id})
        return jsonify({'next_task_id': 1})
