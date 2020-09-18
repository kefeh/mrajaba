from getpass import getpass
from datetime import datetime
from models import files


def add_file_util(request):
    from pprint import pprint
    # pprint(request[0])
    user = request['user'][0]
    clas = request['class'][0]
    category = request['category'][0]
    folder = request['folder'][0]
    name = request['filename']
    file_id = str(datetime.timestamp(datetime.now()))
    try:
        files.document(file_id).set({
            "user": user,
            "class": clas,
            "category": category,
            "name": name,
            "folder": folder,
            "created_at": datetime.now().strftime('%Y-%m-%d %H:%M'),
            "download_link": '',
            "id": file_id,
        })

        return {'id': file_id}
    except Exception as e:
        return {'error': f"unable to create folder {e}",
                'status_code': 400}

def get_files_util(request):
    try:
        user = request.args.get('user')
        clas = request.args.get('class')
        category = request.args.get('category')
        folder = request.args.get('folder')
        print("starting")
        file_list = files.where(
            'user', '==', user).where('class', '==', clas).where(
                'category', '==', category).where(
                    'folder', '==', folder).order_by('created_at').get()

        new_file_list = [a_file.to_dict() for a_file in file_list]
        return {
                'files': new_file_list
            }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to get files SEVER ERROR",
                'status_code': 490}

