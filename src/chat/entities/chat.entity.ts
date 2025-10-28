import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManySetAssociationsMixin } from "sequelize";
import { BelongsToMany, Column, DataType, PrimaryKey, Table, Model } from "sequelize-typescript";
import { Account } from "../../account/entities/account.entity";
import { ChatIntegrant } from "./chat-integrants.entity";

@Table({
  tableName: "chat",
  underscored: true,
  paranoid: true,
})
export class Chat extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column
  declare title: string;

  @BelongsToMany(() => Account, { through: () => ChatIntegrant })
  declare integrants: Account[];
  declare setIntegrants: BelongsToManySetAssociationsMixin<Account, Account['id']>;
}
