from utils.files import add_file_util, get_files_util
from werkzeug.utils import secure_filename
from utils.drive_init import get_files
from config import BASE_PATH


def add_file(request):
    file = request.files['file']
    data = request.form.to_dict(flat=False)
    # data = data.get('info')
    filename = secure_filename(file.filename)
    data['filename'] = filename
    add_file_resp = add_file_util(data)
    destination = "/".join([BASE_PATH, filename])
    file.save(destination)
    get_files()

    if "error" in add_file_resp:
        add_file_resp['success'] = False
    else:
        add_file_resp['success'] = True
        add_file_resp['status_code'] = 200

    return add_file_resp

def get_files_view(request):
    files_data = get_files_util(request)
    if "error" in files_data:
        files_data['success'] = False
    else:
        files_data['success'] = True
        files_data['status_code'] = 200
    return files_data
