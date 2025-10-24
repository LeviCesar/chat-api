import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto): Promise<TokenDto> {
    let account = await this.accountService.authAccount(authDto.username, authDto.password)
    
    const now = DateTime.now().setZone('Europe/Paris'); // env
    const iat = Math.floor(now.toSeconds());
    const exp = Math.floor(now.plus({ minutes: 15 }).toSeconds()); // env
    const jti = uuidv4();

    const payload = {
      sub: account.id,
      username: account.username,
      exp,
      iat,
      tokenType: "at+jwt",
      jti,
    };

    let accessToken = await this.jwtService.signAsync(payload);

    payload.tokenType = "rt+jwt";
    payload.exp = Math.floor(now.plus({ days: 5 }).toSeconds()); // env
    let refreshToken = await this.jwtService.signAsync(payload);

    await this.accountService.startSession(account.id, jti);
    
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
