import { DataTypes } from 'sequelize';
import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: "session",
  underscored: true,
  paranoid: true,
})
export class AccountSession extends Model {
  @Column
  declare encode: string;

  @Column
  declare refreshToken: string;
  
  @Column
  declare accessToken: string;
  
  @Unique
  @Column({
    type: DataTypes.INTEGER
  })
  declare accountId: number;
}
