import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Chat } from './chat.model';
import { Account } from 'src/account/models/account.model';

@Table({ 
  tableName: 'chat_integrants', 
  underscored: true,
  paranoid: true,
  timestamps: false,
})
export class ChatIntegrant extends Model {
  @ForeignKey(() => Chat)
  @Column
  declare chatId: string;

  @ForeignKey(() => Account)
  @Column
  declare accountId: number;
}