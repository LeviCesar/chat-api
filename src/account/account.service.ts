import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreatedResponseDto, MessageResponseDto } from './dto/responses.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';
import { AccountUser } from './entities/account-user.entity';
import { AccountSession } from './entities/account-session.entity';
const bcrypt = require('bcrypt');

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account) private accountModel: typeof Account,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<CreatedResponseDto | MessageResponseDto> {
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
