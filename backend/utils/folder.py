from getpass import getpass
from datetime import datetime
from models import folders, files


def add_folder_util(request):
    user = request.json['user']
    shared_to = request.json['shared_to']
    clas = request.json['class']
    category = request.json['category']
    folder = request.json['folder']
    folder_id = str(datetime.timestamp(datetime.now()))
    try:
        folders.document(folder_id).set({
            "shared_to": shared_to,
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
    shared_to = request.args.get('shared_to')
    clas = request.args.get('class')
    category = request.args.get('category')
    print(category)
    print(clas)
    try:
        file_list = folders.where('user', '==', user).where(
            'shared_to', '==', shared_to).where('class', '==', clas).where(
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

def delete_folder(request):
    try:
        folder_id = request.args.get('id')
        folder_name = request.args.get('name')
        folder_user = request.args.get('user')
        folder_shared_to = request.args.get('shared_to')
        folder_class = request.args.get('class')
        folder_category = request.args.get('category')
        file_list = files.where(
                'user', '==', folder_user).where('shared_to', '==', folder_shared_to).where(
                    'class', '==', folder_class).where(
                        'category', '==', folder_category).where(
                            'folder', '==', folder_name).get()
        for doc in file_list:
            print(f'Deleting doc {doc.id} => {doc.to_dict()}')
            doc.reference.delete()
        the_folder = folders.document(folder_id)
        the_folder.delete()
        return {
            'id': folder_id
        }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to delete folder SEVER ERROR",
                'status_code': 490}
