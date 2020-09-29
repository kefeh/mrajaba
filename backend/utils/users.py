
from getpass import getpass
from datetime import datetime
from config import auth
from models import users
from firebase_admin import auth as f_auth

from requests.exceptions import HTTPError

def signup_user_util(request):
    email = request.json['email']
    password = request.json['password']
    name = request.json['name']
    admin = request.json['admin']
    created_at = datetime.now().strftime('%Y-%m-%d %H:%M')

    # create new authenticated user
    try:
        user = auth.create_user_with_email_and_password(
            email, password)
        user_id = str(datetime.timestamp(datetime.now()))
        jwt = user['idToken']
        users.document(user_id).set({
            "id": user_id,
            "name": name,
            "email": email,
            "created_at": created_at,
            "admin": bool(admin),
            "notif": 0,
        })
        return {
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "token": jwt,
                "admin": bool(admin),
                "notif": 0,
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
        print(user)
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


def get_all_users_util(request):
    try:
        c_user = request.args.get('user')
        user_info = users.where('email', '==', c_user).limit(1).get()[0].to_dict()
        
        if user_info['admin']:
            all_users = [doc.to_dict() for doc in users.stream()]
        else:
            all_users = [doc.to_dict() for doc in users.where('admin', '==', True).get()]
            all_users.append(user_info)
        return {
                'users': all_users
            }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to get user SEVER ERROR",
                'status_code': 490}


def delete_user(request):
    email = request.args.get('email')
    u_id = request.args.get('id')
    c_user = request.args.get('user')
    try:
        user_info = users.where('email', '==', c_user).limit(1).get()[0].to_dict()
        
        if user_info['admin']:
            user = f_auth.get_user_by_email(email)
            users.document(u_id).delete()
            f_auth.delete_user(user.uid)
            # TODO: do recursive delete of files related to the user
            return {
                'id': u_id
            }
        else:
            return {'error': f"You dont have permissions",
                'status_code': 490}

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(e)
        return{'error': f"unable to delete file SEVER ERROR",
                'status_code': 490}

def verify_token(id_token):
    print(id_token)
    if not id_token:
        return 404, "No tokens provided."
    try:
        user = f_auth.verify_id_token(id_token)
        return 200, user['email']
    except:
        return 400, 'Invalid token provided.'
