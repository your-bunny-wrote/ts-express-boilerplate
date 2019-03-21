const crypto = require('crypto');
const config = require('config');

const username = 'test';
const password = 'test';

exports.up = (knex) => {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.timestamps(true, true);
    table.string('username').notNullable().unique('username');
    table.string('password').notNullable();
  }).then(
    () => knex('users').insert({
      username,
      password: crypto.createHmac('sha512', config.get('secret')).update(password).digest('base64'),
    })
  );
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
