import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Account } from "src/account/models/account.model";
import { Chat } from "./chat.model";

@Table({
  tableName: "chat_integrants",
  underscored: true,
  paranoid: true,
})
export class ChatIntegrants extends Model {
  @ForeignKey(() => Account)
  @Column
  declare integrantId: number;

  @ForeignKey(() => Chat)
  @Column(DataType.UUID)
  declare chatId: string;
}