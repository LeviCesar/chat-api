import { Column, DataType, ForeignKey, Length, Model, Table } from "sequelize-typescript";
import { Chat } from "./chat.model";
import { Account } from "src/account/models/account.model";

@Table({
  tableName: "chat_messages",
  underscored: true,
  paranoid: true,
})
export class ChatMessage extends Model {
  @Length({ min: 3, max: 300 })
  @Column
  declare message: string;
  
  @ForeignKey(() => Chat)
  @Column(DataType.UUID)
  declare chat: string;

  @ForeignKey(() => Account)
  @Column
  declare account: number;
}