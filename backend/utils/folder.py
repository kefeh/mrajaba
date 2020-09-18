from getpass import getpass
from datetime import datetime
from models import folders


def add_folder_util(request):
    user = request.json['user']
    clas = request.json['class']
    category = request.json['category']
    folder = request.json['folder']
    folder_id = str(datetime.timestamp(datetime.now()))
    try:
        folders.document(folder_id).set({
            "user": user,
            "class": clas,
            "category": category,
            "folder": folder,
            "id": folder_id,
        })

        return {'id': folder_id}
    except Exception as e:
        return {'error': f"unable to create folder {e}",
                'status_code': 400}

def get_folders_util(request):
    user = request.args.get('user')
    clas = request.args.get('class')
    category = request.args.get('category')
    print(category)
    print(clas)
    try:
        file_list = folders.where(
            'user', '==', user).where('class', '==', clas).where(
                'category', '==', category).get()

        new_file_list = [a_file.to_dict() for a_file in file_list]
        return {
                'folders': new_file_list
            }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to get folders SEVER ERROR",
                'status_code': 490}
