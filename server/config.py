import os
import secrets


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URI') or 'postgresql://postgres:Daniel2003@localhost:5432/carservices'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.environ.get('SECRET_KEY') or secrets.token_hex(32)

    SESSION_TYPE = 'filesystem'
    SESSION_PERMANENT = False
    PERMANENT_SESSION_LIFETIME = 86400  # 1 day (in seconds)

    WTF_CSRF_SECRET_KEY = os.environ.get(
        'WTF_CSRF_SECRET_KEY') or secrets.token_hex(32)
    WTF_CSRF_TIME_LIMIT = None  # CSRF token does not expire

    # Security headers to enhance the security of the application
    # Adjust these based on your specific requirements
    SECURITY_HEADERS = {
        'Content-Security-Policy': "default-src 'self'",
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSS-Protection': '1; mode=block'
    }

    # Additional security-related configurations
    # Adjust these based on your specific requirements
    # CSRF_ENABLED = True  # Enabled by default
    # CSRF_SESSION_KEY = 'somethingimpossibletoguess'
    # CSRF_COOKIE_SECURE = True  # Set to True for HTTPS connections only
    # SESSION_COOKIE_SECURE = True  # Set to True for HTTPS connections only
    # SESSION_COOKIE_HTTPONLY = True
    # PERMANENT_SESSION_LIFETIME = timedelta(days=1)  # Adjust session lifetime
