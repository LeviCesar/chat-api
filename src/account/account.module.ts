import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountUser } from './models/account-user.model';
import { AccountSession } from './models/account-session.model';
import { Account } from './models/account.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AccountUser,
      AccountSession,
      Account,
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
