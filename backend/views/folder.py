from utils.folder import add_folder_util, get_folders_util, delete_folder

def add_folder(request):
    add_folder_resp = add_folder_util(request)

    if "error" in add_folder_resp:
        add_folder_resp['success'] = False
    else:
        add_folder_resp['success'] = True
        add_folder_resp['status_code'] = 200

    return add_folder_resp

def get_folders_view(request):
    folder_data = get_folders_util(request)
    if "error" in folder_data:
        folder_data['success'] = False
    else:
        folder_data['success'] = True
        folder_data['status_code'] = 200
    return folder_data

def delete_folder_view(request):
    result = delete_folder(request)
    if "error" in result:
        result['success'] = False
    else:
        result['success'] = True
        result['status_code'] = 200
    return result
