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