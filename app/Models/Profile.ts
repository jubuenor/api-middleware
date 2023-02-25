import { DateTime } from 'luxon'
import { BaseModel, column,hasOne,HasOne} from '@ioc:Adonis/Lucid/Orm'
import User from './User';

export default class Profile extends BaseModel {
  @column({ isPrimary: true })
  public id_profile: number

  @column() public description:string;

  @hasOne(()=> User,{
    localKey:'id_profile',
    foreignKey:'id_profile'
  })
  public id_user:HasOne<typeof User>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
