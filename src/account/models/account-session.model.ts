import { DataTypes } from 'sequelize';
import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: "account_session",
  underscored: true,
  paranoid: true,
})
export class AccountSession extends Model {
  @PrimaryKey
  @Column(DataTypes.UUID)
  declare id: string;

  @Column({
    defaultValue: true
  })
  declare isActive: boolean;
  
  @Column(DataTypes.INTEGER)
  declare accountId: number;
}
