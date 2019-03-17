var dbConnections = require('../../config/db.Connections');
var express = require('express');
var router = express.Router();
const dgram = require('dgram');
var server = dgram.createSocket('udp4');
const app = express();


server.on('error', (err) =>{
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg,rinfo) =>{
    var mes = msg.toString();
    var con = dbConnections();
    var sql = "INSERT INTO `syrus` (`ID`, `Fecha`, `Latitud`, `Longitud`) VALUES ?;";
    console.log(mes.substring(1,4));
    if (mes.substring(1, 4) == "REV") {
        semanas = mes.substring(6, 10);
        semana = parseInt(semanas);
        dia = mes.substring(10, 11);
        dian = parseInt(dia);
        hora = mes.substring(11, 16);
        horan = parseInt(hora);
        semanan = (semana * 604800 + horan + 315964800 + dian * 86400 - 18000)*1000;
        todo =new Date(semanan).toISOString().replace(/T/, ' ').replace(/\..+/, '') ;
        latitud = mes.substring(17, 19) +  "." + mes.substring(19, 24);
        longitud = mes.substring(24, 25) + mes.substring(26, 28) + "." + mes.substring(28, 33);
        console.log("Fecha: ", todo, "latitud: ", latitud, "longitud: ", longitud);
    }
    values = [['NULL',todo,latitud,longitud]];
    con.query(sql, [values],function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});

server.bind(45826);

router.get('/', (req, res) => {
    var con = dbConnections();
    con.query('SELECT * FROM syrus order by ID desc limit 1', [], function (err, result) {
        res.render('index', { datos: result });
    })
});
//>REV442039316285+0000000-0748686700014612;ID=357042062915567<
refresh = function(){
    app.get(refresh, (req, res) => {
        var con = dbConnections();
        con.query('SELECT * FROM syrus order by ID desc limit 1', [], function (err, result) {
            res.render('index', { datos: result });
        })
    });
}
setInterval(refresh, 1000);
module.exports = router;