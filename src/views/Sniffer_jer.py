import socket
import mysql.connector
import datetime


addr = ("192.168.1.41",45826)

sock = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
sock.bind(addr)
while True:
    data, address = sock.recvfrom(2048)


    data = str(data)
    print(data[3:6])
    if data[3:6] == "REV":
        semanas = str(data[8:12])
        semana = float(semanas)
        dia = str(data[12])
        dian = float(dia)
        hora = str(data[13:18])
        horan = float(hora)
        semanan = semana * 604800 + horan + 315964800 + dian * 86400 
        string = str(datetime.datetime.fromtimestamp(int(semanan)))
        fecha = string[2:12]
        hora = string[13:21]
        sem = str(datetime.datetime.fromtimestamp(int(semanan)))
        sem1 = sem[0:18]
        print(sem)
        latitud = str(data[19:21] + "." + str(data[21:26]))
        longitud = str(data[26:27] + str(data[28:30]) + "." + str(data[30:35]))
        print("Latitud: {}  Longitud: {}   Fecha: {} ".format(latitud, longitud, sem1))
        # BD Connection
        
        con = mysql.connector.connect(user = "root", password = "", host = "127.0.0.1", database = "jerson")
        cursor = con.cursor()
        d = "insert into syrus (Fecha,Latitud,Longitud) values(%s,%s,%s)"
        cursor.execute(d, (sem1,latitud,longitud))
        con.commit()
        con.close()
        
    


    
    