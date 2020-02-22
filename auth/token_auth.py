import requests
import config

url = "https://accounts.spotify.com/api/token"
body = {
    "grant_type": "refresh_token",
    "refresh_token":"AQA9rs8dmF-KWkPo9ufvf6BvPe1mCC3JuDxALgmvUnrPVcVCyZAS98OmuTeusQIIi8J0c5w5k3P54iZ9pHGcgBQKPg0TFFrWOgcXEdCd0cZbPeu-WU2V_DELZLVzeQ1IkQ8"
}
header = {
    "Authorization": "Basic MzNkNDhmMDE0YzQ2NGEwNzliYmMzYmZmN2JhZWYwZjI6MTVlYTc2NzhkMmMzNDkxNWJjNDI1MThhOWUyZmRiMDk="
}

res = requests.post(url,data = body, headers=header)

print(res.text)
