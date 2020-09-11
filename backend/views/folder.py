from utils.folder import add_folder_util

def add_folder(request):
    add_folder_resp = add_folder_util(request)

    if "error" in add_folder_resp:
        add_folder_resp['success'] = False
    else:
        add_folder_resp['success'] = True
        add_folder_resp['status_code'] = 200

    return add_folder_resp