require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'position_manager',
      user:     'root',
      password: ''
    },
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './database/migrations.ts',
    },
    seeds: { directory: './database/seeds' },
  },

  testing: {
    client: 'mysql',
    connection: {
      database: 'position_manager',
      user:     'root',
      password: ''
    },
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './database/migrations.ts',
    },
    seeds: { directory: './database/seeds' },
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'position_manager',
      user:     'root',
      password: ''
    },
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './database/migrations.ts',
    },
    seeds: { directory: './database/seeds' },
  },
};
