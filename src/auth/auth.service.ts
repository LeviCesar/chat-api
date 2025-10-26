import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { ITokenJwt } from './interfaces/token-jwt.interface';

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

    const payload: ITokenJwt = {
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

  async refreshSession(refreshDto: RefreshAuthDto): Promise<TokenDto> {
    try {
      const payload: ITokenJwt = await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: '633fcb1be22daf1851f91fa722dcf0a8ab55c833befdb9bfdaac84ded36be530', // env
        }
      );

      if (payload.tokenType != 'rt+jwt') {
        throw new UnauthorizedException('invalid token');
      }
  
      if (!await this.accountService.activeSession(payload.jti)) {
        throw new UnauthorizedException(); 
      }

      const now = DateTime.now().setZone('Europe/Paris'); // env
      const iat = Math.floor(now.toSeconds());
      const exp = Math.floor(now.plus({ minutes: 15 }).toSeconds()); // env
      
      payload.tokenType = 'at+jwt';
      payload.iat = iat;
      payload.exp = exp;

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: refreshDto.refreshToken,
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  async finishSession(accountId: number): Promise<void> {
    await this.accountService.finishSession(accountId);
  }
}
