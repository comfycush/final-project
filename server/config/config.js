require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "web-builder",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    host: process.env.RDS_HOSTNAME,
    port: process.env.RDS_PORT,
    dialect: "postgres",
  },
};
