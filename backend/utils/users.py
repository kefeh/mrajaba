
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
    try:
        user = auth.create_user_with_email_and_password(
            email, password)
        user_id = datetime.timestamp(datetime.now())
        jwt = user['idToken']
        users.document(user_id).set({
            "name": name,
            "email": email,
            "created_at": created_at
        })
        return {
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "token": jwt
            }
        }
    except Exception as e:
        return{'error': f"unable to signup user {e}"}


def login_user_util(request):
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        user = auth.sign_in_with_email_and_password(
            email, password)
        user_info = users.document().get('email' == email)
        jwt = user['idToken']
        user_info = {**user_info, "token": jwt}

        return {
            "user" : user_info
        }
    except Exception as e:
        return {"error": f"Unale to signin user {e}"}

