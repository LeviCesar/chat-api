import { Column, DataType, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: "account_user",
  underscored: true,
  paranoid: true,
})
export class AccountUser extends Model {
  @Column
  declare username: string;
  
  @Column
  declare password: string;
  
  @Unique
  @Column({
    type: DataType.INTEGER,
  })
  declare accountId: number;
}