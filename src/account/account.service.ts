import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreatedResponseDto } from './dto/responses.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './models/account.entity';
import { AccountUser } from './models/account-user.entity';
import { AccountSession } from './models/account-session.entity';
import { AuthAccountDto } from './dto/auth-account.dto';
import { Op } from 'sequelize';
const bcrypt = require('bcrypt');

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountModel: typeof Account,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<CreatedResponseDto> {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
    const hashedPassword = await bcrypt.hash(createAccountDto.password, saltRounds);
    createAccountDto.password = hashedPassword;
    
    try {
      const account = await this.accountModel.create();
      const accountUser: AccountUser = await account.createUser({
        username: createAccountDto.username, 
        password: createAccountDto.password,
      })

      return { id: accountUser.id };
    } catch(err) {
      throw new BadRequestException("failed creating account");
    }
  }

  async authAccount(username: string, password: string): Promise<AuthAccountDto> {
    let account = await this.accountModel.findOne({
      include: [
        {
          model: AccountUser,
          as: 'user',             // use the alias you defined in the association, or remove if none
          where: { username },    // search on the hasOne side
          required: true,         // makes INNER JOIN so only matching accounts are returned
          attributes: ['id', 'username', 'password'],
        }
      ],
    });

    if (!account) {
      throw new NotFoundException("user not found");
    }

    if (!await bcrypt.compare(password, account?.user.password)) {
      throw new UnauthorizedException("password wrong");
    }

    return {
      id: account.id,
      username: account?.user.username,
    }
  }

  async startSession(accountId: number, jti: string): Promise<void> {
    let account = await this.accountModel.findOne({
      where: { id: accountId },
      include: [
        {
          model: AccountSession,
          as: "sessions",
          where: { isActive: true },
          required: false,
          attributes: ["id"]
        }
      ]
    });

    if (!account) {
      throw new UnauthorizedException("account not found");
    }

    if (account.sessions.length >= 1) {
      throw new UnauthorizedException("account is logged in another device");
    }

    await account.createSession({ id: jti });
  }

  async  activeSession(sessionId: string): Promise<boolean> {
    let account = await this.accountModel.findOne({
      include: [{
        model: AccountSession,
        as: 'sessions',
        where: { id: sessionId },
        required: true,
        attributes: ['isActive'],
      }],
    });

    return account?.sessions[0].isActive || false;
  }

  async finishSession(accountId: number): Promise<void> {
    let account = await this.accountModel.findOne({
      where: { id: accountId },
      include: [
        {
          model: AccountSession,
          as: "sessions",
          where: { isActive: true },
          required: false,
          attributes: ['id', 'isActive'],
        }
      ]
    });

    if (!account) {
      throw new NotFoundException("account not found");
    }

    let accountSession: AccountSession = await account.sessions[0] || null;
    if (!accountSession) {
      throw new NotFoundException("session not found");
    }

    accountSession.isActive = false;
    await accountSession.save();
  }

  async findAllById(ids: number[]): Promise<number[]> {
    if (!ids || ids.length === 0) return [];

    let accounts = await this.accountModel.findAll({
      where: { id: { [Op.in]: ids }, deletedAt: null },
      attributes: ['id'],
    })

    return accounts.map(elem => elem.id);
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
