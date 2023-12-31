from flask import Flask, request, jsonify, session, make_response
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from flask_migrate import Migrate
from config import Config
from models import db, User, Comment, Newsletter, Contact, Booking
from flask_cors import CORS
from datetime import datetime
import random
from sqlalchemy import func

app = Flask(__name__)
CORS(app, supports_credentials=True, origins="http://localhost:3000")
app.config.from_object(Config)
migrate = Migrate(app, db)
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)



@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    name = data.get('name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return jsonify({'message': 'Username or email already exists'}), 400

    new_user = User(name=name, username=username, email=email)
    new_user.set_password(password)

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
    session.pop('username', None)

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



@app.route('/newsletter', methods=['POST'])
def add_newsletter():
    data = request.get_json()
    new_email = Newsletter(email=data['email'])
    db.session.add(new_email)
    db.session.commit()
    return jsonify({'message': 'Email added to newsletter successfully'}), 201



@app.route('/comments', methods=['POST'])
def add_comment():
    data = request.get_json()
    new_comment = Comment(
        name=data['name'], email=data['email'], comment=data['comment'])
    # if 'blogId' in data:
    #     new_comment.blog_id = data['blogId']
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment added successfully'}), 201


@app.route('/comments', methods=['GET'])
def get_all_comments():
    comments = Comment.query.all()

    comment_list = []
    for comment in comments:
        comment_dict = {
            'id': comment.id,
            'name': comment.name,
            'email': comment.email,
            'comment': comment.comment,
        }

        if comment.date is not None:
            comment_dict['date'] = comment.date.strftime('%Y-%m-%d %H:%M:%S')
        else:
            comment_dict['date'] = None

        comment_list.append(comment_dict)

    return jsonify(comment_list)


def get_any_comment():
    any_comment = Comment.query.order_by(func.random()).first()

    if any_comment:
        comment_data = {
            'id': any_comment.id,
            'name': any_comment.name,
            'email': any_comment.email,
            'comment': any_comment.comment,
            'date': any_comment.date.strftime('%Y-%m-%d %H:%M:%S') if any_comment.date else None
        }
        return jsonify(comment_data)
    else:
        return jsonify({'message': 'No comments available'}), 404


@app.route('/bookings', methods=['POST'])
def add_booking():
    data = request.form

    persons_to_carry = data.get('persons_to_carry')
    if persons_to_carry is None or int(persons_to_carry) < 1:
        return jsonify({'error': 'Invalid value for persons_to_carry'}), 400

    date_str = data.get('date')
    try:
        date = datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError as e:
        app.logger.error(f"Error parsing date: {e}")
        return jsonify({'error': f'Invalid date format: {e}'}), 400

    new_booking = Booking(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number'],
        from_address=data['from_address'],
        to_address=data['to_address'],
        persons_to_carry=persons_to_carry,
        luggage_to_carry=data.get('luggage_to_carry'),
        date=date,
        time=data.get('time'),      
        additional_text=data.get('additional_text')
    )
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({'message': 'Booking information added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True, port=5555)
