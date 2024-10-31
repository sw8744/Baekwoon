import psycopg2
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import serial
import threading

app = FastAPI()
ser = input("COM port?")
ser_conn = serial.Serial(ser, 9600)

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

def getSerialInfo():
    while True:
        res = ser_conn.readline()
        res = res.split()
        res[0] = float(res[0]) # 위도
        res[1] = float(res[1]) # 경도
        res[2] = float(res[2]) # 유량
        res[3] = float(res[3]) # 유속
        res[4] = int(res[4]) # 1번 스위치
        res[5] = int(res[5]) # 2번 스위치
        res[6] = int(res[6]) # 유량 단계 (1-5)
        cur = connection.cursor()
        cur.execute("INSERT INTO info.sensor (flowrate, flux, switch1, switch2, status) VALUES (%s, %s, %s, %s, %s)", (res[2], res[3], res[4], res[5], res[6]))
        connection.commit()
        cur.close()

@app.get('/api/getGuInfo')
def getGuInfo():
    cur = connection.cursor()
    cur.execute("SELECT * FROM info.gu")
    result = cur.fetchall()
    res = {}
    for r in result:
        res[r[0]] = r[1]
    cur.close()
    return res

@app.get('/api/getDongInfo/{dong}')
def getDongInfo(dong):
    cur = connection.cursor()
    cur.execute("SELECT * FROM info." + dong)
    result = cur.fetchall()
    res = {}
    for r in result:
        res[r[0]] = r[1]
    cur.close()
    return res

@app.get('/api/getBlockInfo')
def getBlockInfo():
    cur = connection.cursor()
    cur.execute("SELECT * FROM info.block")
    result = cur.fetchall()
    res = {}
    for r in result:
        res[r[0]] = r[1]
    cur.close()
    return res

thread1 = threading.Thread(target=getSerialInfo)

if __name__ == "__main__":
    thread1.start()
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)