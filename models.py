from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Message(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    sender = db.Column(db.String(100))

    receiver = db.Column(db.String(100))

    encrypted_message = db.Column(db.Text)

    encrypted_key = db.Column(db.Text)

    timestamp = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )