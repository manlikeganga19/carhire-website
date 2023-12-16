# app.py

from flask import Flask, request, jsonify, session
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)
migrate = Migrate(app, db)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        # Set the user in the session
        session['username'] = username
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/logout', methods=['POST'])
def logout():
    # Remove the user from the session
    session.pop('username', None)
    return jsonify({'message': 'Logout successful'}), 200


@app.route('/protected', methods=['GET'])
def protected():
    # Check if the user is logged in
    if 'username' in session:
        return jsonify({'message': f'Hello, {session["username"]}! This is a protected resource.'}), 200
    else:
        return jsonify({'message': 'Unauthorized'}), 401


if __name__ == '__main__':
    app.run(debug=True, port=5555)
