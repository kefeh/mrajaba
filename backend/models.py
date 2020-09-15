from config import db


users = db.collection(u'users')
folders = db.collection(u'folders')
files = db.collection(u'files')