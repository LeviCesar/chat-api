import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { AccountModule } from 'src/account/account.module';
import { ChatIntegrant } from './entities/chat-integrants.entity';

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
