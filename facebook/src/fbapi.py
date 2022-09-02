import facebook
import yaml


class FacebookAPI(object):
    """
    FacebookAPI class that wraps up the call to Facebook-sdk api
    """

    def __init__(self):
        config = yaml.load(open('fbapi.yaml'))
        app_id = config['app_id']
        app_secret = config['app_secret']
        self.oauth_access_token = config['oauth_access_token']

    def searchUser(self, query, limit=10):
        """
        @return list of profiles matching the query, with size up to limit
        """
        self.facebook_graph = facebook.GraphAPI(self.oauth_access_token)
        listP = self.facebook_graph.get_object("search?q="+query+"&type=user&access_token="+self.oauth_access_token+"&limit="+str(limit)+"&fields=link,name")
        print listP['data']
        return listP
