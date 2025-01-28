const pg = require("pg");

const { Client } = pg;

const client = new Client({
  user: "postgres",
  password: "123#@!456^%$789(*&",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

async function connectToDatabase() {
    const res = await client.connect();
    console.log("Success");
}


module.exports = {
    connectToDatabase:connectToDatabase
}
