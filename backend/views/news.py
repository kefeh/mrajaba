from utils.news import add_news_util, get_news_util, delete_news

def add_news(request):
    add_news_resp = add_news_util(request)

    if "error" in add_news_resp:
        add_news_resp['success'] = False
    else:
        add_news_resp['success'] = True
        add_news_resp['status_code'] = 200

    return add_news_resp

def get_news_view(request):
    news_data = get_news_util(request)
    if "error" in news_data:
        news_data['success'] = False
    else:
        news_data['success'] = True
        news_data['status_code'] = 200
    return news_data

def delete_news_view(request):
    result = delete_news(request)
    if "error" in result:
        result['success'] = False
    else:
        result['success'] = True
        result['status_code'] = 200
    return result
