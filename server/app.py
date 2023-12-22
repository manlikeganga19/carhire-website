from flask import Flask, request, jsonify, session, make_response
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from config import Config
from models import db, User, Comment, Newsletter, Contact, Booking
from flask_cors import CORS
from datetime import datetime


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
    response.headers.add('Access-Control-Allow-Origin',
                         'http://localhost:3000')

    return response, 200


@app.route('/protected', methods=['GET'])
def protected():
    # Check if the user is logged in
    if 'username' in session:
        response = jsonify(
            {'message': f'Hello, {session["username"]}! This is a protected resource.'})
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Origin',
                             'http://localhost:3000')

        return response, 200
    else:
        response = jsonify({'message': 'Unauthorized'})
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        return response, 401


@app.route('/contact', methods=['POST'])
def add_contact():
    data = request.get_json()
    new_contact = Contact(
        name=data['name'], email=data['email'], message=data['message'])
    db.session.add(new_contact)
    db.session.commit()
    return jsonify({'message': 'Contact added successfully'}), 201

# Routes for Newsletter Model


@app.route('/newsletter', methods=['POST'])
def add_newsletter():
    data = request.get_json()
    new_email = Newsletter(email=data['email'])
    db.session.add(new_email)
    db.session.commit()
    return jsonify({'message': 'Email added to newsletter successfully'}), 201

# Routes for Comment Model


@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.get_json()
    new_comment = Comment(
        name=data['name'], email=data['email'], comment=data['comment'])
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment added successfully'}), 201


@app.route('/comments', methods=['GET'])
def get_comments():
    comments = Comment.query.all()
    comment_list = []
    for comment in comments:
        comment_list.append({
            'name': comment.name,
            'email': comment.email,
            'comment': comment.comment
        })
    return jsonify({'comments': comment_list})


@app.route('/bookings', methods=['POST'])
def add_booking():
    data = request.get_json()

    # Validate that persons_to_carry is not less than 1
    persons_to_carry = data.get('persons_to_carry')
    if persons_to_carry is None or persons_to_carry < 1:
        return jsonify({'error': 'Invalid value for persons_to_carry'}), 400

    # Convert date and time strings to Python date and time objects
    date_str = data.get('date')
    time_str = data.get('time')
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
        time_obj = datetime.strptime(time_str, '%H:%M:%S').time()
    except ValueError:
        return jsonify({'error': 'Invalid date or time format'}), 400

    new_booking = Booking(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        from_address=data['from_address'],
        to_address=data['to_address'],
        persons_to_carry=persons_to_carry,
        luggage_to_carry=data.get('luggage_to_carry'),
        date=date,
        time=time_obj,  # Use the Python time object
        additional_text=data.get('additional_text')
    )
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Booking information added successfully'}), 201


if __name__ == '__main__':
    app.run(debug=True, port=5555)
