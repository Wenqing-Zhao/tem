import json
from decimal import Decimal
import psycopg2
from flask import Flask
from flask_cors import CORS, cross_origin

# connect to redshift
host = 'redshift-cluster-1.chrqxezd4tbp.eu-west-1.redshift.amazonaws.com'
dbname = 'dev'
user = 'awsuser'
password = 'Aa3037615469'
port = '5439'

conn = psycopg2.connect(
    dbname=dbname,
    user=user,
    password=password,
    host=host,
    port=port
)

# diabetes
cur = conn.cursor()
cur.execute("SELECT * FROM dev.public.diabetes")
diabetes = cur.fetchall()
cur.close()

# age_groups
cur = conn.cursor()
cur.execute("SELECT * FROM dev.public.age_groups")
age_groups = cur.fetchall()
cur.close()

result = {item[0]: float(item[1]) for item in age_groups}
json_age_groups = json.dumps(result, indent=4)

# bmi_groups
cur = conn.cursor()
cur.execute("SELECT * FROM dev.public.bmi_groups")
bmi_groups = cur.fetchall()
cur.close()

result = {item[0]: float(item[1]) for item in bmi_groups}
json_bmi_groups = json.dumps(result, indent=4)

# disease_statistics
cur = conn.cursor()
cur.execute("SELECT * FROM dev.public.disease_statistics")
disease_statistics = cur.fetchall()
cur.close()

result = {item[0]: float(item[1]) for item in disease_statistics}
json_disease_statistics = json.dumps(result, indent=4)

conn.close()

# start flask server
data = {
    "age": age_groups,
    "bmi": bmi_groups,
    "statistics": disease_statistics,
    "diabetes": diabetes
}

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/get_data', methods=['GET'])
@cross_origin()
def get_data():
    return data

if __name__ == '__main__':
    app.run()