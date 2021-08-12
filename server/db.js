const Pool = require("pg").Pool;

// here the configurations
// specify user, define password, say what the host is, specify the port and the db we created (as JSON)
const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "perntodo"
}); 

// export this 
module.exports = pool;