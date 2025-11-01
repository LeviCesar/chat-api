import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Chat } from './chat.entity';
import { Account } from 'src/account/models/account.entity';

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