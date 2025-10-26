import { DataTypes } from 'sequelize';
import { Column, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

@Table({
  tableName: "session",
  underscored: true,
  paranoid: true,
})
export class AccountSession extends Model {
  @PrimaryKey
  @Column({
    type: DataTypes.UUID,
  })
  declare id: string;

  @Column({
    defaultValue: true
  })
  declare isActive: boolean;
  
  @Column({
    type: DataTypes.INTEGER
  })
  declare accountId: number;
}
