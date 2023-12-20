import sql from "mssql";
const config = {
  user: "walid",
  password: "root",
  server: "DESKTOP-CL28PIV",
  database: "Test",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    requestTimeout: 6000000,
  },
};

export const queryDB = async () => {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.log(err);
  }
};
