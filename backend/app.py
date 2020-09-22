# Required imports
import os
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Initialize Flask app
app = Flask(__name__) 

# Initialize Firestore DB

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/register', methods=['POST'])
def create_user():
    from views.user import register_user
    try:
        print("registering")
        register_resp = register_user(request)
        status_code = register_resp.pop('status_code', 200)
        return jsonify(register_resp), status_code
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/login', methods=['POST'])
def login_user():
    from views.user import login_user
    try:
        print("Login in")
        login_resp = login_user(request)
        status_code = login_resp.pop('status_code', 200)
        return jsonify(login_resp), status_code
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/users', methods=['GET'])
def get_users():
    from views.user import get_all_users
    user_data = get_all_users(request)

    status_code = user_data.pop('status_code')
    return jsonify(user_data), status_code

@app.route('/folders', methods=['POST'])
def add_folder():
    from views.folder import add_folder
    folder_resp = add_folder(request)

    status_code = folder_resp.pop('status_code')
    return jsonify(folder_resp), status_code

@app.route('/upload', methods=['POST', 'PUT'])
def update():
    from views.files import add_file
    try:
        files_resp = add_file(request)
        status_code = files_resp.pop('status_code')
        return jsonify(files_resp), status_code
    except Exception:
        import traceback
        traceback.print_exc()

    return jsonify({"success": True}), 200

@app.route('/files', methods=['GET'])
def get_files():
    print("started")
    from views.files import get_files_view
    file_data = get_files_view(request)

    status_code = file_data.pop('status_code')
    return jsonify(file_data), status_code


@app.route('/folders', methods=['GET'])
def get_folders():
    from views.folder import get_folders_view
    folder_data = get_folders_view(request)

    status_code = folder_data.pop('status_code')
    return jsonify(folder_data), status_code


@app.route('/folders', methods=['DELETE'])
def delete_folder():
    from views.folder import delete_folder_view
    folder_data = delete_folder_view(request)

    status_code = folder_data.pop('status_code')
    return jsonify(folder_data), status_code


@app.route('/files', methods=['DELETE'])
def delete_file():
    from views.files import delete_file_view
    file_data = delete_file_view(request)

    status_code = file_data.pop('status_code')
    return jsonify(file_data), status_code


@app.route('/status', methods=['GET'])
def get_login_status():
    auth_header = request.headers.get('Authorization')
    from utils.users import verify_token
    status_code, value = verify_token(auth_header)
    if status_code == 200:
        return jsonify({"user": value}), status_code
    return jsonify({"message": value}), status_code

@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection.
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        todo_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port)

