
from getpass import getpass
from datetime import datetime
from config import auth
from models import users

def signup_user_util(request):
    email = request.json['email']
    password = request.json['password']
    name = request.json['name']
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M')

    # create new authenticated user
    user = auth.create_user_with_email_and_password(email, password)
    print(user)
