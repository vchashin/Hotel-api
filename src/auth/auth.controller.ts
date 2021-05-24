import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from '../users/users.entity';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @ApiBody({ type: 'object', schema: { example: { email: '', password: '' } } })
  @ApiOperation({ summary: 'auth' })
  @UseGuards(LocalAuthGuard)
  @Post('auth/sign-in')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiTags('auth')
  @ApiBody({
    type: 'object',
    schema: { example: { email: '', password: '', role: '' } },
  })
  @ApiOperation({ summary: 'auth' })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('auth/sign-up')
  async signUp(@Body() userData: Partial<User>) {
    return this.authService.signUp(userData);
  }
}
