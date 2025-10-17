// config/config.js
require('dotenv').config();

const common = { logging: false };

module.exports = {
  development: {
    // tu dev actual (si usas MySQL en local)
    username: "root",
    password: null,
    database: "nnovaweb_db",
    host: "127.0.0.1",
    dialect: "mysql",
    ...common,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    ...common,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    logging: false,
    migrationStorage: "sequelize",
    migrationStorageTableName: "SequelizeMeta",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeData"
},
};