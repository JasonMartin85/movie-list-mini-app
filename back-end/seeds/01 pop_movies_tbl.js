/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Mean Girls', hardcoded: 'true', watched: 'false'},
    {title: 'Hackers', hardcoded: 'true', watched: 'false'},
    {title: 'The Grey', hardcoded: 'true', watched: 'false'},
    {title: 'Sunshine', hardcoded: 'true', watched: 'false'},
    {title: 'Ex Machina', hardcoded: 'true', watched: 'false'},
  ]);
};
