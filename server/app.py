from flask import Flask, request, jsonify, session, make_response
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from config import Config
from models import db, User
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:3000")
app.config.from_object(Config)
migrate = Migrate(app, db)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)

# Registration route


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if the username or email already exists
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 400

    # Create a new user
    new_user = User(name=name, username=username, email=email)
    new_user.set_password(password)

    # Add the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        # Set the user in the session
        session['username'] = username
        response = jsonify({'message': 'Login successful'})
        return response, 200
    else:
        response = jsonify({'message': 'Invalid credentials'})
        return response, 403

@app.route('/logout', methods=['POST'])
def logout():
    # Remove the user from the session
    session.pop('username', None)

    # Create a response and add CORS headers
    response = jsonify({'message': 'Logout successful'})
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return response, 200



@app.route('/protected', methods=['GET'])
def protected():
    # Check if the user is logged in
    if 'username' in session:
        response = jsonify(
            {'message': f'Hello, {session["username"]}! This is a protected resource.'})
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

        return response, 200
    else:
        response = jsonify({'message': 'Unauthorized'})
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 401


if __name__ == '__main__':
    app.run(debug=True, port=5555)
