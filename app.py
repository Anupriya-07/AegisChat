from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from models import db, Message

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chat.db'

db.init_app(app)

socketio = SocketIO(app)

users = {}

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('register')

def register(data):

    username = data['username']

    public_key = data['public_key']

    users[username] = public_key

    emit('user_list', list(users.keys()), broadcast=True)


@socketio.on('get_public_key')

def get_public_key(data):

    username = data['username']

    emit('public_key', {

        'username': username,

        'public_key': users.get(username)

    })


@socketio.on('send_message')

def send_message(data):

    msg = Message(

        sender=data['sender'],

        receiver=data['receiver'],

        encrypted_message=data['encrypted_message'],

        encrypted_key=data['encrypted_key']
    )

    db.session.add(msg)

    db.session.commit()

    emit('receive_message', data, broadcast=True)


if __name__ == '__main__':

    with app.app_context():
        db.create_all()

    socketio.run(app, debug=True)