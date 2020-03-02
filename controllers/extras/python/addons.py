import pymongo
import json
from pandas.io.json import json_normalize
import pandas as pd

my_client = pymongo.MongoClient("mongodb://localhost:27017/")
my_db = my_client["imspgalc"]

my_doc = my_db["assets"]
assets = my_doc.find()

assets_csv = []
for asset in assets:
    assets_csv.append(asset)

assets_csv = json_normalize(assets_csv)
assets_csv = pd.DataFrame(data=assets_csv)

assets_csv.to_csv(r'addons\all_assets.csv')

my_doc = my_db["managements"]
managements = my_doc.find()

managements_csv = []
for management in managements:
    managements_csv.append(management)

managements_csv = json_normalize(managements_csv)
managements_csv = pd.DataFrame(data=managements_csv)

managements_csv.to_csv(r'addons\all_managements.csv')

my_doc = my_db["users"]
users = my_doc.find()

users_csv = []
for user in users:
    users_csv.append(user)

users_csv = json_normalize(users_csv)
users_csv = pd.DataFrame(data=users_csv)

users_csv.to_csv(r'addons\all_users.csv')

my_doc = my_db["recycles"]
recycles = my_doc.find()

recycles_csv = []
for recycle in recycles:
    recycles_csv.append(recycle)

recycles_csv = json_normalize(recycles_csv)
recycles_csv = pd.DataFrame(data=recycles_csv)

recycles_csv.to_csv(r'addons\all_recycles.csv')
