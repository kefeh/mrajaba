import pyrebase
from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

firebaseConfig = {
  "apiKey" : "AIzaSyDBaZcWVpZdRBiqIPfn6-PAMbqEwjy0K_c",
  "authDomain" : "icpcminesec.firebaseapp.com",
  "databaseURL" : "https://icpcminesec.firebaseio.com",
  "projectId" : "icpcminesec",
  "storageBucket" : "icpcminesec.appspot.com",
  "messagingSenderId" : "774715356215",
  "appId" : "1:774715356215:web:ae86c00a26accbe512bbb2",
  "measurementId" : "G-QHCNRD8FQS"
}

firebase = pyrebase.initialize_app(firebaseConfig)

auth = firebase.auth()


cred = credentials.Certificate('icpcminesec-firebase.json')
default_app = initialize_app(cred)
db = firestore.client()
