from utils.users import signup_user_util

def register_user(request):
    signup_resp = signup_user_util(request)
    if "error" in signup_resp:
        signup_resp['success'] = False
    else:
        signup_resp['success'] = True
        return signup_resp
