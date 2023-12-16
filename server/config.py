# config.py

import secrets


class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://your_username:your_password@localhost/your_database'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = secrets.token_hex(32)
