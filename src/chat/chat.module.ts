import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './models/chat.model';
import { AccountModule } from 'src/account/account.module';
import { ChatIntegrant } from './models/chat-integrants.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Chat,
      ChatIntegrant,
    ]),
    AccountModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ],
})
export class ChatModule {}
