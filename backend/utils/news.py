from getpass import getpass
from datetime import datetime
from models import news, users

from config import auth
from firebase_admin import auth as f_auth

def add_news_util(request):
    user = request.json['user']
    news_content = request.json['news']
    title = request.json['title']
    news_id = str(datetime.timestamp(datetime.now()))
    try:
        user_info = users.where('email', '==', user).limit(1).get()[0].to_dict()
        
        if user_info['admin']:
            news.document(news_id).set({
                "created_at": datetime.now().strftime('%Y-%m-%d %H:%M'),
                "user": user,
                "news": news_content,
                "title": title,
                "id": news_id,
            })

            return {'id': news_id}
        else:
            return {'error': f"You dont have permissions",
                'status_code': 490}
    except Exception as e:
        return {'error': f"unable to create folder {e}",
                'status_code': 400}

def get_news_util(request):
    try:
        new_news_list = [a_news.to_dict() for a_news in news.limit(5).stream()]
        return {
                'news': new_news_list
            }
    except Exception as ex:
        import traceback
        traceback.print_exc()
        print(ex)
        return{'error': f"unable to get news SEVER ERROR",
                'status_code': 490}

def delete_news(request):
    u_id = request.args.get('id')
    c_user = request.args.get('user')
    try:
        user_info = users.where('email', '==', c_user).limit(1).get()[0].to_dict()
        
        if user_info['admin']:
            news.document(u_id).delete()
            return {
                'id': u_id
            }
        else:
            return {'error': f"You dont have permissions",
                'status_code': 490}

    except Exception as e:
        import traceback
        traceback.print_exc()
        print(e)
        return{'error': f"unable to delete file SEVER ERROR",
                'status_code': 490}
