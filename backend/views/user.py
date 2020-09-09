from utils.users import signup_user_util, login_user_util, get_all_users_util

def register_user(request):
    signup_resp = signup_user_util(request)
    if "error" in signup_resp:
        signup_resp['success'] = False
    else:
        signup_resp['success'] = True
        signup_resp['status_code'] = 200
    return signup_resp


def login_user(request):
    login_resp = login_user_util(request)
    if "error" in login_resp:
        login_resp['success'] = False
    else:
        login_resp['success'] = True
        login_resp['status_code'] = 200
    return login_resp

def get_all_users():
    users_data = get_all_users_util()
    if "error" in users_data:
        users_data['success'] = False
    else:
        users_data['success'] = True
        users_data['status_code'] = 200
    return users_data
