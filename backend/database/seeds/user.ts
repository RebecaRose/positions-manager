
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {id: 1, first_name: 'João', last_name: 'Silva'},
        {id: 2, first_name: 'Maria', last_name: 'Joaquina'},
      ]);
    });
};
