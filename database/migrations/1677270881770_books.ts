import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Books extends BaseSchema {
  protected tableName = 'books'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_book').primary();
      table.integer('id_user').unsigned().references('users.id').onDelete('cascade');
      table.string('title',200).notNullable();
      table.string('author',200).notNullable();
      table.string('editorial',200).notNullable();
      table.string('format',200).notNullable();
      table.integer('n_pages').notNullable();
      table.timestamps(true);
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
