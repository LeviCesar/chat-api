import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './account/entities/account.entity';
import { AccountSession } from './account/entities/account-session.entity';
import { AccountUser } from './account/entities/account-user.entity';
import { AuthModule } from './auth/auth.module';

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
      ],
      autoLoadModels: true,
      synchronize: true,
    }),

    AccountModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
