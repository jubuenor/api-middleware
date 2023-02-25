import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Book from './Book';

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: number

  @column() public id_number:string
  @column() public id_profile:number
  @column() public name: string
  @column() public last_name: string
  @column() public id_type: string
  @column() public direccion: string
  @column() public barrio: string
  @column() public municipio: string  
  @column() public departamento: string
  @column() public email: string

  @hasOne(()=> Book,{
    localKey:'id_book',
    foreignKey:'id_book'
  })
  public id_book:HasOne<typeof Book>


  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
