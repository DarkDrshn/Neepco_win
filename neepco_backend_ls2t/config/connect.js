import { createConnection } from "mysql2";


const db = createConnection({
    host:"bqw4ykclfduhnryqtkah-mysql.services.clever-cloud.com",
    user:"u1xuwvl02dnzttxz",
    password:"vnfZNnmges06bFceuX9K",
    database:"bqw4ykclfduhnryqtkah",
    waitForConnections: true,
    port: 3306,
    
    queueLimit: 0

    // user:"root",
    // password:"password",
    // port:3306,
    // database:"neepco_procure_sih"
});

// const db = createConnection({
//     host:"localhost",
//     user:"root",
//     password:"password",
//     database:"neepco_procure_sih",
//     waitForConnections: true,
//     port: 3306,
//     queueLimit: 0
// });
db.connect(function(err) {
    if(err){
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
});

export default db;

//MySQL CLI
// mysql -h bqw4ykclfduhnryqtkah-mysql.services.clever-cloud.com -P 3306 -u u1xuwvl02dnzttxz -p bqw4ykclfduhnryqtkah
