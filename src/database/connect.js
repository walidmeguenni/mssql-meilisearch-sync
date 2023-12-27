const  sql = require("mssql");
const config = {
  user: "walid",
  password: "root",
  server: "host.docker.internal",
  database: "Test",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 6000000,
  },
};

const queryDB = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { queryDB };