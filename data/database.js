const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "12345",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

async function connectToDatabase() {
    const res = await client.connect();
    console.log("Success");
}
module.exports = {
  connectToDatabase: connectToDatabase  
}