exports.up = knex =>
  knex.schema.createTable("user", tbl => {
    tbl.increments();
  });

exports.down = knex => knex.schema.dropTableIfExists("user");
