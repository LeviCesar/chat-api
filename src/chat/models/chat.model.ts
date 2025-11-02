import { Column, DataType, PrimaryKey, Table, Model, HasMany, BelongsToMany } from "sequelize-typescript";
import { Account } from "../../account/models/account.model";
import { ChatMessage } from "./chat-message.model";
import { ChatIntegrants } from "./chat-integrants.model";
import { HasManyCreateAssociationMixin, BelongsToManySetAssociationsMixin } from "sequelize";

@Table({
  tableName: "chat",
  underscored: true,
  paranoid: true,
})
export class Chat extends Model {
  @PrimaryKey
  @Column(DataType.UUID)
  declare id: string;

  @Column
  declare name: string;

  @BelongsToMany(() => Account, () => ChatIntegrants)
  declare integrants: Account[];
  declare setIntegrants: BelongsToManySetAssociationsMixin<Account, Account['id']>;
  
  @HasMany(() => ChatMessage, 'chatId')
  declare messages: ChatMessage[];
  declare createMessage: HasManyCreateAssociationMixin<ChatMessage, 'chatId'>;
}
