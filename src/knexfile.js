process.env["NODE_CONFIG_DIR"] = __dirname + "/../config/";
const config = require('config');

module.exports = {
  client: 'mysql',
  connection: config.get('knex'),
  migrations: {
    directory: __dirname + "/../migrations/",
  }
};
