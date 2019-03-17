const dgram = require('dgram');
var server = dgram.createSocket('udp4');
var dbConnections = require(path.join(__dirname,'config/db.Connections'));


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