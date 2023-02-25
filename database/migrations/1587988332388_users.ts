import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('id_number').notNullable();
      table.integer('id_profile').unsigned().references('profiles.id_profile');
      table.string('name', 180).notNullable()
      table.string('last_name', 180).notNullable()
      table.string('id_type',32).notNullable();
      table.string('direccion',180).notNullable();
      table.string('barrio',180).notNullable();
      table.string('municipio',180).notNullable();
      table.string('departamento',180).notNullable();
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
