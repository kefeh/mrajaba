
from getpass import getpass
from datetime import datetime
from config import auth
from models import users

from requests.exceptions import HTTPError

def signup_user_util(request):
    email = request.json['email']
    password = request.json['password']
    name = request.json['name']
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M')

    # create new authenticated user
    try:
        user = auth.create_user_with_email_and_password(
            email, password)
        user_id = str(datetime.timestamp(datetime.now()))
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
    except HTTPError as e:
        print(e)
        exception = str(e.__repr__()).split('"message":')[1]
        exception = exception.split(',')[0]
        return{'error': f"unable to signup user {exception}",
                'status_code': 400}
    except Exception as ex:
        print(ex)
        return{'error': f"unable to signup user SEVER ERROR",
                'status_code': 490}


def login_user_util(request):
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        user = auth.sign_in_with_email_and_password(
            email, password)
        user_info = users.where('email', '==', email).limit(1).get()[0].to_dict()
        
        jwt = user['idToken']
        print(user_info)
        user_info = {**user_info, "token": jwt}

        return {
            "user" : user_info
        }
    except HTTPError as e:
        print(e)
        exception = str(e.__repr__()).split('"message":')[1]
        exception = exception.split(',')[0]
        return{'error': f"unable to signup user {exception}",
                'status_code': 400}
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to signup user SEVER ERROR",
                'status_code': 490}

