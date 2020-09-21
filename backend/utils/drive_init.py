from __future__ import print_function
import pickle
from config import BASE_PATH
import os.path
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import requests

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/drive']

"""Shows basic usage of the Drive v3 API.
Prints the names and ids of the first 10 files the user has access to.
"""
creds = None
# The file token.pickle stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists('token.pickle'):
    with open('token.pickle', 'rb') as token:
        creds = pickle.load(token)
# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            f'{BASE_PATH}/credentials.json', SCOPES)
        creds = flow.run_local_server(port=0)
    # Save the credentials for the next run
    with open('token.pickle', 'wb') as token:
        pickle.dump(creds, token)

service = build('drive', 'v3', credentials=creds)

# Call the Drive v3 API
def get_files():
    results = service.files().list(
        pageSize=10, fields="nextPageToken, files(id, name)").execute()
    items = results.get('files', [])

    if not items:
        print('No files found.')
    else:
        print('Files:')
        for item in items:
            print(u'{0} ({1})'.format(item['name'], item['id']))

def create_file(file_name, file_path, file_type):
    
        file_metadata = {
            'name': file_name,
        }
        media = MediaFileUpload(file_path,
                                mimetype=file_type,
                                resumable=True)
        request = service.files().create(body=file_metadata,
                                            media_body=media,
                                            fields='id')
        response = None
        while response is None:
            try:
                status, response = request.next_chunk()
                if status:
                    print(f"Uploaded {int(status.progress() * 100)}.")
                print("Upload Complete!")
                print(f"File ID: {response.get('id')}")
                service.permissions().create(fileId=response.get('id'), body={'role':'reader', 'type': 'anyone'}).execute()
                return response.get('id'), 200
            except HttpError as e:
                import traceback
                traceback.print_exc()
                if e.resp.status in [404]:
                    print("failed to Upload click restart")
                    return "failed to Upload click restart", 404
                elif e.resp.status in [500, 502, 503, 504]:
                    status, response = request.next_chunk()
                    return response.get('id'), 200
                else:
                    return "Failed to upload", 400

def delete_file(fileId):
    try:
        results = service.files().delete(fileId=fileId).execute()
        return True
    except Exception as e:
        return False
