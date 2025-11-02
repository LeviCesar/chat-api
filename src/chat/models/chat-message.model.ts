import { BelongsTo, Column, DataType, Length, Model, Table } from "sequelize-typescript";
import { Chat } from "./chat.model";
import { Account } from "src/account/models/account.model";

@Table({
  tableName: "chat_messages",
  underscored: true,
  paranoid: true,
})
export class ChatMessage extends Model {
  @BelongsTo(() => Chat)
  declare chat: Chat;

  @BelongsTo(() => Account)
  declare account: Account;

  @Length({ min: 3, max: 300 })
  @Column
  declare message: string;
}