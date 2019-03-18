var mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'mydb.cqa6xge5dfnw.us-east-1.rds.amazonaws.com',
        user: 'DB',
        password: 'JersonPerez',
        database: 'diseno'

    });
}