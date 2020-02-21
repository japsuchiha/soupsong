import sys
import spotipy
import spotipy.util as util
import os
import config

scope = 'user-library-read'

if len(sys.argv) > 1:
    username = sys.argv[1]
else:
    print("Usage: %s username" % (sys.argv[0],))
    sys.exit()

token = util.prompt_for_user_token(username,
                           scope,
                           client_id=config.client_id,
                           client_secret=config.client_secret,
                           redirect_uri="http://localhost:3000")