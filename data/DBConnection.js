const { Pool } = require("pg");
const connectionString = "postgresql://postgres:12345@localhost:5432/blog";

function connection() {
  return new Pool({
    connectionString,
  });
}

module.exports = connection;
