import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './account/models/account.model';
import { AccountSession } from './account/models/account-session.model';
import { AccountUser } from './account/models/account-user.model';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/models/chat.model';
import { ChatIntegrant } from './chat/models/chat-integrants.model';
import { ChatRoomModule } from './chat-room/chat-room.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'development',
      models: [
        AccountUser,
        AccountSession,
        Account,
        Chat,
        ChatIntegrant,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),

    AccountModule,
    AuthModule,
    ChatModule,
    ChatRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
