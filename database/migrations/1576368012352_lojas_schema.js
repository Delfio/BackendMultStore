'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LojasSchema extends Schema {
  up() {
    this.create('lojas', (table) => {
      table.increments();
      table.string('nome', 80).notNullable().unique();
      table
        .text('descricao')
        .notNullable();
      table.string('endereco', 100).notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.integer('quantidade_vendas').defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('lojas')
  }
}

module.exports = LojasSchema
