import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './models/chat.model';
import { AccountModule } from 'src/account/account.module';
import { ChatIntegrant } from './models/chat-integrants.model';
import { ChatMessage } from './models/chat-message.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Chat,
      ChatIntegrant,
      ChatMessage,
    ]),
    AccountModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ],
})
export class ChatModule {}
