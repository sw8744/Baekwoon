import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connection = psycopg2.connect(
    host="thislifewon.kro.kr",
    database="baekwoon",
    port=5432,
    user="jrh",
    password="ishs12345!"
    )
print("DB_Connected")


@app.get('/api/getGuInfo')
def getGuInfo():
    cur = connection.cursor()
    cur.execute("SELECT * FROM info.gu")
    result = cur.fetchall()
    res = {}
    for r in result:
        res[r[0]] = r[1]
    return res

@app.get('/api/getDongInfo/{dong}')
def getDongInfo(dong):
    cur = connection.cursor()
    cur.execute("SELECT * FROM info." + dong)
    result = cur.fetchall()
    res = {}
    for r in result:
        res[r[0]] = r[1]
    return res

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)