from getpass import getpass
from datetime import datetime
from models import files
from .drive_init import create_file, delete_file

FILE_MIME_TYPE = {
    "Documents": 'application/*',
    "Videos": 'video/*',
    "Images": 'image/*',
}

DOWLOAD_INITIAL = "https://drive.google.com/uc?export=download&id="

def add_file_util(request, file_path):
    from pprint import pprint
    # pprint(request[0])
    user = request['user'][0]
    clas = request['class'][0]
    category = request['category'][0]
    folder = request['folder'][0]
    name = request['filename']
    file_id = str(datetime.timestamp(datetime.now()))
    response, status_code = create_file(name, file_path, FILE_MIME_TYPE.get(folder))
    if status_code != 200:
        return {'error': response, 'status_code': status_code}
    try:
        files.document(file_id).set({
            "user": user,
            "class": clas,
            "category": category,
            "name": name,
            "folder": folder,
            "created_at": datetime.now().strftime('%Y-%m-%d %H:%M'),
            "download_link": f'{DOWLOAD_INITIAL}{response}',
            "id": file_id,
            "doc_id": response,
        })

        return {'id': file_id}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {'error': f"unable to create folder {e}",
                'status_code': 400}

def get_files_util(request):
    try:
        user = request.args.get('user')
        clas = request.args.get('class')
        category = request.args.get('category')
        folder = request.args.get('folder')
        if category == 'Recently':
            file_list = files.where(
                'user', '==', user).where('class', '==', clas).order_by(
                    'created_at').get()
        else:
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

def delete_file(request):
    try:
        file_id = request.args.get('id')
        doc_id = request.args.get('doc_id')
        files.document(file_id).delete()
        result = delete_file(doc_id)
        # if resu
        return {
            'id': file_id
        }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to delete file SEVER ERROR",
                'status_code': 490}