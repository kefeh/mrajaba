from config import db


users = db.collection(u'users')
folders = db.collection(u'folders')
files = db.collection(u'files')
news = db.collection(u'news')
notifications = db.collection(u'notifications')