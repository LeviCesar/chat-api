import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './account/entities/account.entity';
import { AccountSession } from './account/entities/account-session.entity';
import { AccountUser } from './account/entities/account-user.entity';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';
import { ChatIntegrant } from './chat/entities/chat-integrants.entity';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
