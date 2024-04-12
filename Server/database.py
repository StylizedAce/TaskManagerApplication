# database.py
from pymongo import MongoClient

def get_database():
    # Initialize MongoDB connection
    client = MongoClient('mongodb://localhost:27017')
    db = client['TManagerDB']
    # Then we print everything in the database
    return db
