import { Column, DataType, ForeignKey, Length, Model, Table } from "sequelize-typescript";
import { Chat } from "./chat.model";
import { Account } from "src/account/models/account.model";

@Table({
  tableName: "chat_messages",
  underscored: true,
  paranoid: true,
})
export class ChatMessage extends Model {
  @ForeignKey(() => Account)
  @Column(DataType.UUID)
  declare chatId: string;

  @ForeignKey(() => Account)
  @Column
  declare integrant: number;

  @Column(DataType.TEXT)
  declare message: string;
}