const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

(async () => {
  try {
    await client.connect(); // Connect to the database
    console.log("Connected to the database successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the process if the connection fails
  }
})();

module.exports = client; // Export the connected client
