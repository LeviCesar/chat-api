import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard, Public } from './auth.guard';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refreshSession(@Body() refreshDto: RefreshAuthDto) {
    return this.authService.refreshSession(refreshDto);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('logout')
  finsihSession(@Request() req) {
    return this.authService.finishSession(req.user.sub);
  }
}
