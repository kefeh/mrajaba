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
    user_data = get_all_users()

    status_code = user_data.pop('status_code')
    return jsonify(user_data), status_code

@app.route('/folders', methods=['POST'])
def add_folder():
    from views.folder import add_folder
    folder_resp = add_folder(request)

    status_code = folder_resp.pop('status_code')
    return jsonify(folder_resp), status_code

@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body.
        Ensure you pass a custom ID as part of json body in post request,
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        todo_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

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

