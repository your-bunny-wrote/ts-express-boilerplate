process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

module.exports = {
  client: 'sqlite3',
  connection: config.get('knex'),
  migrations: {
    directory: __dirname + "/../migrations/",
  }
};
