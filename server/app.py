from flask import Flask, request, jsonify, session, redirect, url_for
from flask_session import Session
from config import Config


app = Flask(__name__)
app.config.from_object(Config)


app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

users = {
    'user1': {'password': 'password1'},
    'user2': {'password': 'password2'}
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')

    # In a production environment, you would query the database for user information
    # Here, we're using a simple in-memory dictionary
    if username in users and users[username]['password'] == password:
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
    # Change this to a secure secret key in a production environment
    app.secret_key = 'super_secret_key'
    app.run(debug=True, port=5555)
