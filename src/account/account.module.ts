import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountUser } from './entities/account-user.entity';
import { AccountSession } from './entities/account-session.entity';
import { Account } from './entities/account.entity';

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
